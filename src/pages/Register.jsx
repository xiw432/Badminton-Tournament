// Register page - Registration form with multi-category event selection
// Requirements: 3.1, 7.1, 7.2, 7.3, 7.4, 7.5, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7

import Navbar from '../components/Navbar.jsx';
import { Inp, Sel, Card, SectionH, InfoBox } from '../components/FormFields.jsx';
import EventSelector from '../components/EventSelector.jsx';
import ImageUpload from '../components/ImageUpload.jsx';
import { getCategory, getEligibleCategories } from '../utils/category.js';
import { getAllEligibleEvents } from '../utils/events.js';
import { calculateFee } from '../utils/fee.js';

// Design tokens
const N = "#0B1D3A"; // navy
const Y = "#F5B800"; // yellow
const YP = "#FFFBEB"; // yellow pale
const W = "#FFFFFF";
const BG = "#F8FAFC"; // background
const FD = "'Bebas Neue', 'Impact', 'Arial Black', sans-serif";
const FB = "'Outfit', 'Segoe UI', system-ui, sans-serif";

/**
 * Register page component
 * Displays registration form with automatic event assignment
 * 
 * @param {Object} props
 * @param {Function} props.go - Navigation handler
 * @param {Object} props.form - Form state object
 * @param {Function} props.setF - Form field update handler
 * @param {Object} props.errors - Validation errors object
 * @param {Function} props.onSubmit - Form submission handler
 */
