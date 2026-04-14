import { getEventsForCategory } from '../utils/events.js';
import { calculateFee } from '../utils/fee.js';
import { EventRow, InfoBox } from './FormFields.jsx';

const N  = "#0B1D3A";
const Y  = "#F5B800";
const YP = "#FFFBEB";
const TM = "#475569";
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * EventSelector - shows events for all selected categories
 * Player can select events from each category they chose to play in
 *
 * @param {string}   gender
 * @param {string[]} selectedCategories - categories the player chose (e.g. ["U-13","U-15"])
 * @param {array}    selectedEvents     - [{category, name, fee}, ...]
 * @param {function} onEventChange
 */
export default function EventSelector({ gender, selectedCategories = [], selectedEvents = [], onEventChange }) {
  if (!selectedCategories.length || !gender) return null;

  const totalFee = calculateFee(selectedEvents);

  const isSelected = (category, name) =>
    selectedEvents.some(e => e.category === category && e.name === name);

  const toggleEvent = (category, event) => {
    if (isSelected(category, event.name)) {
      onEventChange(selectedEvents.filter(e => !(e.category === category && e.name === event.name)));
    } else {
      onEventChange([...selectedEvents, { category, name: event.name, fee: event.fee }]);
    }
  };

  return (
    <div role="region" aria-label="Event Selection">
      <InfoBox color="#EFF6FF" border="#BFDBFE" text="#1E40AF" icon="ℹ️">
        Select events for each category you want to play in
      </InfoBox>

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

            {events.map(event => (
              <EventRow
                key={`${cat}-${event.name}`}
                name={event.name}
                fee={event.fee}
                checked={isSelected(cat, event.name)}
                disabled={false}
                locked={false}
                label="OPTIONAL"
                labelBg="#E0E7FF"
                labelColor="#3730A3"
                desc={`Register for ${event.name} in ${cat}`}
                onClick={() => toggleEvent(cat, event)}
                ariaLabel={`${event.name} in ${cat}, Rs.${event.fee}, ${isSelected(cat, event.name) ? 'selected' : 'not selected'}`}
              />
            ))}
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
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: TM, fontFamily: FB, marginBottom: 6 }}>
              <span>{ev.name} ({ev.category})</span>
              <span style={{ fontWeight: 600 }}>Rs.{ev.fee.toLocaleString()}</span>
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
