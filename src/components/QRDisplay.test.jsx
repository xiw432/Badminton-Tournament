/**
 * QRDisplay component tests
 * Tests QR code display with registration summary
 * Requirements: 1.6, 6.4, 6.5
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import QRDisplay from './QRDisplay.jsx';

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

const { renderToString } = ReactDOMServer;

// ============================================================================
// QRDisplay Component Rendering Tests
// Requirements: 1.6, 6.4, 6.5
// ============================================================================

test('should render QR code image with correct URL', () => {
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

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  // Verify QR code image is rendered (Requirement 6.4)
  assertContains(html, 'Registration QR Code', 'Should render QR code image with alt text');
  assertContains(html, 'https://api.qrserver.com/v1/create-qr-code/', 'Should use QR Server API');
});

test('should display player ID in registration summary', () => {
  const registrationData = {
    playerId: 'LKO2026-0001',
    name: 'John Doe',
    category: 'U-13',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'LKO2026-0001', 'Should display player ID');
  assertContains(html, 'Player ID', 'Should display player ID label');
});

test('should display player name in registration summary', () => {
  const registrationData = {
    playerId: 'LKO2026-0002',
    name: 'Jane Smith',
    category: 'U-15',
    events: [{ name: 'Girls Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'Jane Smith', 'Should display player name');
  assertContains(html, 'Player Name', 'Should display player name label');
});

test('should display category badge in registration summary', () => {
  const registrationData = {
    playerId: 'LKO2026-0003',
    name: 'Alex Johnson',
    category: 'U-15',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'U-15', 'Should display category');
  assertContains(html, 'Category', 'Should display category label');
});

// ============================================================================
// Event Display Tests
// Requirements: 6.4, 6.5
// ============================================================================

test('should display single event with fee', () => {
  const registrationData = {
    playerId: 'LKO2026-0004',
    name: 'Test Player',
    category: 'U-9',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'Boys Singles', 'Should display event name');
  assertContains(html, '₹600', 'Should display event fee');
});

test('should display multiple events with fees', () => {
  const registrationData = {
    playerId: 'LKO2026-0005',
    name: 'Test Player',
    category: 'U-13',
    events: [
      { name: 'Boys Singles', fee: 600 },
      { name: 'Boys Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'Boys Singles', 'Should display first event');
  assertContains(html, 'Boys Doubles', 'Should display second event');
  assertContains(html, '₹600', 'Should display first event fee');
  assertContains(html, '₹1,000', 'Should display second event fee');
});

test('should display all three events for U-15 player', () => {
  const registrationData = {
    playerId: 'LKO2026-0006',
    name: 'Test Player',
    category: 'U-15',
    events: [
      { name: 'Boys Singles', fee: 600 },
      { name: 'Boys Doubles', fee: 1000 },
      { name: 'Mixed Doubles', fee: 1000 }
    ],
    totalFee: 2600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'Boys Singles', 'Should display Singles event');
  assertContains(html, 'Boys Doubles', 'Should display Doubles event');
  assertContains(html, 'Mixed Doubles', 'Should display Mixed Doubles event');
});

// ============================================================================
// Total Fee Display Tests
// Requirements: 6.4, 6.5
// ============================================================================

test('should display total fee for single event', () => {
  const registrationData = {
    playerId: 'LKO2026-0007',
    name: 'Test Player',
    category: 'U-9',
    events: [{ name: 'Girls Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'TOTAL FEE', 'Should display total fee label');
  assertContains(html, '₹600', 'Should display total fee amount');
});

test('should display total fee for two events', () => {
  const registrationData = {
    playerId: 'LKO2026-0008',
    name: 'Test Player',
    category: 'U-11',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Girls Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, '₹1,600', 'Should display total fee with comma separator');
});

test('should display total fee for three events', () => {
  const registrationData = {
    playerId: 'LKO2026-0009',
    name: 'Test Player',
    category: 'U-15',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Girls Doubles', fee: 1000 },
      { name: 'Mixed Doubles', fee: 1000 }
    ],
    totalFee: 2600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, '₹2,600', 'Should display total fee with comma separator');
});

// ============================================================================
// UI Elements Tests
// Requirements: 6.5
// ============================================================================

test('should display download button', () => {
  const registrationData = {
    playerId: 'LKO2026-0010',
    name: 'Test Player',
    category: 'U-13',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'DOWNLOAD QR CODE', 'Should display download button');
});

test('should display QR code section header', () => {
  const registrationData = {
    playerId: 'LKO2026-0011',
    name: 'Test Player',
    category: 'U-13',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'YOUR QR CODE', 'Should display QR code section header');
});

test('should display registration summary header', () => {
  const registrationData = {
    playerId: 'LKO2026-0012',
    name: 'Test Player',
    category: 'U-13',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'REGISTRATION SUMMARY', 'Should display registration summary header');
});

test('should display helper text about QR code usage', () => {
  const registrationData = {
    playerId: 'LKO2026-0013',
    name: 'Test Player',
    category: 'U-13',
    events: [{ name: 'Boys Singles', fee: 600 }],
    totalFee: 600
  };

  const html = renderToString(<QRDisplay registrationData={registrationData} />);

  assertContains(html, 'Save this QR code', 'Should display helper text about saving QR code');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🧪 Running QRDisplay Component Tests...\n');

for (const { description, fn } of tests) {
  try {
    fn();
    passed++;
    console.log(`✅ ${description}`);
  } catch (error) {
    failed++;
    console.log(`❌ ${description}`);
    console.log(`   ${error.message}\n`);
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${tests.length} total\n`);

if (failed > 0) {
  process.exit(1);
}
