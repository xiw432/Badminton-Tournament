/**
 * QRDisplay Component Examples
 * Demonstrates various usage scenarios for the QRDisplay component
 */

import React from 'react';
import QRDisplay from './QRDisplay.jsx';

// Example 1: Single Event Registration (U-9 Boys)
export function Example1_SingleEvent() {
  const registrationData = {
    playerId: 'LKO2026-0001',
    name: 'Arjun Kumar',
    category: 'U-9',
    events: [
      { name: 'Boys Singles', fee: 600 }
    ],
    totalFee: 600
  };

  return (
    <div style={{ padding: 40, background: '#F8FAFC' }}>
      <h2 style={{ marginBottom: 30, fontFamily: "'Bebas Neue', sans-serif", fontSize: 32 }}>
        Example 1: Single Event Registration
      </h2>
      <QRDisplay registrationData={registrationData} />
    </div>
  );
}

// Example 2: Two Events Registration (U-11 Girls)
export function Example2_TwoEvents() {
  const registrationData = {
    playerId: 'LKO2026-0002',
    name: 'Priya Sharma',
    category: 'U-11',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Girls Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  return (
    <div style={{ padding: 40, background: '#F8FAFC' }}>
      <h2 style={{ marginBottom: 30, fontFamily: "'Bebas Neue', sans-serif", fontSize: 32 }}>
        Example 2: Two Events Registration
      </h2>
      <QRDisplay registrationData={registrationData} />
    </div>
  );
}

// Example 3: Three Events Registration (U-13 Boys with Mixed Doubles)
export function Example3_ThreeEvents() {
  const registrationData = {
    playerId: 'LKO2026-0003',
    name: 'Rahul Verma',
    category: 'U-13',
    events: [
      { name: 'Boys Singles', fee: 600 },
      { name: 'Boys Doubles', fee: 1000 },
      { name: 'Mixed Doubles', fee: 1000 }
    ],
    totalFee: 2600
  };

  return (
    <div style={{ padding: 40, background: '#F8FAFC' }}>
      <h2 style={{ marginBottom: 30, fontFamily: "'Bebas Neue', sans-serif", fontSize: 32 }}>
        Example 3: Three Events Registration (U-13)
      </h2>
      <QRDisplay registrationData={registrationData} />
    </div>
  );
}

// Example 4: U-15 Girls with Singles and Mixed Doubles
export function Example4_U15Mixed() {
  const registrationData = {
    playerId: 'LKO2026-0004',
    name: 'Ananya Patel',
    category: 'U-15',
    events: [
      { name: 'Girls Singles', fee: 600 },
      { name: 'Mixed Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  return (
    <div style={{ padding: 40, background: '#F8FAFC' }}>
      <h2 style={{ marginBottom: 30, fontFamily: "'Bebas Neue', sans-serif", fontSize: 32 }}>
        Example 4: U-15 with Singles and Mixed Doubles
      </h2>
      <QRDisplay registrationData={registrationData} />
    </div>
  );
}

// Example 5: Special Characters in Name
export function Example5_SpecialCharacters() {
  const registrationData = {
    playerId: 'LKO2026-0005',
    name: "O'Brien & Sons",
    category: 'U-13',
    events: [
      { name: 'Boys Singles', fee: 600 },
      { name: 'Boys Doubles', fee: 1000 }
    ],
    totalFee: 1600
  };

  return (
    <div style={{ padding: 40, background: '#F8FAFC' }}>
      <h2 style={{ marginBottom: 30, fontFamily: "'Bebas Neue', sans-serif", fontSize: 32 }}>
        Example 5: Special Characters in Name
      </h2>
      <QRDisplay registrationData={registrationData} />
    </div>
  );
}

// All Examples Combined
export default function QRDisplayExamples() {
  return (
    <div>
      <div style={{
        background: '#0B1D3A',
        color: '#F5B800',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 48,
          margin: 0,
          letterSpacing: '0.05em'
        }}>
          QRDisplay Component Examples
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 18,
          margin: '10px 0 0',
          opacity: 0.9
        }}>
          Various usage scenarios for tournament registration confirmation
        </p>
      </div>

      <Example1_SingleEvent />
      <Example2_TwoEvents />
      <Example3_ThreeEvents />
      <Example4_U15Mixed />
      <Example5_SpecialCharacters />
    </div>
  );
}
