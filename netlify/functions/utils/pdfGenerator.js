/**
 * PDF Generator Utility
 * Generates professional admit cards using pdf-lib
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Generate Admit Card PDF
 * @param {Object} playerData - Player information
 * @returns {Promise<Uint8Array>} PDF bytes
 */
export async function generateAdmitCardPDF(playerData) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add a page (A4 size)
    const page = pdfDoc.addPage([595, 842]); // A4 in points
    const { width, height } = page.getSize();
    
    // Load fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Colors
    const navy = rgb(0.043, 0.114, 0.227); // #0B1D3A
    const yellow = rgb(0.961, 0.722, 0); // #F5B800
    const black = rgb(0, 0, 0);
    const gray = rgb(0.4, 0.4, 0.4);
    
    // Draw border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: navy,
      borderWidth: 3,
    });
    
    // Draw header background
    page.drawRectangle({
      x: 30,
      y: height - 150,
      width: width - 60,
      height: 120,
      color: navy,
    });
    
    // Tournament Title
    page.drawText('SMAASH BADMINTON TOURNAMENT 2026', {
      x: 60,
      y: height - 80,
      size: 24,
      font: boldFont,
      color: yellow,
    });
    
    // Subtitle
    page.drawText('PLAYER REGISTRATION / ADMIT CARD', {
      x: 60,
      y: height - 110,
      size: 14,
      font: regularFont,
      color: rgb(1, 1, 1),
    });
    
    // Tournament Details
    const detailsY = height - 140;
    page.drawText('Dates: April 24-26, 2026', {
      x: 60,
      y: detailsY,
      size: 10,
      font: regularFont,
      color: rgb(1, 1, 1),
    });
    
    page.drawText('Venue: Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow', {
      x: 60,
      y: detailsY - 15,
      size: 10,
      font: regularFont,
      color: rgb(1, 1, 1),
    });
    
    // Player Details Section
    let currentY = height - 200;
    
    // Section: Player Details
    page.drawText('PLAYER DETAILS', {
      x: 60,
      y: currentY,
      size: 14,
      font: boldFont,
      color: navy,
    });
    
    currentY -= 10;
    page.drawLine({
      start: { x: 60, y: currentY },
      end: { x: width - 60, y: currentY },
      thickness: 1,
      color: navy,
    });
    
    currentY -= 30;
    
    // Player ID (Large and prominent)
    page.drawText('Player ID:', {
      x: 60,
      y: currentY,
      size: 12,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.playerId, {
      x: 200,
      y: currentY,
      size: 16,
      font: boldFont,
      color: yellow,
    });
    
    currentY -= 25;
    
    // Player Name
    page.drawText('Player Name:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.name, {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 20;
    
    // Date of Birth
    page.drawText('Date of Birth:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(formatDate(playerData.dob), {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 20;
    
    // Gender
    page.drawText('Gender:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.gender, {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 20;
    
    // Category
    page.drawText('Category:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.category, {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 40;
    
    // Contact Details Section
    page.drawText('CONTACT DETAILS', {
      x: 60,
      y: currentY,
      size: 14,
      font: boldFont,
      color: navy,
    });
    
    currentY -= 10;
    page.drawLine({
      start: { x: 60, y: currentY },
      end: { x: width - 60, y: currentY },
      thickness: 1,
      color: navy,
    });
    
    currentY -= 30;
    
    // Parent Name
    page.drawText('Parent/Guardian:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.parentName || 'Not provided', {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 20;
    
    // Phone
    page.drawText('Phone:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.phone, {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 20;
    
    // Email
    page.drawText('Email:', {
      x: 60,
      y: currentY,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(playerData.email, {
      x: 200,
      y: currentY,
      size: 11,
      font: regularFont,
      color: black,
    });
    
    currentY -= 40;
    
    // Events Section
    page.drawText('REGISTERED EVENTS', {
      x: 60,
      y: currentY,
      size: 14,
      font: boldFont,
      color: navy,
    });
    
    currentY -= 10;
    page.drawLine({
      start: { x: 60, y: currentY },
      end: { x: width - 60, y: currentY },
      thickness: 1,
      color: navy,
    });
    
    currentY -= 25;
    
    // List events
    if (playerData.events && playerData.events.length > 0) {
      playerData.events.forEach((event) => {
        const eventName = typeof event === 'string' ? event : event.name;
        page.drawText(`• ${eventName}`, {
          x: 70,
          y: currentY,
          size: 10,
          font: regularFont,
          color: black,
        });
        currentY -= 18;
      });
    }
    
    currentY -= 20;
    
    // Payment Section
    page.drawText('PAYMENT DETAILS', {
      x: 60,
      y: currentY,
      size: 14,
      font: boldFont,
      color: navy,
    });
    
    currentY -= 10;
    page.drawLine({
      start: { x: 60, y: currentY },
      end: { x: width - 60, y: currentY },
      thickness: 1,
      color: navy,
    });
    
    currentY -= 30;
    
    // Draw yellow box for payment info
    page.drawRectangle({
      x: 55,
      y: currentY - 35,
      width: width - 110,
      height: 50,
      color: rgb(1, 0.95, 0.78), // Light yellow
      borderColor: rgb(0.96, 0.72, 0),
      borderWidth: 2,
    });
    
    page.drawText('Total Fee:', {
      x: 65,
      y: currentY - 10,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText(`₹${playerData.totalFee || 0}`, {
      x: 200,
      y: currentY - 10,
      size: 11,
      font: boldFont,
      color: black,
    });
    
    page.drawText('Payment Mode: CASH', {
      x: 65,
      y: currentY - 28,
      size: 10,
      font: boldFont,
      color: rgb(0.6, 0.3, 0),
    });
    
    page.drawText('Status: PENDING', {
      x: 300,
      y: currentY - 28,
      size: 10,
      font: boldFont,
      color: rgb(0.8, 0.4, 0),
    });
    
    currentY -= 70;
    
    // Important Instructions
    page.drawText('IMPORTANT INSTRUCTIONS', {
      x: 60,
      y: currentY,
      size: 14,
      font: boldFont,
      color: navy,
    });
    
    currentY -= 10;
    page.drawLine({
      start: { x: 60, y: currentY },
      end: { x: width - 60, y: currentY },
      thickness: 1,
      color: navy,
    });
    
    currentY -= 25;
    
    const instructions = [
      '1. Carry this admit card to the venue',
      '2. Pay registration fee in CASH to your Coach',
      '3. Bring valid ID proof for verification',
      '4. Report 30 minutes before your match time',
      '5. Players must bring their own rackets',
      '6. Follow fair play rules at all times',
    ];
    
    instructions.forEach(instruction => {
      page.drawText(instruction, {
        x: 70,
        y: currentY,
        size: 9,
        font: regularFont,
        color: black,
      });
      currentY -= 15;
    });
    
    // Footer
    page.drawText('For queries, contact: 7052416803 | 9839174810 | 97953100021', {
      x: 60,
      y: 60,
      size: 9,
      font: regularFont,
      color: gray,
    });
    
    page.drawText(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, {
      x: 60,
      y: 45,
      size: 8,
      font: regularFont,
      color: gray,
    });
    
    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();
    
    return pdfBytes;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
  if (!dateString) return 'Not provided';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
