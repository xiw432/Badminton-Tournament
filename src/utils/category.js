// Category determination utility
// Determines player age categories for badminton tournament registration

/**
 * Determines the age category based on date of birth.
 * 
 * Categories are determined by comparing the date of birth against fixed cutoff dates:
 * - U-9: Born on or after January 1, 2018
 * - U-11: Born on or after January 1, 2016 and before January 1, 2018
 * - U-13: Born on or after January 1, 2014 and before January 1, 2016
 * - U-15: Born on or after January 1, 2012 and before January 1, 2014
 * - INELIGIBLE: Born before January 1, 2012
 * 
 * @param {string} dob - Date of birth in YYYY-MM-DD format (e.g., "2015-06-15")
 * @returns {string} Category: "U-9" | "U-11" | "U-13" | "U-15" | "INELIGIBLE"
 * 
 * @example
 * getCategory("2018-01-01") // Returns "U-9"
 * getCategory("2017-12-31") // Returns "U-11"
 * getCategory("2015-06-15") // Returns "U-11"
 * getCategory("2011-12-31") // Returns "INELIGIBLE"
 * 
 * @example
 * // Edge cases
 * getCategory(null) // Returns "INELIGIBLE"
 * getCategory("") // Returns "INELIGIBLE"
 * getCategory("invalid-date") // Returns "INELIGIBLE"
 * 
 * @note Edge case handling: Returns "INELIGIBLE" for null, empty, or invalid date inputs
 */
export function getCategory(dob) {
  if (!dob) {
    return "INELIGIBLE";
  }

  // Parse the date of birth
  const birthDate = new Date(dob);
  
  // Define category cutoff dates
  // Players born on or after these dates qualify for the respective category
  const U9_CUTOFF = new Date("2018-01-01");
  const U11_CUTOFF = new Date("2016-01-01");
  const U13_CUTOFF = new Date("2014-01-01");
  const U15_CUTOFF = new Date("2012-01-01");

  // Determine category by comparing birth date with cutoffs
  // Check from youngest to oldest category
  if (birthDate >= U9_CUTOFF) {
    return "U-9";
  } else if (birthDate >= U11_CUTOFF) {
    return "U-11";
  } else if (birthDate >= U13_CUTOFF) {
    return "U-13";
  } else if (birthDate >= U15_CUTOFF) {
    return "U-15";
  } else {
    return "INELIGIBLE";
  }
}

/**
 * Determines all eligible age categories for a player based on date of birth.
 * Players are eligible for their age category AND all higher (older) categories.
 * 
 * This function implements the multi-category eligibility model where younger players
 * can compete in older age groups, providing greater flexibility and participation opportunities.
 * 
 * Categories are determined by comparing the date of birth against fixed cutoff dates:
 * - Born on or after January 1, 2018: ["U-9", "U-11", "U-13", "U-15"]
 * - Born on or after January 1, 2016 and before January 1, 2018: ["U-11", "U-13", "U-15"]
 * - Born on or after January 1, 2014 and before January 1, 2016: ["U-13", "U-15"]
 * - Born on or after January 1, 2012 and before January 1, 2014: ["U-15"]
 * - Born before January 1, 2012: []
 * 
 * @param {string} dob - Date of birth in YYYY-MM-DD format (e.g., "2015-06-15")
 * @returns {string[]} Array of eligible categories ordered from youngest to oldest, or empty array if ineligible or invalid date
 * 
 * @example
 * // U-9 player eligible for all categories
 * getEligibleCategories("2018-01-01") // Returns ["U-9", "U-11", "U-13", "U-15"]
 * 
 * @example
 * // U-11 player eligible for U-11 and higher
 * getEligibleCategories("2017-12-31") // Returns ["U-11", "U-13", "U-15"]
 * getEligibleCategories("2015-06-15") // Returns ["U-11", "U-13", "U-15"]
 * 
 * @example
 * // U-13 and U-15 players
 * getEligibleCategories("2013-01-01") // Returns ["U-13", "U-15"]
 * getEligibleCategories("2012-01-01") // Returns ["U-15"]
 * 
 * @example
 * // Ineligible and edge cases
 * getEligibleCategories("2011-12-31") // Returns []
 * getEligibleCategories("invalid") // Returns []
 * getEligibleCategories(null) // Returns []
 * getEligibleCategories("") // Returns []
 * 
 * @note Edge case handling: Returns empty array for null, empty, invalid date inputs, or players born before January 1, 2012
 * @note Date validation: Uses JavaScript Date parsing which handles invalid dates by returning NaN for getTime()
 */
export function getEligibleCategories(dob) {
  // Handle missing or invalid date
  if (!dob) {
    return [];
  }

  // Parse the date of birth
  const birthDate = new Date(dob);
  
  // Check if date is invalid (Invalid Date)
  if (isNaN(birthDate.getTime())) {
    return [];
  }
  
  // Define category cutoff dates
  const U9_CUTOFF = new Date("2018-01-01");
  const U11_CUTOFF = new Date("2016-01-01");
  const U13_CUTOFF = new Date("2014-01-01");
  const U15_CUTOFF = new Date("2012-01-01");

  // Determine eligible categories based on birth date
  // Players are eligible for their category and all higher categories
  if (birthDate >= U9_CUTOFF) {
    return ["U-9", "U-11", "U-13", "U-15"];
  } else if (birthDate >= U11_CUTOFF) {
    return ["U-11", "U-13", "U-15"];
  } else if (birthDate >= U13_CUTOFF) {
    return ["U-13", "U-15"];
  } else if (birthDate >= U15_CUTOFF) {
    return ["U-15"];
  } else {
    return [];
  }
}
