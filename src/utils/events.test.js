/**
 * Unit tests for event selection utility
 * Tests auto-assignment for each gender and Mixed Doubles availability by category
 * Requirements: 4.1-4.10
 */

import { getAutoEvents, getOptionalEvents } from './events.js';

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

function assertArrayLength(array, expectedLength, message) {
  if (array.length !== expectedLength) {
    throw new Error(
      `${message}\n  Expected length: ${expectedLength}\n  Actual length: ${array.length}`
    );
  }
}

function assertEventInArray(array, eventName, message) {
  const found = array.some(event => event.name === eventName);
  if (!found) {
    const eventNames = array.map(e => e.name).join(', ');
    throw new Error(
      `${message}\n  Expected to find: ${eventName}\n  Found events: ${eventNames || 'none'}`
    );
  }
}

function assertEventNotInArray(array, eventName, message) {
  const found = array.some(event => event.name === eventName);
  if (found) {
    throw new Error(
      `${message}\n  Expected NOT to find: ${eventName}\n  But it was present`
    );
  }
}

// ============================================================================
// getAutoEvents Tests - Male Players
// Requirement 4.1: Male players automatically get Boys Singles
// ============================================================================

test('Auto-assign: Male U-9 should get Boys Singles', () => {
  const result = getAutoEvents('Male', 'U-9');
  assertArrayLength(result, 1, 'Male U-9 should have 1 auto event');
  assertEventInArray(result, 'Boys Singles', 'Male U-9 should have Boys Singles');
  assertEquals(result[0].fee, 600, 'Boys Singles fee should be 600');
  assertEquals(result[0].mandatory, true, 'Boys Singles should be mandatory');
});

test('Auto-assign: Male U-11 should get Boys Singles', () => {
  const result = getAutoEvents('Male', 'U-11');
  assertArrayLength(result, 1, 'Male U-11 should have 1 auto event');
  assertEventInArray(result, 'Boys Singles', 'Male U-11 should have Boys Singles');
});

test('Auto-assign: Male U-13 should get Boys Singles', () => {
  const result = getAutoEvents('Male', 'U-13');
  assertArrayLength(result, 1, 'Male U-13 should have 1 auto event');
  assertEventInArray(result, 'Boys Singles', 'Male U-13 should have Boys Singles');
});

test('Auto-assign: Male U-15 should get Boys Singles', () => {
  const result = getAutoEvents('Male', 'U-15');
  assertArrayLength(result, 1, 'Male U-15 should have 1 auto event');
  assertEventInArray(result, 'Boys Singles', 'Male U-15 should have Boys Singles');
});

// ============================================================================
// getAutoEvents Tests - Female Players
// Requirement 4.2: Female players automatically get Girls Singles
// ============================================================================

test('Auto-assign: Female U-9 should get Girls Singles', () => {
  const result = getAutoEvents('Female', 'U-9');
  assertArrayLength(result, 1, 'Female U-9 should have 1 auto event');
  assertEventInArray(result, 'Girls Singles', 'Female U-9 should have Girls Singles');
  assertEquals(result[0].fee, 600, 'Girls Singles fee should be 600');
  assertEquals(result[0].mandatory, true, 'Girls Singles should be mandatory');
});

test('Auto-assign: Female U-11 should get Girls Singles', () => {
  const result = getAutoEvents('Female', 'U-11');
  assertArrayLength(result, 1, 'Female U-11 should have 1 auto event');
  assertEventInArray(result, 'Girls Singles', 'Female U-11 should have Girls Singles');
});

test('Auto-assign: Female U-13 should get Girls Singles', () => {
  const result = getAutoEvents('Female', 'U-13');
  assertArrayLength(result, 1, 'Female U-13 should have 1 auto event');
  assertEventInArray(result, 'Girls Singles', 'Female U-13 should have Girls Singles');
});

test('Auto-assign: Female U-15 should get Girls Singles', () => {
  const result = getAutoEvents('Female', 'U-15');
  assertArrayLength(result, 1, 'Female U-15 should have 1 auto event');
  assertEventInArray(result, 'Girls Singles', 'Female U-15 should have Girls Singles');
});

// ============================================================================
// getAutoEvents Tests - Invalid Inputs
// ============================================================================

test('Auto-assign: INELIGIBLE category should return empty array', () => {
  const result = getAutoEvents('Male', 'INELIGIBLE');
  assertArrayLength(result, 0, 'INELIGIBLE should return no auto events');
});

