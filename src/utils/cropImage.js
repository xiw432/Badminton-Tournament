/**
 * Crop Image Utility
 * Creates a cropped image blob from an image and crop area
 * Uses HTML5 Canvas API
 */

/**
 * Create image element from URL
 * @param {string} url - Image URL
 * @returns {Promise<HTMLImageElement>}
 */
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

/**
 * Get radians from degrees
 * @param {number} degreeValue - Degrees
 * @returns {number} Radians
 */
function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Rotate size dimensions
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {number} rotation - Rotation in degrees
 * @returns {object} Rotated dimensions
 */
function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * Crop image and return as blob
 * @param {string} imageSrc - Source image URL
 * @param {object} pixelCrop - Crop area in pixels {x, y, width, height}
 * @param {number} rotation - Rotation in degrees (default: 0)
 * @param {boolean} flip - Flip horizontally (default: false)
 * @returns {Promise<Blob>} Cropped image blob
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const rotRad = getRadianAngle(rotation);

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw rotated image
  ctx.drawImage(image, 0, 0);

  // Create a new canvas for the cropped image
  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    throw new Error('Could not get cropped canvas context');
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return as blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg', 0.95); // High quality JPEG
  });
}

/**
 * Convert blob to file
 * @param {Blob} blob - Image blob
 * @param {string} fileName - File name
 * @returns {File} File object
 */
export function blobToFile(blob, fileName) {
  return new File([blob], fileName, { type: blob.type });
}

/**
 * Read file as data URL
 * @param {File} file - File object
 * @returns {Promise<string>} Data URL
 */
export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
