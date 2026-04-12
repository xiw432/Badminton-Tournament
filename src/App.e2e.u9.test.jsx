// End-to-End Test: Complete Registration Flow for U-9 Player
// Task 21.1: Test complete registration flow with U-9 player
// Requirements: All requirements (1-15)

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

describe('Task 21.1: E2E - U-9 Player Complete Registration Flow', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should complete full registration flow for U-9 player with all eligible categories', async () => {
    vi.useFakeTimers();
    
    render(<App />);

    // ========================================
    // STEP 1: Navigate to Register page
    // ========================================
    const registerButton = screen.getAllByText(/Register Now/i)[0];
    fireEvent.click(registerButton);
    
    expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();

    // ========================================
    // STEP 2: Enter player information
    // ========================================
    
    // Enter player name
    const nameInput = screen.getByPlaceholderText(/Enter player's full name/i);
    fireEvent.change(nameInput, { target: { value: 'Aarav Kumar' } });

    // Enter DOB for U-9 player (born on or after January 1, 2018)
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '2018-06-15' } });

    // Verify eligible categories are displayed
    await waitFor(() => {
      expect(screen.getByText('Eligible Categories:')).toBeInTheDocument();
    }, { timeout: 10000 });
    
    expect(screen.getByText('U-9')).toBeInTheDocument();
    expect(screen.getByText('U-11')).toBeInTheDocument();
    expect(screen.getByText('U-13')).toBeInTheDocument();
    expect(screen.getByText('U-15')).toBeInTheDocument();

    // Select gender
    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'Male' } });

    // Enter parent/guardian name
    const parentInput = screen.getByPlaceholderText(/Enter parent or guardian name/i);
    fireEvent.change(parentInput, { target: { value: 'Rajesh Kumar' } });

    // Enter email
    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    fireEvent.change(emailInput, { target: { value: 'rajesh.kumar@example.com' } });

    // Enter phone number
    const phoneInput = screen.getByPlaceholderText(/10-digit mobile number/i);
    fireEvent.change(phoneInput, { target: { value: '9876543210' } });

    // Enter address
    const addressInput = screen.getByPlaceholderText(/Complete address/i);
    fireEvent.change(addressInput, { 
      target: { value: '123 Main Street, Lucknow, Uttar Pradesh 226001' } 
    });

    // ========================================
    // STEP 3: Verify eligible events displayed
    // ========================================
    
    // Wait for EventSelector to render
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Verify events are available
    expect(screen.getByText(/Boys Singles/i)).toBeInTheDocument();
    expect(screen.getByText(/Boys Doubles/i)).toBeInTheDocument();

    // ========================================
    // STEP 4: Select events from multiple categories
    // ========================================
    
    // Get all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    
    // Select first event (U-9 Boys Singles)
    fireEvent.click(checkboxes[0]);
    
    // Select another event
    if (checkboxes[2]) {
      fireEvent.click(checkboxes[2]);
    }

    // ========================================
    // STEP 5: Verify fee calculation
    // ========================================
    
    // Wait for fee breakdown to appear
    await waitFor(() => {
      expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Verify total fee is displayed
    expect(screen.getByText(/TOTAL FEE/i)).toBeInTheDocument();

    // ========================================
    // STEP 6: Navigate to Payment page
    // ========================================
    
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    // Verify navigation to Payment page
    await waitFor(() => {
      expect(screen.getByText(/PAYMENT/i)).toBeInTheDocument();
    }, { timeout: 10000 });
    
    expect(screen.getByText(/REGISTRATION SUMMARY/i)).toBeInTheDocument();

    // ========================================
    // STEP 7: Verify data on Payment page
    // ========================================
    
    // Verify player information
    expect(screen.getByText('Aarav Kumar')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByText('rajesh.kumar@example.com')).toBeInTheDocument();

    // Verify category is displayed
    expect(screen.getByText('U-9')).toBeInTheDocument();

    // Verify fee breakdown
    expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();

    // Verify selected events are displayed
    expect(screen.getByText(/Boys Singles/i)).toBeInTheDocument();

    // ========================================
    // STEP 8: Navigate to Confirm page
    // ========================================
    
    // Click pay button
    const payButton = screen.getByRole('button', { name: /Pay ₹/i });
    expect(payButton).not.toBeDisabled();
    fireEvent.click(payButton);

    // Verify loading state
    await waitFor(() => {
      expect(screen.getByText(/Processing Payment/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Fast-forward time to complete payment processing
    vi.advanceTimersByTime(2000);

    // Verify navigation to Confirm page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION CONFIRMED!/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // ========================================
    // STEP 9: Verify QR code generation
    // ========================================
    
    // Verify player ID is generated (format: LKO2026-XXXX)
    const playerIdElement = screen.getByText(/LKO2026-\d{4}/);
    expect(playerIdElement).toBeInTheDocument();

    // Verify player name is displayed
    expect(screen.getByText('Aarav Kumar')).toBeInTheDocument();

    // Verify category badge
    expect(screen.getByText('U-9')).toBeInTheDocument();

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
    expect(screen.getByText(/VENUE/i)).toBeInTheDocument();
    expect(screen.getByText(/Gopi Nath Laxman Das Rastogi Inter College/i)).toBeInTheDocument();

    // Verify tournament dates
    expect(screen.getByText(/April 17th – 19th, 2026/i)).toBeInTheDocument();

    // Verify contact information
    expect(screen.getByText(/7052416803/i)).toBeInTheDocument();

    // Verify back to home button
    const backButton = screen.getByText(/Back to Home/i);
    expect(backButton).toBeInTheDocument();

    vi.useRealTimers();
  }, 30000); // 30 second timeout

  it('should verify U-9 player has access to all four categories (U-9, U-11, U-13, U-15)', async () => {
    render(<App />);

    // Navigate to Register
    fireEvent.click(screen.getAllByText(/Register Now/i)[0]);

    // Fill form for U-9 player
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Test U9 Player' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2018-03-20' }
    });

    // Wait for eligible categories to display
    await waitFor(() => {
      expect(screen.getByText('Eligible Categories:')).toBeInTheDocument();
    }, { timeout: 10000 });

    // Verify all four category badges are displayed
    expect(screen.getByText('U-9')).toBeInTheDocument();
    expect(screen.getByText('U-11')).toBeInTheDocument();
    expect(screen.getByText('U-13')).toBeInTheDocument();
    expect(screen.getByText('U-15')).toBeInTheDocument();

    // Select gender to show events
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Verify events are available
    expect(screen.getByText(/Girls Singles/i)).toBeInTheDocument();
    expect(screen.getByText(/Girls Doubles/i)).toBeInTheDocument();
  }, 30000);

  it('should validate that at least one event must be selected', async () => {
    render(<App />);

    // Navigate to Register
    fireEvent.click(screen.getAllByText(/Register Now/i)[0]);

    // Fill all required fields except events
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Validation Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2018-05-10' }
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
      expect(screen.getByText(/Please select at least one event/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Verify still on Register page
    expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
  }, 30000);

  it('should maintain data integrity through Register → Payment → Confirm flow', async () => {
    vi.useFakeTimers();
    
    render(<App />);

    // Navigate to Register
    fireEvent.click(screen.getAllByText(/Register Now/i)[0]);

    // Fill form with specific data
    const testData = {
      name: 'Data Integrity Test',
      dob: '2018-12-25',
      gender: 'Male',
      parentName: 'Parent Test',
      email: 'integrity@test.com',
      phone: '8888888888',
      address: '456 Integrity Lane, Test City'
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
    }, { timeout: 10000 });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Navigate to Payment
    fireEvent.click(screen.getByText(/PROCEED TO PAYMENT/i));

    // Verify data on Payment page
    await waitFor(() => {
      expect(screen.getByText(/PAYMENT/i)).toBeInTheDocument();
    }, { timeout: 10000 });
    
    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText(testData.phone)).toBeInTheDocument();
    expect(screen.getByText(testData.email)).toBeInTheDocument();

    // Process payment
    const payButton = screen.getByRole('button', { name: /Pay ₹/i });
    fireEvent.click(payButton);

    vi.advanceTimersByTime(2000);

    // Verify data on Confirm page
    await waitFor(() => {
      expect(screen.getByText(/REGISTRATION CONFIRMED!/i)).toBeInTheDocument();
    }, { timeout: 10000 });
    
    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText('U-9')).toBeInTheDocument();
    expect(screen.getByText(testData.gender)).toBeInTheDocument();

    vi.useRealTimers();
  }, 30000);
});
