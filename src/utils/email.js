import emailjs from '@emailjs/browser';
import { generateAdmitCardBlob } from './pdf.js';
import { EMAIL_CONFIG } from '../config/email.js';

// EmailJS configuration
const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAIL_CONFIG;

/**
 * Initialize EmailJS
 */
export const initializeEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};

/**
 * Send registration confirmation email with admit card PDF
 * @param {Object} playerData - Player registration data
 * @param {HTMLElement} admitCardElement - Admit card HTML element for PDF generation
 * @returns {Promise} Promise that resolves when email is sent
 */
export const sendRegistrationConfirmationEmail = async (playerData, admitCardElement) => {
  try {
    // Generate PDF blob for attachment
    const pdfBlob = await generateAdmitCardBlob(admitCardElement);
    
    // Convert blob to base64 for EmailJS
    const pdfBase64 = await blobToBase64(pdfBlob);
    
    // Prepare email template parameters
    const templateParams = {
      to_name: playerData.player_name || playerData.name,
      to_email: playerData.email,
      player_id: playerData.player_id,
      player_name: playerData.player_name || playerData.name,
      tournament_name: 'SMAASH Badminton Tournament 2026',
      tournament_dates: 'April 24-26, 2026',
      venue: 'Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow',
      events: formatEventsForEmail(playerData.events || playerData.selectedEvents),
      total_fee: `₹${playerData.totalFee || playerData.total_fee}`,
      payment_status: 'Confirmed',
      instructions: getEmailInstructions(),
      admit_card_pdf: pdfBase64,
      pdf_filename: `SMAASH_AdmitCard_${playerData.player_id}.pdf`
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send confirmation email. Please contact support.');
  }
};

/**
 * Send simple confirmation email without PDF (fallback)
 * @param {Object} playerData - Player registration data
 * @returns {Promise} Promise that resolves when email is sent
 */
export const sendSimpleConfirmationEmail = async (playerData) => {
  try {
    const templateParams = {
      to_name: playerData.player_name || playerData.name,
      to_email: playerData.email,
      player_id: playerData.player_id,
      player_name: playerData.player_name || playerData.name,
      tournament_name: 'SMAASH Badminton Tournament 2026',
      tournament_dates: 'April 24-26, 2026',
      venue: 'Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow',
      events: formatEventsForEmail(playerData.events || playerData.selectedEvents),
      total_fee: `₹${playerData.totalFee || playerData.total_fee}`,
      payment_status: 'Confirmed',
      instructions: getEmailInstructions(),
      admit_card_link: `${window.location.origin}/admit-card/${playerData.player_id}`
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Simple email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending simple email:', error);
    throw new Error('Failed to send confirmation email.');
  }
};

/**
 * Convert blob to base64 string
 * @param {Blob} blob - Blob to convert
 * @returns {Promise<string>} Base64 string
 */
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; // Remove data:application/pdf;base64, prefix
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Format events array for email display
 * @param {Array} events - Array of event objects
 * @returns {string} Formatted events string
 */
const formatEventsForEmail = (events) => {
  if (!events || !Array.isArray(events)) {
    return 'No events selected';
  }

  return events.map(event => {
    if (typeof event === 'string') {
      return event;
    }
    return `${event.category} ${event.name} (₹${event.fee})`;
  }).join(', ');
};

/**
 * Get tournament instructions for email
 * @returns {string} Instructions text
 */
const getEmailInstructions = () => {
  return `
Important Instructions:
1. Carry this admit card to the venue
2. Bring valid ID proof for verification
3. Report 30 minutes before your match time
4. Follow fair play rules at all times
5. Organizer's decision is final
6. Keep this document safe

Contact Numbers:
- 7052416803
- 9839174810
- 97953100021

Venue: Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
Dates: April 24-26, 2026

Best of luck for the tournament!
SMAASH Tournament Organizing Committee
  `;
};

/**
 * Validate email configuration
 * @returns {boolean} True if configuration is valid
 */
export const validateEmailConfig = () => {
  return SERVICE_ID !== 'your_service_id' && 
         TEMPLATE_ID !== 'your_template_id' && 
         PUBLIC_KEY !== 'your_public_key';
};

/**
 * Get email configuration status
 * @returns {Object} Configuration status
 */
export const getEmailConfigStatus = () => {
  return {
    configured: validateEmailConfig(),
    serviceId: SERVICE_ID,
    templateId: TEMPLATE_ID,
    publicKey: PUBLIC_KEY ? 'Set' : 'Not set'
  };
};