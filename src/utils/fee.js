// Fee calculation utility
// Implements fee calculation logic for tournament registration
// Requirements: 5.1, 5.2, 5.3, 5.4, 5.5

/**
 * Calculates total registration fee based on selected events.
 * 
 * This function sums up the fees for all selected events to provide the total registration cost.
 * It handles the complete fee calculation for multi-category event selection, where players
 * can select events from multiple age categories.
 * 
 * Fee structure:
 * - Singles (Boys/Girls): ₹600 per event
 * - Doubles (Boys/Girls): ₹1000 per event
 * - Mixed Doubles: ₹1000 per event
 * 
 * @param {Array<{name: string, fee: number, category: string}>} events - Array of selected event objects with fee property
 * @returns {number} Total fee in rupees (₹)
 * 
 * Requirements:
 * - 5.1: Singles events add ₹600 to total
 * - 5.2: Doubles events add ₹1000 to total
 * - 5.3: Mixed Doubles events add ₹1000 to total
 * - 5.4: Display total as sum of all selected event fees
 * - 5.5: Implement in /src/utils/fee.js as calculateFee(events)
 * 
 * @example
 * // Single event selected
 * calculateFee([{ name: "Boys Singles", fee: 600, category: "U-13" }])
 * // Returns 600
 * 
 * @example
 * // Multiple events from same category
 * calculateFee([
 *   { name: "Boys Singles", fee: 600, category: "U-13" },
 *   { name: "Boys Doubles", fee: 1000, category: "U-13" }
 * ])
 * // Returns 1600
 * 
 * @example
 * // Multiple events from different categories
 * calculateFee([
 *   { name: "Boys Singles", fee: 600, category: "U-13" },
 *   { name: "Boys Doubles", fee: 1000, category: "U-13" },
 *   { name: "Mixed Doubles", fee: 1000, category: "U-15" }
 * ])
 * // Returns 2600
 * 
 * @example
 * // Edge cases
 * calculateFee([]) // Returns 0 (no events selected)
 * calculateFee(null) // Returns 0 (invalid input)
 * calculateFee([{ name: "Boys Singles", category: "U-13" }]) // Returns 0 (missing fee property)
 * calculateFee([{ name: "Boys Singles", fee: null, category: "U-13" }]) // Returns 0 (null fee)
 * 
 * @note Edge case handling: Returns 0 for null, non-array inputs, empty arrays, or events with missing/invalid fee properties
 * @note Performance: Uses Array.reduce for efficient O(n) calculation
 * @note Validation: Safely handles events with missing or null fee properties by treating them as 0
 */
export function calculateFee(events) {
  // Handle invalid input
  if (!Array.isArray(events)) {
    return 0;
  }

  // Sum up all event fees
  return events.reduce((total, event) => {
    return total + (event.fee || 0);
  }, 0);
}
