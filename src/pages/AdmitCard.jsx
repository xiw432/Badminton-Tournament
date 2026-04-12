import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { generateAdmitCardPDF, printAdmitCard, generatePDFFilename } from '../utils/pdf';
import { sendRegistrationConfirmationEmail, validateEmailConfig } from '../utils/email';
import '../styles/print.css';

/**
 * AdmitCard Component - JEE/CUET Style Professional Admit Card
 * Features:
 * - A4 print layout with professional design
 * - Player photo integration
 * - PDF download and print functionality
 * - Email delivery capability
 * - Access control (payment verification)
 */
export default function AdmitCard({ playerId, go }) {
  const admitCardRef = useRef(null);
  
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  // Theme colors
  const N = "#0B1D3A";   // navy
  const Y = "#F5B800";   // yellow
  const W = "#FFFFFF";
  const TM = "#475569";  // text-mid
  const BD = "#E2E8F0";  // border

  const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
  const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

  /**
   * Fetch player data from Supabase
   */
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .eq('player_id', playerId)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError('Player not found. Please check your Player ID.');
          return;
        }

        // Check payment status
        if (data.payment_status !== 'paid' && data.payment_status !== 'confirmed') {
          setError('Access denied. Payment not confirmed. Please complete payment first.');
          return;
        }

        setPlayerData(data);
      } catch (error) {
        console.error('Error fetching player data:', error);
        setError('Failed to load admit card. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerData();
    } else {
      setError('Invalid Player ID.');
      setLoading(false);
    }
  }, [playerId]);

  /**
   * Handle PDF download
   */
  const handleDownloadPDF = async () => {
    try {
      setGenerating(true);
      const filename = generatePDFFilename(playerData);
      await generateAdmitCardPDF(admitCardRef.current, filename);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  /**
   * Handle print
   */
  const handlePrint = () => {
    printAdmitCard();
  };

  /**
   * Handle email sending
   */
  const handleSendEmail = async () => {
    if (!validateEmailConfig()) {
      alert('Email service not configured. Please contact administrator.');
      return;
    }

    try {
      setEmailSending(true);
      await sendRegistrationConfirmationEmail(playerData, admitCardRef.current);
      alert('Admit card sent to your email successfully!');
    } catch (error) {
      console.error('Email sending error:', error);
      alert('Failed to send email. Please try again or contact support.');
    } finally {
      setEmailSending(false);
    }
  };

  /**
   * Format events for display
   */
  const formatEvents = (events) => {
    if (!events || events.length === 0) return {};
    
    // Handle both TEXT[] and JSONB formats
    let eventList = [];
    
    if (Array.isArray(events)) {
      // If it's already an array (TEXT[] from database)
      eventList = events.map(eventName => ({
        name: eventName,
        category: eventName.includes('U-9') ? 'U-9' : 
                 eventName.includes('U-11') ? 'U-11' :
                 eventName.includes('U-13') ? 'U-13' :
                 eventName.includes('U-15') ? 'U-15' : 'General',
        fee: 600 // Default fee
      }));
    } else if (typeof events === 'object' && events.length !== undefined) {
      // If it's JSONB format
      eventList = events;
    }
    
    // Group events by category
    const grouped = {};
    eventList.forEach(event => {
      const category = event.category || 'General';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(event);
    });

    return grouped;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: `4px solid ${BD}`,
            borderTop: `4px solid ${Y}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ fontFamily: FB, color: TM }}>Loading admit card...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: W,
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
          <h2 style={{
            fontFamily: FD,
            fontSize: '24px',
            color: N,
            marginBottom: '10px'
          }}>
            Access Denied
          </h2>
          <p style={{
            fontFamily: FB,
            color: TM,
            marginBottom: '20px',
            lineHeight: 1.6
          }}>
            {error}
          </p>
          <button
            onClick={() => go && go('home')}
            style={{
              backgroundColor: Y,
              color: N,
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontFamily: FB,
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const groupedEvents = formatEvents(playerData.events || playerData.selectedEvents);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
      {/* Action Buttons */}
      <div className="print-button-container no-print">
        <button
          onClick={handlePrint}
          className="print-button"
          style={{
            backgroundColor: N,
            color: Y,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontFamily: FB,
            fontWeight: '600',
            cursor: 'pointer',
            margin: '0 10px'
          }}
        >
          🖨️ Print Admit Card
        </button>
        
        <button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="download-button"
          style={{
            backgroundColor: Y,
            color: N,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontFamily: FB,
            fontWeight: '600',
            cursor: generating ? 'not-allowed' : 'pointer',
            margin: '0 10px',
            opacity: generating ? 0.7 : 1
          }}
        >
          {generating ? '📄 Generating...' : '📄 Download PDF'}
        </button>

        {validateEmailConfig() && (
          <button
            onClick={handleSendEmail}
            disabled={emailSending}
            style={{
              backgroundColor: '#10B981',
              color: W,
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontFamily: FB,
              fontWeight: '600',
              cursor: emailSending ? 'not-allowed' : 'pointer',
              margin: '0 10px',
              opacity: emailSending ? 0.7 : 1
            }}
          >
            {emailSending ? '📧 Sending...' : '📧 Email Admit Card'}
          </button>
        )}
      </div>

      {/* Admit Card */}
      <div 
        ref={admitCardRef}
        className="admit-card admit-card-preview"
        style={{
          maxWidth: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          backgroundColor: W,
          border: `3px solid ${N}`,
          fontFamily: 'Times New Roman, serif'
        }}
      >
        {/* Header */}
        <div 
          className="admit-card-header"
          style={{
            textAlign: 'center',
            borderBottom: `2px solid ${N}`,
            padding: '15px',
            backgroundColor: W
          }}
        >
          <h1 
            className="admit-card-title"
            style={{
              fontFamily: FD,
              fontSize: '28px',
              fontWeight: 'bold',
              color: N,
              margin: '0 0 5px 0',
              letterSpacing: '2px'
            }}
          >
            SMAASH BADMINTON TOURNAMENT 2026
          </h1>
          <h2 
            className="admit-card-subtitle"
            style={{
              fontSize: '18px',
              color: TM,
              margin: '0 0 10px 0',
              fontWeight: 'normal'
            }}
          >
            PLAYER REGISTRATION / ADMIT CARD
          </h2>
          <div style={{ fontSize: '14px', color: TM, lineHeight: 1.4 }}>
            <strong>Dates:</strong> April 24–26, 2026<br />
            <strong>Venue:</strong> Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '20px', position: 'relative' }}>
          {/* Photo Section */}
          <div 
            className="photo-container"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '120px',
              height: '150px',
              border: `2px solid ${N}`,
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            {playerData.photo_url ? (
              <img
                src={playerData.photo_url}
                alt="Player Photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                crossOrigin="anonymous"
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <div style={{ fontSize: '24px', marginBottom: '5px' }}>📷</div>
                <div style={{ fontSize: '10px', color: TM }}>
                  Passport Size<br />Photograph
                </div>
              </div>
            )}
          </div>

          {/* Player Details Section */}
          <div 
            className="admit-card-section"
            style={{
              border: `1px solid ${N}`,
              marginBottom: '15px',
              padding: '15px',
              marginRight: '140px' // Space for photo
            }}
          >
            <h3 
              className="section-title"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                margin: '0 0 10px 0',
                textTransform: 'uppercase',
                borderBottom: `1px solid ${N}`,
                paddingBottom: '5px'
              }}
            >
              Player Details
            </h3>
            
            <div className="details-grid" style={{ display: 'table', width: '100%' }}>
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', width: '40%', padding: '3px 0' }}>
                  Player Name:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.player_name || playerData.name}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Player ID:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.player_id}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Date of Birth:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {formatDate(playerData.dob)}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Gender:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.gender}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div 
            className="admit-card-section"
            style={{
              border: `1px solid ${N}`,
              marginBottom: '15px',
              padding: '15px'
            }}
          >
            <h3 className="section-title" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              borderBottom: `1px solid ${N}`,
              paddingBottom: '5px'
            }}>
              Contact Details
            </h3>
            
            <div className="details-grid" style={{ display: 'table', width: '100%' }}>
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', width: '30%', padding: '3px 0' }}>
                  Parent Name:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.parent_name || 'Not provided'}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Phone:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.phone}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Email:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.email}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Address:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  {playerData.address || 'Not provided'}
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div 
            className="admit-card-section"
            style={{
              border: `1px solid ${N}`,
              marginBottom: '15px',
              padding: '15px'
            }}
          >
            <h3 className="section-title" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              borderBottom: `1px solid ${N}`,
              paddingBottom: '5px'
            }}>
              Registered Events
            </h3>
            
            <div className="events-list">
              {Object.keys(groupedEvents).length > 0 ? (
                Object.entries(groupedEvents).map(([category, events]) => (
                  <div key={category} style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '5px' }}>
                      {category}:
                    </div>
                    {events.map((event, index) => (
                      <div key={index} className="event-item" style={{
                        padding: '2px 0 2px 15px',
                        fontSize: '12px'
                      }}>
                        • {event.name} (₹{event.fee})
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '12px', color: TM }}>No events registered</div>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div 
            className="admit-card-section"
            style={{
              border: `1px solid ${N}`,
              marginBottom: '15px',
              padding: '15px'
            }}
          >
            <h3 className="section-title" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              borderBottom: `1px solid ${N}`,
              paddingBottom: '5px'
            }}>
              Payment Details
            </h3>
            
            <div className="details-grid" style={{ display: 'table', width: '100%' }}>
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', width: '30%', padding: '3px 0' }}>
                  Total Fee Paid:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0' }}>
                  ₹{playerData.totalFee || playerData.total_fee}
                </div>
              </div>
              
              <div className="detail-row" style={{ display: 'table-row' }}>
                <div className="detail-label" style={{ display: 'table-cell', fontWeight: 'bold', padding: '3px 0' }}>
                  Payment Status:
                </div>
                <div className="detail-value" style={{ display: 'table-cell', padding: '3px 0', color: '#10B981', fontWeight: 'bold' }}>
                  ✅ Confirmed
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div 
            className="admit-card-section"
            style={{
              border: `1px solid ${N}`,
              marginBottom: '20px',
              padding: '15px'
            }}
          >
            <h3 className="section-title" style={{
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              borderBottom: `1px solid ${N}`,
              paddingBottom: '5px'
            }}>
              Important Instructions
            </h3>
            
            <ol className="instructions-list" style={{
              fontSize: '12px',
              lineHeight: 1.4,
              paddingLeft: '20px',
              margin: '0'
            }}>
              <li>Carry this admit card to the venue</li>
              <li>Bring valid ID proof for verification</li>
              <li>Report 30 minutes before your match time</li>
              <li>Follow fair play rules at all times</li>
              <li>Organizer's decision is final</li>
              <li>Keep this document safe</li>
            </ol>
          </div>

          {/* Signature Section */}
          <div 
            className="signature-section"
            style={{
              display: 'table',
              width: '100%',
              marginTop: '30px'
            }}
          >
            <div 
              className="signature-box"
              style={{
                display: 'table-cell',
                width: '50%',
                textAlign: 'center',
                padding: '20px 10px 10px',
                borderTop: `1px solid ${N}`
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Player Signature
              </div>
            </div>
            <div 
              className="signature-box"
              style={{
                display: 'table-cell',
                width: '50%',
                textAlign: 'center',
                padding: '20px 10px 10px',
                borderTop: `1px solid ${N}`
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                Organizer Signature
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}