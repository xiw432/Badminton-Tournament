import { useState, useEffect, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const N  = "#0B1D3A";  // navy
const ND = "#070F1F";  // navy dark
const NL = "#142850";  // navy light
const Y  = "#F5B800";  // yellow
const YD = "#C49500";  // yellow dark
const YP = "#FFFBEB";  // yellow pale
const W  = "#FFFFFF";
const OW = "#F8FAFC";  // off-white
const TM = "#475569";  // text-mid
const TL = "#94A3B8";  // text-light
const BD = "#E2E8F0";  // border
const ER = "#DC2626";  // error
const SU = "#059669";  // success

const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

// ─── UTILS ────────────────────────────────────────────────────────────────────
const getCat = (dob) => {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  if (d >= new Date("2018-01-01")) return "U-9";
  if (d >= new Date("2016-01-01")) return "U-11";
  if (d >= new Date("2014-01-01")) return "U-13";
  if (d >= new Date("2012-01-01")) return "U-15";
  return "INELIGIBLE";
};

const genId = () => `LKO2026-${Math.floor(1000 + Math.random() * 9000)}`;

const buildQR = (reg) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    `SMAASH Tournament 2026 | ID:${reg.playerId} | Player:${reg.name} | Cat:${reg.category} | Events:${reg.events.map(e=>e.name).join(",")} | Total:Rs${reg.totalFee}`
  )}&bgcolor=FFFFFF&color=0B1D3A&margin=12`;

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Nav({ page, go }) {
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const lnkStyle = (p) => ({
    background: "none", border: "none", cursor: "pointer",
    color: page === p ? Y : "rgba(255,255,255,0.78)",
    fontSize: 14, fontFamily: FB, fontWeight: 500, padding: "8px 16px",
    borderBottom: page === p ? `2px solid ${Y}` : "2px solid transparent",
    transition: "all 0.2s",
  });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: sc ? N : "rgba(7,15,31,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: sc ? `1px solid rgba(245,184,0,0.12)` : "none",
      transition: "all 0.35s", height: 70,
      display: "flex", alignItems: "center", padding: "0 20px",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: FD, fontSize: 26, color: Y, letterSpacing: "0.06em", lineHeight: 1 }}>SMAASH</span>
          <span style={{ background: "rgba(245,184,0,0.12)", color: Y, fontSize: 10, fontFamily: FB, fontWeight: 600, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.1em", border: "1px solid rgba(245,184,0,0.25)" }}>TOURNAMENT</span>
        </button>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button onClick={() => go("home")} style={lnkStyle("home")}>Home</button>
          <button onClick={() => go("rules")} style={lnkStyle("rules")}>Rules</button>
          <button onClick={() => go("register")} style={{
            background: Y, color: N, border: "none", cursor: "pointer",
            fontSize: 14, fontFamily: FB, fontWeight: 700, padding: "9px 22px",
            borderRadius: 8, marginLeft: 8, letterSpacing: "0.02em",
          }}>Register Now</button>
        </div>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function Home({ go }) {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(155deg, ${ND} 0%, ${NL} 60%, #0E2244 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "100px 24px 60px",
      }}>
        {/* Grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(245,184,0,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,0,0.028) 1px, transparent 1px)`, backgroundSize: "52px 52px", pointerEvents: "none" }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "12%", right: "6%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,184,0,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 1 }}>
          {/* Chips */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 30, flexWrap: "wrap" }}>
            {["🏸 17–19 April 2026", "📍 Aishbagh, Lucknow", "👦👧 U-9 to U-15"].map(t => (
              <span key={t} style={{ background: "rgba(245,184,0,0.1)", color: Y, border: "1px solid rgba(245,184,0,0.25)", padding: "5px 18px", borderRadius: 20, fontSize: 13, fontFamily: FB, fontWeight: 500 }}>{t}</span>
            ))}
          </div>

          {/* Hero Title */}
          <h1 style={{ fontFamily: FD, fontSize: "clamp(84px, 14vw, 160px)", color: Y, lineHeight: 0.85, letterSpacing: "0.04em", margin: "0 0 10px", textShadow: "0 0 120px rgba(245,184,0,0.22)" }}>SMASH</h1>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(24px, 4.5vw, 54px)", color: W, letterSpacing: "0.1em", margin: "0 0 18px", fontWeight: 400 }}>YOUR WAY TO VICTORY</h2>

          <div style={{ display: "inline-block", background: Y, color: N, padding: "11px 40px", borderRadius: 6, fontFamily: FD, fontSize: "clamp(17px, 2.8vw, 30px)", letterSpacing: "0.09em", marginBottom: 38 }}>
            BADMINTON TOURNAMENT
          </div>

          <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 15, marginBottom: 48, lineHeight: 1.9, fontFamily: FB }}>
            📍 Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow<br />
            📅 April 17th – 19th, 2026
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("register")} style={{ background: Y, color: N, border: "none", cursor: "pointer", padding: "15px 40px", borderRadius: 9, fontSize: 16, fontFamily: FB, fontWeight: 700, letterSpacing: "0.03em", boxShadow: "0 8px 32px rgba(245,184,0,0.3)" }}>
              Register Now →
            </button>
            <button onClick={() => go("rules")} style={{ background: "transparent", color: W, border: "2px solid rgba(255,255,255,0.28)", cursor: "pointer", padding: "15px 36px", borderRadius: 9, fontSize: 16, fontFamily: FB, fontWeight: 600 }}>
              View Rules
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 70, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
            {[["4","Categories"],["5","Events"],["3","Days"],["₹600","Starting Fee"]].map(([n,l], i) => (
              <div key={l} style={{ textAlign: "center", padding: "0 28px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ fontFamily: FD, fontSize: 46, color: Y, lineHeight: 1 }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 6, fontFamily: FB, letterSpacing: "0.05em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES & FEES TABLE ── */}
      <div style={{ background: OW, padding: "88px 24px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontFamily: FD, fontSize: 52, color: N, letterSpacing: "0.04em", lineHeight: 1 }}>CATEGORIES &amp; FEES</div>
            <p style={{ color: TM, marginTop: 10, fontFamily: FB, fontSize: 16 }}>Registration fees per player per event</p>
          </div>
          <div style={{ background: W, borderRadius: 18, overflow: "hidden", border: `1px solid ${BD}`, boxShadow: "0 10px 40px rgba(11,29,58,0.08)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FB, minWidth: 640 }}>
                <thead>
                  <tr style={{ background: N }}>
                    {["Category","Boys Singles","Boys Doubles","Girls Singles","Girls Doubles","Mixed Doubles"].map(h => (
                      <th key={h} style={{ padding: "18px 14px", color: Y, fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", textAlign: "center" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[["U-9",false],["U-11",false],["U-13",true],["U-15",true]].map(([cat, hasMix], i) => (
                    <tr key={cat} style={{ background: i % 2 === 0 ? W : OW, borderBottom: `1px solid ${BD}` }}>
                      <td style={{ padding: "16px 14px", textAlign: "center" }}>
                        <span style={{ background: YP, color: N, padding: "5px 18px", borderRadius: 20, fontSize: 14, fontWeight: 700, border: "1px solid rgba(245,184,0,0.32)", fontFamily: FB }}>{cat}</span>
                      </td>
                      {["₹600","₹1,000","₹600","₹1,000"].map((v,j) => (
                        <td key={j} style={{ padding: "16px 14px", textAlign: "center", fontWeight: 600, color: N, fontSize: 15 }}>{v}</td>
                      ))}
                      <td style={{ padding: "16px 14px", textAlign: "center" }}>
                        {hasMix
                          ? <span style={{ fontWeight: 700, color: N, fontSize: 15 }}>₹1,000</span>
                          : <span style={{ color: TL, fontFamily: FB, fontStyle: "italic", fontSize: 14 }}>N/A</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ textAlign: "center", color: TM, marginTop: 18, fontSize: 13, fontFamily: FB }}>
            * Doubles fees are per-player. Mixed Doubles available only for U-13 &amp; U-15 categories.
          </p>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <div style={{ background: N, padding: "88px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontFamily: FD, fontSize: 52, color: Y, letterSpacing: "0.04em" }}>PRIZES &amp; BENEFITS</div>
            <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 10, fontFamily: FB, fontSize: 16 }}>Every participant takes something home</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 22 }}>
            {[
              { icon: "🏆", title: "TROPHY", desc: "Champions receive a prestigious trophy recognizing their outstanding achievement in the tournament." },
              { icon: "📜", title: "CERTIFICATES", desc: "All players and participants receive official certificates of participation." },
              { icon: "🥤", title: "REFRESHMENTS", desc: "Complimentary refreshments provided exclusively for registered players during the event." },
            ].map(b => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,184,0,0.14)", borderRadius: 16, padding: "36px 26px", textAlign: "center", transition: "all 0.2s" }}>
                <div style={{ fontSize: 44, marginBottom: 18 }}>{b.icon}</div>
                <div style={{ fontFamily: FD, fontSize: 28, color: Y, letterSpacing: "0.05em", marginBottom: 12 }}>{b.title}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75, margin: 0, fontFamily: FB }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCHEDULE ── */}
      <div style={{ background: OW, padding: "88px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontFamily: FD, fontSize: 52, color: N, letterSpacing: "0.04em" }}>TOURNAMENT SCHEDULE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { day: "D1", date: "April 17, 2026", title: "Day 1 — Opening", events: "U-9 & U-11 Boys and Girls Singles" },
              { day: "D2", date: "April 18, 2026", title: "Day 2 — Semis", events: "U-13 & U-15 Boys and Girls Singles" },
              { day: "D3", date: "April 19, 2026", title: "Day 3 — Finals", events: "All Doubles, Mixed Doubles & Grand Finals" },
            ].map(d => (
              <div key={d.day} style={{ background: W, borderRadius: 14, border: `1px solid ${BD}`, padding: "22px 26px", display: "flex", alignItems: "center", gap: 22, boxShadow: "0 2px 12px rgba(11,29,58,0.04)" }}>
                <div style={{ background: N, color: Y, width: 58, height: 58, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FD, fontSize: 24, letterSpacing: "0.04em", flexShrink: 0 }}>{d.day}</div>
                <div>
                  <div style={{ fontFamily: FB, fontWeight: 700, color: N, fontSize: 16 }}>{d.title}</div>
                  <div style={{ color: TM, fontSize: 13, marginTop: 4, fontFamily: FB }}>{d.date} · {d.events}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div style={{ background: N, padding: "88px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FD, fontSize: 52, color: Y, letterSpacing: "0.04em", marginBottom: 10 }}>CONTACT US</div>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 44, fontFamily: FB, fontSize: 16 }}>Have questions? Reach out to our organizers</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 22 }}>
            {["7052416803","9839174810","97953100021"].map(n => (
              <a key={n} href={`tel:${n}`} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(245,184,0,0.18)", borderRadius: 12, padding: "22px 14px", textDecoration: "none", display: "block" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>📞</div>
                <div style={{ fontFamily: FB, fontWeight: 600, color: W, fontSize: 14 }}>{n}</div>
              </a>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,184,0,0.14)", borderRadius: 12, padding: "24px 20px", marginBottom: 44 }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>📍</div>
            <div style={{ fontFamily: FB, fontWeight: 700, color: W, fontSize: 16 }}>Gopi Nath Laxman Das Rastogi Inter College</div>
            <div style={{ color: "rgba(255,255,255,0.45)", marginTop: 6, fontSize: 14, fontFamily: FB }}>Aishbagh, Lucknow, Uttar Pradesh</div>
          </div>
          <button onClick={() => go("register")} style={{ background: Y, color: N, border: "none", cursor: "pointer", padding: "15px 48px", borderRadius: 9, fontSize: 16, fontFamily: FB, fontWeight: 700, letterSpacing: "0.03em" }}>
            Register Now →
          </button>
        </div>
      </div>
    </>
  );
}

// ─── RULES PAGE ──────────────────────────────────────────────────────────────
function Rules({ go }) {
  return (
    <div style={{ background: OW, minHeight: "100vh", paddingTop: 70 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(155deg, ${ND}, ${NL})`, padding: "64px 24px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FB, fontSize: 12, color: Y, letterSpacing: "0.18em", marginBottom: 14, textTransform: "uppercase" }}>SMAASH Badminton Tournament 2026</div>
          <div style={{ fontFamily: FD, fontSize: "clamp(48px, 8vw, 78px)", color: W, letterSpacing: "0.04em", lineHeight: 0.95, marginBottom: 6 }}>RULES &amp;</div>
          <div style={{ fontFamily: FD, fontSize: "clamp(48px, 8vw, 78px)", color: Y, letterSpacing: "0.04em", lineHeight: 0.95 }}>REGULATIONS</div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>
        {/* Age Eligibility */}
        <Card mb={24}>
          <SectionH>AGE ELIGIBILITY</SectionH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(158px, 1fr))", gap: 14, marginBottom: 18 }}>
            {[
              ["U-9",  "Born on or after\nJanuary 1, 2018"],
              ["U-11", "Born on or after\nJanuary 1, 2016"],
              ["U-13", "Born on or after\nJanuary 1, 2014"],
              ["U-15", "Born on or after\nJanuary 1, 2012"],
            ].map(([c, d]) => (
              <div key={c} style={{ background: YP, border: "1px solid rgba(245,184,0,0.35)", borderRadius: 12, padding: "22px 14px", textAlign: "center" }}>
                <div style={{ fontFamily: FD, fontSize: 40, color: N, letterSpacing: "0.04em" }}>{c}</div>
                <div style={{ color: TM, fontSize: 13, marginTop: 8, lineHeight: 1.65, fontFamily: FB, whiteSpace: "pre-line" }}>{d}</div>
              </div>
            ))}
          </div>
          <InfoBox color="#FEF3C7" border="#F59E0B" text="#78350F" icon="⚠️">
            Age is determined as of April 17, 2026 (tournament start date). Original birth certificate or government-issued ID is mandatory.
          </InfoBox>
        </Card>

        {/* Events */}
        <Card mb={24}>
          <SectionH>EVENTS</SectionH>
          {[
            { name: "Boys Singles",  cats: "All categories — U-9, U-11, U-13, U-15", fee: "₹600",       restricted: false },
            { name: "Girls Singles", cats: "All categories — U-9, U-11, U-13, U-15", fee: "₹600",       restricted: false },
            { name: "Boys Doubles",  cats: "All categories — U-9, U-11, U-13, U-15", fee: "₹1,000 / pair", restricted: false },
            { name: "Girls Doubles", cats: "All categories — U-9, U-11, U-13, U-15", fee: "₹1,000 / pair", restricted: false },
            { name: "Mixed Doubles", cats: "U-13 and U-15 only",                      fee: "₹1,000 / pair", restricted: true },
          ].map(e => (
            <div key={e.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderRadius: 10, border: `1px solid ${BD}`, marginBottom: 10, flexWrap: "wrap", gap: 10, background: e.restricted ? "#FFFBEB" : W }}>
              <div>
                <div style={{ fontWeight: 700, color: N, fontSize: 15, fontFamily: FB, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {e.name}
                  {e.restricted && <span style={{ background: "#F59E0B", color: W, fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 700, letterSpacing: "0.05em" }}>RESTRICTED</span>}
                </div>
                <div style={{ color: TM, fontSize: 13, marginTop: 4, fontFamily: FB }}>{e.cats}</div>
              </div>
              <span style={{ background: YP, color: N, padding: "5px 18px", borderRadius: 20, fontSize: 14, fontWeight: 700, border: "1px solid rgba(245,184,0,0.38)", fontFamily: FB }}>{e.fee}</span>
            </div>
          ))}
        </Card>

        {/* General Rules */}
        <Card mb={44}>
          <SectionH>GENERAL RULES</SectionH>
          {[
            "Valid government-issued ID proof is mandatory for all participants",
            "Age verification is strictly enforced — original birth certificates must be presented",
            "Players must report to the venue at least 30 minutes before their scheduled match",
            "Fair play is expected at all times — unsportsmanlike conduct leads to immediate disqualification",
            "The organizer's decision on all matters is final and binding without appeal",
            "Players are responsible for bringing their own rackets and equipment",
            "Entry fees are completely non-refundable once payment is confirmed",
            "Tournament draws are fixed by organizers — changes will not be entertained",
            "Players registering for doubles must confirm their partner before the deadline",
            "Mixed Doubles is exclusively available for U-13 and U-15 age categories",
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "13px 16px", background: i%2===0 ? OW : W, borderRadius: 9, alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ background: N, color: Y, minWidth: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: FB, marginTop: 1, flexShrink: 0 }}>{i+1}</span>
              <span style={{ color: N, fontSize: 14, lineHeight: 1.65, fontFamily: FB }}>{r}</span>
            </div>
          ))}
        </Card>

        <div style={{ textAlign: "center" }}>
          <button onClick={() => go("register")} style={{ background: Y, color: N, border: "none", cursor: "pointer", padding: "15px 44px", borderRadius: 9, fontSize: 16, fontFamily: FB, fontWeight: 700, boxShadow: "0 8px 28px rgba(245,184,0,0.3)" }}>
            Register Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER PAGE ───────────────────────────────────────────────────────────
function Register({ go, form, setF, errors, cat, hasMixed, events, totalFee, onSubmit }) {
  const gPfx = form.gender === "Male" ? "Boys" : form.gender === "Female" ? "Girls" : "";
  const eligible = cat && cat !== "INELIGIBLE";

  return (
    <div style={{ background: OW, minHeight: "100vh", paddingTop: 70 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(155deg, ${ND}, ${NL})`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FD, fontSize: "clamp(40px, 6vw, 64px)", color: Y, letterSpacing: "0.04em", lineHeight: 1 }}>PLAYER REGISTRATION</div>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 12, fontFamily: FB, fontSize: 16 }}>Fill in your details to register for the tournament</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "44px 24px 60px" }}>
        {/* ── Personal Information ── */}
        <Card mb={24}>
          <SectionH>PERSONAL INFORMATION</SectionH>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 22px" }}>

            {/* Full Name */}
            <Inp label="Full Name" name="name" value={form.name} onChange={setF} error={errors.name} placeholder="Enter player's full name" />

            {/* Date of Birth */}
            <div>
              <Inp label="Date of Birth" name="dob" type="date" value={form.dob} onChange={setF} error={errors.dob} min="2012-01-01" max="2018-12-31" />
              {/* Category auto-detect badge */}
              {form.dob && !errors.dob && (
                <div style={{ marginTop: -10, marginBottom: 18, padding: "11px 16px", borderRadius: 9, background: cat === "INELIGIBLE" ? "#FEE2E2" : "#ECFDF5", border: `1px solid ${cat === "INELIGIBLE" ? "#FECACA" : "#BBF7D0"}` }}>
                  {cat === "INELIGIBLE"
                    ? <span style={{ color: ER, fontSize: 13, fontWeight: 600, fontFamily: FB }}>❌ Not eligible — must be born on or after January 1, 2012</span>
                    : <span style={{ color: SU, fontSize: 13, fontWeight: 700, fontFamily: FB }}>✅ Your Category: <strong>{cat}</strong> (auto-assigned)</span>
                  }
                </div>
              )}
            </div>

            {/* Gender */}
            <Sel label="Gender" name="gender" value={form.gender} onChange={setF} options={["Male","Female"]} error={errors.gender} />

            {/* Parent Name */}
            <Inp label="Parent / Guardian Name" name="parentName" value={form.parentName} onChange={setF} error={errors.parentName} placeholder="Parent's full name" />

            {/* Address */}
            <div style={{ gridColumn: "span 2" }}>
              <Inp label="Full Address" name="address" value={form.address} onChange={setF} error={errors.address} placeholder="House, Street, City, PIN" />
            </div>

            {/* Email */}
            <Inp label="Email Address" name="email" type="email" value={form.email} onChange={setF} error={errors.email} placeholder="your@email.com" />

            {/* Phone */}
            <Inp label="Phone Number" name="phone" type="tel" value={form.phone} onChange={setF} error={errors.phone} placeholder="10-digit mobile number" />
          </div>
        </Card>

        {/* ── Events & Auto-Selection ── */}
        <Card mb={28}>
          <SectionH>EVENTS &amp; AUTO-SELECTION</SectionH>
          <InfoBox color="#EEF2FF" border="#818CF8" text="#3730A3" icon="📌">
            Events are automatically assigned based on your age &amp; gender. Singles is mandatory for all registered players. Additional events are optional.
          </InfoBox>

          {!form.dob || !form.gender ? (
            <div style={{ padding: "28px", background: OW, borderRadius: 12, textAlign: "center", color: TM, fontFamily: FB, fontSize: 14, marginTop: 16 }}>
              👆 Please fill in your Date of Birth and Gender above to see available events.
            </div>
          ) : cat === "INELIGIBLE" ? (
            <div style={{ padding: "24px", background: "#FEE2E2", borderRadius: 12, textAlign: "center", color: ER, fontFamily: FB, fontSize: 14, marginTop: 16, fontWeight: 600 }}>
              ❌ This player is not eligible for SMAASH Tournament 2026.
            </div>
          ) : (
            <div style={{ marginTop: 16 }}>
              {/* Singles — Mandatory */}
              <EventRow
                name={`${gPfx} Singles`}
                fee={600} checked={true} disabled={true}
                label="MANDATORY" labelBg="#D1FAE5" labelColor="#065F46"
                desc="Automatically included for every registered player"
              />

              {/* Doubles — Optional */}
              <EventRow
                name={`${gPfx} Doubles`}
                fee={1000} checked={form.wantsDoubles} disabled={false}
                label="OPTIONAL" labelBg="#DBEAFE" labelColor="#1E40AF"
                desc={`Available for ${cat} — tap to add to your registration`}
                onClick={() => setF("wantsDoubles", !form.wantsDoubles)}
              />

              {/* Mixed Doubles */}
              {hasMixed ? (
                <EventRow
                  name="Mixed Doubles"
                  fee={1000} checked={form.wantsMixed} disabled={false}
                  label="OPTIONAL" labelBg="#DBEAFE" labelColor="#1E40AF"
                  desc="Available for U-13 &amp; U-15 only — tap to add"
                  onClick={() => setF("wantsMixed", !form.wantsMixed)}
                />
              ) : (
                <EventRow
                  name="Mixed Doubles"
                  fee={1000} checked={false} disabled={true}
                  label="U-13 & U-15 ONLY" labelBg="#F3F4F6" labelColor={TM}
                  desc={`Not available for ${cat}`}
                  locked={true}
                />
              )}

              {/* Fee Total */}
              <div style={{ marginTop: 22, padding: "20px 22px", background: N, borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: FB }}>Total Registration Fee</div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: FB, marginTop: 4 }}>
                    {events.map(e => e.name).join(" + ")}
                  </div>
                </div>
                <div style={{ fontFamily: FD, fontSize: 40, color: Y, letterSpacing: "0.04em" }}>₹{totalFee}</div>
              </div>
            </div>
          )}
        </Card>

        {/* Submit */}
        <div style={{ textAlign: "center" }}>
          <button onClick={onSubmit} style={{ background: Y, color: N, border: "none", cursor: eligible ? "pointer" : "not-allowed", opacity: eligible ? 1 : 0.5, padding: "16px 60px", borderRadius: 10, fontSize: 17, fontFamily: FB, fontWeight: 700, letterSpacing: "0.03em", boxShadow: eligible ? "0 10px 30px rgba(245,184,0,0.32)" : "none" }}>
            Proceed to Payment →
          </button>
          <p style={{ color: TL, fontSize: 13, marginTop: 14, fontFamily: FB }}>By proceeding, you agree to all tournament rules and regulations.</p>
        </div>
      </div>
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────────────────────
function Payment({ go, form, events, totalFee, cat, onPay, loading }) {
  const [method, setMethod] = useState("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ num:"", exp:"", cvv:"", name:"" });
  const [bank, setBank] = useState("State Bank of India");

  return (
    <div style={{ background: OW, minHeight: "100vh", paddingTop: 70 }}>
      <div style={{ background: `linear-gradient(155deg, ${ND}, ${NL})`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FD, fontSize: "clamp(40px, 6vw, 64px)", color: Y, letterSpacing: "0.04em", lineHeight: 1 }}>PAYMENT</div>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 12, fontFamily: FB, fontSize: 16 }}>Complete your registration with secure payment</p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {/* Left — Summary */}
          <div>
            <Card mb={20}>
              <SectionH>REGISTRATION SUMMARY</SectionH>
              {[["Player",form.name],["Category",cat],["Gender",form.gender],["Phone",form.phone],["Email",form.email]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${BD}` }}>
                  <span style={{ color: TM, fontSize: 13, fontFamily: FB }}>{k}</span>
                  <span style={{ color: N, fontSize: 13, fontWeight: 600, fontFamily: FB, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </Card>

            <Card mb={0}>
              <SectionH>FEE BREAKDOWN</SectionH>
              {events.map(e => (
                <div key={e.name} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${BD}` }}>
                  <span style={{ color: N, fontSize: 14, fontFamily: FB }}>{e.name}</span>
                  <span style={{ color: N, fontWeight: 700, fontSize: 14, fontFamily: FB }}>₹{e.fee.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 18px", background: N, borderRadius: 12, marginTop: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: FB, fontWeight: 600 }}>Total Amount</span>
                <span style={{ fontFamily: FD, fontSize: 28, color: Y, letterSpacing: "0.04em" }}>₹{totalFee.toLocaleString()}</span>
              </div>
            </Card>
          </div>

          {/* Right — Payment */}
          <div>
            <Card mb={0}>
              <SectionH>SELECT PAYMENT</SectionH>

              {/* Method Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {[["upi","UPI"],["card","Card"],["netbanking","Net Banking"]].map(([m,l]) => (
                  <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: "10px 6px", borderRadius: 8, border: `2px solid ${method===m ? Y : BD}`, background: method===m ? YP : W, color: N, fontSize: 13, fontFamily: FB, fontWeight: method===m ? 700 : 500, cursor: "pointer", transition: "all 0.2s" }}>{l}</button>
                ))}
              </div>

              {method === "upi" && (
                <>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 8, fontFamily: FB }}>UPI ID</label>
                  <input value={upi} onChange={e => setUpi(e.target.value)} placeholder="yourname@upi" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none", marginBottom: 16 }} />
                  <InfoBox color="#F0FDF4" border="#BBF7D0" text="#065F46" icon="✅">
                    UPI payments are processed securely. You'll receive a payment request on your UPI app.
                  </InfoBox>
                </>
              )}

              {method === "card" && (
                <>
                  {[["Card Number","num","1234 5678 9012 3456"],["Cardholder Name","name","Name on card"]].map(([l,k,ph]) => (
                    <div key={k} style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>{l}</label>
                      <input value={card[k]} onChange={e => setCard(c => ({...c,[k]:e.target.value}))} placeholder={ph} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none" }} />
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Expiry","exp","MM/YY"],["CVV","cvv","•••"]].map(([l,k,ph]) => (
                      <div key={k} style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>{l}</label>
                        <input value={card[k]} onChange={e => setCard(c => ({...c,[k]:e.target.value}))} placeholder={ph} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none" }} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {method === "netbanking" && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 8, fontFamily: FB }}>Select Bank</label>
                  <select value={bank} onChange={e => setBank(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none" }}>
                    {["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Punjab National Bank","Kotak Mahindra Bank","Bank of Baroda"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              )}

              {/* Amount */}
              <div style={{ padding: "16px 18px", background: N, borderRadius: 12, display: "flex", justifyContent: "space-between", margin: "16px 0 18px" }}>
                <span style={{ color: "rgba(255,255,255,0.65)", fontFamily: FB }}>Amount to Pay</span>
                <span style={{ fontFamily: FD, fontSize: 26, color: Y }}>₹{totalFee.toLocaleString()}</span>
              </div>

              <button onClick={onPay} disabled={loading} style={{ width: "100%", background: loading ? TL : Y, color: N, border: "none", cursor: loading ? "not-allowed" : "pointer", padding: "16px", borderRadius: 10, fontSize: 17, fontFamily: FB, fontWeight: 700, letterSpacing: "0.03em", transition: "all 0.25s", boxShadow: loading ? "none" : "0 8px 24px rgba(245,184,0,0.28)" }}>
                {loading ? "⏳  Processing Payment…" : `Pay ₹${totalFee.toLocaleString()} →`}
              </button>

              <p style={{ color: TL, fontSize: 12, textAlign: "center", marginTop: 12, fontFamily: FB }}>🔒 Secured payment · Fees are non-refundable</p>
            </Card>

            <button onClick={() => go("register")} style={{ width: "100%", background: "transparent", color: TM, border: `1px solid ${BD}`, cursor: "pointer", padding: "12px", borderRadius: 10, fontSize: 14, fontFamily: FB, fontWeight: 500, marginTop: 14 }}>
              ← Back to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONFIRMATION PAGE ────────────────────────────────────────────────────────
function Confirm({ reg, go }) {
  const qrUrl = buildQR(reg);

  return (
    <div style={{ background: OW, minHeight: "100vh", paddingTop: 70 }}>
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

        {/* QR + Details Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>

          {/* QR Code */}
          <Card mb={0}>
            <SectionH>QR CODE</SectionH>
            <div style={{ textAlign: "center" }}>
              <div style={{ padding: 16, background: OW, borderRadius: 14, display: "inline-block", marginBottom: 18, border: `1px solid ${BD}` }}>
                <img src={qrUrl} alt="Player QR Code" width={200} height={200} style={{ display: "block", borderRadius: 8 }} onError={e => { e.target.style.display = "none"; }} />
                <div style={{ width: 200, textAlign: "center", fontFamily: FB, fontSize: 11, color: TL, marginTop: 8, letterSpacing: "0.04em" }}>{reg.playerId}</div>
              </div>
              <p style={{ color: TM, fontSize: 13, fontFamily: FB, lineHeight: 1.65, margin: "0 0 18px" }}>
                Present this QR code at the registration desk on arrival.
              </p>
              <button onClick={() => window.print()} style={{ background: N, color: Y, border: "none", cursor: "pointer", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontFamily: FB, fontWeight: 700 }}>
                🖨️ Print Player Card
              </button>
            </div>
          </Card>

          {/* Event Details */}
          <Card mb={0}>
            <SectionH>EVENT DETAILS</SectionH>
            {[["Name",reg.name],["Category",reg.category],["Gender",reg.gender],["Parent",reg.parentName],["Phone",reg.phone],["Email",reg.email]].map(([k,v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 11, marginBottom: 11, borderBottom: `1px solid ${BD}` }}>
                <span style={{ color: TM, fontSize: 13, fontFamily: FB }}>{k}</span>
                <span style={{ color: N, fontSize: 13, fontWeight: 600, fontFamily: FB, textAlign: "right", maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 4 }}>
              <div style={{ color: TM, fontSize: 13, marginBottom: 10, fontFamily: FB }}>Registered Events</div>
              {reg.events.map(e => (
                <div key={e.name} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", background: YP, border: "1px solid rgba(245,184,0,0.3)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: FB, fontWeight: 600, color: N, fontSize: 14 }}>{e.name}</span>
                  <span style={{ fontFamily: FB, fontWeight: 700, color: N, fontSize: 14 }}>₹{e.fee.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: N, borderRadius: 10, marginTop: 4 }}>
                <span style={{ fontFamily: FB, color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>Total Paid</span>
                <span style={{ fontFamily: FD, fontSize: 24, color: Y }}>₹{reg.totalFee.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Venue Info */}
        <Card mb={0} mt={24}>
          <SectionH>VENUE &amp; IMPORTANT INFO</SectionH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { icon: "📍", title: "Venue", desc: "Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow" },
              { icon: "📅", title: "Dates", desc: "April 17th – 19th, 2026" },
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

// ─── SHARED UI COMPONENTS ────────────────────────────────────────────────────
function Card({ children, mb = 0, mt = 0 }) {
  return (
    <div style={{ background: W, borderRadius: 18, border: `1px solid ${BD}`, padding: "30px 28px", marginBottom: mb, marginTop: mt, boxShadow: "0 4px 20px rgba(11,29,58,0.05)" }}>
      {children}
    </div>
  );
}

function SectionH({ children }) {
  return (
    <h3 style={{ fontFamily: FD, fontSize: 26, color: N, letterSpacing: "0.04em", margin: "0 0 22px", borderBottom: `3px solid ${Y}`, paddingBottom: 10, display: "inline-block" }}>
      {children}
    </h3>
  );
}

function InfoBox({ children, color, border, text, icon }) {
  return (
    <div style={{ padding: "12px 16px", background: color, border: `1px solid ${border}`, borderRadius: 9, fontSize: 13, color: text, fontFamily: FB, lineHeight: 1.6, marginBottom: 18 }}>
      {icon} {children}
    </div>
  );
}

function Inp({ label, name, type = "text", value, onChange, error, placeholder, min, max }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>
        {label} <span style={{ color: ER }}>*</span>
      </label>
      <input
        type={type} value={value} onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder} min={min} max={max}
        style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `1.5px solid ${error ? ER : BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none", transition: "border 0.2s" }}
      />
      {error && <p style={{ fontSize: 12, color: ER, margin: "5px 0 0", fontFamily: FB }}>{error}</p>}
    </div>
  );
}

function Sel({ label, name, value, onChange, options, error }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>
        {label} <span style={{ color: ER }}>*</span>
      </label>
      <select value={value} onChange={e => onChange(name, e.target.value)}
        style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `1.5px solid ${error ? ER : BD}`, fontSize: 14, fontFamily: FB, color: value ? N : TL, background: W, boxSizing: "border-box", outline: "none" }}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p style={{ fontSize: 12, color: ER, margin: "5px 0 0", fontFamily: FB }}>{error}</p>}
    </div>
  );
}

function EventRow({ name, fee, checked, disabled, label, labelBg, labelColor, desc, onClick, locked }) {
  return (
    <div onClick={disabled || locked ? undefined : onClick} style={{
      padding: "15px 18px", borderRadius: 11,
      border: `1.5px solid ${checked && !disabled ? Y : BD}`,
      background: checked && !disabled ? YP : W, marginBottom: 12,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      cursor: disabled || locked ? "default" : "pointer",
      transition: "all 0.2s", opacity: locked ? 0.45 : 1,
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input type="checkbox" checked={checked} readOnly style={{ width: 18, height: 18, accentColor: N, pointerEvents: "none" }} />
          <span style={{ fontWeight: 700, color: N, fontFamily: FB, fontSize: 15 }}>{name}</span>
          <span style={{ background: labelBg, color: labelColor, fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 700, letterSpacing: "0.06em", fontFamily: FB }}>{label}</span>
        </div>
        <div style={{ color: TM, fontSize: 12, marginTop: 5, marginLeft: 28, fontFamily: FB }}>{desc}</div>
      </div>
      <span style={{ fontFamily: FD, fontSize: 24, color: N, letterSpacing: "0.03em", flexShrink: 0, marginLeft: 14 }}>₹{fee.toLocaleString()}</span>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch(e) {} };
  }, []);

  const [page, setPage] = useState("home");
  const [form, setForm] = useState({
    name: "", dob: "", gender: "", parentName: "",
    address: "", email: "", phone: "",
    wantsDoubles: false, wantsMixed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [reg, setReg] = useState(null);

  // Field setter
  const setF = useCallback((k, v) => setForm(f => ({ ...f, [k]: v })), []);

  // Derived state
  const cat = getCat(form.dob);
  const hasMixed = cat === "U-13" || cat === "U-15";
  const gPfx = form.gender === "Male" ? "Boys" : form.gender === "Female" ? "Girls" : "";
  const eligible = gPfx && cat && cat !== "INELIGIBLE";

  // Auto-clear mixed doubles if category becomes ineligible
  useEffect(() => {
    if (!hasMixed && form.wantsMixed) setF("wantsMixed", false);
  }, [hasMixed, form.wantsMixed, setF]);

  // Compute events & total
  const events = [];
  if (eligible) {
    events.push({ name: `${gPfx} Singles`, fee: 600 });
    if (form.wantsDoubles) events.push({ name: `${gPfx} Doubles`, fee: 1000 });
    if (form.wantsMixed && hasMixed) events.push({ name: "Mixed Doubles", fee: 1000 });
  }
  const totalFee = events.reduce((s, e) => s + e.fee, 0);

  // Validation
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    else if (!cat || cat === "INELIGIBLE") e.dob = "Player not eligible — must be born on or after January 1, 2012";
    if (!form.gender) e.gender = "Please select gender";
    if (!form.parentName.trim()) e.parentName = "Parent/Guardian name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/[\s\-]/g, ""))) e.phone = "Enter a valid 10-digit phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (p) => {
    setPage(p);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setReg({
        playerId: genId(),
        name: form.name, gender: form.gender,
        category: cat, events, totalFee,
        dob: form.dob, email: form.email,
        phone: form.phone, parentName: form.parentName,
      });
      setLoading(false);
      go("confirm");
    }, 2200);
  };

  return (
    <div style={{ fontFamily: FB, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav page={page} go={go} />

      {page === "home" && <Home go={go} />}

      {page === "rules" && <Rules go={go} />}

      {page === "register" && (
        <Register
          go={go} form={form} setF={setF} errors={errors}
          cat={cat} hasMixed={hasMixed} events={events} totalFee={totalFee}
          onSubmit={() => { if (validate()) go("payment"); }}
        />
      )}

      {page === "payment" && (
        <Payment
          go={go} form={form} events={events} totalFee={totalFee}
          cat={cat} loading={loading} onPay={handlePayment}
        />
      )}

      {page === "confirm" && reg && (
        <Confirm reg={reg} go={go} />
      )}

      {/* Footer */}
      <footer style={{ background: ND, padding: "28px 24px", textAlign: "center", borderTop: `1px solid rgba(245,184,0,0.1)` }}>
        <div style={{ fontFamily: FD, fontSize: 20, color: Y, letterSpacing: "0.06em", marginBottom: 6 }}>SMAASH BADMINTON TOURNAMENT 2026</div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontFamily: FB, margin: "0 0 6px" }}>
          Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, fontFamily: FB, margin: 0 }}>
          April 17–19, 2026 · 7052416803 · 9839174810 · 97953100021
        </p>
      </footer>
    </div>
  );
}
