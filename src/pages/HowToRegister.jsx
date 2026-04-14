import Navbar from '../components/Navbar.jsx';

const N  = "#0B1D3A";
const Y  = "#F5B800";
const YP = "#FFFBEB";
const W  = "#FFFFFF";
const BG = "#F8FAFC";
const TM = "#475569";
const BD = "#E2E8F0";
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

const steps = [
  {
    num: "01",
    icon: "📋",
    title: "Fill Personal Details",
    desc: "Enter the player's full name, date of birth, gender, and parent/guardian name. Your age category (U-9, U-11, U-13, U-15) will be automatically shown based on your date of birth.",
  },
  {
    num: "02",
    icon: "📞",
    title: "Enter Contact Information",
    desc: "Provide a valid email address, 10-digit phone number, and your complete address. The admit card and confirmation will be sent to your email.",
  },
  {
    num: "03",
    icon: "📷",
    title: "Upload Player Photo",
    desc: "Upload a clear passport-size photo of the player. You can crop and adjust the photo after uploading. The photo will appear on your admit card.",
  },
  {
    num: "04",
    icon: "🏸",
    title: "Select Category & Events",
    desc: "Based on your date of birth, select which age category you want to play in. You can select multiple eligible categories. Then choose your events (Singles, Doubles, Mixed Doubles) for each category.",
  },
  {
    num: "05",
    icon: "✅",
    title: "Submit Registration",
    desc: "Click 'Complete Registration'. Your data will be saved and a confirmation email with your admit card PDF will be sent to your email address.",
  },
  {
    num: "06",
    icon: "💰",
    title: "Pay Registration Fee",
    desc: "Payment is CASH ONLY. After registering, pay the registration fee in cash to your respected Coach. Entry to the tournament will only be allowed after payment verification.",
  },
  {
    num: "07",
    icon: "🎫",
    title: "Download Admit Card",
    desc: "After registration, click 'View Admit Card' on the confirmation page. You can print or download your admit card as PDF. Carry it to the venue on tournament day.",
  },
];

const faqs = [
  {
    q: "What is the age eligibility?",
    a: "Players born on or after January 1, 2012 are eligible. Categories: U-9 (born 2018+), U-11 (2016-2017), U-13 (2014-2015), U-15 (2012-2013).",
  },
  {
    q: "Can I register for multiple categories?",
    a: "Yes! If your date of birth makes you eligible for multiple categories (e.g. U-13 and U-15), you can select and register for both.",
  },
  {
    q: "What is the registration fee?",
    a: "Singles events: Rs.600 per event. Doubles and Mixed Doubles: Rs.1000 per event. Total fee depends on how many events you register for.",
  },
  {
    q: "How do I pay?",
    a: "Payment is CASH ONLY. Pay the registration fee directly to your Coach before the tournament. No online payment is accepted.",
  },
  {
    q: "I didn't receive the confirmation email. What should I do?",
    a: "Check your spam/junk folder first. If still not received, contact us on the numbers below and we will help you retrieve your admit card.",
  },
  {
    q: "Can I re-download my admit card?",
    a: "Yes. After registration, you can always go back to the confirmation page and click 'View Admit Card' to download it again.",
  },
  {
    q: "What documents do I need at the venue?",
    a: "Carry your printed or digital admit card, a valid age proof (birth certificate or school ID), and pay the registration fee in cash to your Coach.",
  },
];

