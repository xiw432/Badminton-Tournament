import { useState, useEffect, useRef } from 'react';
import WhatsAppButton, { WHATSAPP_GROUP_LINK } from '../components/WhatsAppButton.jsx';
import '../styles/print.css';

const N = "#0B1D3A";
const Y = "#F5B800";
const W = "#FFFFFF";
const TM = "#475569";
const BD = "#E2E8F0";
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

export default function AdmitCard({ playerId, go }) {
  const admitCardRef = useRef(null);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/get-admit-card?playerId=${playerId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch player data');
        }

        if (result.success && result.data) {
          setPlayerData(result.data);
        } else {
          setError('Player not found. Please check your Player ID.');
        }
      } catch (err) {
        console.error('Error fetching player data:', err);
        setError('Failed to load admit card. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerData();
    } else {
      setError('Invalid Player ID.');
      setLoading(false);
    }
  }, [playerId]);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  const formatEvents = (events) => {
    if (!events || events.length === 0) return [];
    if (Array.isArray(events)) {
      return events.map(e => typeof e === 'string' ? { name: e, fee: 600 } : e);
    }
    return [];
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, border: `4px solid ${BD}`, borderTop: `4px solid ${Y}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
          <p style={{ fontFamily: FB, color: TM }}>Loading admit card...</p>
        </div>
        <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', padding: 20 }}>
        <div style={{ backgroundColor: W, padding: 40, borderRadius: 12, textAlign: 'center', maxWidth: 500, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>⚠️</div>
          <h2 style={{ fontFamily: FD, fontSize: 24, color: N, marginBottom: 10 }}>Not Found</h2>
          <p style={{ fontFamily: FB, color: TM, marginBottom: 20, lineHeight: 1.6 }}>{error}</p>
          <button onClick={() => go && go('home')} style={{ backgroundColor: Y, color: N, border: 'none', padding: '12px 24px', borderRadius: 6, fontFamily: FB, fontWeight: 600, cursor: 'pointer' }}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const events = formatEvents(playerData.events);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>

      {/* Action Buttons - hidden on print */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '0 20px 20px', flexWrap: 'wrap' }}>
        <button onClick={() => go && go('home')} style={{ backgroundColor: N, color: Y, border: 'none', padding: '12px 24px', borderRadius: 6, fontFamily: FB, fontWeight: 600, cursor: 'pointer' }}>
          ← Back to Home
        </button>
        <button onClick={handlePrint} disabled={printing} style={{ backgroundColor: Y, color: N, border: 'none', padding: '12px 24px', borderRadius: 6, fontFamily: FB, fontWeight: 600, cursor: 'pointer' }}>
          🖨️ Print / Save as PDF
        </button>
        {playerData.pdfUrl && (
          <a href={playerData.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#059669', color: W, border: 'none', padding: '12px 24px', borderRadius: 6, fontFamily: FB, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            📄 Download PDF
          </a>
        )}
      </div>

      {/* Admit Card */}
      <div
        ref={admitCardRef}
        className="admit-card admit-card-preview"
        style={{ maxWidth: '210mm', margin: '0 auto', backgroundColor: W, border: `3px solid ${N}`, fontFamily: 'Arial, sans-serif' }}
      >
        {/* Header */}
        <div style={{ backgroundColor: N, padding: '20px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: FD, fontSize: 26, color: Y, margin: '0 0 6px', letterSpacing: 2 }}>
            SMAASH BADMINTON TOURNAMENT 2026
          </h1>
          <h2 style={{ fontSize: 14, color: W, margin: '0 0 10px', fontWeight: 'normal', letterSpacing: 1 }}>
            PLAYER REGISTRATION / ADMIT CARD
          </h2>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            <strong style={{ color: Y }}>Dates:</strong> April 24–26, 2026 &nbsp;|&nbsp;
            <strong style={{ color: Y }}>Venue:</strong> Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 20, position: 'relative' }}>

          {/* Photo */}
          <div style={{ position: 'absolute', top: 20, right: 20, width: 110, height: 140, border: `2px solid ${N}`, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {playerData.photoUrl ? (
              <img src={playerData.photoUrl} alt="Player" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            ) : (
              <div style={{ textAlign: 'center', padding: 8 }}>
                <div style={{ fontSize: 24 }}>📷</div>
                <div style={{ fontSize: 9, color: TM, marginTop: 4 }}>Passport Photo</div>
              </div>
            )}
          </div>

          {/* Player Details */}
          <div style={{ border: `1px solid ${N}`, marginBottom: 12, padding: 14, marginRight: 130 }}>
            <h3 style={{ fontSize: 12, fontWeight: 'bold', margin: '0 0 8px', textTransform: 'uppercase', borderBottom: `1px solid ${N}`, paddingBottom: 4 }}>Player Details</h3>
            {[
              ['Player ID', <strong style={{ color: N, fontSize: 14 }}>{playerData.playerId}</strong>],
              ['Player Name', playerData.name],
              ['Date of Birth', formatDate(playerData.dob)],
              ['Gender', playerData.gender],
              ['Category', playerData.category],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', padding: '3px 0', fontSize: 12 }}>
                <div style={{ fontWeight: 'bold', width: '40%' }}>{label}:</div>
                <div>{value}</div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div style={{ border: `1px solid ${N}`, marginBottom: 12, padding: 14 }}>
            <h3 style={{ fontSize: 12, fontWeight: 'bold', margin: '0 0 8px', textTransform: 'uppercase', borderBottom: `1px solid ${N}`, paddingBottom: 4 }}>Contact Details</h3>
            {[
              ['Parent/Guardian', playerData.parentName || 'Not provided'],
              ['Phone', playerData.phone],
              ['Email', playerData.email],
              ['Address', playerData.address || 'Not provided'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', padding: '3px 0', fontSize: 12 }}>
                <div style={{ fontWeight: 'bold', width: '30%' }}>{label}:</div>
                <div style={{ flex: 1 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Events */}
          <div style={{ border: `1px solid ${N}`, marginBottom: 12, padding: 14 }}>
            <h3 style={{ fontSize: 12, fontWeight: 'bold', margin: '0 0 8px', textTransform: 'uppercase', borderBottom: `1px solid ${N}`, paddingBottom: 4 }}>Registered Events</h3>
            {events.length > 0 ? events.map((ev, i) => (
              <div key={i} style={{ fontSize: 12, padding: '2px 0 2px 10px' }}>
                • {ev.name} {ev.fee ? `(₹${ev.fee})` : ''}
              </div>
            )) : (
              <div style={{ fontSize: 12, color: TM }}>No events registered</div>
            )}
          </div>

          {/* Payment */}
          <div style={{ border: '3px dashed #F59E0B', marginBottom: 12, padding: 14, backgroundColor: '#FEF3C7' }}>
            <h3 style={{ fontSize: 12, fontWeight: 'bold', margin: '0 0 8px', textTransform: 'uppercase', borderBottom: '2px solid #F59E0B', paddingBottom: 4, color: '#92400E' }}>Payment Details</h3>
            {[
              ['Total Fee', `₹${playerData.totalFee || 0}`],
              ['Payment Mode', '💰 CASH'],
              ['Payment Status', '⏳ PENDING'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', padding: '3px 0', fontSize: 12, color: '#78350F' }}>
                <div style={{ fontWeight: 'bold', width: '40%' }}>{label}:</div>
                <div style={{ fontWeight: 'bold' }}>{value}</div>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: 8, backgroundColor: W, border: '1px solid #F59E0B', borderRadius: 4, fontSize: 11, color: '#78350F', fontWeight: 'bold' }}>
              ⚠️ Pay registration fee in CASH to your Coach. Entry allowed only after payment verification.
            </div>
          </div>

          {/* Instructions */}
          <div style={{ border: `1px solid ${N}`, marginBottom: 16, padding: 14 }}>
            <h3 style={{ fontSize: 12, fontWeight: 'bold', margin: '0 0 8px', textTransform: 'uppercase', borderBottom: `1px solid ${N}`, paddingBottom: 4 }}>Important Instructions</h3>
            <ol style={{ fontSize: 11, lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
              <li>Carry this admit card to the venue</li>
              <li>Pay registration fee in CASH to your Coach before the tournament</li>
              <li>Bring valid ID proof / birth certificate for verification</li>
              <li>Report 30 minutes before your scheduled match</li>
              <li>Players must bring their own rackets</li>
              <li>Organizer's decision is final in all matters</li>
            </ol>
          </div>

          {/* Signatures */}
          <div style={{ display: 'flex', marginTop: 20 }}>
            <div style={{ flex: 1, textAlign: 'center', paddingTop: 20, borderTop: `1px solid ${N}`, marginRight: 20, fontSize: 12, fontWeight: 'bold' }}>Player Signature</div>
            <div style={{ flex: 1, textAlign: 'center', paddingTop: 20, borderTop: `1px solid ${N}`, fontSize: 12, fontWeight: 'bold' }}>Organizer Signature</div>
          </div>

          {/* WhatsApp - print friendly */}
          <div style={{ marginTop: 16, padding: 12, border: `1px solid ${N}`, borderRadius: 6, backgroundColor: '#F0FDF4', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', color: N, marginBottom: 4 }}>📲 Join WhatsApp Group for Match Schedules & Updates</div>
            <div style={{ fontSize: 10, color: '#059669', fontFamily: 'monospace', wordBreak: 'break-all' }}>{WHATSAPP_GROUP_LINK}</div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA below card - no print */}
      <div className="no-print" style={{ maxWidth: '210mm', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📲</div>
          <h3 style={{ fontFamily: FB, fontSize: 20, color: W, marginBottom: 8, fontWeight: 700 }}>Join Our WhatsApp Group</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 16, fontFamily: FB, lineHeight: 1.6 }}>
            Get real-time match schedules, tournament updates, and stay connected with organizers.
          </p>
          <WhatsAppButton variant="cta" text="Join WhatsApp Group →" style={{ backgroundColor: W, color: '#25D366', fontSize: 15 }} />
        </div>
      </div>

      <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
