/**
 * QRDisplay logic tests
 * Tests QR code generation integration without rendering
 * Requirements: 1.6, 6.4, 6.5
 */

import { generateQR } from '../utils/qr.js';

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
// QR Code Generation Integration Tests
// Requirements: 1.6, 6.4, 6.5
// ============================================================================

test('Should generate QR code URL for single event registration', () => {
  const registrationData = {
    playerId: 'LKO2026-0001',
    name: 'John Doe',
    category: 'U-9',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  // Verify QR URL is generated (Requirement 6.4)
  assertTrue(qrUrl.length > 0, 'QR URL should not be empty');
  assertContains(qrUrl, 'https://api.qrserver.com/v1/create-qr-code/', 'Should use QR Server API');
  assertContains(qrUrl, 'LKO2026-0001', 'Should include player ID');
  assertContains(qrUrl, 'John%20Doe', 'Should include encoded player name');
  assertContains(qrUrl, 'U-9', 'Should include category');
});

test('Should generate QR code URL for two events registration', () => {
  const registrationData = {
    playerId: 'LKO2026-0002',
    name: 'Jane Smith',
    category: 'U-13',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Girls Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  const qrUrl = generateQR(registrationData);

  assertTrue(qrUrl.length > 0, 'QR URL should not be empty');
  assertContains(qrUrl, 'LKO2026-0002', 'Should include player ID');
  assertContains(qrUrl, 'Jane%20Smith', 'Should include encoded player name');
  assertContains(qrUrl, 'U-13', 'Should include category');
  assertContains(qrUrl, '1600', 'Should include total fee');
});

test('Should generate QR code URL for three events registration', () => {
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

  assertTrue(qrUrl.length > 0, 'QR URL should not be empty');
  assertContains(qrUrl, 'LKO2026-0003', 'Should include player ID');
  assertContains(qrUrl, 'Alex%20Johnson', 'Should include encoded player name');
  assertContains(qrUrl, 'U-15', 'Should include category');
  assertContains(qrUrl, '2600', 'Should include total fee');
});

test('Should handle special characters in player name', () => {
  const registrationData = {
    playerId: 'LKO2026-0004',
    name: "O'Brien & Sons",
    category: 'U-11',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  assertTrue(qrUrl.length > 0, 'QR URL should not be empty');
  assertContains(qrUrl, 'LKO2026-0004', 'Should include player ID');
  // Special characters should be URL encoded
  assertTrue(qrUrl.includes('O%27Brien') || qrUrl.includes("O'Brien"), 'Should handle special characters');
});

test('Should include all event names in QR data', () => {
  const registrationData = {
    playerId: 'LKO2026-0005',
    name: 'Test Player',
    category: 'U-13',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Mixed Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  const qrUrl = generateQR(registrationData);

  // Event names should be in the QR data (URL encoded)
  assertTrue(
    qrUrl.includes('Girls%20Singles') || qrUrl.includes('Girls Singles'),
    'Should include Girls Singles event'
  );
  assertTrue(
    qrUrl.includes('Mixed%20Doubles') || qrUrl.includes('Mixed Doubles'),
    'Should include Mixed Doubles event'
  );
});

test('Should use correct QR code size (300x300)', () => {
  const registrationData = {
    playerId: 'LKO2026-0006',
    name: 'Test Player',
    category: 'U-9',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  assertContains(qrUrl, 'size=300x300', 'Should use 300x300 size');
});

test('Should use correct color scheme (white background, navy foreground)', () => {
  const registrationData = {
    playerId: 'LKO2026-0007',
    name: 'Test Player',
    category: 'U-9',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl = generateQR(registrationData);

  assertContains(qrUrl, 'bgcolor=FFFFFF', 'Should use white background (Requirement 6.6)');
  assertContains(qrUrl, 'color=0B1D3A', 'Should use navy foreground (Requirement 6.6)');
});

test('Should generate different URLs for different players', () => {
  const registrationData1 = {
    playerId: 'LKO2026-0008',
    name: 'Player One',
    category: 'U-9',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const registrationData2 = {
    playerId: 'LKO2026-0009',
    name: 'Player Two',
    category: 'U-11',
    events: [{ name: 'Girls Singles', fee: 600 }],
    totalFee: 600
  };

  const qrUrl1 = generateQR(registrationData1);
  const qrUrl2 = generateQR(registrationData2);

  assertTrue(qrUrl1 !== qrUrl2, 'Different players should generate different QR URLs');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running QRDisplay Logic Tests\n');
console.log('============================================================');

for (const { description, fn } of tests) {
  try {
    fn();
    passed++;
    console.log(`✓ ${description}`);
  } catch (error) {
    failed++;
    console.log(`✗ ${description}`);
    console.log(`  ${error.message}\n`);
  }
}

console.log('============================================================');
console.log(`\nTotal: ${tests.length} | Passed: ${passed} | Failed: ${failed}\n`);

if (failed > 0) {
  process.exit(1);
}
