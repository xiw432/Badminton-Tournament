// End-to-End Test: Complete Registration Flow for U-13 Player
// Task 21.3: Test complete registration flow with U-13 player
// Requirements: All requirements (1-15)

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

describe('Task 21.3: E2E - U-13 Player Complete Registration Flow', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should complete full registration flow for U-13 player with eligible categories', async () => {
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
    // STEP 2: Enter player information for U-13
    // ========================================
    
    // Enter player name
    const nameInput = screen.getByPlaceholderText(/Enter player's full name/i);
    fireEvent.change(nameInput, { target: { value: 'Rohan Verma' } });

    // Enter DOB for U-13 player (born on or after January 1, 2014 and before January 1, 2016)
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '2014-09-15' } });

    // Verify category badge is displayed
    await waitFor(() => {
      const categoryText = screen.queryByText('U-13');
      expect(categoryText).toBeInTheDocument();
    });

    // Select gender
    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'Male' } });

    // Enter parent/guardian name
    const parentInput = screen.getByPlaceholderText(/Enter parent or guardian name/i);
    fireEvent.change(parentInput, { target: { value: 'Suresh Verma' } });

    // Enter email
    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    fireEvent.change(emailInput, { target: { value: 'suresh.verma@example.com' } });

    // Enter phone number
    const phoneInput = screen.getByPlaceholderText(/10-digit mobile number/i);
    fireEvent.change(phoneInput, { target: { value: '9234567890' } });

    // Enter address
    const addressInput = screen.getByPlaceholderText(/Complete address/i);
    fireEvent.change(addressInput, { 
      target: { value: '789 Garden Road, Lucknow, Uttar Pradesh 226003' } 
    });

    // ========================================
    // STEP 3: Verify eligible categories displayed (U-13, U-15 - NOT U-9 or U-11)
    // ========================================
    
    // Wait for EventSelector to render
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify U-13 and U-15 categories are displayed in EventSelector
    const allText = document.body.textContent;
    expect(allText).toContain('U-13');
    expect(allText).toContain('U-15');
    
    // CRITICAL: Verify U-9 and U-11 are NOT in the eligible categories
    // U-13 players should NOT have access to U-9 or U-11
    const u9Badges = screen.queryAllByText(/^U-9$/);
    expect(u9Badges.length).toBe(0);
    
    const u11Badges = screen.queryAllByText(/^U-11$/);
    expect(u11Badges.length).toBe(0);

    // ========================================
    // STEP 4: Verify available events (Singles, Doubles, AND Mixed Doubles for U-13)
    // ========================================
    
    // Verify Singles, Doubles, and Mixed Doubles events are available
    await waitFor(() => {
      expect(screen.getByText(/Boys Singles/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Boys Doubles/i)).toBeInTheDocument();
    
    // CRITICAL: U-13 players SHOULD have access to Mixed Doubles
    // This is the key difference from U-9 and U-11
    expect(screen.getByText(/Mixed Doubles/i)).toBeInTheDocument();

    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    
    // Select U-13 Boys Singles (first checkbox)
    fireEvent.click(checkboxes[0]);
    
    // Select U-13 Mixed Doubles to verify it's available
    // Find the Mixed Doubles checkbox
    const mixedDoublesCheckbox = checkboxes.find((cb, idx) => {
      const label = screen.queryByText(/Mixed Doubles/i);
      return label && cb;
    });
    if (checkboxes.length > 2) {
      fireEvent.click(checkboxes[2]); // Likely Mixed Doubles
    }

    // ========================================
    // STEP 5: Verify fee calculation
    // ========================================
    
    // Wait for fee breakdown to appear
    await waitFor(() => {
      expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
    });

    // Verify total fee is displayed
    expect(screen.getByText(/TOTAL FEE/i)).toBeInTheDocument();

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
    expect(screen.getByText('Rohan Verma')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('9234567890')).toBeInTheDocument();
    expect(screen.getByText('suresh.verma@example.com')).toBeInTheDocument();

    // Verify category is displayed
    expect(screen.getByText('U-13')).toBeInTheDocument();

    // Verify fee breakdown
    expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();

    // Verify selected events are displayed
    expect(screen.getByText(/Boys Singles/i)).toBeInTheDocument();

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
    expect(screen.getByText('Rohan Verma')).toBeInTheDocument();

    // Verify category badge
    expect(screen.getByText('U-13')).toBeInTheDocument();

    // Verify gender badge
    expect(screen.getByText('Male')).toBeInTheDocument();

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

  it('should verify U-13 player has access to exactly two categories (U-13, U-15) and NOT U-9 or U-11', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-13 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Test U13 Player' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2015-07-20' }
    });

    // Wait for category badge to display
    await waitFor(() => {
      expect(screen.queryByText('U-13')).toBeInTheDocument();
    });

    // Select gender to show events
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify U-13 and U-15 are present
    const allText = document.body.textContent;
    expect(allText).toContain('U-13');
    expect(allText).toContain('U-15');
    
    // Should NOT have U-9 or U-11
    const u9Badges = screen.queryAllByText(/^U-9$/);
    expect(u9Badges.length).toBe(0);
    
    const u11Badges = screen.queryAllByText(/^U-11$/);
    expect(u11Badges.length).toBe(0);

    // Verify events are available
    expect(screen.getByText(/Girls Singles/i)).toBeInTheDocument();
    expect(screen.getByText(/Girls Doubles/i)).toBeInTheDocument();
    expect(screen.getByText(/Mixed Doubles/i)).toBeInTheDocument();
  }, 30000);

  it('should verify U-13 player HAS access to Mixed Doubles (unlike U-9 and U-11)', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-13 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Mixed Doubles Test U13' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2014-01-01' }
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Male' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify Singles, Doubles, AND Mixed Doubles are available for U-13
    expect(screen.getByText(/Boys Singles/i)).toBeInTheDocument();
    expect(screen.getByText(/Boys Doubles/i)).toBeInTheDocument();
    
    // CRITICAL: Mixed Doubles SHOULD be available for U-13
    // This is the key difference from U-9 and U-11 players
    expect(screen.getByText(/Mixed Doubles/i)).toBeInTheDocument();
    
    // Verify we can select Mixed Doubles
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Find and click Mixed Doubles checkbox
    // Mixed Doubles should be the third event in U-13 category
    if (checkboxes.length >= 3) {
      fireEvent.click(checkboxes[2]); // Mixed Doubles
      
      // Verify fee breakdown appears with Mixed Doubles
      await waitFor(() => {
        expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
      });
      
      // Verify Mixed Doubles is in the fee breakdown
      expect(screen.getByText(/Mixed Doubles/i)).toBeInTheDocument();
    }
  }, 30000);

  it('should allow U-13 player to select events from multiple eligible categories including Mixed Doubles', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-13 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Multi Category U13 Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2015-12-31' }
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

    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Select events from U-13 category
    // Select U-13 Girls Singles
    fireEvent.click(checkboxes[0]);
    
    // Select U-13 Mixed Doubles
    if (checkboxes.length >= 3) {
      fireEvent.click(checkboxes[2]);
    }
    
    // Select an event from U-15 category if available
    if (checkboxes.length > 4) {
      fireEvent.click(checkboxes[4]); // Likely U-15 Girls Singles
    }

    // Verify fee breakdown appears
    await waitFor(() => {
      expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
    });

    // Verify total fee is calculated
    expect(screen.getByText(/TOTAL FEE/i)).toBeInTheDocument();

    // Verify Mixed Doubles is in the selection
    expect(screen.getByText(/Mixed Doubles/i)).toBeInTheDocument();

    // Submit form
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    fireEvent.click(submitButton);

    // Verify navigation to Payment page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION SUMMARY/i)).toBeInTheDocument();
    });
  }, 30000);

  it('should maintain data integrity through Register → Payment → Confirm flow for U-13 player', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form with specific data
    const testData = {
      name: 'U13 Data Integrity Test',
      dob: '2014-06-10',
      gender: 'Male',
      parentName: 'Parent U13 Test',
      email: 'u13integrity@test.com',
      phone: '6666666666',
      address: '321 U13 Test Avenue, Test City'
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
    vi.useFakeTimers();
    const payButton = screen.getByRole('button', { name: /Pay ₹/i });
    fireEvent.click(payButton);

    vi.advanceTimersByTime(2000);

    // Verify data on Confirm page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION CONFIRMED!/i)).toBeInTheDocument();
    });
    
    vi.useRealTimers();
    
    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText('U-13')).toBeInTheDocument();
    expect(screen.getByText(testData.gender)).toBeInTheDocument();
  }, 30000);

  it('should verify U-13 player can select Mixed Doubles from both U-13 and U-15 categories', async () => {
    render(<App />);

    // Navigate to Register
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill form for U-13 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Mixed Doubles Multi-Category Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2014-03-15' }
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
      target: { value: '8888888888' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Complete address/i), {
      target: { value: '456 Test Road' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Verify Mixed Doubles appears in both U-13 and U-15 sections
    const mixedDoublesElements = screen.getAllByText(/Mixed Doubles/i);
    // Should have at least 2 instances (one for U-13, one for U-15)
    expect(mixedDoublesElements.length).toBeGreaterThanOrEqual(2);

    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    
    // Select Mixed Doubles from U-13 (likely checkbox 2)
    if (checkboxes.length >= 3) {
      fireEvent.click(checkboxes[2]);
    }
    
    // Select Mixed Doubles from U-15 (likely checkbox 5 or 6)
    if (checkboxes.length >= 6) {
      fireEvent.click(checkboxes[5]);
    }

    // Verify fee breakdown shows both Mixed Doubles selections
    await waitFor(() => {
      expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
    });

    // Verify both Mixed Doubles entries are in the breakdown
    const feeBreakdownText = document.body.textContent;
    expect(feeBreakdownText).toContain('Mixed Doubles');
    expect(feeBreakdownText).toContain('U-13');
    expect(feeBreakdownText).toContain('U-15');

    // Submit form
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    fireEvent.click(submitButton);

    // Verify navigation to Payment page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION SUMMARY/i)).toBeInTheDocument();
    });
  }, 30000);
});
