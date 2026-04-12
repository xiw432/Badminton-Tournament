// Confirm page tests

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import Confirm from './Confirm.jsx';

function renderToString(component) {
  return ReactDOMServer.renderToStaticMarkup(component);
}

describe('Confirm Page', () => {
  it('should render without crashing', () => {
    const mockProps = {
      reg: {
        playerId: 'LKO2026-1234',
        name: 'Test Player',
        category: 'U-13',
        gender: 'Male',
        parentName: 'Test Parent',
        phone: '1234567890',
        email: 'test@example.com',
        events: [
          { category: 'U-13', name: 'Boys Singles', fee: 600 }
        ],
        totalFee: 600
      },
      go: () => {}
    };

    expect(() => renderToString(<Confirm {...mockProps} />)).not.toThrow();
  });

  it('should display player ID and name', () => {
    const mockProps = {
      reg: {
        playerId: 'LKO2026-1234',
        name: 'Test Player',
        category: 'U-13',
        gender: 'Male',
        parentName: 'Test Parent',
        phone: '1234567890',
        email: 'test@example.com',
        events: [
          { category: 'U-13', name: 'Boys Singles', fee: 600 }
        ],
        totalFee: 600
      },
      go: () => {}
    };

    const html = renderToString(<Confirm {...mockProps} />);
    expect(html).toContain('LKO2026-1234');
    expect(html).toContain('Test Player');
  });

  it('should display multiple events', () => {
    const mockProps = {
      reg: {
        playerId: 'LKO2026-5678',
        name: 'Test Player Two',
        category: 'U-15',
        gender: 'Female',
        parentName: 'Test Parent',
        phone: '9876543210',
        email: 'test2@example.com',
        events: [
          { category: 'U-15', name: 'Girls Singles', fee: 600 },
          { category: 'U-15', name: 'Girls Doubles', fee: 1000 },
          { category: 'U-15', name: 'Mixed Doubles', fee: 1000 }
        ],
        totalFee: 2600
      },
      go: () => {}
    };

    const html = renderToString(<Confirm {...mockProps} />);
    expect(html).toContain('Girls Singles');
    expect(html).toContain('Girls Doubles');
    expect(html).toContain('Mixed Doubles');
  });

  it('should render with multi-category events', () => {
    const mockProps = {
      reg: {
        playerId: 'LKO2026-9999',
        name: 'Multi Category Player',
        category: 'U-11',
        gender: 'Male',
        parentName: 'Test Parent',
        phone: '1234567890',
        email: 'test@example.com',
        events: [
          { category: 'U-11', name: 'Boys Singles', fee: 600 },
          { category: 'U-13', name: 'Boys Singles', fee: 600 },
          { category: 'U-13', name: 'Boys Doubles', fee: 1000 }
        ],
        totalFee: 2200
      },
      go: () => {}
    };

    const html = renderToString(<Confirm {...mockProps} />);
    expect(html).toContain('U-11');
    expect(html).toContain('U-13');
    expect(html).toContain('₹2,200');
  });

  it('should group events by category', () => {
    const mockProps = {
      reg: {
        playerId: 'LKO2026-7777',
        name: 'Test Player Three',
        category: 'U-13',
        gender: 'Female',
        parentName: 'Test Parent',
        phone: '1234567890',
        email: 'test@example.com',
        events: [
          { category: 'U-13', name: 'Girls Singles', fee: 600 },
          { category: 'U-13', name: 'Mixed Doubles', fee: 1000 },
          { category: 'U-15', name: 'Girls Singles', fee: 600 },
          { category: 'U-15', name: 'Girls Doubles', fee: 1000 }
        ],
        totalFee: 3200
      },
      go: () => {}
    };

    const html = renderToString(<Confirm {...mockProps} />);
    expect(html).toContain('U-13');
    expect(html).toContain('U-15');
    expect(html).toContain('Girls Singles');
    expect(html).toContain('Mixed Doubles');
    expect(html).toContain('Girls Doubles');
    expect(html).toContain('₹3,200');
  });
});
