/**
 * Unit tests for category utility
 * Tests boundary dates for each category and invalid date inputs
 * Requirements: 3.1-3.6
 */

import { getCategory, getEligibleCategories } from './category.js';

// Simple test runner
const tests = [];
let passed = 0;
let failed = 0;

function test(description, fn) {
  tests.push({ description, fn });
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      `${message}\n  Expected: ${expected}\n  Actual: ${actual}`
    );
  }
}

// ============================================================================
// U-9 Category Tests (Born on or after January 1, 2018)
// Requirement 3.1
// ============================================================================

test('U-9: Exact boundary date (2018-01-01) should return U-9', () => {
  const result = getCategory('2018-01-01');
  assertEquals(result, 'U-9', 'Date 2018-01-01 should be U-9');
});

test('U-9: Date after boundary (2018-06-15) should return U-9', () => {
  const result = getCategory('2018-06-15');
  assertEquals(result, 'U-9', 'Date 2018-06-15 should be U-9');
});

test('U-9: Date after boundary (2019-12-31) should return U-9', () => {
  const result = getCategory('2019-12-31');
  assertEquals(result, 'U-9', 'Date 2019-12-31 should be U-9');
});

test('U-9: Current year date (2024-01-01) should return U-9', () => {
  const result = getCategory('2024-01-01');
  assertEquals(result, 'U-9', 'Date 2024-01-01 should be U-9');
});

test('U-9: One day before boundary (2017-12-31) should NOT be U-9', () => {
  const result = getCategory('2017-12-31');
  assertEquals(result, 'U-11', 'Date 2017-12-31 should be U-11, not U-9');
});

// ============================================================================
// U-11 Category Tests (Born on or after January 1, 2016 and before January 1, 2018)
// Requirement 3.2
// ============================================================================

test('U-11: Exact lower boundary date (2016-01-01) should return U-11', () => {
  const result = getCategory('2016-01-01');
  assertEquals(result, 'U-11', 'Date 2016-01-01 should be U-11');
});

test('U-11: Date within range (2016-06-15) should return U-11', () => {
  const result = getCategory('2016-06-15');
  assertEquals(result, 'U-11', 'Date 2016-06-15 should be U-11');
});

test('U-11: Date within range (2017-06-15) should return U-11', () => {
  const result = getCategory('2017-06-15');
  assertEquals(result, 'U-11', 'Date 2017-06-15 should be U-11');
});

test('U-11: One day before upper boundary (2017-12-31) should return U-11', () => {
  const result = getCategory('2017-12-31');
  assertEquals(result, 'U-11', 'Date 2017-12-31 should be U-11');
});

test('U-11: One day before lower boundary (2015-12-31) should NOT be U-11', () => {
  const result = getCategory('2015-12-31');
  assertEquals(result, 'U-13', 'Date 2015-12-31 should be U-13, not U-11');
});

// ============================================================================
// U-13 Category Tests (Born on or after January 1, 2014 and before January 1, 2016)
// Requirement 3.3
// ============================================================================

test('U-13: Exact lower boundary date (2014-01-01) should return U-13', () => {
  const result = getCategory('2014-01-01');
  assertEquals(result, 'U-13', 'Date 2014-01-01 should be U-13');
});

test('U-13: Date within range (2014-06-15) should return U-13', () => {
  const result = getCategory('2014-06-15');
  assertEquals(result, 'U-13', 'Date 2014-06-15 should be U-13');
});

test('U-13: Date within range (2015-06-15) should return U-13', () => {
  const result = getCategory('2015-06-15');
  assertEquals(result, 'U-13', 'Date 2015-06-15 should be U-13');
});

test('U-13: One day before upper boundary (2015-12-31) should return U-13', () => {
  const result = getCategory('2015-12-31');
  assertEquals(result, 'U-13', 'Date 2015-12-31 should be U-13');
});

test('U-13: One day before lower boundary (2013-12-31) should NOT be U-13', () => {
  const result = getCategory('2013-12-31');
  assertEquals(result, 'U-15', 'Date 2013-12-31 should be U-15, not U-13');
});

// ============================================================================
// U-15 Category Tests (Born on or after January 1, 2012 and before January 1, 2014)
// Requirement 3.4
// ============================================================================

test('U-15: Exact lower boundary date (2012-01-01) should return U-15', () => {
  const result = getCategory('2012-01-01');
  assertEquals(result, 'U-15', 'Date 2012-01-01 should be U-15');
});

