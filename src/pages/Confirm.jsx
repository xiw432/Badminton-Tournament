// Confirm page - Confirmation page with QR code

import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar.jsx";

import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { Card, SectionH } from "../components/FormFields.jsx";
import { WHATSAPP_GROUP_LINK } from "../components/WhatsAppButton.jsx";

// Design tokens
const N = "#0B1D3A"; // navy
const ND = "#070F1F"; // navy dark
const NL = "#142850"; // navy light
const Y = "#F5B800"; // yellow
const YP = "#FFFBEB"; // yellow pale
const W = "#FFFFFF";
const OW = "#F8FAFC"; // off-white
const TM = "#475569"; // text-mid
const BD = "#E2E8F0"; // border
const SU = "#059669"; // success
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * Confirm page component - displays registration confirmation with QR code
 * @param {object} props
 * @param {object} props.reg - Registration data
 * @param {string} props.reg.playerId - Player ID
 * @param {string} props.reg.name - Player name
 * @param {string} props.reg.category - Age category
 * @param {string} props.reg.gender - Player gender
 * @param {string} props.reg.parentName - Parent/Guardian name
 * @param {string} props.reg.phone - Phone number
 * @param {string} props.reg.email - Email address
 * @param {array} props.reg.events - Selected events
 * @param {number} props.reg.totalFee - Total fee paid
 * @param {function} props.go - Navigation function
 */
