// QR code generation utility

/**
 * Generates QR code URL for registration data using QR Server API
 * @param {object} registrationData - Player registration details
 * @param {string} registrationData.playerId - Unique player ID
 * @param {string} registrationData.name - Player's full name
 * @param {string} registrationData.category - Age category (U-9, U-11, U-13, U-15)
 * @param {Array<object>} registrationData.events - Selected events with name and fee
 * @param {number} registrationData.totalFee - Total registration fee
 * @returns {string} QR code image URL
 */
export function generateQR(registrationData) {
  const { playerId, name, category, events, totalFee } = registrationData;
  
  // Format event names for QR data
  const eventNames = events.map(e => e.name).join(', ');
  
  // Create QR data string with registration details
  const qrData = `Player ID: ${playerId}
Name: ${name}
Category: ${category}
Events: ${eventNames}
Total Fee: ₹${totalFee}`;
  
  // Encode QR data for URL
  const encodedData = encodeURIComponent(qrData);
  
  // QR Server API parameters
  // size: 300x300 pixels
  // bgcolor: FFFFFF (white)
  // color: 0B1D3A (navy blue)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&bgcolor=FFFFFF&color=0B1D3A&data=${encodedData}`;
  
  return qrUrl;
}
