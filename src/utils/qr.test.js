/**
 * Unit tests for QR code generation utility
 * Tests QR code URL generation with registration data
 * Requirements: 6.1, 6.2, 6.3, 6.6
 */

import { generateQR } from './qr.js';

// Simple test runner
const tests = [];
let passed = 0;
let failed = 0;

function test(description, fn) {
  tests.push({ description, fn });
}

function assertTrue(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertContains(str, substring, message) {
  if (!str.includes(substring)) {
    throw new Error(`${message}\n  Expected string to contain: ${substring}\n  Actual: ${str}`);
  }
}

// ============================================================================
// QR Code URL Generation Tests
// Requirements: 6.1, 6.2, 6.3, 6.6
// ============================================================================

test('Should generate QR code URL with all registration data', () => {
  const registrationData = {
    playerId: 'LKO2026-0001',
    name: 'John Doe',
    category: 'U-13',
    events: [
      { name: 'Boys Singles', fee: 600 },
      { name: 'Boys Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  const qrUrl = generateQR(registrationData);

  // Verify URL structure (Requirement 6.3)
  assertContains(qrUrl, 'https://api.qrserver.com/v1/create-qr-code/', 'Should use QR Server API');
  assertContains(qrUrl, 'size=300x300', 'Should specify size');
  assertContains(qrUrl, 'bgcolor=FFFFFF', 'Should use white background (Requirement 6.6)');
  assertContains(qrUrl, 'color=0B1D3A', 'Should use navy blue foreground (Requirement 6.6)');
  
  // Verify data is encoded in URL (Requirement 6.1)
  assertContains(qrUrl, 'LKO2026-0001', 'Should include player ID');
  assertContains(qrUrl, 'John%20Doe', 'Should include player name');
  assertContains(qrUrl, 'U-13', 'Should include category');
  assertContains(qrUrl, 'Boys%20Singles', 'Should include first event');
  assertContains(qrUrl, 'Boys%20Doubles', 'Should include second event');
  assertContains(qrUrl, '1600', 'Should include total fee');
});

test('Should handle single event registration', () => {
  const registrationData = {
    playerId: 'LKO2026-0002',
    name: 'Jane Smith',
    category: 'U-9',
    events: [
      { name: 'Girls Singles', fee: 600 }
    ],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  assertContains(qrUrl, 'Girls%20Singles', 'Should include event name');
  assertContains(qrUrl, '600', 'Should include fee');
  assertContains(qrUrl, 'U-9', 'Should include category');
});

test('Should handle multiple events including mixed doubles', () => {
  const registrationData = {
    playerId: 'LKO2026-0003',
    name: 'Alex Johnson',
    category: 'U-15',
    events: [
      { name: 'Boys Singles', fee: 600 },
      { name: 'Boys Doubles', fee: 1000 },
      { name: 'Mixed Doubles', fee: 1000 }
    ],
    totalFee: 2600
  };

  const qrUrl = generateQR(registrationData);

  assertContains(qrUrl, 'Boys%20Singles', 'Should include singles event');
  assertContains(qrUrl, 'Boys%20Doubles', 'Should include doubles event');
  assertContains(qrUrl, 'Mixed%20Doubles', 'Should include mixed doubles event');
  assertContains(qrUrl, '2600', 'Should include total fee');
});

test('Should properly encode special characters in names', () => {
  const registrationData = {
    playerId: 'LKO2026-0004',
    name: "O'Brien & Sons",
    category: 'U-11',
    events: [
      { name: 'Girls Singles', fee: 600 }
    ],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  // Special characters should be URL encoded
  // Note: encodeURIComponent encodes & as %26, but apostrophes are valid in URLs
  assertContains(qrUrl, "O'Brien", 'Should include name with apostrophe');
  assertContains(qrUrl, '%26', 'Should encode ampersand');
});

test('Should use correct QR Server API endpoint (Requirement 6.3)', () => {
  const registrationData = {
    playerId: 'LKO2026-0005',
    name: 'Test Player',
    category: 'U-13',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  // Verify API endpoint
  assertTrue(
    qrUrl.startsWith('https://api.qrserver.com/v1/create-qr-code/'),
    'Should use correct QR Server API endpoint'
  );
});

test('Should use correct color parameters (Requirement 6.6)', () => {
  const registrationData = {
    playerId: 'LKO2026-0006',
    name: 'Color Test',
    category: 'U-15',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  // Verify white background
  assertContains(qrUrl, 'bgcolor=FFFFFF', 'Should use white background');
  
  // Verify navy blue foreground (#0B1D3A)
  assertContains(qrUrl, 'color=0B1D3A', 'Should use navy blue (#0B1D3A) foreground');
});

test('Should include all required data fields (Requirement 6.1)', () => {
  const registrationData = {
    playerId: 'LKO2026-0007',
    name: 'Complete Data Test',
    category: 'U-13',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Girls Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  const qrUrl = generateQR(registrationData);

  // Verify all required fields are present
  assertContains(qrUrl, 'Player%20ID', 'Should include Player ID label');
  assertContains(qrUrl, 'LKO2026-0007', 'Should include player ID value');
  assertContains(qrUrl, 'Name', 'Should include Name label');
  assertContains(qrUrl, 'Complete%20Data%20Test', 'Should include name value');
  assertContains(qrUrl, 'Category', 'Should include Category label');
  assertContains(qrUrl, 'U-13', 'Should include category value');
  assertContains(qrUrl, 'Events', 'Should include Events label');
  assertContains(qrUrl, 'Total%20Fee', 'Should include Total Fee label');
  assertContains(qrUrl, '1600', 'Should include total fee value');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running QR Code Generation Utility Tests\n');
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
