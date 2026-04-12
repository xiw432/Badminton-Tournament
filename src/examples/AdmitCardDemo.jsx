import { useState } from 'react';
import AdmitCard from '../pages/AdmitCard.jsx';

/**
 * Demo component to test admit card with sample data
 * Use this for development and testing
 */
export default function AdmitCardDemo() {
  const [showDemo, setShowDemo] = useState(false);

  // Sample player data for testing
  const samplePlayerData = {
    player_id: 'LKO2026-1234',
    player_name: 'Arjun Kumar',
    name: 'Arjun Kumar',
    dob: '2014-05-15',
    gender: 'Male',
    parent_name: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'arjun.kumar@example.com',
    address: '123 Main Street, Lucknow, UP 226001',
    photo_url: null, // Will show placeholder
    events: [
      { category: 'U-13', name: 'Boys Singles', fee: 600 },
      { category: 'U-13', name: 'Boys Doubles', fee: 1000 },
      { category: 'U-15', name: 'Boys Singles', fee: 600 }
    ],
    selectedEvents: [
      { category: 'U-13', name: 'Boys Singles', fee: 600 },
      { category: 'U-13', name: 'Boys Doubles', fee: 1000 },
      { category: 'U-15', name: 'Boys Singles', fee: 600 }
    ],
    totalFee: 2200,
    total_fee: 2200,
    payment_status: 'paid',
    registeredAt: new Date().toISOString()
  };

  if (showDemo) {
    // Mock Supabase response for demo
    const MockAdmitCard = () => {
      const [playerData, setPlayerData] = useState(null);
      const [loading, setLoading] = useState(true);
      
      // Simulate loading and set sample data
      useState(() => {
        setTimeout(() => {
          setPlayerData(samplePlayerData);
          setLoading(false);
        }, 500);
      }, []);

      // Use the actual AdmitCard component but with mocked data
      return (
        <AdmitCard 
          playerId="LKO2026-1234"
          go={() => setShowDemo(false)}
        />
      );
    };

    return <MockAdmitCard />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
        maxWidth: '500px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎫</div>
        <h2 style={{
          fontSize: '24px',
          color: '#0B1D3A',
          marginBottom: '10px',
          fontFamily: "'Bebas Neue', sans-serif"
        }}>
          ADMIT CARD DEMO
        </h2>
        <p style={{
          color: '#64748B',
          marginBottom: '30px',
          lineHeight: 1.6,
          fontFamily: "'Outfit', sans-serif"
        }}>
          Test the admit card system with sample player data.
          This demo shows how the admit card looks with all features.
        </p>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#0B1D3A' }}>Sample Data:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#64748B' }}>
            <li>Player: Arjun Kumar (U-13 Male)</li>
            <li>Events: Boys Singles, Boys Doubles, U-15 Singles</li>
            <li>Total Fee: ₹2,200</li>
            <li>Payment Status: Confirmed</li>
          </ul>
        </div>

        <button
          onClick={() => setShowDemo(true)}
          style={{
            backgroundColor: '#F5B800',
            color: '#0B1D3A',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          🎫 View Demo Admit Card
        </button>
        
        <p style={{
          fontSize: '12px',
          color: '#94A3B8',
          marginTop: '15px',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Note: This is a demo with sample data for testing purposes.
        </p>
      </div>
    </div>
  );
}