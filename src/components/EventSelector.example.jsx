/**
 * EventSelector Component Example
 * Demonstrates the EventSelector component with different scenarios
 */

import React, { useState } from 'react';
import EventSelector from './EventSelector.jsx';

// Example wrapper component
export default function EventSelectorExample() {
  const [scenario, setScenario] = useState('male-u9');
  const [wantsDoubles, setWantsDoubles] = useState(false);
  const [wantsMixed, setWantsMixed] = useState(false);

  // Scenario configurations
  const scenarios = {
    'male-u9': { gender: 'Male', category: 'U-9', label: 'Male U-9' },
    'female-u11': { gender: 'Female', category: 'U-11', label: 'Female U-11' },
    'male-u13': { gender: 'Male', category: 'U-13', label: 'Male U-13' },
    'female-u15': { gender: 'Female', category: 'U-15', label: 'Female U-15' },
    'ineligible': { gender: 'Male', category: 'INELIGIBLE', label: 'Ineligible' },
  };

  const currentScenario = scenarios[scenario];

  // Reset selections when scenario changes
  const handleScenarioChange = (newScenario) => {
    setScenario(newScenario);
    setWantsDoubles(false);
    setWantsMixed(false);
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '40px auto', 
      padding: 20,
      fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif"
    }}>
      <h1 style={{ 
        fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
        fontSize: 42,
        color: '#0B1D3A',
        marginBottom: 10
      }}>
        EventSelector Component Demo
      </h1>
      
      <p style={{ color: '#475569', marginBottom: 30 }}>
        Select different scenarios to see how the EventSelector component handles event assignment
      </p>

      {/* Scenario Selector */}
      <div style={{ 
        marginBottom: 30,
        padding: 20,
        background: '#F8FAFC',
        borderRadius: 12,
        border: '1px solid #E2E8F0'
      }}>
        <label style={{ 
          display: 'block', 
          fontWeight: 600, 
          marginBottom: 12,
          color: '#0B1D3A'
        }}>
          Select Scenario:
        </label>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {Object.entries(scenarios).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => handleScenarioChange(key)}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: scenario === key ? '2px solid #0B1D3A' : '1px solid #E2E8F0',
                background: scenario === key ? '#0B1D3A' : '#FFFFFF',
                color: scenario === key ? '#FFFFFF' : '#0B1D3A',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: 15, fontSize: 14, color: '#64748B' }}>
          <strong>Current:</strong> Gender: {currentScenario.gender}, Category: {currentScenario.category}
        </div>
      </div>

      {/* EventSelector Component */}
      <div style={{
        padding: 30,
        background: '#FFFFFF',
        borderRadius: 18,
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(11,29,58,0.05)'
      }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
          fontSize: 28,
          color: '#0B1D3A',
          marginBottom: 20,
          borderBottom: '3px solid #F5B800',
          paddingBottom: 10,
          display: 'inline-block'
        }}>
          Event Selection
        </h2>

        <EventSelector
          gender={currentScenario.gender}
          category={currentScenario.category}
          wantsDoubles={wantsDoubles}
          wantsMixed={wantsMixed}
          onToggleDoubles={() => setWantsDoubles(!wantsDoubles)}
          onToggleMixed={() => setWantsMixed(!wantsMixed)}
        />
      </div>

      {/* State Display */}
      <div style={{
        marginTop: 20,
        padding: 20,
        background: '#F1F5F9',
        borderRadius: 12,
        fontSize: 14,
        fontFamily: 'monospace'
      }}>
        <strong>Component State:</strong>
        <pre style={{ marginTop: 10, color: '#475569' }}>
{JSON.stringify({
  gender: currentScenario.gender,
  category: currentScenario.category,
  wantsDoubles,
  wantsMixed
}, null, 2)}
        </pre>
      </div>

      {/* Usage Notes */}
      <div style={{
        marginTop: 30,
        padding: 20,
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: 12,
        color: '#1E40AF'
      }}>
        <h3 style={{ marginTop: 0, fontSize: 16, fontWeight: 700 }}>Usage Notes:</h3>
        <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
          <li>Singles event is automatically assigned based on gender (mandatory)</li>
          <li>Doubles event is optional for all categories</li>
          <li>Mixed Doubles is only available for U-13 and U-15 categories</li>
          <li>U-9 and U-11 see Mixed Doubles as "RESTRICTED"</li>
          <li>Fee breakdown updates automatically based on selections</li>
          <li>Component returns null when category is INELIGIBLE or empty</li>
        </ul>
      </div>
    </div>
  );
}
