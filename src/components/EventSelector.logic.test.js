/**
 * EventSelector logic tests
 * Tests event selection logic without rendering
 * Requirements: 1.4, 4.3, 4.8, 7.1, 7.3, 7.4
 */

import { getAutoEvents, getOptionalEvents } from '../utils/events.js';
import { calculateFee } from '../utils/fee.js';

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

function assertArrayLength(array, length, message) {
  if (array.length !== length) {
    throw new Error(
      `${message}\n  Expected length: ${length}\n  Actual length: ${array.length}`
    );
  }
}

function assertContains(array, value, message) {
  const found = array.some(item => item.name === value);
  if (!found) {
    throw new Error(
      `${message}\n  Expected array to contain: ${value}\n  Array: ${JSON.stringify(array.map(i => i.name))}`
    );
  }
}

// ============================================================================
// Event Selection Logic Tests
// ============================================================================

test('Male U-9: Should get Boys Singles as mandatory event', () => {
  const autoEvents = getAutoEvents('Male', 'U-9');
  assertArrayLength(autoEvents, 1, 'Should have 1 auto event');
  assertEquals(autoEvents[0].name, 'Boys Singles', 'Should be Boys Singles');
  assertEquals(autoEvents[0].mandatory, true, 'Should be mandatory');
  assertEquals(autoEvents[0].fee, 600, 'Should cost ₹600');
});

test('Female U-11: Should get Girls Singles as mandatory event', () => {
  const autoEvents = getAutoEvents('Female', 'U-11');
  assertArrayLength(autoEvents, 1, 'Should have 1 auto event');
  assertEquals(autoEvents[0].name, 'Girls Singles', 'Should be Girls Singles');
  assertEquals(autoEvents[0].mandatory, true, 'Should be mandatory');
  assertEquals(autoEvents[0].fee, 600, 'Should cost ₹600');
});

test('Male U-9: Should have Boys Doubles as optional', () => {
  const optionalEvents = getOptionalEvents('Male', 'U-9');
  assertArrayLength(optionalEvents, 1, 'Should have 1 optional event (no Mixed for U-9)');
  assertEquals(optionalEvents[0].name, 'Boys Doubles', 'Should be Boys Doubles');
  assertEquals(optionalEvents[0].mandatory, false, 'Should be optional');
  assertEquals(optionalEvents[0].fee, 1000, 'Should cost ₹1000');
});

test('Female U-11: Should have Girls Doubles as optional', () => {
  const optionalEvents = getOptionalEvents('Female', 'U-11');
  assertArrayLength(optionalEvents, 1, 'Should have 1 optional event (no Mixed for U-11)');
  assertEquals(optionalEvents[0].name, 'Girls Doubles', 'Should be Girls Doubles');
  assertEquals(optionalEvents[0].mandatory, false, 'Should be optional');
});

test('Male U-13: Should have Boys Doubles and Mixed Doubles as optional', () => {
  const optionalEvents = getOptionalEvents('Male', 'U-13');
  assertArrayLength(optionalEvents, 2, 'Should have 2 optional events');
  assertContains(optionalEvents, 'Boys Doubles', 'Should include Boys Doubles');
  assertContains(optionalEvents, 'Mixed Doubles', 'Should include Mixed Doubles');
});

test('Female U-15: Should have Girls Doubles and Mixed Doubles as optional', () => {
  const optionalEvents = getOptionalEvents('Female', 'U-15');
  assertArrayLength(optionalEvents, 2, 'Should have 2 optional events');
  assertContains(optionalEvents, 'Girls Doubles', 'Should include Girls Doubles');
  assertContains(optionalEvents, 'Mixed Doubles', 'Should include Mixed Doubles');
});

test('Male U-9: Should NOT have Mixed Doubles available', () => {
  const optionalEvents = getOptionalEvents('Male', 'U-9');
  const hasMixed = optionalEvents.some(e => e.name === 'Mixed Doubles');
  assertEquals(hasMixed, false, 'U-9 should not have Mixed Doubles');
});