test('U-15: Date within range (2012-06-15) should return U-15', () => {
  const result = getCategory('2012-06-15');
  assertEquals(result, 'U-15', 'Date 2012-06-15 should be U-15');
});

test('U-15: Date within range (2013-06-15) should return U-15', () => {
  const result = getCategory('2013-06-15');
  assertEquals(result, 'U-15', 'Date 2013-06-15 should be U-15');
});

test('U-15: One day before upper boundary (2013-12-31) should return U-15', () => {
  const result = getCategory('2013-12-31');
  assertEquals(result, 'U-15', 'Date 2013-12-31 should be U-15');
});

test('U-15: One day before lower boundary (2011-12-31) should NOT be U-15', () => {
  const result = getCategory('2011-12-31');
  assertEquals(result, 'INELIGIBLE', 'Date 2011-12-31 should be INELIGIBLE, not U-15');
});

// ============================================================================
// INELIGIBLE Category Tests (Born before January 1, 2012)
// Requirement 3.5
// ============================================================================

test('INELIGIBLE: One day before U-15 boundary (2011-12-31) should return INELIGIBLE', () => {
  const result = getCategory('2011-12-31');
  assertEquals(result, 'INELIGIBLE', 'Date 2011-12-31 should be INELIGIBLE');
});

test('INELIGIBLE: Date well before boundary (2010-06-15) should return INELIGIBLE', () => {
  const result = getCategory('2010-06-15');
  assertEquals(result, 'INELIGIBLE', 'Date 2010-06-15 should be INELIGIBLE');
});

test('INELIGIBLE: Date well before boundary (2005-01-01) should return INELIGIBLE', () => {
  const result = getCategory('2005-01-01');
  assertEquals(result, 'INELIGIBLE', 'Date 2005-01-01 should be INELIGIBLE');
});

test('INELIGIBLE: Date well before boundary (2000-12-31) should return INELIGIBLE', () => {
  const result = getCategory('2000-12-31');
  assertEquals(result, 'INELIGIBLE', 'Date 2000-12-31 should be INELIGIBLE');
});

// ============================================================================
// Invalid Date Input Tests
// Testing edge cases and invalid inputs
// ============================================================================

test('Invalid: Empty string should return INELIGIBLE', () => {
  const result = getCategory('');
  assertEquals(result, 'INELIGIBLE', 'Empty string should return INELIGIBLE');
});

test('Invalid: Null should return INELIGIBLE', () => {
  const result = getCategory(null);
  assertEquals(result, 'INELIGIBLE', 'Null should return INELIGIBLE');
});

test('Invalid: Undefined should return INELIGIBLE', () => {
  const result = getCategory(undefined);
  assertEquals(result, 'INELIGIBLE', 'Undefined should return INELIGIBLE');
});

test('Invalid: Invalid date string should return INELIGIBLE', () => {
  const result = getCategory('invalid-date');
  assertEquals(result, 'INELIGIBLE', 'Invalid date string should return INELIGIBLE');
});

test('Invalid: Malformed date (wrong format) should return INELIGIBLE', () => {
  const result = getCategory('15-06-2018');
  assertEquals(result, 'INELIGIBLE', 'Malformed date should return INELIGIBLE');
});

test('Invalid: Date with invalid month should return INELIGIBLE', () => {
  const result = getCategory('2018-13-01');
  assertEquals(result, 'INELIGIBLE', 'Date with invalid month should return INELIGIBLE');
});

test('Invalid: Date with invalid day should return INELIGIBLE', () => {
  const result = getCategory('2018-01-32');
  assertEquals(result, 'INELIGIBLE', 'Date with invalid day should return INELIGIBLE');
});

// ============================================================================
// Edge Cases - Leap Year and Month Boundaries
// ============================================================================

test('Edge: Leap year date (2016-02-29) should return U-11', () => {
  const result = getCategory('2016-02-29');
  assertEquals(result, 'U-11', 'Leap year date 2016-02-29 should be U-11');
});

test('Edge: End of year (2018-12-31) should return U-9', () => {
  const result = getCategory('2018-12-31');
  assertEquals(result, 'U-9', 'Date 2018-12-31 should be U-9');
});

test('Edge: Start of year (2014-01-01) should return U-13', () => {
  const result = getCategory('2014-01-01');
  assertEquals(result, 'U-13', 'Date 2014-01-01 should be U-13');
});

