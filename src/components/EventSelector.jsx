// EventSelector component - Multi-category event selection interface
// Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.8, 5.6, 5.7, 5.8, 7.1, 7.2, 7.3, 7.4, 8.1-8.7, 9.1-9.6

import { getAllEligibleEvents } from '../utils/events.js';
import { calculateFee } from '../utils/fee.js';
import { EventRow, InfoBox } from './FormFields.jsx';

// Design tokens
const N = "#0B1D3A"; // navy
const Y = "#F5B800"; // yellow
const YP = "#FFFBEB"; // yellow pale
const TM = "#475569"; // text-mid
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * EventSelector component
 * Displays multi-category event selection with checkboxes
 * Players can select events from their age category and all higher categories
 * 
 * @param {string} dob - Date of birth in YYYY-MM-DD format
 * @param {string} gender - Player gender ("Male" or "Female")
 * @param {array} selectedEvents - Array of selected event objects {category, name, fee}
 * @param {function} onEventChange - Handler for event selection changes
 */
export default function EventSelector({ 
  dob,
  gender, 
  selectedEvents = [],
  onEventChange
}) {
  // Get all eligible events grouped by category
  const eligibleEventsByCategory = getAllEligibleEvents(dob, gender);

  // Don't render if no eligible events
  if (!eligibleEventsByCategory || eligibleEventsByCategory.length === 0) {
    return null;
  }

  // Calculate total fee
  const totalFee = calculateFee(selectedEvents);

  // Check if an event is selected
  const isEventSelected = (category, eventName) => {
    return selectedEvents.some(
      e => e.category === category && e.name === eventName
    );
  };

  // Toggle event selection
  const toggleEvent = (category, event) => {
    const isSelected = isEventSelected(category, event.name);
    
    if (isSelected) {
      // Remove event
      const newSelection = selectedEvents.filter(
        e => !(e.category === category && e.name === event.name)
      );
      onEventChange(newSelection);
    } else {
      // Add event
      const newSelection = [
        ...selectedEvents,
        {
          category,
          name: event.name,
          fee: event.fee
        }
      ];
      onEventChange(newSelection);
    }
  };

  return (
    <div role="region" aria-label="Event Selection">
      {/* Helper text */}
      <InfoBox 
        color="#EFF6FF" 
        border="#BFDBFE" 
        text="#1E40AF"
        icon="ℹ️"
      >
        Based on your Date of Birth, you are eligible for the following categories and events
      </InfoBox>
      
      {/* Live region for fee updates - announces changes to screen readers */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
      >
        Total fee: ₹{totalFee.toLocaleString()}
      </div>

      {/* Events grouped by category */}
      {eligibleEventsByCategory.map(({ category, events }) => (
        <div key={category} style={{ marginBottom: 24 }}>
          {/* Category Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 16px",
            background: YP,
            border: `2px solid ${Y}`,
            borderRadius: 10,
            marginBottom: 12
          }}>
            <span style={{
              fontFamily: FD,
              fontSize: 20,
              color: N,
              letterSpacing: "0.04em"
            }}>
              {category}
            </span>
          </div>

          {/* Events for this category */}
          {events.map(event => {
            const isSelected = isEventSelected(category, event.name);
            return (
              <EventRow
                key={`${category}-${event.name}`}
                name={event.name}
                fee={event.fee}
                checked={isSelected}
                disabled={false}
                locked={false}
                label="OPTIONAL"
                labelBg="#E0E7FF"
                labelColor="#3730A3"
                desc={`Select to register for ${event.name} in ${category} category`}
                onClick={() => toggleEvent(category, event)}
                ariaLabel={`${event.name} for ${category}, fee ₹${event.fee}, ${isSelected ? 'selected' : 'not selected'}`}
              />
            );
          })}
        </div>
      ))}

      {/* Total Fee Breakdown */}
      {selectedEvents.length > 0 && (
        <div style={{
          marginTop: 24,
          padding: "18px 20px",
          background: YP,
          border: `2px solid ${Y}`,
          borderRadius: 12
        }}>
          <div style={{ marginBottom: 12 }}>
            <h4 style={{
              fontFamily: FD,
              fontSize: 20,
              color: N,
              letterSpacing: "0.04em",
              margin: "0 0 12px"
            }}>
              FEE BREAKDOWN
            </h4>
            {selectedEvents.map((event, idx) => (
              <div 
                key={`${event.category}-${event.name}-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: TM,
                  fontFamily: FB,
                  marginBottom: 6,
                  flexWrap: "wrap",
                  gap: 8
                }}
              >
                <span style={{ minWidth: "120px" }}>
                  {event.name} ({event.category})
                </span>
                <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                  ₹{event.fee.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            borderTop: `2px solid ${Y}`,
            paddingTop: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12
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
              letterSpacing: "0.03em"
            }}>
              ₹{totalFee.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
