/**
 * Unit tests for fee calculation utility
 * Tests fee calculation for various event combinations and edge cases
 * Requirements: 5.1-5.7
 */

import { calculateFee } from './fee.js';

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
// Single Event Tests
// Requirements 5.1, 5.2, 5.3: Singles ₹600, Doubles ₹1000, Mixed Doubles ₹1000
// ============================================================================

test('Single event: Boys Singles should calculate ₹600', () => {
  const events = [{ name: 'Boys Singles', fee: 600, mandatory: true }];
  const result = calculateFee(events);
  assertEquals(result, 600, 'Boys Singles fee should be 600');
});

test('Single event: Girls Singles should calculate ₹600', () => {
  const events = [{ name: 'Girls Singles', fee: 600, mandatory: true }];
  const result = calculateFee(events);
  assertEquals(result, 600, 'Girls Singles fee should be 600');
});

test('Single event: Boys Doubles should calculate ₹1000', () => {
  const events = [{ name: 'Boys Doubles', fee: 1000, mandatory: false }];
  const result = calculateFee(events);
  assertEquals(result, 1000, 'Boys Doubles fee should be 1000');
});

test('Single event: Girls Doubles should calculate ₹1000', () => {
  const events = [{ name: 'Girls Doubles', fee: 1000, mandatory: false }];
  const result = calculateFee(events);
  assertEquals(result, 1000, 'Girls Doubles fee should be 1000');
});

test('Single event: Mixed Doubles should calculate ₹1000', () => {
  const events = [{ name: 'Mixed Doubles', fee: 1000, mandatory: false }];
  const result = calculateFee(events);
  assertEquals(result, 1000, 'Mixed Doubles fee should be 1000');
});

// ============================================================================
// Two Event Combinations
// Requirement 5.4: Display total as sum of all selected event fees
// ============================================================================

test('Two events: Boys Singles + Boys Doubles should calculate ₹1600', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true },
    { name: 'Boys Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Boys Singles + Boys Doubles should be 1600');
});

test('Two events: Girls Singles + Girls Doubles should calculate ₹1600', () => {
  const events = [
    { name: 'Girls Singles', fee: 600, mandatory: true },
    { name: 'Girls Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Girls Singles + Girls Doubles should be 1600');
});

test('Two events: Boys Singles + Mixed Doubles should calculate ₹1600', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Boys Singles + Mixed Doubles should be 1600');
});

test('Two events: Girls Singles + Mixed Doubles should calculate ₹1600', () => {
  const events = [
    { name: 'Girls Singles', fee: 600, mandatory: true },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Girls Singles + Mixed Doubles should be 1600');
});

// ============================================================================
// Three Event Combinations (Maximum possible)
// Requirement 5.4: Display total as sum of all selected event fees
// ============================================================================

test('Three events: Boys Singles + Boys Doubles + Mixed Doubles should calculate ₹2600', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true },
    { name: 'Boys Doubles', fee: 1000, mandatory: false },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 2600, 'All three events should total 2600');
});

test('Three events: Girls Singles + Girls Doubles + Mixed Doubles should calculate ₹2600', () => {
  const events = [
    { name: 'Girls Singles', fee: 600, mandatory: true },
    { name: 'Girls Doubles', fee: 1000, mandatory: false },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 2600, 'All three events should total 2600');
});

// ============================================================================
// Empty and Invalid Input Tests
// Testing edge cases and error handling
// ============================================================================

test('Empty array: Should return ₹0', () => {
  const events = [];
  const result = calculateFee(events);
  assertEquals(result, 0, 'Empty array should return 0');
});

test('Invalid input: Null should return ₹0', () => {
  const result = calculateFee(null);
  assertEquals(result, 0, 'Null input should return 0');
});

test('Invalid input: Undefined should return ₹0', () => {
  const result = calculateFee(undefined);
  assertEquals(result, 0, 'Undefined input should return 0');
});

test('Invalid input: Non-array (string) should return ₹0', () => {
  const result = calculateFee('not an array');
  assertEquals(result, 0, 'Non-array input should return 0');
});

test('Invalid input: Non-array (number) should return ₹0', () => {
  const result = calculateFee(123);
  assertEquals(result, 0, 'Non-array input should return 0');
});

test('Invalid input: Non-array (object) should return ₹0', () => {
  const result = calculateFee({ name: 'event', fee: 600 });
  assertEquals(result, 0, 'Non-array input should return 0');
});

// ============================================================================
// Edge Cases - Events with Missing or Invalid Fee Properties
// ============================================================================

test('Edge case: Event with missing fee property should treat as ₹0', () => {
  const events = [
    { name: 'Boys Singles', mandatory: true }
  ];
  const result = calculateFee(events);
  assertEquals(result, 0, 'Event without fee property should contribute 0');
});

test('Edge case: Event with null fee should treat as ₹0', () => {
  const events = [
    { name: 'Boys Singles', fee: null, mandatory: true }
  ];
  const result = calculateFee(events);
  assertEquals(result, 0, 'Event with null fee should contribute 0');
});

test('Edge case: Event with undefined fee should treat as ₹0', () => {
  const events = [
    { name: 'Boys Singles', fee: undefined, mandatory: true }
  ];
  const result = calculateFee(events);
  assertEquals(result, 0, 'Event with undefined fee should contribute 0');
});

test('Edge case: Mixed valid and invalid fees should sum only valid fees', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true },
    { name: 'Boys Doubles', fee: null, mandatory: false },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Should sum only valid fees (600 + 0 + 1000)');
});

test('Edge case: Event with zero fee should calculate correctly', () => {
  const events = [
    { name: 'Free Event', fee: 0, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 0, 'Event with zero fee should return 0');
});

test('Edge case: Multiple events with zero fees should return ₹0', () => {
  const events = [
    { name: 'Free Event 1', fee: 0, mandatory: false },
    { name: 'Free Event 2', fee: 0, mandatory: false }
  ];
  const result = calculateFee(events);
  assertEquals(result, 0, 'Multiple zero-fee events should return 0');
});

// ============================================================================
// Real-World Scenario Tests
// Testing typical user registration scenarios
// ============================================================================

test('Scenario: Male U-9 with only mandatory Singles', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true, category: 'U-9' }
  ];
  const result = calculateFee(events);
  assertEquals(result, 600, 'Male U-9 with only Singles should be 600');
});

test('Scenario: Female U-11 with Singles and Doubles', () => {
  const events = [
    { name: 'Girls Singles', fee: 600, mandatory: true, category: 'U-11' },
    { name: 'Girls Doubles', fee: 1000, mandatory: false, category: 'U-11' }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Female U-11 with Singles + Doubles should be 1600');
});

test('Scenario: Male U-13 with all three events', () => {
  const events = [
    { name: 'Boys Singles', fee: 600, mandatory: true, category: 'U-13' },
    { name: 'Boys Doubles', fee: 1000, mandatory: false, category: 'U-13' },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false, category: 'U-13' }
  ];
  const result = calculateFee(events);
  assertEquals(result, 2600, 'Male U-13 with all events should be 2600');
});

test('Scenario: Female U-15 with Singles and Mixed Doubles only', () => {
  const events = [
    { name: 'Girls Singles', fee: 600, mandatory: true, category: 'U-15' },
    { name: 'Mixed Doubles', fee: 1000, mandatory: false, category: 'U-15' }
  ];
  const result = calculateFee(events);
  assertEquals(result, 1600, 'Female U-15 with Singles + Mixed should be 1600');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running Fee Calculation Utility Tests\n');
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
