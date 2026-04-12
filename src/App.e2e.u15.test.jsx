// End-to-End Test: Complete Registration Flow for U-15 Player
// Task 21.4: Test complete registration flow with U-15 player
// Requirements: All requirements (1-15)

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

describe('Task 21.4: E2E - U-15 Player Complete Registration Flow', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should complete full registration flow for U-15 player with only U-15 category', async () => {
    render(<App />);

    // ========================================
    // STEP 1: Navigate to Register page
    // ========================================
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // ========================================
    // STEP 2: Enter player information for U-15
    // ========================================
    
    // Enter player name
    const nameInput = screen.getByPlaceholderText(/Enter player's full name/i);
    fireEvent.change(nameInput, { target: { value: 'Ananya Singh' } });

    // Enter DOB for U-15 player (born on or after January 1, 2012 and before January 1, 2014)
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '2012-11-10' } });

    // Verify category badge is displayed
    await waitFor(() => {
      const categoryText = screen.queryByText('U-15');
      expect(categoryText).toBeInTheDocument();
    });

    // Select gender
    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'Female' } });

    // Enter parent/guardian name
    const parentInput = screen.getByPlaceholderText(/Enter parent or guardian name/i);
    fireEvent.change(parentInput, { target: { value: 'Vikram Singh' } });

    // Enter email
    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    fireEvent.change(emailInput, { target: { value: 'vikram.singh@example.com' } });

    // Enter phone number
    const phoneInput = screen.getByPlaceholderText(/10-digit mobile number/i);
    fireEvent.change(phoneInput, { target: { value: '9345678901' } });

    // Enter address
    const addressInput = screen.getByPlaceholderText(/Complete address/i);
    fireEvent.change(addressInput, { 
      target: { value: '321 Lake View, Lucknow, Uttar Pradesh 226004' } 
    });

    // ========================================
    // STEP 3: Verify eligible category displayed (U-15 ONLY - NOT U-9, U-11, or U-13)
    // ========================================
    
    // Wait for EventSelector to render
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify ONLY U-15 category is displayed in EventSelector
    const allText = document.body.textContent;
    expect(allText).toContain('U-15');
    
    // CRITICAL: Verify U-9, U-11, and U-13 are NOT in the eligible categories
    // U-15 players should ONLY have access to U-15 (not lower categories)
    const u9Badges = screen.queryAllByText(/^U-9$/);
    expect(u9Badges.length).toBe(0);
    
    const u11Badges = screen.queryAllByText(/^U-11$/);
    expect(u11Badges.length).toBe(0);
    
    const u13Badges = screen.queryAllByText(/^U-13$/);
    expect(u13Badges.length).toBe(0);

    // ========================================
    // STEP 4: Verify available events (Singles, Doubles, AND Mixed Doubles for U-15)
    // ========================================
    
    // Verify Singles, Doubles, and Mixed Doubles events are available
    await waitFor(() => {
      const singlesElements = screen.getAllByText(/Girls Singles/i);
      expect(singlesElements.length).toBeGreaterThan(0);
    });
    const doublesElements = screen.getAllByText(/Girls Doubles/i);
    expect(doublesElements.length).toBeGreaterThan(0);
    
    // CRITICAL: U-15 players SHOULD have access to Mixed Doubles
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    expect(mixedDoublesElements.length).toBeGreaterThan(0);

    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    
    // Select U-15 Girls Singles (first checkbox)
    fireEvent.click(checkboxes[0]);
    
    // Select U-15 Mixed Doubles to verify it's available
    if (checkboxes.length > 2) {
      fireEvent.click(checkboxes[2]); // Mixed Doubles
    }

    // ========================================
    // STEP 5: Verify fee calculation
    // ========================================
    
    // Wait for fee breakdown to appear
    await waitFor(() => {
      expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
    });

    // Verify total fee is displayed
    const totalFeeElements = screen.getAllByText(/TOTAL FEE/i);
    expect(totalFeeElements.length).toBeGreaterThan(0);

    // ========================================
    // STEP 6: Navigate to Payment page with correct data
    // ========================================
    
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    // Verify navigation to Payment page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION SUMMARY/i)).toBeInTheDocument();
    });

    // ========================================
    // STEP 7: Verify data on Payment page
    // ========================================
    
    // Verify player information
    expect(screen.getByText('Ananya Singh')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('9345678901')).toBeInTheDocument();
    expect(screen.getByText('vikram.singh@example.com')).toBeInTheDocument();

    // Verify category is displayed
    const u15Elements = screen.getAllByText('U-15');
    expect(u15Elements.length).toBeGreaterThan(0);

    // Verify fee breakdown
    expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();

    // Verify selected events are displayed
    expect(screen.getByText(/Girls Singles/i)).toBeInTheDocument();

    // ========================================
    // STEP 8: Navigate to Confirm page with correct data
    // ========================================
    
    // Use fake timers for payment processing
    vi.useFakeTimers();
    
    // Click pay button
    const payButton = screen.getByRole('button', { name: /Pay ₹/i });
    expect(payButton).not.toBeDisabled();
    fireEvent.click(payButton);

    // Verify loading state
    await waitFor(() => {
      expect(screen.getByText(/Processing Payment/i)).toBeInTheDocument();
    });

    // Fast-forward time to complete payment processing
    vi.advanceTimersByTime(2000);

    // Verify navigation to Confirm page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION CONFIRMED!/i)).toBeInTheDocument();
    });
    
    vi.useRealTimers();

    // ========================================
    // STEP 9: Verify QR code generation
    // ========================================
    
    // Verify player ID is generated (format: LKO2026-XXXX)
    await waitFor(() => {
      const playerIdElement = screen.getByText(/LKO2026-\d{4}/);
      expect(playerIdElement).toBeInTheDocument();
    });

    // Verify player name is displayed
    expect(screen.getByText('Ananya Singh')).toBeInTheDocument();

    // Verify category badge
    expect(screen.getByText('U-15')).toBeInTheDocument();

    // Verify gender badge
    expect(screen.getByText('Female')).toBeInTheDocument();

    // Verify QR code is displayed
    const qrImages = screen.getAllByRole('img');
    const qrImage = qrImages.find(img => 
      img.src && img.src.includes('qrserver.com')
    );
    expect(qrImage).toBeDefined();

    // ========================================
    // STEP 10: Verify complete registration data
    // ========================================
    
    // Verify venue information is displayed
    expect(screen.getByText(/Gopi Nath Laxman Das Rastogi Inter College/i)).toBeInTheDocument();

    // Verify tournament dates
    expect(screen.getByText(/April 17th – 19th, 2026/i)).toBeInTheDocument();

    // Verify contact information
    expect(screen.getByText(/7052416803/i)).toBeInTheDocument();

    // Verify back to home button
    const backButton = screen.getByText(/Back to Home/i);
    expect(backButton).toBeInTheDocument();
  }, 30000); // 30 second timeout

  it('should verify U-15 player has access to ONLY U-15 category (NOT U-9, U-11, or U-13)', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-15 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Test U15 Player' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2013-04-25' }
    });

    // Wait for category badge to display
    await waitFor(() => {
      expect(screen.queryByText('U-15')).toBeInTheDocument();
    });

    // Select gender to show events
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Male' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify ONLY U-15 is present
    const allText = document.body.textContent;
    expect(allText).toContain('U-15');
    
    // Should NOT have U-9, U-11, or U-13
    const u9Badges = screen.queryAllByText(/^U-9$/);
    expect(u9Badges.length).toBe(0);
    
    const u11Badges = screen.queryAllByText(/^U-11$/);
    expect(u11Badges.length).toBe(0);
    
    const u13Badges = screen.queryAllByText(/^U-13$/);
    expect(u13Badges.length).toBe(0);

    // Verify events are available
    const singlesElements = screen.getAllByText(/Boys Singles/i);
    expect(singlesElements.length).toBeGreaterThan(0);
    const doublesElements = screen.getAllByText(/Boys Doubles/i);
    expect(doublesElements.length).toBeGreaterThan(0);
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    expect(mixedDoublesElements.length).toBeGreaterThan(0);
  }, 30000);

  it('should verify U-15 player HAS access to Mixed Doubles', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-15 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Mixed Doubles Test U15' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2012-01-01' }
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Male' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify Singles, Doubles, AND Mixed Doubles are available for U-15
    const singlesElements = screen.getAllByText(/Boys Singles/i);
    expect(singlesElements.length).toBeGreaterThan(0);
    const doublesElements = screen.getAllByText(/Boys Doubles/i);
    expect(doublesElements.length).toBeGreaterThan(0);
    
    // CRITICAL: Mixed Doubles SHOULD be available for U-15
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    expect(mixedDoublesElements.length).toBeGreaterThan(0);
    
    // Verify we can select Mixed Doubles
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Find and click Mixed Doubles checkbox
    // Mixed Doubles should be the third event in U-15 category
    if (checkboxes.length >= 3) {
      fireEvent.click(checkboxes[2]); // Mixed Doubles
      
      // Verify fee breakdown appears with Mixed Doubles
      await waitFor(() => {
        const feeBreakdownElements = screen.getAllByText(/FEE BREAKDOWN/i);
        expect(feeBreakdownElements.length).toBeGreaterThan(0);
      });
      
      // Verify Mixed Doubles is in the fee breakdown
      const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
      expect(mixedDoublesElements.length).toBeGreaterThan(0);
    }
  }, 30000);

  it('should verify U-15 player can only select events from U-15 category', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-15 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Single Category U15 Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2013-12-31' }
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter parent or guardian name/i), {
      target: { value: 'Test Parent' }
    });
    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/10-digit mobile number/i), {
      target: { value: '9999999999' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Complete address/i), {
      target: { value: '123 Test Street' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Get all checkboxes - should only be 3 for U-15 (Singles, Doubles, Mixed Doubles)
    const checkboxes = screen.getAllByRole('checkbox');
    
    // U-15 players should only have 3 events (Singles, Doubles, Mixed Doubles)
    // Unlike younger players who have access to multiple categories
    expect(checkboxes.length).toBe(3);
    
    // Select all U-15 events
    fireEvent.click(checkboxes[0]); // Girls Singles
    fireEvent.click(checkboxes[1]); // Girls Doubles
    fireEvent.click(checkboxes[2]); // Mixed Doubles

    // Verify fee breakdown appears
    await waitFor(() => {
      const feeBreakdownElements = screen.getAllByText(/FEE BREAKDOWN/i);
      expect(feeBreakdownElements.length).toBeGreaterThan(0);
    });

    // Verify total fee is calculated
    const totalFeeElements = screen.getAllByText(/TOTAL FEE/i);
    expect(totalFeeElements.length).toBeGreaterThan(0);

    // Verify all three events are in the selection
    const singlesElements = screen.getAllByText(/Girls Singles/i);
    expect(singlesElements.length).toBeGreaterThan(0);
    const doublesElements = screen.getAllByText(/Girls Doubles/i);
    expect(doublesElements.length).toBeGreaterThan(0);
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    expect(mixedDoublesElements.length).toBeGreaterThan(0);

    // Submit form
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    fireEvent.click(submitButton);

    // Verify navigation to Payment page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION SUMMARY/i)).toBeInTheDocument();
    });
    
    // Verify only U-15 category is shown on payment page
    const u15Elements = screen.getAllByText('U-15');
    expect(u15Elements.length).toBeGreaterThan(0);
  }, 30000);

  it('should maintain data integrity through Register → Payment → Confirm flow for U-15 player', async () => {
    vi.useFakeTimers();
    
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form with specific data
    const testData = {
      name: 'U15 Data Integrity Test',
      dob: '2012-08-15',
      gender: 'Male',
      parentName: 'Parent U15 Test',
      email: 'u15integrity@test.com',
      phone: '5555555555',
      address: '654 U15 Test Boulevard, Test City'
    };

    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: testData.name }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: testData.dob }
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: testData.gender }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter parent or guardian name/i), {
      target: { value: testData.parentName }
    });
    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), {
      target: { value: testData.email }
    });
    fireEvent.change(screen.getByPlaceholderText(/10-digit mobile number/i), {
      target: { value: testData.phone }
    });
    fireEvent.change(screen.getByPlaceholderText(/Complete address/i), {
      target: { value: testData.address }
    });

    // Wait for events and select one
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Navigate to Payment
    fireEvent.click(screen.getByText(/PROCEED TO PAYMENT/i));

    // Verify data on Payment page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION SUMMARY/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText(testData.phone)).toBeInTheDocument();
    expect(screen.getByText(testData.email)).toBeInTheDocument();

    // Process payment with fake timers
    const payButton = screen.getByRole('button', { name: /Pay ₹/i });
    fireEvent.click(payButton);

    vi.advanceTimersByTime(2000);

    // Verify data on Confirm page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION CONFIRMED!/i)).toBeInTheDocument();
    });
    
    vi.useRealTimers();
    
    expect(screen.getByText(testData.name)).toBeInTheDocument();
    const u15Elements = screen.getAllByText('U-15');
    expect(u15Elements.length).toBeGreaterThan(0);
    expect(screen.getByText(testData.gender)).toBeInTheDocument();
  }, 30000);

  it('should validate that at least one event must be selected for U-15 player', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill all required fields except events
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Validation Test U15' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2012-05-20' }
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter parent or guardian name/i), {
      target: { value: 'Test Parent' }
    });
    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/10-digit mobile number/i), {
      target: { value: '9999999999' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Complete address/i), {
      target: { value: '123 Test Street' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Try to submit without selecting any events
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    fireEvent.click(submitButton);

    // Verify error message appears
    await waitFor(() => {
      const errorElements = screen.queryAllByText(/Please select at least one event/i);
      expect(errorElements.length).toBeGreaterThan(0);
    }, { timeout: 10000 });

    // Verify still on Register page
    expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
  }, 30000);

  it('should verify U-15 player at boundary date (January 1, 2012) is eligible', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-15 player at lower boundary
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Boundary Test Lower' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2012-01-01' }
    });

    // Wait for category badge to display
    await waitFor(() => {
      const u15Elements = screen.queryAllByText('U-15');
      expect(u15Elements.length).toBeGreaterThan(0);
    });

    // Select gender to show events
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Male' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify U-15 events are available
    const singlesElements = screen.getAllByText(/Boys Singles/i);
    expect(singlesElements.length).toBeGreaterThan(0);
    const doublesElements = screen.getAllByText(/Boys Doubles/i);
    expect(doublesElements.length).toBeGreaterThan(0);
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    expect(mixedDoublesElements.length).toBeGreaterThan(0);
  }, 30000);

  it('should verify U-15 player at boundary date (December 31, 2013) is eligible', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-15 player at upper boundary
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Boundary Test Upper' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2013-12-31' }
    });

    // Wait for category badge to display
    await waitFor(() => {
      const u15Elements = screen.queryAllByText('U-15');
      expect(u15Elements.length).toBeGreaterThan(0);
    });

    // Select gender to show events
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify U-15 events are available
    const singlesElements = screen.getAllByText(/Girls Singles/i);
    expect(singlesElements.length).toBeGreaterThan(0);
    const doublesElements = screen.getAllByText(/Girls Doubles/i);
    expect(doublesElements.length).toBeGreaterThan(0);
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    expect(mixedDoublesElements.length).toBeGreaterThan(0);
  }, 30000);
});
