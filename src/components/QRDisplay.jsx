// QRDisplay component - QR code display with download functionality

import { generateQR } from "../utils/qr.js";

// Design tokens
const N = "#0B1D3A"; // navy
const Y = "#F5B800"; // yellow
const YP = "#FFFBEB"; // yellow pale
const W = "#FFFFFF";
const TM = "#475569"; // text-mid
const BD = "#E2E8F0"; // border
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * QRDisplay component - Displays QR code with registration summary
 * @param {object} registrationData - Player registration details
 * @param {string} registrationData.playerId - Unique player ID
 * @param {string} registrationData.name - Player's full name
 * @param {string} registrationData.category - Age category
 * @param {Array<object>} registrationData.events - Selected events
 * @param {number} registrationData.totalFee - Total registration fee
 */
export default function QRDisplay({ registrationData }) {
  const qrUrl = generateQR(registrationData);
  
  const handleDownload = () => {
    // Create a temporary link to download the QR code
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `${registrationData.playerId}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 30,
      maxWidth: 900,
      margin: "0 auto"
    }}>
      {/* QR Code Section */}
      <div style={{
        background: W,
        borderRadius: 18,
        border: `1px solid ${BD}`,
        padding: 40,
        boxShadow: "0 4px 20px rgba(11,29,58,0.05)",
        textAlign: "center"
      }}>
        <h3 style={{
          fontFamily: FD,
          fontSize: 28,
          color: N,
          letterSpacing: "0.04em",
          margin: "0 0 20px",
          borderBottom: `3px solid ${Y}`,
          paddingBottom: 10,
          display: "inline-block"
        }}>
          YOUR QR CODE
        </h3>
        
        <div style={{
          background: W,
          padding: 20,
          borderRadius: 12,
          display: "inline-block",
          border: `2px solid ${BD}`,
          marginTop: 20
        }}>
          <img 
            src={qrUrl} 
            alt="Registration QR Code"
            style={{
              display: "block",
              width: 300,
              height: 300
            }}
          />
        </div>
        
        <button
          onClick={handleDownload}
          style={{
            marginTop: 25,
            padding: "14px 32px",
            background: N,
            color: Y,
            border: "none",
            borderRadius: 10,
            fontFamily: FD,
            fontSize: 18,
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(11,29,58,0.2)"
          }}
          onMouseEnter={e => {
            e.target.style.background = Y;
            e.target.style.color = N;
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 16px rgba(245,184,0,0.3)";
          }}
          onMouseLeave={e => {
            e.target.style.background = N;
            e.target.style.color = Y;
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(11,29,58,0.2)";
          }}
        >
          DOWNLOAD QR CODE
        </button>
        
        <p style={{
          fontSize: 13,
          color: TM,
          fontFamily: FB,
          marginTop: 15,
          lineHeight: 1.6
        }}>
          Save this QR code for quick check-in at the tournament venue
        </p>
      </div>

      {/* Registration Summary Section */}
      <div style={{
        background: W,
        borderRadius: 18,
        border: `1px solid ${BD}`,
        padding: 40,
        boxShadow: "0 4px 20px rgba(11,29,58,0.05)"
      }}>
        <h3 style={{
          fontFamily: FD,
          fontSize: 28,
          color: N,
          letterSpacing: "0.04em",
          margin: "0 0 25px",
          borderBottom: `3px solid ${Y}`,
          paddingBottom: 10,
          display: "inline-block"
        }}>
          REGISTRATION SUMMARY
        </h3>
        
        <div style={{ marginTop: 25 }}>
          {/* Player ID */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
            borderBottom: `1px solid ${BD}`,
            alignItems: "center"
          }}>
            <span style={{
              fontFamily: FB,
              fontSize: 14,
              color: TM,
              fontWeight: 600
            }}>
              Player ID
            </span>
            <span style={{
              fontFamily: FD,
              fontSize: 20,
              color: N,
              letterSpacing: "0.03em"
            }}>
              {registrationData.playerId}
            </span>
          </div>

          {/* Name */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
            borderBottom: `1px solid ${BD}`,
            alignItems: "center"
          }}>
            <span style={{
              fontFamily: FB,
              fontSize: 14,
              color: TM,
              fontWeight: 600
            }}>
              Player Name
            </span>
            <span style={{
              fontFamily: FB,
              fontSize: 16,
              color: N,
              fontWeight: 700
            }}>
              {registrationData.name}
            </span>
          </div>

          {/* Category */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
            borderBottom: `1px solid ${BD}`,
            alignItems: "center"
          }}>
            <span style={{
              fontFamily: FB,
              fontSize: 14,
              color: TM,
              fontWeight: 600
            }}>
              Category
            </span>
            <span style={{
              background: YP,
              color: N,
              padding: "6px 16px",
              borderRadius: 20,
              fontFamily: FD,
              fontSize: 18,
              letterSpacing: "0.04em",
              border: `2px solid ${Y}`
            }}>
              {registrationData.category}
            </span>
          </div>

          {/* Events */}
          <div style={{
            padding: "15px 0",
            borderBottom: `1px solid ${BD}`
          }}>
            <span style={{
              fontFamily: FB,
              fontSize: 14,
              color: TM,
              fontWeight: 600,
              display: "block",
              marginBottom: 12
            }}>
              Selected Events
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(() => {
                // Group events by category
                const grouped = registrationData.events.reduce((acc, event) => {
                  const cat = event.category || 'Other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(event);
                  return acc;
                }, {});
                
                return Object.entries(grouped).map(([cat, catEvents]) => (
                  <div key={cat} style={{ marginBottom: 8 }}>
                    {/* Category badge */}
                    <div style={{
                      display: "inline-block",
                      background: N,
                      padding: "4px 12px",
                      borderRadius: 6,
                      marginBottom: 8
                    }}>
                      <span style={{
                        fontFamily: FD,
                        fontSize: 14,
                        color: Y,
                        letterSpacing: "0.04em"
                      }}>
                        {cat}
                      </span>
                    </div>
                    
                    {/* Events in this category */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingLeft: 8 }}>
                      {catEvents.map((event, idx) => (
                        <div key={idx} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 14px",
                          background: YP,
                          borderRadius: 8,
                          border: `1px solid ${Y}`
                        }}>
                          <span style={{
                            fontFamily: FB,
                            fontSize: 14,
                            color: N,
                            fontWeight: 600
                          }}>
                            {event.name}
                          </span>
                          <span style={{
                            fontFamily: FD,
                            fontSize: 18,
                            color: N,
                            letterSpacing: "0.03em"
                          }}>
                            ₹{event.fee.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Total Fee */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 0 0",
            alignItems: "center"
          }}>
            <span style={{
              fontFamily: FD,
              fontSize: 22,
              color: N,
              letterSpacing: "0.04em"
            }}>
              TOTAL FEE
            </span>
            <span style={{
              fontFamily: FD,
              fontSize: 32,
              color: N,
              letterSpacing: "0.03em",
              background: YP,
              padding: "8px 20px",
              borderRadius: 10,
              border: `2px solid ${Y}`
            }}>
              ₹{registrationData.totalFee.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
