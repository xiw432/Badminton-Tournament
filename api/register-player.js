import { getSupabaseAdmin } from '../lib/supabase.js';
import { generateAdmitCardPDF } from '../lib/pdf.js';
import { sendRegistrationEmail } from '../lib/email.js';

/**
 * POST /api/register-player
 *
 * Body (JSON):
 *   name, email, phone, dob, gender, category, parentName?,
 *   address?, events[], totalFee, photoUrl?
 *
 * Returns: { success, data: { playerId, name, email, category, pdfUrl } }
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body;

    // ── Validate required fields ─────────────────────────────────────────────
    const required = ['name', 'email', 'phone', 'dob', 'gender', 'category', 'events'];
    for (const field of required) {
      if (!body[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    if (!Array.isArray(body.events) || body.events.length === 0) {
      return res.status(400).json({ error: 'At least one event must be selected' });
    }

    const supabase = getSupabaseAdmin();

    // ── Duplicate email check ────────────────────────────────────────────────
    const { data: existing } = await supabase
      .from('players')
      .select('player_id')
      .eq('email', body.email)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({
        error: 'Email already registered',
        playerId: existing.player_id,
      });
    }

    // ── Generate unique Player ID ────────────────────────────────────────────
    const playerId = `LKO2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // ── Insert player record ─────────────────────────────────────────────────
    const { error: insertError } = await supabase.from('players').insert([{
      player_id:      playerId,
      name:           body.name,
      email:          body.email,
      phone:          body.phone,
      dob:            body.dob,
      gender:         body.gender,
      category:       body.category,
      parent_name:    body.parentName  || null,
      address:        body.address     || null,
      events:         body.events,
      total_fee:      body.totalFee    || 0,
      photo_url:      body.photoUrl    || null,
      payment_mode:   'cash',
      payment_status: 'pending',
      created_at:     new Date().toISOString(),
    }]);

    if (insertError) {
      console.error('DB insert error:', insertError);
      return res.status(500).json({ error: 'Failed to save registration' });
    }

    // ── Generate PDF ─────────────────────────────────────────────────────────
    const playerForPDF = {
      playerId,
      name:       body.name,
      email:      body.email,
      phone:      body.phone,
      dob:        body.dob,
      gender:     body.gender,
      category:   body.category,
      parentName: body.parentName,
      address:    body.address,
      events:     body.events,
      totalFee:   body.totalFee || 0,
      photoUrl:   body.photoUrl || null,
    };

    const pdfBytes = await generateAdmitCardPDF(playerForPDF);

    // ── Upload PDF to Supabase Storage ───────────────────────────────────────
    let pdfUrl = null;
    const pdfPath = `admit-cards/${playerId}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('playe_documents')
      .upload(pdfPath, pdfBytes, { contentType: 'application/pdf', upsert: true });

    if (uploadError) {
      console.error('PDF upload error:', uploadError);
      // Non-fatal — continue without PDF URL
    } else if (uploadData) {
      const { data: { publicUrl } } = supabase.storage
        .from('playe_documents')
        .getPublicUrl(pdfPath);
      pdfUrl = publicUrl;

      await supabase.from('players').update({ pdf_url: pdfUrl }).eq('player_id', playerId);
    }

    // ── Send confirmation email (non-blocking) ───────────────────────────────
    sendRegistrationEmail({ ...playerForPDF, pdfUrl }, pdfBytes).catch(err => {
      console.error('Email error (non-fatal):', err.message);
    });

    return res.status(200).json({
      success: true,
      message: 'Registration successful',
      data: {
        playerId,
        name:     body.name,
        email:    body.email,
        category: body.category,
        pdfUrl,
      },
    });

  } catch (err) {
    console.error('register-player error:', err);
    return res.status(500).json({ error: 'Registration failed', message: err.message });
  }
}
