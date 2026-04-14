import nodemailer from 'nodemailer';

const WHATSAPP_LINK = process.env.WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/LvJAdEzyiCS1KJFh5axE1P';
const SITE_URL      = process.env.SITE_URL || 'https://smashbadminton.vercel.app';

/**
 * Send registration confirmation email with admit card PDF attached.
 * Uses Gmail SMTP via Nodemailer.
 *
 * @param {object}           player   - { playerId, name, email, category, gender, totalFee }
 * @param {Buffer|Uint8Array} pdfBytes - raw PDF bytes to attach
 */
export async function sendRegistrationEmail(player, pdfBytes) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('EMAIL_USER and EMAIL_PASS environment variables are required');
  }

  // Create Gmail SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: { user, pass },
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f8f9fa;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;background:#f8f9fa;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1);">

      <!-- Header -->
      <tr><td style="background:linear-gradient(135deg,#0B1D3A,#142850);padding:36px 30px;text-align:center;">
        <h1 style="margin:0;color:#F5B800;font-size:30px;letter-spacing:2px;">SMAASH 2026</h1>
        <p style="margin:8px 0 0;color:#fff;font-size:15px;">Badminton Tournament</p>
      </td></tr>

      <!-- Confirmation -->
      <tr><td style="padding:36px 30px;text-align:center;">
        <div style="width:72px;height:72px;background:#059669;border-radius:50%;margin:0 auto 18px;font-size:36px;line-height:72px;">&#10003;</div>
        <h2 style="margin:0 0 8px;color:#0B1D3A;font-size:26px;">Registration Confirmed!</h2>
        <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
          Welcome, <strong>${player.name}</strong>! Your registration for SMAASH Badminton Tournament 2026 is confirmed.
        </p>
      </td></tr>

      <!-- Player details -->
      <tr><td style="padding:0 30px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:8px;padding:18px;">
          <tr><td style="padding:6px 0;font-size:14px;">
            <strong style="color:#0B1D3A;">Player ID:</strong>
            <span style="color:#F5B800;font-size:17px;font-weight:bold;margin-left:8px;">${player.playerId}</span>
          </td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#475569;">
            <strong style="color:#0B1D3A;">Category:</strong> ${player.category}
          </td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#475569;">
            <strong style="color:#0B1D3A;">Gender:</strong> ${player.gender}
          </td></tr>
          <tr><td style="padding:6px 0;font-size:14px;color:#475569;">
            <strong style="color:#0B1D3A;">Total Fee:</strong> Rs.${player.totalFee}
          </td></tr>
        </table>
      </td></tr>

      <!-- WhatsApp CTA -->
      <tr><td style="padding:0 30px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#25D366,#128C7E);border-radius:12px;padding:24px;">
          <tr><td style="text-align:center;">
            <div style="font-size:36px;margin-bottom:10px;">&#128242;</div>
            <h3 style="margin:0 0 8px;color:#fff;font-size:18px;">Join Our WhatsApp Group</h3>
            <p style="margin:0 0 18px;color:rgba(255,255,255,.9);font-size:13px;line-height:1.6;">
              Get match schedules, live updates, and stay connected with organizers.
            </p>
            <a href="${WHATSAPP_LINK}" style="display:inline-block;background:#fff;color:#25D366;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:bold;font-size:15px;">
              Join WhatsApp Group &#8594;
            </a>
          </td></tr>
        </table>
      </td></tr>

      <!-- Cash payment notice -->
      <tr><td style="padding:0 30px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEF3C7;border:2px dashed #F59E0B;border-radius:12px;padding:20px;">
          <tr><td style="text-align:center;">
            <div style="font-size:28px;margin-bottom:8px;">&#128176;</div>
            <h3 style="margin:0 0 8px;color:#92400E;font-size:16px;">Payment: CASH ONLY</h3>
            <p style="margin:0;color:#78350F;font-size:13px;line-height:1.6;">
              Pay <strong>Rs.${player.totalFee}</strong> in CASH to your Coach before the tournament.<br>
              <strong>Entry allowed only after payment verification.</strong>
            </p>
          </td></tr>
        </table>
      </td></tr>

      <!-- Instructions -->
      <tr><td style="padding:0 30px 28px;">
        <h3 style="margin:0 0 12px;color:#0B1D3A;font-size:16px;">Important Instructions</h3>
        <ul style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.9;">
          <li>Carry your admit card (attached as PDF) to the venue</li>
          <li>Pay registration fee in CASH to your Coach</li>
          <li>Bring valid ID proof / birth certificate</li>
          <li>Arrive 30 minutes before your scheduled match</li>
          <li>Players must bring their own rackets</li>
        </ul>
      </td></tr>

      <!-- Tournament info -->
      <tr><td style="padding:0 30px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:8px;padding:16px;">
          <tr><td style="padding:5px 0;font-size:13px;color:#475569;"><strong style="color:#0B1D3A;">Dates:</strong> April 24-26, 2026</td></tr>
          <tr><td style="padding:5px 0;font-size:13px;color:#475569;"><strong style="color:#0B1D3A;">Venue:</strong> Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow</td></tr>
          <tr><td style="padding:5px 0;font-size:13px;color:#475569;"><strong style="color:#0B1D3A;">Contact:</strong> 7052416803 | 9839174810 | 97953100021</td></tr>
        </table>
      </td></tr>

      <!-- Download link -->
      <tr><td style="padding:0 30px 36px;text-align:center;">
        <p style="margin:0 0 12px;color:#475569;font-size:13px;">Need your admit card again?</p>
        <a href="${SITE_URL}/admit-card/${player.playerId}" style="display:inline-block;background:#F5B800;color:#0B1D3A;text-decoration:none;padding:11px 26px;border-radius:8px;font-weight:bold;font-size:13px;">
          Download Admit Card
        </a>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#F8FAFC;padding:18px 30px;text-align:center;border-top:1px solid #E2E8F0;">
        <p style="margin:0;color:#94A3B8;font-size:11px;">SMAASH Badminton Tournament 2026 &copy; 2026 All rights reserved</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"SMAASH Tournament" <${user}>`,
    to: player.email,
    subject: 'Registration Confirmed - SMAASH Badminton Tournament 2026',
    html,
    attachments: [{
      filename: `${player.playerId}_AdmitCard.pdf`,
      content: Buffer.from(pdfBytes),
      contentType: 'application/pdf',
    }],
  });
}