test('Female U-11: Should NOT have Mixed Doubles available', () => {
  const optionalEvents = getOptionalEvents('Female', 'U-11');
  const hasMixed = optionalEvents.some(e => e.name === 'Mixed Doubles');
  assertEquals(hasMixed, false, 'U-11 should not have Mixed Doubles');
});

// ============================================================================
// Fee Calculation Tests
// ============================================================================

test('Fee: Singles only should be ₹600', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true }
  ];
  const total = calculateFee(events);
  assertEquals(total, 600, 'Singles only should be ₹600');
});

test('Fee: Singles + Doubles should be ₹1600', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true },
    { name: 'Boys Doubles', fee: 1000, mandatory: false }
  ];
  const total = calculateFee(events);
  assertEquals(total, 1600, 'Singles + Doubles should be ₹1600');
});

test('Fee: All three events should be ₹2600', () => {
  const events = [
    { name: 'Girls Singles', fee: 600, mandatory: true },
    { name: 'Girls Doubles', fee: 1000, mandatory: false },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false }
  ];
  const total = calculateFee(events);
  assertEquals(total, 2600, 'All three events should be ₹2600');
});

// ============================================================================
// Complete Event Selection Scenarios
// ============================================================================

test('Scenario: Male U-9 with no optional events selected', () => {
  const autoEvents = getAutoEvents('Male', 'U-9');
  const selectedEvents = [...autoEvents];
  const total = calculateFee(selectedEvents);
  
  assertArrayLength(selectedEvents, 1, 'Should have 1 event');
  assertEquals(total, 600, 'Total should be ₹600');
});

test('Scenario: Female U-11 with Doubles selected', () => {
  const autoEvents = getAutoEvents('Female', 'U-11');
  const optionalEvents = getOptionalEvents('Female', 'U-11');
  const doublesEvent = optionalEvents.find(e => e.name.includes('Doubles') && !e.name.includes('Mixed'));
  
  const selectedEvents = [...autoEvents, doublesEvent];
  const total = calculateFee(selectedEvents);
  
  assertArrayLength(selectedEvents, 2, 'Should have 2 events');
  assertEquals(total, 1600, 'Total should be ₹1600');
});

test('Scenario: Male U-13 with all events selected', () => {
  const autoEvents = getAutoEvents('Male', 'U-13');
  const optionalEvents = getOptionalEvents('Male', 'U-13');
  
  const selectedEvents = [...autoEvents, ...optionalEvents];
  const total = calculateFee(selectedEvents);
  
  assertArrayLength(selectedEvents, 3, 'Should have 3 events');
  assertEquals(total, 2600, 'Total should be ₹2600');
});

test('Scenario: Female U-15 with Singles and Mixed only', () => {
  const autoEvents = getAutoEvents('Female', 'U-15');
  const optionalEvents = getOptionalEvents('Female', 'U-15');
  const mixedEvent = optionalEvents.find(e => e.name === 'Mixed Doubles');
  
  const selectedEvents = [...autoEvents, mixedEvent];
  const total = calculateFee(selectedEvents);
  
  assertArrayLength(selectedEvents, 2, 'Should have 2 events');
  assertEquals(total, 1600, 'Total should be ₹1600');
});

// ============================================================================
// Edge Cases
// ============================================================================

test('Edge: INELIGIBLE category should return empty auto events', () => {
  const autoEvents = getAutoEvents('Male', 'INELIGIBLE');
  assertArrayLength(autoEvents, 0, 'INELIGIBLE should have no auto events');
});

test('Edge: INELIGIBLE category should return empty optional events', () => {
  const optionalEvents = getOptionalEvents('Male', 'INELIGIBLE');
  assertArrayLength(optionalEvents, 0, 'INELIGIBLE should have no optional events');
});

test('Edge: Empty gender should return empty auto events', () => {
  const autoEvents = getAutoEvents('', 'U-11');
  assertArrayLength(autoEvents, 0, 'Empty gender should have no auto events');
});

test('Edge: Empty category should return empty optional events', () => {
  const optionalEvents = getOptionalEvents('Male', '');
  assertArrayLength(optionalEvents, 0, 'Empty category should have no optional events');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running EventSelector Logic Tests\n');
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
