// Event selection utility
// Implements automatic event assignment and optional event availability logic
// Requirements: 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.10

import { getEligibleCategories } from './category.js';

/**
 * Gets automatically assigned events based on gender.
 * These events are mandatory and cannot be removed from the registration.
 * 
 * This function determines which Singles event is automatically assigned to a player
 * based on their gender. Male players receive Boys Singles, and female players receive
 * Girls Singles. These events are marked as mandatory and included in every registration.
 * 
 * @param {string} gender - Player gender: "Male" or "Female"
 * @param {string} category - Age category (U-9, U-11, U-13, U-15, or INELIGIBLE)
 * @returns {Array<{name: string, fee: number, mandatory: boolean, category: string}>} Array of auto-assigned event objects
 * 
 * Requirements:
 * - 4.1: Male players automatically get Boys Singles
 * - 4.2: Female players automatically get Girls Singles
 * 
 * @example
 * // Male player in U-13 category
 * getAutoEvents("Male", "U-13")
 * // Returns [{ name: "Boys Singles", fee: 600, mandatory: true, category: "U-13" }]
 * 
 * @example
 * // Female player in U-11 category
 * getAutoEvents("Female", "U-11")
 * // Returns [{ name: "Girls Singles", fee: 600, mandatory: true, category: "U-11" }]
 * 
 * @example
 * // Edge cases
 * getAutoEvents(null, "U-13") // Returns []
 * getAutoEvents("Male", null) // Returns []
 * getAutoEvents("Male", "INELIGIBLE") // Returns []
 * getAutoEvents("", "") // Returns []
 * 
 * @note Edge case handling: Returns empty array for null, empty, or invalid gender/category inputs
 * @note Mandatory events: All returned events have mandatory: true property
 * @note Fee structure: Singles events are always ₹600
 */
export function getAutoEvents(gender, category) {
  // Return empty array for invalid inputs
  if (!gender || !category || category === 'INELIGIBLE') {
    return [];
  }

  // Auto-assign Singles event based on gender
  if (gender === 'Male') {
    return [
      {
        name: 'Boys Singles',
        fee: 600,
        mandatory: true,
        category: category
      }
    ];
  } else if (gender === 'Female') {
    return [
      {
        name: 'Girls Singles',
        fee: 600,
        mandatory: true,
        category: category
      }
    ];
  }

  return [];
}

/**
 * Gets optional events available for selection.
 * Availability depends on gender and age category.
 * 
 * This function determines which optional events a player can select based on their
 * gender and age category. Male players can select Boys Doubles, female players can
 * select Girls Doubles, and players in U-13 or U-15 categories can also select Mixed Doubles.
 * These events are optional and can be added or removed by the player.
 * 
 * @param {string} gender - Player gender: "Male" or "Female"
 * @param {string} category - Age category (U-9, U-11, U-13, U-15, or INELIGIBLE)
 * @returns {Array<{name: string, fee: number, mandatory: boolean, category: string}>} Array of optional event objects
 * 
 * Requirements:
 * - 4.4: Boys Doubles available for Male players (all categories)
 * - 4.5: Girls Doubles available for Female players (all categories)
 * - 4.6: Mixed Doubles available only for U-13 and U-15 categories
 * - 4.7: Mixed Doubles NOT available for U-9 and U-11 categories
 * 
 * @example
 * // Male player in U-9 category (no Mixed Doubles)
 * getOptionalEvents("Male", "U-9")
 * // Returns [{ name: "Boys Doubles", fee: 1000, mandatory: false, category: "U-9" }]
 * 
 * @example
 * // Female player in U-13 category (includes Mixed Doubles)
 * getOptionalEvents("Female", "U-13")
 * // Returns [
 * //   { name: "Girls Doubles", fee: 1000, mandatory: false, category: "U-13" },
 * //   { name: "Mixed Doubles", fee: 1000, mandatory: false, category: "U-13" }
 * // ]
 * 
 * @example
 * // Male player in U-15 category (includes Mixed Doubles)
 * getOptionalEvents("Male", "U-15")
 * // Returns [
 * //   { name: "Boys Doubles", fee: 1000, mandatory: false, category: "U-15" },
 * //   { name: "Mixed Doubles", fee: 1000, mandatory: false, category: "U-15" }
 * // ]
 * 
 * @example
 * // Edge cases
 * getOptionalEvents(null, "U-13") // Returns []
 * getOptionalEvents("Male", null) // Returns []
 * getOptionalEvents("Male", "INELIGIBLE") // Returns []
 * getOptionalEvents("", "") // Returns []
 * 
 * @note Edge case handling: Returns empty array for null, empty, or invalid gender/category inputs
 * @note Optional events: All returned events have mandatory: false property
 * @note Fee structure: Doubles and Mixed Doubles events are always ₹1000
 * @note Mixed Doubles availability: Only included for U-13 and U-15 categories, not for U-9 or U-11
 */
