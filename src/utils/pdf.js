import html2pdf from 'html2pdf.js';

/**
 * Generate PDF from admit card HTML element
 * @param {HTMLElement} element - The admit card element to convert
 * @param {string} filename - The filename for the PDF
 * @returns {Promise} Promise that resolves when PDF is generated
 */
export const generateAdmitCardPDF = async (element, filename = 'admit-card.pdf') => {
  const options = {
    margin: [0.5, 0.5, 0.5, 0.5], // inches: top, left, bottom, right
    filename: filename,
    image: { 
      type: 'jpeg', 
      quality: 0.98 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      letterRendering: true,
      foreignObjectRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    }
  };

  try {
    // Ensure images are loaded before generating PDF
    await waitForImages(element);
    
    // Generate and download PDF
    return html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Generate PDF blob without downloading (for email attachment)
 * @param {HTMLElement} element - The admit card element to convert
 * @returns {Promise<Blob>} Promise that resolves to PDF blob
 */
export const generateAdmitCardBlob = async (element) => {
  const options = {
    margin: [0.5, 0.5, 0.5, 0.5],
    image: { 
      type: 'jpeg', 
      quality: 0.98 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  try {
    await waitForImages(element);
    
    // Generate PDF blob
    const pdf = html2pdf().set(options).from(element);
    return await pdf.outputPdf('blob');
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw new Error('Failed to generate PDF blob.');
  }
};

/**
 * Wait for all images in element to load
 * @param {HTMLElement} element - Element containing images
 * @returns {Promise} Promise that resolves when all images are loaded
 */
const waitForImages = (element) => {
  return new Promise((resolve) => {
    const images = element.querySelectorAll('img');
    
    if (images.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.onload = checkComplete;
        img.onerror = checkComplete; // Continue even if image fails to load
      }
    });
  });
};

/**
 * Print the admit card
 */
export const printAdmitCard = () => {
  window.print();
};

/**
 * Format player data for PDF filename
 * @param {Object} playerData - Player registration data
 * @returns {string} Formatted filename
 */
export const generatePDFFilename = (playerData) => {
  const playerName = playerData.player_name || playerData.name || 'Player';
  const playerId = playerData.player_id || 'Unknown';
  
  // Clean filename (remove special characters)
  const cleanName = playerName.replace(/[^a-zA-Z0-9]/g, '_');
  
  return `SMAASH_AdmitCard_${cleanName}_${playerId}.pdf`;
};