export default function Register({ go, form, setF, errors, onSubmit, submitting = false }) {
  // Compute category from date of birth
  const category = getCategory(form.dob);
  
  // Check if category is valid
  const hasValidCategory = category && category !== 'INELIGIBLE';

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <Navbar page="register" go={go} />
      
      {/* Main Content */}
      <div style={{ paddingTop: 100, paddingBottom: 60 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
          
          {/* Page Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{
              fontFamily: FD,
              fontSize: 48,
              color: N,
              letterSpacing: "0.05em",
              margin: "0 0 12px",
              lineHeight: 1.1
            }}>
              PLAYER REGISTRATION
            </h1>
            <p style={{
              fontFamily: FB,
              fontSize: 16,
              color: "#64748B",
              margin: 0,
              lineHeight: 1.6
            }}>
              Fill in your details to register for the tournament
            </p>
          </div>

          {/* Cash Payment Notice - IMPORTANT */}
          <div style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            border: "3px solid #F59E0B",
            borderRadius: 16,
            padding: "24px 28px",
            marginBottom: 32,
            boxShadow: "0 4px 16px rgba(245, 158, 11, 0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 36, flexShrink: 0 }}>💰</div>
              <div>
                <h3 style={{
                  fontFamily: FD,
                  fontSize: 24,
                  color: "#92400E",
                  margin: "0 0 8px",
                  letterSpacing: "0.04em"
                }}>
                  CASH PAYMENT ONLY
                </h3>
                <p style={{
                  fontFamily: FB,
                  fontSize: 15,
                  color: "#78350F",
                  margin: 0,
                  lineHeight: 1.7,
                  fontWeight: 600
                }}>
                  ⚠️ Payment is NOT online. Registration fee must be paid in CASH to your respected Coach before the tournament.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Personal Information Section */}
            <Card mb={24}>
              <SectionH>Personal Information</SectionH>
              
              <Inp
                label="Full Name"
                name="name"
                type="text"
                value={form.name}
                onChange={setF}
                error={errors.name}
                placeholder="Enter player's full name"
              />

              <Inp
                label="Date of Birth"
                name="dob"
                type="date"
                value={form.dob}
                onChange={setF}
                error={errors.dob}
                max={new Date().toISOString().split('T')[0]}
              />

              {/* Category Badges - shown after DOB entry */}
              {form.dob && (
                <div style={{ marginBottom: 18 }}>
                  {category === 'INELIGIBLE' ? (
                    <InfoBox 
                      color="#FEE2E2" 
                      border="#FCA5A5" 
                      text="#991B1B"
                      icon="⚠️"
                    >
                      <strong>Ineligible:</strong> Player must be born on or after January 1, 2012 to participate
                    </InfoBox>
                  ) : (
                    <>
                      <div style={{
                        fontFamily: FB,
                        fontSize: 13,
                        color: "#64748B",
                        fontWeight: 500,
                        marginBottom: 10
                      }}>
                        Eligible Categories:
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {getEligibleCategories(form.dob).map(cat => (
                          <div
                            key={cat}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "8px 16px",
                              background: cat === category ? YP : "#F1F5F9",
                              border: `2px solid ${cat === category ? Y : "#CBD5E1"}`,
                              borderRadius: 10
                            }}
                          >
                            <span style={{
                              fontFamily: FD,
                              fontSize: 20,
                              color: N,
                              letterSpacing: "0.04em"
                            }}>
                              {cat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <Sel
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={setF}
                options={["Male", "Female"]}
                error={errors.gender}
              />

              <Inp
                label="Parent/Guardian Name"
                name="parentName"
                type="text"
                value={form.parentName}
                onChange={setF}
                error={errors.parentName}
                placeholder="Enter parent or guardian name"
              />
            </Card>

            {/* Contact Information Section */}
            <Card mb={24}>
              <SectionH>Contact Information</SectionH>
              
              <Inp
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={setF}
                error={errors.email}
                placeholder="example@email.com"
              />

              <Inp
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={setF}
                error={errors.phone}
                placeholder="10-digit mobile number"
              />

              <Inp
                label="Address"
                name="address"
                type="text"
                value={form.address}
                onChange={setF}
                error={errors.address}
                placeholder="Complete address"
              />
            </Card>

            {/* Photo Upload Section */}
            <Card mb={24}>
              <SectionH>Player Photo</SectionH>
              
              <ImageUpload
                playerId={form.playerId || `temp_${Date.now()}`}
                onUploadSuccess={(photoUrl) => setF('photoUrl', photoUrl)}
                onUploadError={(error) => setF('photoError', error)}
                currentPhotoUrl={form.photoUrl}
                required={true}
              />
              
              {/* Photo upload error */}
              {errors.photoUrl && (
                <div style={{
                  color: "#DC2626",
                  fontSize: 14,
                  marginTop: 12,
                  fontFamily: FB
                }}>
                  {errors.photoUrl}
                </div>
              )}
            </Card>

            {/* Event Selection Section */}
            {hasValidCategory && form.gender && (
              <Card mb={24}>
                <SectionH>Event Selection</SectionH>
                
                <EventSelector
                  dob={form.dob}
                  gender={form.gender}
                  selectedEvents={form.selectedEvents || []}
                  onEventChange={(events) => setF('selectedEvents', events)}
                />
                
                {/* Event selection error */}
                {errors.selectedEvents && (
                  <div style={{
                    color: "#DC2626",
                    fontSize: 14,
                    marginTop: 12,
                    fontFamily: FB
                  }}>
                    {errors.selectedEvents}
                  </div>
                )}
              </Card>
            )}

            {/* Submit Button */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button
                type="submit"
                disabled={category === 'INELIGIBLE' || submitting}
                style={{
                  background: (category === 'INELIGIBLE' || submitting) ? "#CBD5E1" : Y,
                  color: N,
                  border: "none",
                  cursor: (category === 'INELIGIBLE' || submitting) ? "not-allowed" : "pointer",
                  fontSize: 16,
                  fontFamily: FD,
                  fontWeight: 700,
                  padding: "16px 48px",
                  borderRadius: 12,
                  letterSpacing: "0.06em",
                  boxShadow: (category === 'INELIGIBLE' || submitting) ? "none" : "0 4px 20px rgba(245,184,0,0.3)",
                  transition: "all 0.2s",
                  opacity: (category === 'INELIGIBLE' || submitting) ? 0.6 : 1
                }}
              >
                {submitting ? '⏳ REGISTERING...' : 'COMPLETE REGISTRATION →'}
              </button>
              <p style={{
                fontFamily: FB,
                fontSize: 13,
                color: "#78350F",
                marginTop: 16,
                fontWeight: 600
              }}>
                💰 Remember: Pay registration fee in CASH to your Coach
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
