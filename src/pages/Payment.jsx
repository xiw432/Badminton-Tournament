// Payment page - Payment processing with UPI/card options

import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Card, SectionH, InfoBox } from "../components/FormFields.jsx";

// Design tokens
const N = "#0B1D3A"; // navy
const ND = "#070F1F"; // navy dark
const NL = "#142850"; // navy light
const Y = "#F5B800"; // yellow
const YP = "#FFFBEB"; // yellow pale
const W = "#FFFFFF";
const OW = "#F8FAFC"; // off-white
const TM = "#475569"; // text-mid
const TL = "#94A3B8"; // text-light
const BD = "#E2E8F0"; // border
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * Payment page component
 * @param {object} props
 * @param {function} props.go - Navigation function
 * @param {object} props.form - Registration form data
 * @param {array} props.events - Selected events
 * @param {number} props.totalFee - Total registration fee
 * @param {string} props.cat - Player category
 * @param {function} props.onPay - Payment handler
 * @param {boolean} props.loading - Payment processing state
 */
export default function Payment({ go, form, events, totalFee, cat, onPay, loading }) {
  const [method, setMethod] = useState("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ num: "", exp: "", cvv: "", name: "" });
  const [bank, setBank] = useState("State Bank of India");

  return (
    <div style={{ background: OW, minHeight: "100vh", paddingTop: 70 }}>
      <Navbar page="payment" go={go} />
      
      {/* Header */}
      <div style={{ background: `linear-gradient(155deg, ${ND}, ${NL})`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: FD, fontSize: "clamp(40px, 6vw, 64px)", color: Y, letterSpacing: "0.04em", lineHeight: 1 }}>PAYMENT</div>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 12, fontFamily: FB, fontSize: 16 }}>Complete your registration with secure payment</p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "44px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          
          {/* Left — Summary */}
          <div>
            <Card mb={20}>
              <SectionH>REGISTRATION SUMMARY</SectionH>
              {[["Player", form.name], ["Category", cat], ["Gender", form.gender], ["Phone", form.phone], ["Email", form.email]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${BD}` }}>
                  <span style={{ color: TM, fontSize: 13, fontFamily: FB }}>{k}</span>
                  <span style={{ color: N, fontSize: 13, fontWeight: 600, fontFamily: FB, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </Card>

            <Card mb={0}>
              <SectionH>FEE BREAKDOWN</SectionH>
              {(() => {
                // Group events by category
                const grouped = events.reduce((acc, e) => {
                  const cat = e.category || 'Other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(e);
                  return acc;
                }, {});
                
                return Object.entries(grouped).map(([cat, catEvents]) => (
                  <div key={cat} style={{ marginBottom: 16 }}>
                    {/* Category badge */}
                    <div style={{ 
                      display: "inline-block",
                      background: YP, 
                      border: `1.5px solid ${Y}`, 
                      borderRadius: 6, 
                      padding: "4px 12px", 
                      marginBottom: 10 
                    }}>
                      <span style={{ 
                        fontFamily: FD, 
                        fontSize: 16, 
                        color: N, 
                        letterSpacing: "0.04em" 
                      }}>
                        {cat}
                      </span>
                    </div>
                    
                    {/* Events in this category */}
                    {catEvents.map(e => (
                      <div key={`${cat}-${e.name}`} style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        paddingBottom: 10, 
                        marginBottom: 10, 
                        paddingLeft: 12,
                        borderBottom: `1px solid ${BD}` 
                      }}>
                        <span style={{ color: N, fontSize: 14, fontFamily: FB }}>{e.name}</span>
                        <span style={{ color: N, fontWeight: 700, fontSize: 14, fontFamily: FB }}>₹{e.fee.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                ));
              })()}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 18px", background: N, borderRadius: 12, marginTop: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: FB, fontWeight: 600 }}>Total Amount</span>
                <span style={{ fontFamily: FD, fontSize: 28, color: Y, letterSpacing: "0.04em" }}>₹{totalFee.toLocaleString()}</span>
              </div>
            </Card>
          </div>

          {/* Right — Payment */}
          <div>
            <Card mb={0}>
              <SectionH>SELECT PAYMENT</SectionH>

              {/* Method Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {[["upi", "UPI"], ["card", "Card"], ["netbanking", "Net Banking"]].map(([m, l]) => (
                  <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: "10px 6px", borderRadius: 8, border: `2px solid ${method === m ? Y : BD}`, background: method === m ? YP : W, color: N, fontSize: 13, fontFamily: FB, fontWeight: method === m ? 700 : 500, cursor: "pointer", transition: "all 0.2s" }}>{l}</button>
                ))}
              </div>

              {method === "upi" && (
                <>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 8, fontFamily: FB }}>UPI ID</label>
                  <input value={upi} onChange={e => setUpi(e.target.value)} placeholder="yourname@upi" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none", marginBottom: 16 }} />
                  <InfoBox color="#F0FDF4" border="#BBF7D0" text="#065F46" icon="✅">
                    UPI payments are processed securely. You'll receive a payment request on your UPI app.
                  </InfoBox>
                </>
              )}

              {method === "card" && (
                <>
                  {[["Card Number", "num", "1234 5678 9012 3456"], ["Cardholder Name", "name", "Name on card"]].map(([l, k, ph]) => (
                    <div key={k} style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>{l}</label>
                      <input value={card[k]} onChange={e => setCard(c => ({ ...c, [k]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none" }} />
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Expiry", "exp", "MM/YY"], ["CVV", "cvv", "•••"]].map(([l, k, ph]) => (
                      <div key={k} style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 6, fontFamily: FB }}>{l}</label>
                        <input value={card[k]} onChange={e => setCard(c => ({ ...c, [k]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none" }} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {method === "netbanking" && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: N, marginBottom: 8, fontFamily: FB }}>Select Bank</label>
                  <select value={bank} onChange={e => setBank(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 14, fontFamily: FB, color: N, background: W, boxSizing: "border-box", outline: "none" }}>
                    {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Kotak Mahindra Bank", "Bank of Baroda"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              )}

              {/* Amount */}
              <div style={{ padding: "16px 18px", background: N, borderRadius: 12, display: "flex", justifyContent: "space-between", margin: "16px 0 18px" }}>
                <span style={{ color: "rgba(255,255,255,0.65)", fontFamily: FB }}>Amount to Pay</span>
                <span style={{ fontFamily: FD, fontSize: 26, color: Y }}>₹{totalFee.toLocaleString()}</span>
              </div>

              <button onClick={onPay} disabled={loading} style={{ width: "100%", background: loading ? TL : Y, color: N, border: "none", cursor: loading ? "not-allowed" : "pointer", padding: "16px", borderRadius: 10, fontSize: 17, fontFamily: FB, fontWeight: 700, letterSpacing: "0.03em", transition: "all 0.25s", boxShadow: loading ? "none" : "0 8px 24px rgba(245,184,0,0.28)" }}>
                {loading ? "⏳  Processing Payment…" : `Pay ₹${totalFee.toLocaleString()} →`}
              </button>

              <p style={{ color: TL, fontSize: 12, textAlign: "center", marginTop: 12, fontFamily: FB }}>🔒 Secured payment · Fees are non-refundable</p>
            </Card>

            <button onClick={() => go("register")} style={{ width: "100%", background: "transparent", color: TM, border: `1px solid ${BD}`, cursor: "pointer", padding: "12px", borderRadius: 10, fontSize: 14, fontFamily: FB, fontWeight: 500, marginTop: 14 }}>
              ← Back to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
