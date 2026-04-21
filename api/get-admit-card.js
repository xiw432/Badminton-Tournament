import { getSupabaseAdmin } from '../lib/supabase.js';
import { generateAdmitCardPDF } from '../lib/pdf.js';

/**
 * GET  /api/get-admit-card?playerId=LKO2026-XXXX   ← preferred (unique per player)
 * GET  /api/get-admit-card?email=x&name=y           ← fallback for siblings
 * POST /api/get-admit-card  { playerId } or { email, name }
 *
 * Since multiple players can share an email, always prefer playerId.
 * If fetching by email, also require name to disambiguate siblings.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const src = req.method === 'GET' ? req.query : req.body;
    const supabase = getSupabaseAdmin();

    let player = null;

    // ── Fetch by playerId (most reliable — unique per registration) ───────────
    if (src.playerId) {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('player_id', src.playerId)
        .maybeSingle();
      if (!error) player = data;
    }
    // ── Fetch by phone (unique enough) ───────────────────────────────────────
    else if (src.phone) {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('phone', src.phone)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error) player = data;
    }
    // ── Fetch by email + name (for siblings sharing same email) ──────────────
    else if (src.email && src.name) {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('email', src.email)
        .ilike('name', src.name.trim())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error) player = data;
    }
    // ── Fetch by email only — return most recent registration ─────────────────
    else if (src.email) {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('email', src.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error) player = data;
    }
    else {
      return res.status(400).json({ error: 'Provide playerId, phone, or email' });
    }

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // ── Build response ────────────────────────────────────────────────────────
    const data = {
      playerId:   player.player_id,
      name:       player.name,
      email:      player.email,
      phone:      player.phone,
      dob:        player.dob,
      gender:     player.gender,
      category:   player.category,
      parentName: player.parent_name,
      address:    player.address,
      events:     player.events,
      totalFee:   player.total_fee,
      photoUrl:   player.photo_url,
      pdfUrl:     player.pdf_url,
    };

    // Return immediately if PDF already exists
    if (player.pdf_url) {
      return res.status(200).json({ success: true, data });
    }

    // ── Regenerate PDF if missing ─────────────────────────────────────────────
    const pdfBytes = await generateAdmitCardPDF(data);
    const pdfPath  = `admit-cards/${player.player_id}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('playe_documents')
      .upload(pdfPath, pdfBytes, { contentType: 'application/pdf', upsert: true });

    if (uploadError) {
      console.error('PDF upload error:', uploadError.message);
      return res.status(500).json({ error: 'Failed to generate PDF' });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('playe_documents').getPublicUrl(pdfPath);

    await supabase.from('players').update({ pdf_url: publicUrl }).eq('player_id', player.player_id);

    data.pdfUrl = publicUrl;
    return res.status(200).json({ success: true, data });

  } catch (err) {
    console.error('get-admit-card error:', err);
    return res.status(500).json({ error: 'Failed to retrieve admit card', message: err.message });
  }
}