export default function Confirm({ reg, go }) {
  const [countdown, setCountdown] = useState(5);
  const [autoOpenEnabled, setAutoOpenEnabled] = useState(true);

  // Auto-open WhatsApp after 5 seconds (optional feature)
  useEffect(() => {
    if (!autoOpenEnabled) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-open WhatsApp in new tab
          window.open(WHATSAPP_GROUP_LINK, '_blank', 'noopener,noreferrer');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoOpenEnabled]);

  return (
    <div style={{ background: OW, minHeight: "100vh", paddingTop: 70 }}>
      <Navbar page="confirm" go={go} />
      
      {/* Success Banner */}
      <div style={{ background: `linear-gradient(155deg, ${ND}, ${NL})`, padding: "68px 24px 56px", textAlign: "center" }}>
        <div style={{ width: 76, height: 76, background: SU, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: 36, boxShadow: "0 0 0 12px rgba(5,150,105,0.2)" }}>✓</div>
        <div style={{ fontFamily: FD, fontSize: "clamp(36px, 6vw, 62px)", color: Y, letterSpacing: "0.04em", lineHeight: 1 }}>REGISTRATION CONFIRMED!</div>
        <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 14, fontFamily: FB, fontSize: 16 }}>Welcome to SMAASH Badminton Tournament 2026, {reg.name.split(" ")[0]}!</p>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 60px" }}>

        {/* Player ID Card */}
        <div style={{ background: N, borderRadius: 20, padding: "40px 36px", textAlign: "center", position: "relative", overflow: "hidden", marginBottom: 24, boxShadow: "0 16px 48px rgba(11,29,58,0.18)" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(245,184,0,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(245,184,0,0.04)", pointerEvents: "none" }} />
          <div style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", marginBottom: 14, textTransform: "uppercase" }}>Your Player ID</div>
          <div style={{ fontFamily: FD, fontSize: "clamp(40px, 7vw, 68px)", color: Y, letterSpacing: "0.08em", lineHeight: 1, marginBottom: 22 }}>{reg.playerId}</div>
          <div style={{ fontFamily: FB, fontSize: 22, color: W, fontWeight: 700, marginBottom: 14 }}>{reg.name}</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ background: "rgba(245,184,0,0.14)", color: Y, border: "1px solid rgba(245,184,0,0.3)", padding: "5px 18px", borderRadius: 20, fontSize: 14, fontFamily: FB, fontWeight: 600 }}>{reg.category}</span>
            <span style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", padding: "5px 18px", borderRadius: 20, fontSize: 14, fontFamily: FB }}>{reg.gender}</span>
          </div>
        </div>

        {/* WhatsApp Group CTA - VERY IMPORTANT */}
        <Card mb={24} mt={24}>
          <div style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            borderRadius: 16,
            padding: "32px 28px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Decorative elements */}
            <div style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              pointerEvents: "none"
            }} />
            
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
            <h3 style={{
              fontFamily: FD,
              fontSize: "32px",
              color: W,
              marginBottom: "12px",
              letterSpacing: "0.04em",
              lineHeight: 1
            }}>
              REGISTRATION SUCCESSFUL!
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "16px",
              marginBottom: "24px",
              fontFamily: FB,
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "0 auto 24px"
            }}>
              🎊 Welcome to SMAASH 2026, {reg.name.split(" ")[0]}! 
              <br />
              Join our WhatsApp group now to receive match schedules, live updates, and important announcements.
            </p>
            <WhatsAppButton 
              variant="cta" 
              text="Join WhatsApp Group for Updates →"
              style={{
                backgroundColor: W,
                color: "#25D366",
                fontSize: 17,
                padding: "16px 36px"
              }}
            />
            {countdown > 0 && autoOpenEnabled && (
              <p style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "14px",
                marginTop: "16px",
                fontFamily: FB,
                fontWeight: 600
              }}>
                ⏱️ Auto-opening in {countdown} seconds...{' '}
                <button
                  onClick={() => setAutoOpenEnabled(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: W,
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontFamily: FB,
                    fontSize: 14
                  }}
                >
                  Cancel
                </button>
              </p>
            )}
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "13px",
              marginTop: countdown > 0 && autoOpenEnabled ? "8px" : "16px",
              fontFamily: FB
            }}>
              ✓ Get match schedules · ✓ Live tournament updates · ✓ Connect with players
            </p>
          </div>
        </Card>

        {/* Cash Payment Instruction - VERY IMPORTANT */}
        <Card mb={24} mt={24}>
          <div style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            border: "3px dashed #F59E0B",
            borderRadius: 16,
            padding: "28px 32px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💰</div>
            <h3 style={{
              fontFamily: FD,
              fontSize: 28,
              color: "#92400E",
              marginBottom: 12,
              letterSpacing: "0.04em"
            }}>
              PAYMENT STATUS: ⏳ PENDING (CASH)
            </h3>
            <div style={{
              background: "#FFFFFF",
              border: "2px solid #F59E0B",
              borderRadius: 12,
              padding: "20px 24px",
              marginBottom: 16
            }}>
              <p style={{
                fontFamily: FB,
                fontSize: 16,
                color: "#78350F",
                margin: 0,
                lineHeight: 1.8,
                fontWeight: 700
              }}>
                ⚠️ Please pay the registration fee of <span style={{ fontSize: 20, color: "#92400E" }}>₹{reg.totalFee.toLocaleString()}</span> in CASH to your respected Coach.
                <br />
                <strong>Entry will be allowed only after payment verification.</strong>
              </p>
            </div>
            <div style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 16
            }}>
              <div style={{
                background: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid #F59E0B"
              }}>
                <span style={{ fontFamily: FB, fontSize: 14, color: "#92400E", fontWeight: 600 }}>
                  💵 Cash Payment Required
                </span>
              </div>
              <div style={{
                background: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid #F59E0B"
              }}>
                <span style={{ fontFamily: FB, fontSize: 14, color: "#92400E", fontWeight: 600 }}>
                  👨‍🏫 Pay to Your Coach
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Admit Card Section */}
        <Card mb={24} mt={24}>
          <SectionH>ADMIT CARD</SectionH>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🎫</div>
            <h3 style={{
              fontFamily: FB,
              fontSize: "18px",
              color: N,
              marginBottom: "10px",
              fontWeight: "700"
            }}>
              Your Admit Card is Ready!
            </h3>
            <p style={{
              color: TM,
              fontSize: "14px",
              marginBottom: "20px",
              fontFamily: FB,
              lineHeight: 1.6
            }}>
              Download your official tournament admit card with your photo and all event details.
              You'll need this for venue entry.
            </p>
            <button
              onClick={() => go("admit-card", reg.playerId)}
              style={{
                background: Y,
                color: N,
                border: "none",
                cursor: "pointer",
                padding: "14px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontFamily: FB,
                fontWeight: "700",
                boxShadow: "0 4px 12px rgba(245,184,0,0.3)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(245,184,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(245,184,0,0.3)";
              }}
            >
              🎫 View Admit Card
            </button>
          </div>
        </Card>

        {/* Venue Info */}
        <Card mb={0} mt={24}>
          <SectionH>VENUE &amp; IMPORTANT INFO</SectionH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { icon: "📍", title: "Venue", desc: "Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow" },
              { icon: "📅", title: "Dates", desc: "April 22nd – 24th, 2026" },
              { icon: "📞", title: "Contact", desc: "7052416803 · 9839174810 · 97953100021" },
              { icon: "⏰", title: "Reporting", desc: "Arrive 30 minutes before your scheduled match" },
              { icon: "🪪", title: "ID Required", desc: "Carry original age proof / birth certificate" },
              { icon: "🏸", title: "Equipment", desc: "Players must bring their own rackets" },
            ].map(item => (
              <div key={item.title} style={{ padding: "18px 16px", background: OW, borderRadius: 10, border: `1px solid ${BD}` }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: FB, fontWeight: 700, color: N, fontSize: 13, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: TM, fontSize: 12, lineHeight: 1.55, fontFamily: FB }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button onClick={() => go("home")} style={{ background: N, color: Y, border: "none", cursor: "pointer", padding: "14px 44px", borderRadius: 10, fontSize: 16, fontFamily: FB, fontWeight: 700 }}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
