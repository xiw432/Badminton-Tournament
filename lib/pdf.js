import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const NAVY   = rgb(0.043, 0.114, 0.227); // #0B1D3A
const YELLOW = rgb(0.961, 0.722, 0);     // #F5B800
const BLACK  = rgb(0, 0, 0);
const WHITE  = rgb(1, 1, 1);
const GRAY   = rgb(0.4, 0.4, 0.4);
const AMBER_BG  = rgb(1, 0.953, 0.784);  // light yellow box
const AMBER_BOR = rgb(0.961, 0.722, 0);

/**
 * Generate a professional admit card PDF for a registered player.
 * @param {object} player
 * @param {string} player.playerId
 * @param {string} player.name
 * @param {string} player.email
 * @param {string} player.phone
 * @param {string} player.dob
 * @param {string} player.gender
 * @param {string} player.category
 * @param {string} [player.parentName]
 * @param {string} [player.address]
 * @param {Array}  player.events
 * @param {number} player.totalFee
 * @param {string} [player.photoUrl]  - public URL of player photo
 * @returns {Promise<Uint8Array>} raw PDF bytes
 */
export async function generateAdmitCardPDF(player) {
  const doc  = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const reg  = await doc.embedFont(StandardFonts.Helvetica);

  // ── Outer border ──────────────────────────────────────────────────────────
  page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: NAVY, borderWidth: 2 });

  // ── Header band ───────────────────────────────────────────────────────────
  page.drawRectangle({ x: 20, y: height - 130, width: width - 40, height: 110, color: NAVY });

  page.drawText('SMAASH BADMINTON TOURNAMENT 2026', {
    x: 40, y: height - 68, size: 20, font: bold, color: YELLOW,
  });
  page.drawText('PLAYER REGISTRATION / ADMIT CARD', {
    x: 40, y: height - 90, size: 12, font: reg, color: WHITE,
  });
  page.drawText('Dates: April 24-26, 2026   |   Venue: Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow', {
    x: 40, y: height - 112, size: 8, font: reg, color: rgb(0.8, 0.8, 0.8),
  });

  // ── Photo box (top-right) ─────────────────────────────────────────────────
  const photoX = width - 140, photoY = height - 270, photoW = 110, photoH = 130;
  page.drawRectangle({ x: photoX, y: photoY, width: photoW, height: photoH, borderColor: NAVY, borderWidth: 1.5 });

  if (player.photoUrl) {
    try {
      const res   = await fetch(player.photoUrl);
      const buf   = await res.arrayBuffer();
      const url   = player.photoUrl.toLowerCase();
      const img   = url.includes('.png')
        ? await doc.embedPng(buf)
        : await doc.embedJpg(buf);
      page.drawImage(img, { x: photoX, y: photoY, width: photoW, height: photoH });
    } catch {
      drawPhotoPlaceholder(page, photoX, photoY, photoW, photoH, reg);
    }
  } else {
    drawPhotoPlaceholder(page, photoX, photoY, photoW, photoH, reg);
  }

  // ── Player details ────────────────────────────────────────────────────────
  let y = height - 160;
  y = drawSection(page, 'PLAYER DETAILS', y, bold, reg, NAVY, width, [
    ['Player ID',    player.playerId,                    true],
    ['Player Name',  player.name],
    ['Date of Birth', formatDate(player.dob)],
    ['Gender',       player.gender],
    ['Category',     player.category],
  ], photoX - 20);

  // ── Contact details ───────────────────────────────────────────────────────
  y = drawSection(page, 'CONTACT DETAILS', y - 10, bold, reg, NAVY, width, [
    ['Parent/Guardian', player.parentName || 'Not provided'],
    ['Phone',           player.phone],
    ['Email',           player.email],
    ['Address',         player.address || 'Not provided'],
  ]);

  // ── Events ────────────────────────────────────────────────────────────────
  y = drawSectionHeader(page, 'REGISTERED EVENTS', y - 10, bold, NAVY, width);
  const events = Array.isArray(player.events) ? player.events : [];
  events.forEach(ev => {
    const name = typeof ev === 'string' ? ev : ev.name;
    page.drawText(`• ${name}`, { x: 50, y, size: 10, font: reg, color: BLACK });
    y -= 16;
  });

  // ── Payment box ───────────────────────────────────────────────────────────
  y -= 10;
  page.drawRectangle({ x: 40, y: y - 50, width: width - 80, height: 60, color: AMBER_BG, borderColor: AMBER_BOR, borderWidth: 1.5 });
  page.drawText('PAYMENT DETAILS', { x: 50, y: y - 8, size: 11, font: bold, color: NAVY });
  page.drawText(`Total Fee: Rs.${player.totalFee || 0}`, { x: 50, y: y - 24, size: 10, font: bold, color: BLACK });
  page.drawText('Mode: CASH   |   Status: PENDING', { x: 50, y: y - 38, size: 10, font: bold, color: rgb(0.6, 0.3, 0) });

  // ── Instructions ──────────────────────────────────────────────────────────
  y -= 70;
  drawSectionHeader(page, 'IMPORTANT INSTRUCTIONS', y, bold, NAVY, width);
  y -= 20;
  const instructions = [
    '1. Carry this admit card to the venue',
    '2. Pay registration fee in CASH to your Coach before the tournament',
    '3. Bring valid ID proof / birth certificate for age verification',
    '4. Report 30 minutes before your scheduled match',
    '5. Players must bring their own rackets',
    '6. Organizer\'s decision is final in all matters',
  ];
  instructions.forEach(line => {
    page.drawText(line, { x: 50, y, size: 9, font: reg, color: BLACK });
    y -= 14;
  });

  // ── Signature line ────────────────────────────────────────────────────────
  const sigY = 80;
  page.drawLine({ start: { x: 50, y: sigY }, end: { x: 220, y: sigY }, thickness: 0.8, color: NAVY });
  page.drawLine({ start: { x: width - 220, y: sigY }, end: { x: width - 50, y: sigY }, thickness: 0.8, color: NAVY });
  page.drawText('Player Signature', { x: 90, y: sigY - 14, size: 9, font: reg, color: GRAY });
  page.drawText('Organizer Signature', { x: width - 200, y: sigY - 14, size: 9, font: reg, color: GRAY });

  // ── Footer ────────────────────────────────────────────────────────────────
  page.drawText('Contact: 7052416803 | 9839174810 | 97953100021', { x: 50, y: 45, size: 8, font: reg, color: GRAY });
  page.drawText(`Generated: ${new Date().toLocaleDateString('en-IN')}`, { x: width - 160, y: 45, size: 8, font: reg, color: GRAY });

  return doc.save();
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function drawPhotoPlaceholder(page, x, y, w, h, font) {
  page.drawText('Passport', { x: x + 18, y: y + h / 2 + 8, size: 9, font, color: rgb(0.5, 0.5, 0.5) });
  page.drawText('Photo', { x: x + 26, y: y + h / 2 - 6, size: 9, font, color: rgb(0.5, 0.5, 0.5) });
}

function drawSectionHeader(page, title, y, bold, color, width) {
  page.drawText(title, { x: 40, y, size: 12, font: bold, color });
  y -= 6;
  page.drawLine({ start: { x: 40, y }, end: { x: width - 40, y }, thickness: 0.8, color });
  return y - 14;
}

function drawSection(page, title, y, bold, reg, color, width, rows, maxX = null) {
  y = drawSectionHeader(page, title, y, bold, color, width);
  rows.forEach(([label, value, highlight]) => {
    page.drawText(`${label}:`, { x: 50, y, size: 10, font: bold, color: BLACK });
    page.drawText(String(value ?? ''), {
      x: 200, y,
      size: highlight ? 13 : 10,
      font: highlight ? bold : reg,
      color: highlight ? YELLOW : BLACK,
      maxWidth: maxX ? maxX - 200 : undefined,
    });
    y -= 18;
  });
  return y;
}

function formatDate(str) {
  if (!str) return 'Not provided';
  return new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
