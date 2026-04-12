import Navbar from '../components/Navbar.jsx';
import PosterSection from '../components/PosterSection.jsx';

/**
 * Home page - Landing page with tournament information
 * Sections:
 * - Hero with tournament branding
 * - Categories & Fees table
 * - Prizes & Benefits grid
 * - Tournament Schedule
 * - Contact Information
 * - Integrated PosterSection component
 */
export default function Home({ go }) {
  // Theme colors
  const N = "#0B1D3A";   // navy
  const ND = "#070F1F";  // navy dark
  const NL = "#142850";  // navy light
  const Y = "#F5B800";   // yellow
  const YP = "#FFFBEB";  // yellow pale
  const W = "#FFFFFF";
  const OW = "#F8FAFC";  // off-white
  const TM = "#475569";  // text-mid
  const TL = "#94A3B8";  // text-light
  const BD = "#E2E8F0";  // border

  const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
  const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

  // Poster data for carousel
  const posters = [
    {
      image: "/poster.svg", // SVG poster matching the tournament design
      pdf: "/poster.pdf",   // Place poster.pdf in public folder for download
      alt: "SMAASH Badminton Tournament 2026 Poster"
    }
  ];

  return (
    <>
      <Navbar page="home" go={go} />

      {/* ── HERO ── */}
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(155deg, ${ND} 0%, ${NL} 60%, #0E2244 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "100px 24px 60px",
      }}>
        {/* Grid background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(245,184,0,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,0,0.028) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
          pointerEvents: "none"
        }} />
        
        {/* Glow orbs */}
        <div style={{
          position: "absolute",
          top: "12%",
          right: "6%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,184,0,0.1) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: "12%",
          left: "4%",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 1 }}>
          {/* Chips */}
          <div style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 30,
            flexWrap: "wrap"
          }}>
            {["🏸 24–26 April 2026", "📍 Aishbagh, Lucknow", "👦👧 U-9 to U-15"].map(t => (
              <span key={t} style={{
                background: "rgba(245,184,0,0.1)",
                color: Y,
                border: "1px solid rgba(245,184,0,0.25)",
                padding: "5px 18px",
                borderRadius: 20,
                fontSize: 13,
                fontFamily: FB,
                fontWeight: 500
              }}>{t}</span>
            ))}
          </div>

          {/* Hero Title */}
          <h1 style={{
            fontFamily: FD,
            fontSize: "clamp(84px, 14vw, 160px)",
            color: Y,
            lineHeight: 0.85,
            letterSpacing: "0.04em",
            margin: "0 0 10px",
            textShadow: "0 0 120px rgba(245,184,0,0.22)"
          }}>SMASH</h1>
          <h2 style={{
            fontFamily: FD,
            fontSize: "clamp(24px, 4.5vw, 54px)",
            color: W,
            letterSpacing: "0.1em",
            margin: "0 0 18px",
            fontWeight: 400
          }}>YOUR WAY TO VICTORY</h2>

          <div style={{
            display: "inline-block",
            background: Y,
            color: N,
            padding: "11px 40px",
            borderRadius: 6,
            fontFamily: FD,
            fontSize: "clamp(17px, 2.8vw, 30px)",
            letterSpacing: "0.09em",
            marginBottom: 38
          }}>
            BADMINTON TOURNAMENT
          </div>

          <p style={{
            color: "rgba(255,255,255,0.58)",
            fontSize: 15,
            marginBottom: 48,
            lineHeight: 1.9,
            fontFamily: FB
          }}>
            📍 Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow<br />
            📅 April 24th – 26th, 2026
          </p>

          {/* CTA */}
          <div style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button onClick={() => go("register")} style={{
              background: Y,
              color: N,
              border: "none",
              cursor: "pointer",
              padding: "15px 40px",
              borderRadius: 9,
              fontSize: 16,
              fontFamily: FB,
              fontWeight: 700,
              letterSpacing: "0.03em",
              boxShadow: "0 8px 32px rgba(245,184,0,0.3)"
            }}>
              Register Now →
            </button>
            <button onClick={() => go("rules")} style={{
              background: "transparent",
              color: W,
              border: "2px solid rgba(255,255,255,0.28)",
              cursor: "pointer",
              padding: "15px 36px",
              borderRadius: 9,
              fontSize: 16,
              fontFamily: FB,
              fontWeight: 600
            }}>
              View Rules
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 70,
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            flexWrap: "wrap"
          }}>
            {[["4", "Categories"], ["5", "Events"], ["3", "Days"], ["₹600", "Starting Fee"]].map(([n, l], i) => (
              <div key={l} style={{
                textAlign: "center",
                padding: "0 28px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none"
              }}>
                <div style={{
                  fontFamily: FD,
                  fontSize: 46,
                  color: Y,
                  lineHeight: 1
                }}>{n}</div>
                <div style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 12,
                  marginTop: 6,
                  fontFamily: FB,
                  letterSpacing: "0.05em"
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── POSTER SECTION ── */}
      <PosterSection posters={posters} />

      {/* ── CATEGORIES & FEES TABLE ── */}
      <div style={{ background: OW, padding: "88px 24px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontFamily: FD,
              fontSize: 52,
              color: N,
              letterSpacing: "0.04em",
              lineHeight: 1
            }}>CATEGORIES &amp; FEES</div>
            <p style={{
              color: TM,
              marginTop: 10,
              fontFamily: FB,
              fontSize: 16
            }}>Registration fees per player per event</p>
          </div>
          <div style={{
            background: W,
            borderRadius: 18,
            overflow: "hidden",
            border: `1px solid ${BD}`,
            boxShadow: "0 10px 40px rgba(11,29,58,0.08)"
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: FB,
                minWidth: 640
              }}>
                <thead>
                  <tr style={{ background: N }}>
                    {["Category", "Boys Singles", "Boys Doubles", "Girls Singles", "Girls Doubles", "Mixed Doubles"].map(h => (
                      <th key={h} style={{
                        padding: "18px 14px",
                        color: Y,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                        textAlign: "center"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[["U-9", false], ["U-11", false], ["U-13", true], ["U-15", true]].map(([cat, hasMix], i) => (
                    <tr key={cat} style={{
                      background: i % 2 === 0 ? W : OW,
                      borderBottom: `1px solid ${BD}`
                    }}>
                      <td style={{ padding: "16px 14px", textAlign: "center" }}>
                        <span style={{
                          background: YP,
                          color: N,
                          padding: "5px 18px",
                          borderRadius: 20,
                          fontSize: 14,
                          fontWeight: 700,
                          border: "1px solid rgba(245,184,0,0.32)",
                          fontFamily: FB
                        }}>{cat}</span>
                      </td>
                      {["₹600", "₹1,000", "₹600", "₹1,000"].map((v, j) => (
                        <td key={j} style={{
                          padding: "16px 14px",
                          textAlign: "center",
                          fontWeight: 600,
                          color: N,
                          fontSize: 15
                        }}>{v}</td>
                      ))}
                      <td style={{ padding: "16px 14px", textAlign: "center" }}>
                        {hasMix
                          ? <span style={{ fontWeight: 700, color: N, fontSize: 15 }}>₹1,000</span>
                          : <span style={{
                            color: TL,
                            fontFamily: FB,
                            fontStyle: "italic",
                            fontSize: 14
                          }}>N/A</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{
            textAlign: "center",
            color: TM,
            marginTop: 18,
            fontSize: 13,
            fontFamily: FB
          }}>
            * Doubles fees are per-player. Mixed Doubles available only for U-13 &amp; U-15 categories.
          </p>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <div style={{ background: N, padding: "88px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontFamily: FD,
              fontSize: 52,
              color: Y,
              letterSpacing: "0.04em"
            }}>PRIZES &amp; BENEFITS</div>
            <p style={{
              color: "rgba(255,255,255,0.5)",
              marginTop: 10,
              fontFamily: FB,
              fontSize: 16
            }}>Every participant takes something home</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 22
          }}>
            {[
              { icon: "🏆", title: "TROPHY", desc: "Champions receive a prestigious trophy recognizing their outstanding achievement in the tournament." },
              { icon: "📜", title: "CERTIFICATES", desc: "All players and participants receive official certificates of participation." },
              { icon: "🥤", title: "REFRESHMENTS", desc: "Complimentary refreshments provided exclusively for registered players during the event." },
            ].map(b => (
              <div key={b.title} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,184,0,0.14)",
                borderRadius: 16,
                padding: "36px 26px",
                textAlign: "center",
                transition: "all 0.2s"
              }}>
                <div style={{ fontSize: 44, marginBottom: 18 }}>{b.icon}</div>
                <div style={{
                  fontFamily: FD,
                  fontSize: 28,
                  color: Y,
                  letterSpacing: "0.05em",
                  marginBottom: 12
                }}>{b.title}</div>
                <p style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  lineHeight: 1.75,
                  margin: 0,
                  fontFamily: FB
                }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCHEDULE ── */}
      <div style={{ background: OW, padding: "88px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{
              fontFamily: FD,
              fontSize: 52,
              color: N,
              letterSpacing: "0.04em"
            }}>TOURNAMENT SCHEDULE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { day: "D1", date: "April 24, 2026", title: "Day 1 — Opening", events: "U-9 & U-11 Boys and Girls Singles" },
              { day: "D2", date: "April 25, 2026", title: "Day 2 — Semis", events: "U-13 & U-15 Boys and Girls Singles" },
              { day: "D3", date: "April 26, 2026", title: "Day 3 — Finals", events: "All Doubles, Mixed Doubles & Grand Finals" },
            ].map(d => (
              <div key={d.day} style={{
                background: W,
                borderRadius: 14,
                border: `1px solid ${BD}`,
                padding: "22px 26px",
                display: "flex",
                alignItems: "center",
                gap: 22,
                boxShadow: "0 2px 12px rgba(11,29,58,0.04)"
              }}>
                <div style={{
                  background: N,
                  color: Y,
                  width: 58,
                  height: 58,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FD,
                  fontSize: 24,
                  letterSpacing: "0.04em",
                  flexShrink: 0
                }}>{d.day}</div>
                <div>
                  <div style={{
                    fontFamily: FB,
                    fontWeight: 700,
                    color: N,
                    fontSize: 16
                  }}>{d.title}</div>
                  <div style={{
                    color: TM,
                    fontSize: 13,
                    marginTop: 4,
                    fontFamily: FB
                  }}>{d.date} · {d.events}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div style={{ background: N, padding: "88px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: FD,
            fontSize: 52,
            color: Y,
            letterSpacing: "0.04em",
            marginBottom: 10
          }}>CONTACT US</div>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            marginBottom: 44,
            fontFamily: FB,
            fontSize: 16
          }}>Have questions? Reach out to our organizers</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
            marginBottom: 22
          }}>
            {["7052416803", "9839174810", "97953100021"].map(n => (
              <a key={n} href={`tel:${n}`} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(245,184,0,0.18)",
                borderRadius: 12,
                padding: "22px 14px",
                textDecoration: "none",
                display: "block"
              }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>📞</div>
                <div style={{
                  fontFamily: FB,
                  fontWeight: 600,
                  color: W,
                  fontSize: 14
                }}>{n}</div>
              </a>
            ))}
          </div>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(245,184,0,0.14)",
            borderRadius: 12,
            padding: "24px 20px",
            marginBottom: 44
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📍</div>
            <div style={{
              fontFamily: FB,
              fontWeight: 700,
              color: W,
              fontSize: 16
            }}>Gopi Nath Laxman Das Rastogi Inter College</div>
            <div style={{
              color: "rgba(255,255,255,0.45)",
              marginTop: 6,
              fontSize: 14,
              fontFamily: FB
            }}>Aishbagh, Lucknow, Uttar Pradesh</div>
          </div>
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
            letterSpacing: "0.03em"
          }}>
            Register Now →
          </button>
        </div>
      </div>
    </>
  );
}
