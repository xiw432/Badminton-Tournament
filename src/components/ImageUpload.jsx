import { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

/**
 * ImageUpload Component - Handles player photo upload to Supabase Storage
 * Features:
 * - Drag and drop upload
 * - File validation (JPG/PNG, max 2MB)
 * - Image preview
 * - Upload progress
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

  // Theme colors
  const N = "#0B1D3A";   // navy
  const Y = "#F5B800";   // yellow
  const YP = "#FFFBEB";  // yellow pale
  const W = "#FFFFFF";
  const TM = "#475569";  // text-mid
  const BD = "#E2E8F0";  // border

  const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

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
   * Upload file to Supabase Storage
   */
  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setError('');

      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Generate filename
      const fileExt = file.name.split('.').pop();
      const fileName = `players/${playerId}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('player-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true // Replace existing file
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('player-photos')
        .getPublicUrl(fileName);

      // Update preview
      setPreview(publicUrl);

      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(publicUrl);
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
  const handleFileSelect = (files) => {
    const file = files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload file
      uploadFile(file);
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
                height: '150px',
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
        • Passport size photograph recommended<br />
        • Clear, recent photo with plain background<br />
        • Face should be clearly visible
      </div>

      {/* CSS for loading animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}