export default function HowToRegister({ go }) {
  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <Navbar page="how-to-register" go={go} />

      <div style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h1 style={{ fontFamily: FD, fontSize: "clamp(36px,6vw,56px)", color: N, letterSpacing: "0.05em", margin: "0 0 16px", lineHeight: 1.1 }}>
              HOW TO REGISTER
            </h1>
            <p style={{ fontFamily: FB, fontSize: 17, color: TM, margin: 0, lineHeight: 1.7, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              Follow these simple steps to complete your registration for SMAASH Badminton Tournament 2026.
            </p>
          </div>

          {/* Steps */}
          <div style={{ marginBottom: 64 }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: 24,
                  marginBottom: 24,
                  background: W,
                  borderRadius: 16,
                  padding: "24px 28px",
                  border: `1px solid ${BD}`,
                  boxShadow: "0 2px 12px rgba(11,29,58,0.05)",
                  alignItems: "flex-start"
                }}
              >
                {/* Step number */}
                <div style={{
                  minWidth: 52,
                  height: 52,
                  background: i === 0 ? Y : N,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{ fontFamily: FD, fontSize: 20, color: i === 0 ? N : Y, letterSpacing: "0.04em" }}>
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{step.icon}</span>
                    <h3 style={{ fontFamily: FD, fontSize: 22, color: N, margin: 0, letterSpacing: "0.03em" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: 15, color: TM, margin: 0, lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cash Payment Notice */}
          <div style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            border: "3px solid #F59E0B",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 64,
            textAlign: "center"
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💰</div>
            <h3 style={{ fontFamily: FD, fontSize: 28, color: "#92400E", margin: "0 0 12px", letterSpacing: "0.04em" }}>
              IMPORTANT: CASH PAYMENT ONLY
            </h3>
            <p style={{ fontFamily: FB, fontSize: 15, color: "#78350F", margin: 0, lineHeight: 1.8, fontWeight: 600 }}>
              Registration fee must be paid in CASH to your respected Coach.<br />
              No online payment is accepted. Entry will only be allowed after payment verification.
            </p>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: FD, fontSize: 36, color: N, letterSpacing: "0.04em", margin: "0 0 32px", textAlign: "center" }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: W,
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 12,
                border: `1px solid ${BD}`,
                boxShadow: "0 1px 6px rgba(11,29,58,0.04)"
              }}>
                <div style={{ fontFamily: FB, fontSize: 15, fontWeight: 700, color: N, marginBottom: 8 }}>
                  Q: {faq.q}
                </div>
                <div style={{ fontFamily: FB, fontSize: 14, color: TM, lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          {/* Contact / Error Help */}
          <div style={{
            background: N,
            borderRadius: 20,
            padding: "40px 36px",
            textAlign: "center",
            marginBottom: 40,
            boxShadow: "0 16px 48px rgba(11,29,58,0.18)"
          }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🆘</div>
            <h3 style={{ fontFamily: FD, fontSize: 32, color: Y, margin: "0 0 12px", letterSpacing: "0.04em" }}>
              FACING AN ERROR?
            </h3>
            <p style={{ fontFamily: FB, fontSize: 15, color: "rgba(255,255,255,0.8)", margin: "0 0 28px", lineHeight: 1.7 }}>
              If you encounter any issue during registration — such as a technical error, email not received, or admit card not loading — please contact us immediately on any of the numbers below.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "Helpline 1", number: "7052416803" },
                { label: "Helpline 2", number: "9839174810" },
                { label: "Helpline 3", number: "9795310002" },
              ].map(({ label, number }) => (
                <a
                  key={number}
                  href={`tel:${number}`}
                  style={{
                    background: Y,
                    color: N,
                    textDecoration: "none",
                    padding: "14px 24px",
                    borderRadius: 12,
                    fontFamily: FB,
                    fontWeight: 700,
                    fontSize: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    minWidth: 160
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.7 }}>{label}</span>
                  <span style={{ fontSize: 18, letterSpacing: "0.04em" }}>📞 {number}</span>
                </a>
              ))}
            </div>

            <p style={{ fontFamily: FB, fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 20, marginBottom: 0 }}>
              Available during tournament registration period · April 2026
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => go("register")}
              style={{
                background: Y,
                color: N,
                border: "none",
                cursor: "pointer",
                padding: "16px 48px",
                borderRadius: 12,
                fontSize: 18,
                fontFamily: FD,
                fontWeight: 700,
                letterSpacing: "0.06em",
                boxShadow: "0 4px 20px rgba(245,184,0,0.35)"
              }}
            >
              REGISTER NOW →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
