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
 * EventSelector - shows events for the player's selected category
 * @param {string} gender
 * @param {string} selectedCategory - the category the player chose to play in
 * @param {array}  selectedEvents
 * @param {function} onEventChange
 */
export default function EventSelector({ gender, selectedCategory, selectedEvents = [], onEventChange }) {
  const events = getEventsForCategory(selectedCategory, gender);
  if (!events || events.length === 0) return null;

  const totalFee = calculateFee(selectedEvents);

  const isSelected = (name) =>
    selectedEvents.some(e => e.name === name && e.category === selectedCategory);

  const toggleEvent = (event) => {
    if (isSelected(event.name)) {
      onEventChange(selectedEvents.filter(
        e => !(e.name === event.name && e.category === selectedCategory)
      ));
    } else {
      onEventChange([...selectedEvents, { category: selectedCategory, name: event.name, fee: event.fee }]);
    }
  };

  return (
    <div role="region" aria-label="Event Selection">
      <InfoBox color="#EFF6FF" border="#BFDBFE" text="#1E40AF" icon="ℹ️">
        Select the events you want to play in <strong>{selectedCategory}</strong> category
      </InfoBox>

      <div style={{ marginBottom: 24 }}>
        {/* Category badge */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          padding: "8px 16px", background: YP, border: `2px solid ${Y}`,
          borderRadius: 10, marginBottom: 12
        }}>
          <span style={{ fontFamily: FD, fontSize: 20, color: N, letterSpacing: "0.04em" }}>
            {selectedCategory}
          </span>
        </div>

        {events.map(event => (
          <EventRow
            key={event.name}
            name={event.name}
            fee={event.fee}
            checked={isSelected(event.name)}
            disabled={false}
            locked={false}
            label="OPTIONAL"
            labelBg="#E0E7FF"
            labelColor="#3730A3"
            desc={`Register for ${event.name} in ${selectedCategory}`}
            onClick={() => toggleEvent(event)}
            ariaLabel={`${event.name}, fee Rs.${event.fee}, ${isSelected(event.name) ? 'selected' : 'not selected'}`}
          />
        ))}
      </div>

      {/* Fee breakdown */}
      {selectedEvents.length > 0 && (
        <div style={{ marginTop: 24, padding: "18px 20px", background: YP, border: `2px solid ${Y}`, borderRadius: 12 }}>
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