export function getOptionalEvents(gender, category) {
  const optionalEvents = [];

  // Return empty array for invalid inputs
  if (!gender || !category || category === 'INELIGIBLE') {
    return optionalEvents;
  }

  // Add Doubles event based on gender (available for all categories)
  if (gender === 'Male') {
    optionalEvents.push({
      name: 'Boys Doubles',
      fee: 1000,
      mandatory: false,
      category: category
    });
  } else if (gender === 'Female') {
    optionalEvents.push({
      name: 'Girls Doubles',
      fee: 1000,
      mandatory: false,
      category: category
    });
  }

  // Add Mixed Doubles only for U-13 and U-15 categories
  if (category === 'U-13' || category === 'U-15') {
    optionalEvents.push({
      name: 'Mixed Doubles',
      fee: 1000,
      mandatory: false,
      category: category
    });
  }

  return optionalEvents;
}

/**
 * Gets all events available for a specific category and gender.
 * Returns Singles and Doubles events based on gender, plus Mixed Doubles for U-13 and U-15.
 * 
 * This function generates the complete list of events a player can participate in for a given
 * category. Male players receive Boys Singles and Boys Doubles, while female players receive
 * Girls Singles and Girls Doubles. Mixed Doubles is only available for U-13 and U-15 categories.
 * 
 * @param {string} category - Age category (U-9, U-11, U-13, U-15)
 * @param {string} gender - Player gender: "Male" or "Female"
 * @returns {Array<{name: string, fee: number}>} Array of event objects with name and fee properties
 * 
 * Requirements:
 * - 2.1: Male players get Boys Singles
 * - 2.2: Male players get Boys Doubles
 * - 2.3: Female players get Girls Singles
 * - 2.4: Female players get Girls Doubles
 * - 2.5: Mixed Doubles included for U-13
 * - 2.6: Mixed Doubles included for U-15
 * - 2.7: Mixed Doubles NOT included for U-9
 * - 2.8: Mixed Doubles NOT included for U-11
 * 
 * @example
 * // Male player in U-13 category
 * getEventsForCategory("U-13", "Male") 
 * // Returns [
 * //   { name: "Boys Singles", fee: 600 },
 * //   { name: "Boys Doubles", fee: 1000 },
 * //   { name: "Mixed Doubles", fee: 1000 }
 * // ]
 * 
 * @example
 * // Female player in U-9 category (no Mixed Doubles)
 * getEventsForCategory("U-9", "Female")
 * // Returns [
 * //   { name: "Girls Singles", fee: 600 },
 * //   { name: "Girls Doubles", fee: 1000 }
 * // ]
 * 
 * @example
 * // Edge cases
 * getEventsForCategory(null, "Male") // Returns []
 * getEventsForCategory("U-13", null) // Returns []
 * getEventsForCategory("", "") // Returns []
 * 
 * @note Edge case handling: Returns empty array for null, empty, or invalid category/gender inputs
 * @note Fee structure: Singles events are ₹600, Doubles and Mixed Doubles are ₹1000
 */