test('Auto-assign: Empty gender should return empty array', () => {
  const result = getAutoEvents('', 'U-9');
  assertArrayLength(result, 0, 'Empty gender should return no auto events');
});

test('Auto-assign: Null gender should return empty array', () => {
  const result = getAutoEvents(null, 'U-9');
  assertArrayLength(result, 0, 'Null gender should return no auto events');
});

test('Auto-assign: Empty category should return empty array', () => {
  const result = getAutoEvents('Male', '');
  assertArrayLength(result, 0, 'Empty category should return no auto events');
});

// ============================================================================
// getOptionalEvents Tests - Male Players (Doubles)
// Requirement 4.4: Boys Doubles available for Male players (all categories)
// ============================================================================

test('Optional: Male U-9 should have Boys Doubles available', () => {
  const result = getOptionalEvents('Male', 'U-9');
  assertEventInArray(result, 'Boys Doubles', 'Male U-9 should have Boys Doubles');
  const doublesEvent = result.find(e => e.name === 'Boys Doubles');
  assertEquals(doublesEvent.fee, 1000, 'Boys Doubles fee should be 1000');
  assertEquals(doublesEvent.mandatory, false, 'Boys Doubles should be optional');
});

test('Optional: Male U-11 should have Boys Doubles available', () => {
  const result = getOptionalEvents('Male', 'U-11');
  assertEventInArray(result, 'Boys Doubles', 'Male U-11 should have Boys Doubles');
});

test('Optional: Male U-13 should have Boys Doubles available', () => {
  const result = getOptionalEvents('Male', 'U-13');
  assertEventInArray(result, 'Boys Doubles', 'Male U-13 should have Boys Doubles');
});

test('Optional: Male U-15 should have Boys Doubles available', () => {
  const result = getOptionalEvents('Male', 'U-15');
  assertEventInArray(result, 'Boys Doubles', 'Male U-15 should have Boys Doubles');
});

// ============================================================================
// getOptionalEvents Tests - Female Players (Doubles)
// Requirement 4.5: Girls Doubles available for Female players (all categories)
// ============================================================================

test('Optional: Female U-9 should have Girls Doubles available', () => {
  const result = getOptionalEvents('Female', 'U-9');
  assertEventInArray(result, 'Girls Doubles', 'Female U-9 should have Girls Doubles');
  const doublesEvent = result.find(e => e.name === 'Girls Doubles');
  assertEquals(doublesEvent.fee, 1000, 'Girls Doubles fee should be 1000');
  assertEquals(doublesEvent.mandatory, false, 'Girls Doubles should be optional');
});

test('Optional: Female U-11 should have Girls Doubles available', () => {
  const result = getOptionalEvents('Female', 'U-11');
  assertEventInArray(result, 'Girls Doubles', 'Female U-11 should have Girls Doubles');
});

test('Optional: Female U-13 should have Girls Doubles available', () => {
  const result = getOptionalEvents('Female', 'U-13');
  assertEventInArray(result, 'Girls Doubles', 'Female U-13 should have Girls Doubles');
});

test('Optional: Female U-15 should have Girls Doubles available', () => {
  const result = getOptionalEvents('Female', 'U-15');
  assertEventInArray(result, 'Girls Doubles', 'Female U-15 should have Girls Doubles');
});

// ============================================================================
// getOptionalEvents Tests - Mixed Doubles Availability
// Requirement 4.6: Mixed Doubles available only for U-13 and U-15
// Requirement 4.7: Mixed Doubles NOT available for U-9 and U-11
// ============================================================================

test('Optional: Male U-9 should NOT have Mixed Doubles', () => {
  const result = getOptionalEvents('Male', 'U-9');
  assertEventNotInArray(result, 'Mixed Doubles', 'Male U-9 should NOT have Mixed Doubles');
  assertArrayLength(result, 1, 'Male U-9 should have only 1 optional event (Boys Doubles)');
});

test('Optional: Male U-11 should NOT have Mixed Doubles', () => {
  const result = getOptionalEvents('Male', 'U-11');
  assertEventNotInArray(result, 'Mixed Doubles', 'Male U-11 should NOT have Mixed Doubles');
  assertArrayLength(result, 1, 'Male U-11 should have only 1 optional event (Boys Doubles)');
});

