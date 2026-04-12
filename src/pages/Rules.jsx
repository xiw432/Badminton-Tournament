import Navbar from '../components/Navbar.jsx';

/**
 * Rules page - Rules and regulations with age eligibility
 * Sections:
 * - Age Eligibility cards (U-9, U-11, U-13, U-15)
 * - Events list with restrictions
 * - General Rules numbered list
 */
export default function Rules({ go }) {
  // Theme colors
  const N = "#0B1D3A";   // navy
  const ND = "#070F1F";  // navy dark
  const Y = "#F5B800";   // yellow
  const YP = "#FFFBEB";  // yellow pale
  const W = "#FFFFFF";
  const OW = "#F8FAFC";  // off-white
  const TM = "#475569";  // text-mid
  const TL = "#94A3B8";  // text-light
  const BD = "#E2E8F0";  // border

  const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
  const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

  // Age eligibility data
  const ageCategories = [
    { category: "U-9", eligibility: "Born on or after January 1, 2018", color: "#10B981" },
    { category: "U-11", eligibility: "Born between January 1, 2016 and December 31, 2017", color: "#3B82F6" },
    { category: "U-13", eligibility: "Born between January 1, 2014 and December 31, 2015", color: "#8B5CF6" },
    { category: "U-15", eligibility: "Born between January 1, 2012 and December 31, 2013", color: "#EF4444" },
  ];

  // Events data
  const events = [
    { name: "Boys Singles", fee: "₹600", categories: "All categories", mandatory: true },
    { name: "Girls Singles", fee: "₹600", categories: "All categories", mandatory: true },
    { name: "Boys Doubles", fee: "₹1,000", categories: "All categories", mandatory: false },
    { name: "Girls Doubles", fee: "₹1,000", categories: "All categories", mandatory: false },
    { name: "Mixed Doubles", fee: "₹1,000", categories: "U-13 & U-15 only", mandatory: false },
  ];

  // General rules
  const generalRules = [
    "Players must register before the deadline. Late registrations will not be accepted.",
    "Age verification will be done using birth certificates or school ID cards at the venue.",
    "Singles events are mandatory and automatically assigned based on gender.",
    "Doubles and Mixed Doubles are optional events that can be selected during registration.",
    "Mixed Doubles is available only for U-13 and U-15 categories.",
    "Registration fees are non-refundable once payment is confirmed.",
    "Players must arrive 30 minutes before their scheduled match time.",
    "All matches will follow standard BWF (Badminton World Federation) rules.",
    "Players must bring their own rackets. Shuttlecocks will be provided by organizers.",
    "Proper sports attire and non-marking shoes are mandatory on court.",
    "Misbehavior or unsportsmanlike conduct may result in disqualification.",
    "Organizers' decisions on all matters will be final and binding.",
  ];

  return (
    <>
      <Navbar page="rules" go={go} />

      {/* ── HERO ── */}
      <div style={{
        minHeight: "60vh",
        background: `linear-gradient(155deg, ${ND} 0%, ${N} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px 60px",
      }}>
        {/* Grid background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(245,184,0,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,0,0.028) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
          pointerEvents: "none"
        }} />

        <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontFamily: FD,
            fontSize: "clamp(56px, 10vw, 96px)",
            color: Y,
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            margin: "0 0 20px",
            textShadow: "0 0 80px rgba(245,184,0,0.22)"
          }}>RULES & REGULATIONS</h1>
          <p style={{
            color: "rgba(255,255,255,0.58)",
            fontSize: 16,
            lineHeight: 1.8,
            fontFamily: FB,
            maxWidth: 600,
            margin: "0 auto"
          }}>
            Please read the tournament rules carefully before registering. All participants must comply with these regulations.
          </p>
        </div>
      </div>

      {/* ── AGE ELIGIBILITY ── */}
      <div style={{ background: OW, padding: "88px 24px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontFamily: FD,
              fontSize: 52,
              color: N,
              letterSpacing: "0.04em",
              lineHeight: 1
            }}>AGE ELIGIBILITY</div>
            <p style={{
              color: TM,
              marginTop: 10,
              fontFamily: FB,
              fontSize: 16
            }}>Categories are determined by date of birth</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20
          }}>
            {ageCategories.map(cat => (
              <div key={cat.category} style={{
                background: W,
                borderRadius: 16,
                border: `1px solid ${BD}`,
                padding: "32px 24px",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(11,29,58,0.06)",
                transition: "all 0.2s"
              }}>
                <div style={{
                  background: cat.color,
                  color: W,
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FD,
                  fontSize: 32,
                  letterSpacing: "0.04em",
                  margin: "0 auto 20px",
                  boxShadow: `0 8px 24px ${cat.color}40`
                }}>{cat.category}</div>
                <p style={{
                  color: TM,
                  fontSize: 14,
                  lineHeight: 1.7,
                  margin: 0,
                  fontFamily: FB,
                  fontWeight: 500
                }}>{cat.eligibility}</p>
              </div>
            ))}
          </div>
          <div style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 12,
            padding: "20px 24px",
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 16
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>⚠️</div>
            <p style={{
              color: "#991B1B",
              fontSize: 14,
              margin: 0,
              fontFamily: FB,
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              <strong>Important:</strong> Players born before January 1, 2012 are not eligible for this tournament. Age verification will be done at the venue using birth certificates or school ID cards.
            </p>
          </div>
        </div>
      </div>

      {/* ── EVENTS ── */}
      <div style={{ background: W, padding: "88px 24px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontFamily: FD,
              fontSize: 52,
              color: N,
              letterSpacing: "0.04em",
              lineHeight: 1
            }}>TOURNAMENT EVENTS</div>
            <p style={{
              color: TM,
              marginTop: 10,
              fontFamily: FB,
              fontSize: 16
            }}>Available competitions and registration fees</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {events.map(event => (
              <div key={event.name} style={{
                background: OW,
                borderRadius: 14,
                border: `1px solid ${BD}`,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
                boxShadow: "0 2px 8px rgba(11,29,58,0.04)"
              }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8
                  }}>
                    <div style={{
                      fontFamily: FB,
                      fontWeight: 700,
                      color: N,
                      fontSize: 18
                    }}>{event.name}</div>
                    {event.mandatory && (
                      <span style={{
                        background: Y,
                        color: N,
                        padding: "3px 12px",
                        borderRadius: 12,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        fontFamily: FB
                      }}>MANDATORY</span>
                    )}
                  </div>
                  <div style={{
                    color: TM,
                    fontSize: 14,
                    fontFamily: FB
                  }}>
                    {event.categories}
                    {event.name === "Mixed Doubles" && (
                      <span style={{
                        color: "#EF4444",
                        fontWeight: 600,
                        marginLeft: 8
                      }}>• Restricted</span>
                    )}
                  </div>
                </div>
                <div style={{
                  fontFamily: FD,
                  fontSize: 32,
                  color: N,
                  letterSpacing: "0.02em"
                }}>{event.fee}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: "rgba(245,184,0,0.08)",
            border: "1px solid rgba(245,184,0,0.25)",
            borderRadius: 12,
            padding: "20px 24px",
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 16
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
            <p style={{
              color: "#92400E",
              fontSize: 14,
              margin: 0,
              fontFamily: FB,
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              Singles events are automatically assigned based on your gender. Doubles events are optional and can be selected during registration. Mixed Doubles is available only for U-13 and U-15 categories.
            </p>
          </div>
        </div>
      </div>

      {/* ── GENERAL RULES ── */}
      <div style={{ background: OW, padding: "88px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontFamily: FD,
              fontSize: 52,
              color: N,
              letterSpacing: "0.04em",
              lineHeight: 1
            }}>GENERAL RULES</div>
            <p style={{
              color: TM,
              marginTop: 10,
              fontFamily: FB,
              fontSize: 16
            }}>Please read and follow these rules</p>
          </div>
          <div style={{
            background: W,
            borderRadius: 16,
            border: `1px solid ${BD}`,
            padding: "36px 32px",
            boxShadow: "0 4px 16px rgba(11,29,58,0.06)"
          }}>
            <ol style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              counterReset: "rule-counter"
            }}>
              {generalRules.map((rule, index) => (
                <li key={index} style={{
                  counterIncrement: "rule-counter",
                  display: "flex",
                  gap: 20,
                  marginBottom: index < generalRules.length - 1 ? 24 : 0,
                  paddingBottom: index < generalRules.length - 1 ? 24 : 0,
                  borderBottom: index < generalRules.length - 1 ? `1px solid ${BD}` : "none"
                }}>
                  <div style={{
                    background: N,
                    color: Y,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FB,
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0
                  }}>{index + 1}</div>
                  <p style={{
                    color: TM,
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: 0,
                    fontFamily: FB,
                    paddingTop: 6
                  }}>{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <div style={{ background: N, padding: "88px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: FD,
            fontSize: 52,
            color: Y,
            letterSpacing: "0.04em",
            marginBottom: 16
          }}>READY TO COMPETE?</div>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            marginBottom: 36,
            fontFamily: FB,
            fontSize: 16,
            lineHeight: 1.7
          }}>
            Register now and secure your spot in the tournament. Don't miss this opportunity to showcase your skills!
          </p>
          <button onClick={() => go("register")} style={{
            background: Y,
            color: N,
            border: "none",
            cursor: "pointer",
            padding: "15px 48px",
            borderRadius: 9,
            fontSize: 16,
            fontFamily: FB,
            fontWeight: 700,
            letterSpacing: "0.03em",
            boxShadow: "0 8px 32px rgba(245,184,0,0.3)"
          }}>
            Register Now →
          </button>
        </div>
      </div>
    </>
  );
}
