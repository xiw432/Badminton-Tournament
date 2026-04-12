/**
 * EventSelector component tests
 * Tests event selection with automatic assignment logic
 * Requirements: 1.4, 4.3, 4.8, 7.1, 7.3, 7.4
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import EventSelector from './EventSelector.jsx';

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

function assertContains(html, text, message) {
  if (!html.includes(text)) {
    throw new Error(`${message}\n  Expected HTML to contain: ${text}`);
  }
}

function assertNotContains(html, text, message) {
  if (html.includes(text)) {
    throw new Error(`${message}\n  Expected HTML to NOT contain: ${text}`);
  }
}

function renderToString(component) {
  return ReactDOMServer.renderToStaticMarkup(component);
}

// ============================================================================
// Rendering Tests
// ============================================================================

test('should not render when no gender provided', () => {
  const html = renderToString(
    <EventSelector 
      gender="" 
      category="U-11" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  assertEquals(html, '', 'Should return empty string when no gender');
});

test('should not render when no category provided', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  assertEquals(html, '', 'Should return empty string when no category');
});

test('should not render when category is INELIGIBLE', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="INELIGIBLE" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  assertEquals(html, '', 'Should return empty string when INELIGIBLE');
});

// ============================================================================
// Mandatory Singles Event Tests
// Requirements: 4.1, 4.2, 4.3
// ============================================================================

test('should display mandatory Boys Singles for Male player', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-11" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Boys Singles', 'Should contain Boys Singles');
  assertContains(html, 'MANDATORY', 'Should contain MANDATORY label');
  assertContains(html, 'Automatically assigned - cannot be removed', 'Should contain mandatory description');
});

test('should display mandatory Girls Singles for Female player', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-13" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Girls Singles', 'Should contain Girls Singles');
  assertContains(html, 'MANDATORY', 'Should contain MANDATORY label');
});

// ============================================================================
// Optional Doubles Event Tests
// Requirements: 4.4, 4.5
// ============================================================================

test('should display optional Boys Doubles for Male player', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-9" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Boys Doubles', 'Should contain Boys Doubles');
  assertContains(html, 'OPTIONAL', 'Should contain OPTIONAL label');
});

test('should display optional Girls Doubles for Female player', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-15" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Girls Doubles', 'Should contain Girls Doubles');
  assertContains(html, 'OPTIONAL', 'Should contain OPTIONAL label');
});

// ============================================================================
// Mixed Doubles Availability Tests
// Requirements: 4.6, 4.7
// ============================================================================

test('should display Mixed Doubles as optional for U-13 category', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-13" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Mixed Doubles', 'Should contain Mixed Doubles');
  assertContains(html, 'OPTIONAL', 'Should contain OPTIONAL label for Mixed Doubles');
});

test('should display Mixed Doubles as optional for U-15 category', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-15" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Mixed Doubles', 'Should contain Mixed Doubles');
  assertContains(html, 'OPTIONAL', 'Should contain OPTIONAL label');
});

test('should display Mixed Doubles as restricted for U-9 category', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-9" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Mixed Doubles', 'Should contain Mixed Doubles');
  assertContains(html, 'RESTRICTED', 'Should contain RESTRICTED label');
  assertContains(html, 'Only available for U-13 and U-15 categories', 'Should contain restriction message');
});

test('should display Mixed Doubles as restricted for U-11 category', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-11" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'RESTRICTED', 'Should contain RESTRICTED label');
  assertContains(html, 'Only available for U-13 and U-15 categories', 'Should contain restriction message');
});

// ============================================================================
// Fee Calculation Tests
// Requirements: 5.4, 7.4
// ============================================================================

test('should display correct total fee with only Singles', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-9" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, '₹600', 'Should contain ₹600 total fee');
});

test('should display correct total fee with Singles and Doubles', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-11" 
      wantsDoubles={true} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, '₹1,600', 'Should contain ₹1,600 total fee (600 + 1000)');
});

test('should display correct total fee with all events for U-13', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-13" 
      wantsDoubles={true} 
      wantsMixed={true}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, '₹2,600', 'Should contain ₹2,600 total fee (600 + 1000 + 1000)');
});

// ============================================================================
// UI Elements Tests
// Requirements: 7.1, 7.3, 7.4
// ============================================================================

test('should display helper text about automatic assignment', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-15" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Events are automatically assigned based on age and gender', 'Should contain helper text');
});

test('should display fee breakdown section', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-13" 
      wantsDoubles={true} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'FEE BREAKDOWN', 'Should contain FEE BREAKDOWN heading');
  assertContains(html, 'TOTAL FEE', 'Should contain TOTAL FEE label');
});

test('should show checked state for mandatory Singles event', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-11" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'checked=""', 'Should have checked checkbox for Singles');
});

test('should show checked state for selected Doubles event', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-11" 
      wantsDoubles={true} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  // Count checked checkboxes - should have 2 (Singles + Doubles)
  const checkedCount = (html.match(/checked=""/g) || []).length;
  assertEquals(checkedCount, 2, 'Should have 2 checked checkboxes (Singles + Doubles)');
});

test('should show all three events for U-15 with all selected', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-15" 
      wantsDoubles={true} 
      wantsMixed={true}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'Girls Singles', 'Should contain Girls Singles');
  assertContains(html, 'Girls Doubles', 'Should contain Girls Doubles');
  assertContains(html, 'Mixed Doubles', 'Should contain Mixed Doubles');
  
  // Count checked checkboxes - should have 3 (all events)
  const checkedCount = (html.match(/checked=""/g) || []).length;
  assertEquals(checkedCount, 3, 'Should have 3 checked checkboxes (all events)');
});

// ============================================================================
// Accessibility Tests
// Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
// ============================================================================

test('should have region role with aria-label on container', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-11" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'role="region"', 'Should have region role');
  assertContains(html, 'aria-label="Event Selection"', 'Should have aria-label');
});

test('should have aria-live region for fee updates', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-13" 
      wantsDoubles={true} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'role="status"', 'Should have status role');
  assertContains(html, 'aria-live="polite"', 'Should have aria-live');
  assertContains(html, 'aria-atomic="true"', 'Should have aria-atomic');
});

test('should have checkbox role on event rows', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-15" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'role="checkbox"', 'Should have checkbox role');
  assertContains(html, 'aria-checked', 'Should have aria-checked attribute');
});

test('should have proper tabindex for interactive elements', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-13" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  // Should have tabindex="0" for interactive elements
  assertContains(html, 'tabindex="0"', 'Should have tabindex for keyboard navigation');
});

test('should have aria-disabled for locked elements', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-9" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  assertContains(html, 'aria-disabled', 'Should have aria-disabled attribute');
});

// ============================================================================
// Mobile Responsiveness Tests
// Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
// ============================================================================

test('should have touch-friendly minimum height on event rows', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-11" 
      wantsDoubles={false} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  // Check for minimum height (44px for touch targets)
  assertContains(html, 'min-height:44px', 'Should have minimum height for touch targets');
});

test('should have flexbox wrapping for mobile layout', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-13" 
      wantsDoubles={true} 
      wantsMixed={false}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  // Check for flex-wrap to prevent horizontal scrolling
  assertContains(html, 'flex-wrap:wrap', 'Should have flex-wrap for mobile responsiveness');
});

test('should have whitespace nowrap on fee amounts to prevent breaking', () => {
  const html = renderToString(
    <EventSelector 
      gender="Male" 
      category="U-15" 
      wantsDoubles={true} 
      wantsMixed={true}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  // Fee amounts should not wrap
  assertContains(html, 'white-space:nowrap', 'Should have nowrap on fee amounts');
});

test('should have responsive gap spacing in fee breakdown', () => {
  const html = renderToString(
    <EventSelector 
      gender="Female" 
      category="U-13" 
      wantsDoubles={false} 
      wantsMixed={true}
      onToggleDoubles={() => {}}
      onToggleMixed={() => {}}
    />
  );
  
  // Check for gap property for spacing
  assertContains(html, 'gap:', 'Should have gap spacing for responsive layout');
});

// ============================================================================
// Run all tests
// ============================================================================

console.log('\n🏸 Running EventSelector Component Tests\n');
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
