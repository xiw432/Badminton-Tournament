import { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from '../supabaseClient';
import { getCroppedImg, readFile } from '../utils/cropImage';

/**
 * ImageUpload Component - Professional photo upload with crop functionality
 * Features:
 * - Drag and drop upload
 * - File validation (JPG/PNG, max 2MB)
 * - Image cropping with 3:4 aspect ratio (passport size)
 * - Zoom and drag to adjust
 * - Image preview
 * - Upload to Supabase Storage
 * - Error handling
 */
export default function ImageUpload({ 
  playerId, 
  onUploadSuccess, 
  onUploadError, 
  currentPhotoUrl = null,
  required = true 
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentPhotoUrl);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Crop modal state
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  // Theme colors
  const N = "#0B1D3A";   // navy
  const Y = "#F5B800";   // yellow
  const YP = "#FFFBEB";  // yellow pale
  const W = "#FFFFFF";
  const TM = "#475569";  // text-mid
  const BD = "#E2E8F0";  // border

  const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";
  const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";

  /**
   * Validate uploaded file
   */
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      return 'Please upload a JPG or PNG image only.';
    }

    if (file.size > maxSize) {
      return 'Image size must be less than 2MB.';
    }

    return null;
  };

  /**
   * Handle crop complete
   */
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  /**
   * Save cropped image
   */
  const handleSaveCrop = async () => {
    try {
      setCropping(true);
      setError('');

      // Get cropped image blob
      const croppedBlob = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
        0
      );

      // Upload to Supabase
      await uploadToSupabase(croppedBlob);

      // Close modal
      setShowCropModal(false);
      setImageToCrop(null);

    } catch (error) {
      console.error('Crop error:', error);
      setError('Failed to crop image. Please try again.');
    } finally {
      setCropping(false);
    }
  };

  /**
   * Upload blob to Supabase Storage
   */
  const uploadToSupabase = async (blob) => {
    try {
      setUploading(true);
      setError('');

      // Generate filename
      const fileName = `players/${playerId}.jpg`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('player-photos')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true, // Replace existing file
          contentType: 'image/jpeg'
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('player-photos')
        .getPublicUrl(fileName);

      // Add timestamp to force refresh
      const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;

      // Update preview
      setPreview(urlWithTimestamp);

      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(urlWithTimestamp);
      }

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.message || 'Failed to upload image. Please try again.';
      setError(errorMessage);
      
      if (onUploadError) {
        onUploadError(errorMessage);
      }
    } finally {
      setUploading(false);
    }
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = async (files) => {
    const file = files[0];
    if (!file) return;

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Read file as data URL
      const imageDataUrl = await readFile(file);
      
      // Open crop modal
      setImageToCrop(imageDataUrl);
      setShowCropModal(true);
      setError('');
    } catch (error) {
      console.error('File read error:', error);
      setError('Failed to read image file.');
    }
  };

  /**
   * Handle drag events
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /**
   * Handle drop event
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  /**
   * Handle click to select file
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handle file input change
   */
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files);
    }
  };

  /**
   * Handle cancel crop
   */
  const handleCancelCrop = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Label */}
      <label style={{
        display: 'block',
        fontFamily: FB,
        fontSize: '14px',
        fontWeight: '600',
        color: N,
        marginBottom: '8px'
      }}>
        Player Photo {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>

      {/* Upload Area */}
      <div
        style={{
          border: `2px dashed ${dragActive ? Y : BD}`,
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: dragActive ? YP : W,
          cursor: uploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!uploading ? handleClick : undefined}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          disabled={uploading}
        />

        {/* Preview or Upload UI */}
        {preview ? (
          <div style={{ position: 'relative' }}>
            <img
              src={preview}
              alt="Player photo preview"
              style={{
                width: '120px',
                height: '160px',
                objectFit: 'cover',
                border: `2px solid ${N}`,
                borderRadius: '8px',
                margin: '0 auto 10px'
              }}
            />
            <p style={{
              fontFamily: FB,
              fontSize: '14px',
              color: TM,
              margin: '10px 0 0 0'
            }}>
              {uploading ? 'Uploading...' : 'Click or drag to change photo'}
            </p>
          </div>
        ) : (
          <div>
            <div style={{
              fontSize: '48px',
              marginBottom: '10px',
              opacity: uploading ? 0.5 : 1
            }}>
              📷
            </div>
            <p style={{
              fontFamily: FB,
              fontSize: '16px',
              fontWeight: '600',
              color: N,
              margin: '0 0 5px 0'
            }}>
              {uploading ? 'Uploading...' : 'Upload Player Photo'}
            </p>
            <p style={{
              fontFamily: FB,
              fontSize: '14px',
              color: TM,
              margin: '0'
            }}>
              Drag and drop or click to select<br />
              JPG or PNG, max 2MB
            </p>
          </div>
        )}

        {/* Loading overlay */}
        {uploading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: `4px solid ${BD}`,
              borderTop: `4px solid ${Y}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          marginTop: '8px',
          padding: '8px 12px',
          backgroundColor: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: '6px',
          color: '#DC2626',
          fontSize: '14px',
          fontFamily: FB
        }}>
          {error}
        </div>
      )}

      {/* Requirements */}
      <div style={{
        marginTop: '8px',
        fontSize: '12px',
        color: TM,
        fontFamily: FB
      }}>
        • Passport size photograph (3:4 ratio)<br />
        • Clear, recent photo with plain background<br />
        • Face should be clearly visible
      </div>

      {/* Crop Modal */}
      {showCropModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: W,
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${BD}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontFamily: FD,
                fontSize: '24px',
                color: N,
                margin: 0,
                letterSpacing: '0.04em'
              }}>
                CROP PHOTO
              </h3>
              <button
                onClick={handleCancelCrop}
                disabled={cropping}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '28px',
                  cursor: cropping ? 'not-allowed' : 'pointer',
                  color: TM,
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!cropping) e.target.style.backgroundColor = '#F1F5F9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {/* Crop Area */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              backgroundColor: '#000'
            }}>
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={3 / 4}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Controls */}
            <div style={{
              padding: '20px 24px'
            }}>
              {/* Zoom Slider */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontFamily: FB,
                  fontSize: '13px',
                  fontWeight: '600',
                  color: N,
                  marginBottom: '8px'
                }}>
                  Zoom: {zoom.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  disabled={cropping}
                  style={{
                    width: '100%',
                    cursor: cropping ? 'not-allowed' : 'pointer'
                  }}
                />
              </div>

              {/* Instructions */}
              <div style={{
                padding: '12px',
                backgroundColor: YP,
                border: `1px solid ${Y}`,
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <p style={{
                  fontFamily: FB,
                  fontSize: '13px',
                  color: N,
                  margin: 0,
                  lineHeight: 1.6
                }}>
                  💡 <strong>Tip:</strong> Drag the image to adjust position. Use the zoom slider to fit your photo perfectly.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleCancelCrop}
                  disabled={cropping}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: `2px solid ${BD}`,
                    backgroundColor: W,
                    color: N,
                    fontFamily: FB,
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: cropping ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: cropping ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!cropping) e.target.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = W;
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCrop}
                  disabled={cropping}
                  style={{
                    padding: '12px 32px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: cropping ? TM : Y,
                    color: N,
                    fontFamily: FB,
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: cropping ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: cropping ? 'none' : '0 4px 12px rgba(245, 184, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (!cropping) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(245, 184, 0, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!cropping) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(245, 184, 0, 0.3)';
                    }
                  }}
                >
                  {cropping ? 'Saving...' : 'Save Photo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}