export function getEventsForCategory(category, gender) {
  const events = [];

  // Return empty array for invalid inputs
  if (!category || !gender) {
    return events;
  }

  // Add Singles and Doubles based on gender
  if (gender === 'Male') {
    events.push({ name: 'Boys Singles', fee: 600 });
    events.push({ name: 'Boys Doubles', fee: 1000 });
  } else if (gender === 'Female') {
    events.push({ name: 'Girls Singles', fee: 600 });
    events.push({ name: 'Girls Doubles', fee: 1000 });
  }

  // Add Mixed Doubles only for U-13 and U-15
  if (category === 'U-13' || category === 'U-15') {
    events.push({ name: 'Mixed Doubles', fee: 1000 });
  }

  return events;
}

/**
 * Gets all eligible events grouped by category for a player based on date of birth and gender.
 * Returns events for all eligible categories (player's category and all higher categories).
 * 
 * This is the primary function for generating the complete event selection interface. It combines
 * eligibility determination with event generation to provide a structured list of all events
 * a player can register for across all their eligible categories.
 * 
 * @param {string} dob - Date of birth in YYYY-MM-DD format (e.g., "2015-06-15")
 * @param {string} gender - Player gender: "Male" or "Female"
 * @returns {Array<{category: string, events: Array<{name: string, fee: number}>}>} Array of objects with category and events properties
 * 
 * Requirements:
 * - 2.9: Returns events grouped by category
 * - Uses getEligibleCategories to determine which categories player can participate in
 * - Uses getEventsForCategory to get events for each eligible category
 * 
 * @example
 * // U-11 male player eligible for U-11, U-13, and U-15
 * getAllEligibleEvents("2015-06-15", "Male")
 * // Returns [
 * //   { 
 * //     category: "U-11", 
 * //     events: [
 * //       { name: "Boys Singles", fee: 600 },
 * //       { name: "Boys Doubles", fee: 1000 }
 * //     ]
 * //   },
 * //   { 
 * //     category: "U-13", 
 * //     events: [
 * //       { name: "Boys Singles", fee: 600 },
 * //       { name: "Boys Doubles", fee: 1000 },
 * //       { name: "Mixed Doubles", fee: 1000 }
 * //     ]
 * //   },
 * //   { 
 * //     category: "U-15", 
 * //     events: [
 * //       { name: "Boys Singles", fee: 600 },
 * //       { name: "Boys Doubles", fee: 1000 },
 * //       { name: "Mixed Doubles", fee: 1000 }
 * //     ]
 * //   }
 * // ]
 * 
 * @example
 * // U-9 female player eligible for all categories
 * getAllEligibleEvents("2018-03-15", "Female")
 * // Returns [
 * //   { category: "U-9", events: [{ name: "Girls Singles", fee: 600 }, { name: "Girls Doubles", fee: 1000 }] },
 * //   { category: "U-11", events: [{ name: "Girls Singles", fee: 600 }, { name: "Girls Doubles", fee: 1000 }] },
 * //   { category: "U-13", events: [{ name: "Girls Singles", fee: 600 }, { name: "Girls Doubles", fee: 1000 }, { name: "Mixed Doubles", fee: 1000 }] },
 * //   { category: "U-15", events: [{ name: "Girls Singles", fee: 600 }, { name: "Girls Doubles", fee: 1000 }, { name: "Mixed Doubles", fee: 1000 }] }
 * // ]
 * 
 * @example
 * // Edge cases
 * getAllEligibleEvents("2010-01-01", "Male") // Returns [] (ineligible - too old)
 * getAllEligibleEvents(null, "Female") // Returns []
 * getAllEligibleEvents("2015-06-15", null) // Returns []
 * getAllEligibleEvents("invalid", "Male") // Returns []
 * 
 * @note Edge case handling: Returns empty array if date of birth is invalid or player is ineligible
 * @note Performance: Efficiently maps categories to events without redundant calculations
 */
export function getAllEligibleEvents(dob, gender) {
  const eligibleCategories = getEligibleCategories(dob);
  
  // Return empty array if no eligible categories
  if (!eligibleCategories || eligibleCategories.length === 0) {
    return [];
  }

  // Map each category to an object with category and events
  return eligibleCategories.map(category => ({
    category,
    events: getEventsForCategory(category, gender)
  }));
}
