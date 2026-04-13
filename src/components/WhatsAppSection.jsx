/**
 * WhatsAppSection Component - Dedicated section for WhatsApp group promotion
 * To be used on the Home/Landing page
 */

import WhatsAppButton from './WhatsAppButton.jsx';

export default function WhatsAppSection() {
  const N = "#0B1D3A";
  const Y = "#F5B800";
  const W = "#FFFFFF";
  const OW = "#F8FAFC";
  const WA_GREEN = "#25D366";
  const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
  const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

  return (
    <div style={{ 
      background: `linear-gradient(135deg, ${WA_GREEN} 0%, #128C7E 100%)`,
      padding: "88px 24px"
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        {/* Icon */}
        <div style={{
          width: 80,
          height: 80,
          background: W,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill={WA_GREEN}/>
          </svg>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: FD,
          fontSize: "clamp(42px, 6vw, 58px)",
          color: W,
          letterSpacing: "0.04em",
          lineHeight: 1,
          marginBottom: 16
        }}>
          STAY UPDATED INSTANTLY 📲
        </h2>

        {/* Description */}
        <p style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: 18,
          lineHeight: 1.7,
          marginBottom: 36,
          fontFamily: FB,
          maxWidth: 640,
          margin: "0 auto 36px"
        }}>
          Join our official WhatsApp group for real-time match schedules, tournament updates, 
          important announcements, and stay connected with fellow players and organizers.
        </p>

        {/* Benefits Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
          marginBottom: 44,
          maxWidth: 720,
          margin: "0 auto 44px"
        }}>
          {[
            { icon: "📅", text: "Match Schedules" },
            { icon: "🔔", text: "Live Updates" },
            { icon: "📢", text: "Announcements" },
            { icon: "🤝", text: "Connect with Players" }
          ].map(item => (
            <div key={item.text} style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: 14,
              padding: "20px 16px",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{
                fontFamily: FB,
                fontSize: 15,
                color: W,
                fontWeight: 600
              }}>{item.text}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <WhatsAppButton 
          variant="cta" 
          text="Join WhatsApp Group →"
          style={{
            backgroundColor: W,
            color: WA_GREEN,
            fontSize: 18,
            padding: "18px 40px"
          }}
        />

        {/* Additional Info */}
        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 13,
          marginTop: 20,
          fontFamily: FB
        }}>
          ✓ Free to join · ✓ Instant notifications · ✓ Official tournament group
        </p>
      </div>
    </div>
  );
}