test('Optional: Male U-13 should have Mixed Doubles', () => {
  const result = getOptionalEvents('Male', 'U-13');
  assertEventInArray(result, 'Mixed Doubles', 'Male U-13 should have Mixed Doubles');
  assertArrayLength(result, 2, 'Male U-13 should have 2 optional events');
  const mixedEvent = result.find(e => e.name === 'Mixed Doubles');
  assertEquals(mixedEvent.fee, 1000, 'Mixed Doubles fee should be 1000');
  assertEquals(mixedEvent.mandatory, false, 'Mixed Doubles should be optional');
});

test('Optional: Male U-15 should have Mixed Doubles', () => {
  const result = getOptionalEvents('Male', 'U-15');
  assertEventInArray(result, 'Mixed Doubles', 'Male U-15 should have Mixed Doubles');
  assertArrayLength(result, 2, 'Male U-15 should have 2 optional events');
});

test('Optional: Female U-9 should NOT have Mixed Doubles', () => {
  const result = getOptionalEvents('Female', 'U-9');
  assertEventNotInArray(result, 'Mixed Doubles', 'Female U-9 should NOT have Mixed Doubles');
  assertArrayLength(result, 1, 'Female U-9 should have only 1 optional event (Girls Doubles)');
});

test('Optional: Female U-11 should NOT have Mixed Doubles', () => {
  const result = getOptionalEvents('Female', 'U-11');
  assertEventNotInArray(result, 'Mixed Doubles', 'Female U-11 should NOT have Mixed Doubles');
  assertArrayLength(result, 1, 'Female U-11 should have only 1 optional event (Girls Doubles)');
});

test('Optional: Female U-13 should have Mixed Doubles', () => {
  const result = getOptionalEvents('Female', 'U-13');
  assertEventInArray(result, 'Mixed Doubles', 'Female U-13 should have Mixed Doubles');
  assertArrayLength(result, 2, 'Female U-13 should have 2 optional events');
});

test('Optional: Female U-15 should have Mixed Doubles', () => {
  const result = getOptionalEvents('Female', 'U-15');
  assertEventInArray(result, 'Mixed Doubles', 'Female U-15 should have Mixed Doubles');
  assertArrayLength(result, 2, 'Female U-15 should have 2 optional events');
});

// ============================================================================
// getOptionalEvents Tests - Invalid Inputs
// ============================================================================

test('Optional: INELIGIBLE category should return empty array', () => {
  const result = getOptionalEvents('Male', 'INELIGIBLE');
  assertArrayLength(result, 0, 'INELIGIBLE should return no optional events');
});

test('Optional: Empty gender should return empty array', () => {
  const result = getOptionalEvents('', 'U-9');
  assertArrayLength(result, 0, 'Empty gender should return no optional events');
});

test('Optional: Null category should return empty array', () => {
  const result = getOptionalEvents('Male', null);
  assertArrayLength(result, 0, 'Null category should return no optional events');
});

// ============================================================================
// Integration Tests - Complete Event Selection
// ============================================================================

test('Integration: Male U-13 should have Boys Singles (auto) + Boys Doubles + Mixed Doubles (optional)', () => {
  const autoEvents = getAutoEvents('Male', 'U-13');
  const optionalEvents = getOptionalEvents('Male', 'U-13');
  
  assertArrayLength(autoEvents, 1, 'Should have 1 auto event');
  assertArrayLength(optionalEvents, 2, 'Should have 2 optional events');
  
  assertEventInArray(autoEvents, 'Boys Singles', 'Should have Boys Singles auto-assigned');
  assertEventInArray(optionalEvents, 'Boys Doubles', 'Should have Boys Doubles available');
  assertEventInArray(optionalEvents, 'Mixed Doubles', 'Should have Mixed Doubles available');
});

test('Integration: Female U-9 should have Girls Singles (auto) + Girls Doubles (optional) only', () => {
  const autoEvents = getAutoEvents('Female', 'U-9');
  const optionalEvents = getOptionalEvents('Female', 'U-9');
  
  assertArrayLength(autoEvents, 1, 'Should have 1 auto event');
  assertArrayLength(optionalEvents, 1, 'Should have 1 optional event');
  
  assertEventInArray(autoEvents, 'Girls Singles', 'Should have Girls Singles auto-assigned');
  assertEventInArray(optionalEvents, 'Girls Doubles', 'Should have Girls Doubles available');
  assertEventNotInArray(optionalEvents, 'Mixed Doubles', 'Should NOT have Mixed Doubles for U-9');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running Event Selection Utility Tests\n');
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
