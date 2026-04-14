/**
 * Email Service Utility
 * Sends emails using Resend API
 */

import { Resend } from 'resend';

/**
 * Send registration confirmation email with admit card
 * @param {Object} playerData - Player information
 * @param {Buffer} pdfBuffer - Admit card PDF buffer
 * @param {string} resendApiKey - Resend API key
 * @returns {Promise<Object>} Email response
 */
export async function sendRegistrationEmail(playerData, pdfBuffer, resendApiKey) {
  try {
    const resend = new Resend(resendApiKey);
    
    const whatsappLink = process.env.WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/LvJAdEzyiCS1KJFh5axE1P';
    const siteUrl = process.env.SITE_URL || 'https://smashbadminton.netlify.app';
    
    // Create email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed - SMAASH Badminton Tournament</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0B1D3A 0%, #142850 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #F5B800; font-size: 32px; font-weight: bold; letter-spacing: 2px;">
                SMAASH 2026
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">
                Badminton Tournament
              </p>
            </td>
          </tr>
          
          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 30px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: #059669; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                ✓
              </div>
              <h2 style="margin: 0 0 10px; color: #0B1D3A; font-size: 28px; font-weight: bold;">
                Registration Confirmed!
              </h2>
              <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.6;">
                Welcome to SMAASH Badminton Tournament 2026, <strong>${playerData.name}</strong>!
              </p>
            </td>
          </tr>
          
          <!-- Player Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #0B1D3A;">Player ID:</strong>
                    <span style="color: #F5B800; font-size: 18px; font-weight: bold; margin-left: 10px;">${playerData.playerId}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569;">
                    <strong style="color: #0B1D3A;">Category:</strong> ${playerData.category}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569;">
                    <strong style="color: #0B1D3A;">Gender:</strong> ${playerData.gender}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569;">
                    <strong style="color: #0B1D3A;">Total Fee:</strong> ₹${playerData.totalFee}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- WhatsApp CTA -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border-radius: 12px; padding: 25px;">
                <tr>
                  <td style="text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 10px;">📲</div>
                    <h3 style="margin: 0 0 10px; color: #ffffff; font-size: 20px; font-weight: bold;">
                      Join Our WhatsApp Group
                    </h3>
                    <p style="margin: 0 0 20px; color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.6;">
                      Get real-time match schedules, tournament updates, and stay connected with organizers and fellow players.
                    </p>
                    <a href="${whatsappLink}" style="display: inline-block; background-color: #ffffff; color: #25D366; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Join WhatsApp Group →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Payment Notice -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FEF3C7; border: 2px dashed #F59E0B; border-radius: 12px; padding: 20px;">
                <tr>
                  <td style="text-align: center;">
                    <div style="font-size: 32px; margin-bottom: 10px;">💰</div>
                    <h3 style="margin: 0 0 10px; color: #92400E; font-size: 18px; font-weight: bold;">
                      Payment: CASH ONLY
                    </h3>
                    <p style="margin: 0; color: #78350F; font-size: 14px; line-height: 1.6;">
                      ⚠️ Please pay the registration fee of <strong>₹${playerData.totalFee}</strong> in CASH to your respected Coach.<br>
                      <strong>Entry will be allowed only after payment verification.</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Important Instructions -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h3 style="margin: 0 0 15px; color: #0B1D3A; font-size: 18px; font-weight: bold;">
                📋 Important Instructions
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                <li>Carry your admit card (attached) to the venue</li>
                <li>Pay registration fee in CASH to your Coach</li>
                <li>Bring valid ID proof for verification</li>
                <li>Report 30 minutes before your match time</li>
                <li>Players must bring their own rackets</li>
                <li>Follow fair play rules at all times</li>
              </ul>
            </td>
          </tr>
          
          <!-- Tournament Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #475569;">
                    <strong style="color: #0B1D3A;">📅 Dates:</strong> April 24-26, 2026
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569;">
                    <strong style="color: #0B1D3A;">📍 Venue:</strong> Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #475569;">
                    <strong style="color: #0B1D3A;">📞 Contact:</strong> 7052416803 | 9839174810 | 97953100021
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Download Link -->
          <tr>
            <td style="padding: 0 30px 40px; text-align: center;">
              <p style="margin: 0 0 15px; color: #475569; font-size: 14px;">
                Lost your admit card? Download it anytime:
              </p>
              <a href="${siteUrl}/admit-card/${playerData.playerId}" style="display: inline-block; background-color: #F5B800; color: #0B1D3A; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 14px;">
                Download Admit Card
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0 0 5px; color: #94A3B8; font-size: 12px;">
                SMAASH Badminton Tournament 2026
              </p>
              <p style="margin: 0; color: #94A3B8; font-size: 12px;">
                © 2026 All rights reserved
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    
    // Send email with PDF attachment
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'SMAASH Tournament <tournament@smashbadminton.com>',
      to: playerData.email,
      subject: `🎉 Registration Confirmed - SMAASH Badminton Tournament 2026`,
      html: emailHtml,
      attachments: [
        {
          filename: `${playerData.playerId}_AdmitCard.pdf`,
          content: pdfBuffer,
        },
      ],
    });
    
    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
}