// ============================================================================
// getEligibleCategories Tests - Multi-Category Eligibility
// Requirement 1.1, 1.2, 1.3, 1.4, 1.5
// ============================================================================

function assertArrayEquals(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `${message}\n  Expected: [${expected.join(', ')}]\n  Actual: [${actual.join(', ')}]`
    );
  }
}

test('getEligibleCategories: U-9 player (2018-01-01) should return all categories', () => {
  const result = getEligibleCategories('2018-01-01');
  assertArrayEquals(result, ['U-9', 'U-11', 'U-13', 'U-15'], 'U-9 player should be eligible for all categories');
});

test('getEligibleCategories: U-9 player (2019-06-15) should return all categories', () => {
  const result = getEligibleCategories('2019-06-15');
  assertArrayEquals(result, ['U-9', 'U-11', 'U-13', 'U-15'], 'U-9 player should be eligible for all categories');
});

test('getEligibleCategories: U-11 player (2016-01-01) should return U-11 and higher', () => {
  const result = getEligibleCategories('2016-01-01');
  assertArrayEquals(result, ['U-11', 'U-13', 'U-15'], 'U-11 player should be eligible for U-11, U-13, U-15');
});

test('getEligibleCategories: U-11 player (2017-12-31) should return U-11 and higher', () => {
  const result = getEligibleCategories('2017-12-31');
  assertArrayEquals(result, ['U-11', 'U-13', 'U-15'], 'U-11 player should be eligible for U-11, U-13, U-15');
});

test('getEligibleCategories: U-13 player (2014-01-01) should return U-13 and higher', () => {
  const result = getEligibleCategories('2014-01-01');
  assertArrayEquals(result, ['U-13', 'U-15'], 'U-13 player should be eligible for U-13, U-15');
});

test('getEligibleCategories: U-13 player (2015-06-15) should return U-13 and higher', () => {
  const result = getEligibleCategories('2015-06-15');
  assertArrayEquals(result, ['U-13', 'U-15'], 'U-13 player should be eligible for U-13, U-15');
});

test('getEligibleCategories: U-15 player (2012-01-01) should return only U-15', () => {
  const result = getEligibleCategories('2012-01-01');
  assertArrayEquals(result, ['U-15'], 'U-15 player should be eligible for U-15 only');
});

test('getEligibleCategories: U-15 player (2013-12-31) should return only U-15', () => {
  const result = getEligibleCategories('2013-12-31');
  assertArrayEquals(result, ['U-15'], 'U-15 player should be eligible for U-15 only');
});

test('getEligibleCategories: Ineligible player (2011-12-31) should return empty array', () => {
  const result = getEligibleCategories('2011-12-31');
  assertArrayEquals(result, [], 'Player born before 2012 should have no eligible categories');
});

test('getEligibleCategories: Ineligible player (2010-06-15) should return empty array', () => {
  const result = getEligibleCategories('2010-06-15');
  assertArrayEquals(result, [], 'Player born before 2012 should have no eligible categories');
});

test('getEligibleCategories: Invalid date (empty string) should return empty array', () => {
  const result = getEligibleCategories('');
  assertArrayEquals(result, [], 'Empty string should return empty array');
});

test('getEligibleCategories: Invalid date (null) should return empty array', () => {
  const result = getEligibleCategories(null);
  assertArrayEquals(result, [], 'Null should return empty array');
});

test('getEligibleCategories: Invalid date (undefined) should return empty array', () => {
  const result = getEligibleCategories(undefined);
  assertArrayEquals(result, [], 'Undefined should return empty array');
});

test('getEligibleCategories: Invalid date format should return empty array', () => {
  const result = getEligibleCategories('invalid-date');
  assertArrayEquals(result, [], 'Invalid date format should return empty array');
});

test('getEligibleCategories: Malformed date should return empty array', () => {
  const result = getEligibleCategories('15-06-2018');
  assertArrayEquals(result, [], 'Malformed date should return empty array');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running Category Utility Tests\n');
console.log('='.repeat(60));

tests.forEach(({ description, fn }) => {
  try {
    fn();
    passed++;
    console.log(`✓ ${description}`);
  } catch (error) {
    failed++;
    console.log(`✗ ${description}`);
    console.log(`  ${error.message}\n`);
  }
});

console.log('='.repeat(60));
console.log(`\nTotal: ${tests.length} | Passed: ${passed} | Failed: ${failed}\n`);

if (failed > 0) {
  process.exit(1);
}
