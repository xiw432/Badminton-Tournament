import { getEventsForCategory } from '../utils/events.js';
import { calculateFee } from '../utils/fee.js';
import { EventRow, InfoBox } from './FormFields.jsx';

const N  = "#0B1D3A";
const Y  = "#F5B800";
const YP = "#FFFBEB";
const TM = "#475569";
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

// Events that require a partner name
const PARTNER_EVENTS = ['Boys Doubles', 'Girls Doubles', 'Mixed Doubles'];

/**
 * EventSelector - shows events for all selected categories
 * For doubles/mixed doubles events, shows a partner name input field
 *
 * @param {string}   gender
 * @param {string[]} selectedCategories
 * @param {array}    selectedEvents - [{category, name, fee, partnerName?}, ...]
 * @param {function} onEventChange
 */
export default function EventSelector({ gender, selectedCategories = [], selectedEvents = [], onEventChange }) {
  if (!selectedCategories.length || !gender) return null;

  const totalFee = calculateFee(selectedEvents);

  const isSelected = (category, name) =>
    selectedEvents.some(e => e.category === category && e.name === name);

  const getPartnerName = (category, name) => {
    const ev = selectedEvents.find(e => e.category === category && e.name === name);
    return ev?.partnerName || '';
  };

  const toggleEvent = (category, event) => {
    if (isSelected(category, event.name)) {
      onEventChange(selectedEvents.filter(e => !(e.category === category && e.name === event.name)));
    } else {
      onEventChange([...selectedEvents, {
        category,
        name: event.name,
        fee: event.fee,
        partnerName: PARTNER_EVENTS.includes(event.name) ? '' : undefined
      }]);
    }
  };

  const updatePartnerName = (category, eventName, partnerName) => {
    onEventChange(selectedEvents.map(e =>
      e.category === category && e.name === eventName
        ? { ...e, partnerName }
        : e
    ));
  };

  const needsPartner = (name) => PARTNER_EVENTS.includes(name);

  return (
    <div role="region" aria-label="Event Selection">
      <InfoBox color="#EFF6FF" border="#BFDBFE" text="#1E40AF" icon="ℹ️">
        Select events for each category you want to play in
      </InfoBox>

      {/* Doubles payment notice */}
      <div style={{
        background: "#F0FDF4",
        border: "2px solid #86EFAC",
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 16,
        display: "flex",
        gap: 10,
        alignItems: "flex-start"
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>🤝</span>
        <p style={{ fontFamily: FB, fontSize: 13, color: "#166534", margin: 0, lineHeight: 1.6 }}>
          <strong>Doubles Payment Rule:</strong> For Doubles and Mixed Doubles events, only ONE player from each pair needs to pay the registration fee. Your partner does NOT need to pay separately — the fee covers both players.
        </p>
      </div>

      {selectedCategories.map(cat => {
        const events = getEventsForCategory(cat, gender);
        if (!events.length) return null;

        return (
          <div key={cat} style={{ marginBottom: 28 }}>
            {/* Category badge */}
            <div style={{
              display: "inline-flex", alignItems: "center",
              padding: "8px 18px", background: YP, border: `2px solid ${Y}`,
              borderRadius: 10, marginBottom: 12
            }}>
              <span style={{ fontFamily: FD, fontSize: 20, color: N, letterSpacing: "0.04em" }}>
                {cat}
              </span>
            </div>

            {events.map(event => {
              const selected = isSelected(cat, event.name);
              const isDoubles = needsPartner(event.name);

              return (
                <div key={`${cat}-${event.name}`}>
                  <EventRow
                    name={event.name}
                    fee={event.fee}
                    checked={selected}
                    disabled={false}
                    locked={false}
                    label={isDoubles ? "DOUBLES" : "OPTIONAL"}
                    labelBg={isDoubles ? "#D1FAE5" : "#E0E7FF"}
                    labelColor={isDoubles ? "#065F46" : "#3730A3"}
                    desc={isDoubles
                      ? `Register for ${event.name} in ${cat} — only you pay, not your partner`
                      : `Register for ${event.name} in ${cat}`}
                    onClick={() => toggleEvent(cat, event)}
                    ariaLabel={`${event.name} in ${cat}, Rs.${event.fee}, ${selected ? 'selected' : 'not selected'}`}
                  />

                  {/* Partner name input — shown when doubles event is selected */}
                  {selected && isDoubles && (
                    <div style={{
                      marginTop: -8,
                      marginBottom: 12,
                      marginLeft: 16,
                      padding: "14px 16px",
                      background: "#F0FDF4",
                      border: "1px solid #86EFAC",
                      borderRadius: "0 0 10px 10px",
                      borderTop: "none"
                    }}>
                      <label style={{
                        fontFamily: FB,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#166534",
                        display: "block",
                        marginBottom: 8
                      }}>
                        🤝 Partner Name for {event.name}
                        <span style={{ color: "#DC2626", marginLeft: 4 }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your partner's full name"
                        value={getPartnerName(cat, event.name)}
                        onChange={(e) => updatePartnerName(cat, event.name, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1.5px solid #86EFAC",
                          borderRadius: 8,
                          fontFamily: FB,
                          fontSize: 14,
                          color: N,
                          background: "#FFFFFF",
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                        onFocus={e => e.target.style.borderColor = "#22C55E"}
                        onBlur={e => e.target.style.borderColor = "#86EFAC"}
                      />
                      <p style={{ fontFamily: FB, fontSize: 11, color: "#166534", margin: "6px 0 0", lineHeight: 1.5 }}>
                        Only you need to register and pay. Your partner's name will appear on your admit card.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Fee breakdown */}
      {selectedEvents.length > 0 && (
        <div style={{ marginTop: 8, padding: "18px 20px", background: YP, border: `2px solid ${Y}`, borderRadius: 12 }}>
          <h4 style={{ fontFamily: FD, fontSize: 20, color: N, letterSpacing: "0.04em", margin: "0 0 12px" }}>
            FEE BREAKDOWN
          </h4>
          {selectedEvents.map((ev, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: TM, fontFamily: FB }}>
                <span>{ev.name} ({ev.category}){ev.partnerName ? ` — with ${ev.partnerName}` : ''}</span>
                <span style={{ fontWeight: 600 }}>Rs.{ev.fee.toLocaleString()}</span>
              </div>
              {ev.partnerName && (
                <div style={{ fontSize: 11, color: "#059669", fontFamily: FB, marginTop: 2, paddingLeft: 4 }}>
                  ✓ Partner: {ev.partnerName} (no separate payment needed)
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: `2px solid ${Y}`, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FD, fontSize: 22, color: N }}>TOTAL FEE</span>
            <span style={{ fontFamily: FD, fontSize: 32, color: N }}>Rs.{totalFee.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
