import { getSupabaseAdmin } from '../lib/supabase.js';
import { generateAdmitCardPDF } from '../lib/pdf.js';

/**
 * POST /api/get-admit-card
 * GET  /api/get-admit-card?email=...  OR  ?phone=...  OR  ?playerId=...
 *
 * Returns full player data + pdfUrl (regenerates PDF if missing).
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // ── Resolve search param ─────────────────────────────────────────────────
    let searchCol, searchVal;

    const src = req.method === 'GET' ? req.query : req.body;

    if (src.email)    { searchCol = 'email';     searchVal = src.email; }
    else if (src.phone)    { searchCol = 'phone';     searchVal = src.phone; }
    else if (src.playerId) { searchCol = 'player_id'; searchVal = src.playerId; }

    if (!searchCol || !searchVal) {
      return res.status(400).json({ error: 'Provide email, phone, or playerId' });
    }

    const supabase = getSupabaseAdmin();

    // ── Fetch player ─────────────────────────────────────────────────────────
    const { data: player, error } = await supabase
      .from('players')
      .select('*')
      .eq(searchCol, searchVal)
      .maybeSingle();

    if (error || !player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // ── Build response shape ─────────────────────────────────────────────────
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

    // ── Regenerate PDF ───────────────────────────────────────────────────────
    const pdfBytes = await generateAdmitCardPDF(data);
    const pdfPath  = `admit-cards/${player.player_id}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('player-documents')
      .upload(pdfPath, pdfBytes, { contentType: 'application/pdf', upsert: true });

    if (uploadError) {
      console.error('PDF upload error:', uploadError);
      return res.status(500).json({ error: 'Failed to generate PDF' });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('player-documents')
      .getPublicUrl(pdfPath);

    await supabase.from('players').update({ pdf_url: publicUrl }).eq('player_id', player.player_id);

    data.pdfUrl = publicUrl;
    return res.status(200).json({ success: true, data });

  } catch (err) {
    console.error('get-admit-card error:', err);
    return res.status(500).json({ error: 'Failed to retrieve admit card', message: err.message });
  }
}
