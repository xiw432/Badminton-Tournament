// Payment page tests

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import Payment from './Payment.jsx';

function renderToString(component) {
  return ReactDOMServer.renderToStaticMarkup(component);
}

describe('Payment Page', () => {
  it('should render without crashing', () => {
    const mockProps = {
      go: () => {},
      form: {
        name: 'Test Player',
        gender: 'Male',
        phone: '1234567890',
        email: 'test@example.com'
      },
      events: [
        { category: 'U-13', name: 'Boys Singles', fee: 600 }
      ],
      totalFee: 600,
      cat: 'U-13',
      onPay: () => {},
      loading: false
    };

    expect(() => renderToString(<Payment {...mockProps} />)).not.toThrow();
  });

  it('should display registration summary', () => {
    const mockProps = {
      go: () => {},
      form: {
        name: 'Test Player',
        gender: 'Male',
        phone: '1234567890',
        email: 'test@example.com'
      },
      events: [
        { category: 'U-13', name: 'Boys Singles', fee: 600 }
      ],
      totalFee: 600,
      cat: 'U-13',
      onPay: () => {},
      loading: false
    };

    const html = renderToString(<Payment {...mockProps} />);
    expect(html).toContain('Test Player');
    expect(html).toContain('U-13');
  });

  it('should display fee breakdown with multiple events', () => {
    const mockProps = {
      go: () => {},
      form: {
        name: 'Test Player',
        gender: 'Male',
        phone: '1234567890',
        email: 'test@example.com'
      },
      events: [
        { category: 'U-13', name: 'Boys Singles', fee: 600 },
        { category: 'U-13', name: 'Boys Doubles', fee: 1000 }
      ],
      totalFee: 1600,
      cat: 'U-13',
      onPay: () => {},
      loading: false
    };

    const html = renderToString(<Payment {...mockProps} />);
    expect(html).toContain('Boys Singles');
    expect(html).toContain('Boys Doubles');
    expect(html).toContain('₹1,600');
  });

  it('should render with multi-category events', () => {
    const mockProps = {
      go: () => {},
      form: {
        name: 'Test Player',
        gender: 'Male',
        phone: '1234567890',
        email: 'test@example.com'
      },
      events: [
        { category: 'U-11', name: 'Boys Singles', fee: 600 },
        { category: 'U-13', name: 'Boys Singles', fee: 600 },
        { category: 'U-13', name: 'Boys Doubles', fee: 1000 }
      ],
      totalFee: 2200,
      cat: 'U-11',
      onPay: () => {},
      loading: false
    };

    const html = renderToString(<Payment {...mockProps} />);
    expect(html).toContain('U-11');
    expect(html).toContain('U-13');
    expect(html).toContain('₹2,200');
  });

  it('should group events by category in fee breakdown', () => {
    const mockProps = {
      go: () => {},
      form: {
        name: 'Test Player',
        gender: 'Female',
        phone: '1234567890',
        email: 'test@example.com'
      },
      events: [
        { category: 'U-13', name: 'Girls Singles', fee: 600 },
        { category: 'U-13', name: 'Mixed Doubles', fee: 1000 },
        { category: 'U-15', name: 'Girls Singles', fee: 600 },
        { category: 'U-15', name: 'Girls Doubles', fee: 1000 }
      ],
      totalFee: 3200,
      cat: 'U-13',
      onPay: () => {},
      loading: false
    };

    const html = renderToString(<Payment {...mockProps} />);
    expect(html).toContain('U-13');
    expect(html).toContain('U-15');
    expect(html).toContain('Girls Singles');
    expect(html).toContain('Mixed Doubles');
    expect(html).toContain('Girls Doubles');
    expect(html).toContain('₹3,200');
  });
});
