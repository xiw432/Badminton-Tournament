// End-to-End Test: Ineligible Player (Born Before 2012)
// Task 21.5: Test edge case - player born before 2012
// Requirements: 1.5 (players born before January 1, 2012 should return empty array), 6.5 (display ineligibility message)

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

describe('Task 21.5: E2E - Ineligible Player (Born Before 2012)', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should display ineligibility message for player born before January 1, 2012', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter player name
    const nameInput = screen.getByPlaceholderText(/Enter player's full name/i);
    fireEvent.change(nameInput, { target: { value: 'Ineligible Player' } });

    // Enter DOB before January 1, 2012 (ineligible)
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '2011-12-31' } });

    // Wait for ineligibility message to appear
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify the complete ineligibility message
    expect(screen.getByText(/Player must be born on or after January 1, 2012 to participate/i)).toBeInTheDocument();

    // Select gender
    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'Male' } });

    // Verify no event selector is displayed
    const eventSelectorText = screen.queryByText(/Based on your Date of Birth/i);
    expect(eventSelectorText).not.toBeInTheDocument();

    // Verify no category badges are displayed
    const u9Badges = screen.queryAllByText(/^U-9$/);
    expect(u9Badges.length).toBe(0);
    const u11Badges = screen.queryAllByText(/^U-11$/);
    expect(u11Badges.length).toBe(0);
    const u13Badges = screen.queryAllByText(/^U-13$/);
    expect(u13Badges.length).toBe(0);
    const u15Badges = screen.queryAllByText(/^U-15$/);
    expect(u15Badges.length).toBe(0);

    // Verify submit button is disabled
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).toBeDisabled();
  }, 30000);

  it('should display ineligibility message for player born well before 2012', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter player information
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Too Old Player' }
    });

    // Enter DOB well before 2012
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2010-06-15' }
    });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify ineligibility message is displayed
    expect(screen.getByText(/Player must be born on or after January 1, 2012 to participate/i)).toBeInTheDocument();

    // Select gender
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });

    // Verify no events are displayed
    const eventSelectorText = screen.queryByText(/Based on your Date of Birth/i);
    expect(eventSelectorText).not.toBeInTheDocument();

    // Verify no checkboxes are available
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes.length).toBe(0);

    // Verify submit button is disabled
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).toBeDisabled();
  }, 30000);

  it('should test boundary date: December 31, 2011 (ineligible)', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter player information
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Boundary Test Ineligible' }
    });

    // Enter DOB at boundary (December 31, 2011 - should be ineligible)
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2011-12-31' }
    });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify ineligibility message
    expect(screen.getByText(/Player must be born on or after January 1, 2012 to participate/i)).toBeInTheDocument();

    // Select gender
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Male' }
    });

    // Verify no events are available
    const eventSelectorText = screen.queryByText(/Based on your Date of Birth/i);
    expect(eventSelectorText).not.toBeInTheDocument();

    // Verify submit button is disabled
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).toBeDisabled();
  }, 30000);

  it('should prevent form submission for ineligible player', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Fill all form fields with ineligible DOB
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Submission Test Ineligible' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2011-06-15' }
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

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify submit button is disabled
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).toBeDisabled();

    // Try to click the disabled button
    fireEvent.click(submitButton);

    // Verify we're still on the Register page (no navigation occurred)
    expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    
    // Verify we did NOT navigate to Payment page
    const paymentSummary = screen.queryByText(/REGISTRATION SUMMARY/i);
    expect(paymentSummary).not.toBeInTheDocument();
  }, 30000);

  it('should not display any category badges for ineligible player', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter ineligible DOB
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'No Categories Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2009-03-20' }
    });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify "Eligible Categories:" text is NOT displayed
    const eligibleCategoriesText = screen.queryByText(/Eligible Categories:/i);
    expect(eligibleCategoriesText).not.toBeInTheDocument();

    // Verify no category badges are displayed
    const u9Badges = screen.queryAllByText(/^U-9$/);
    expect(u9Badges.length).toBe(0);
    const u11Badges = screen.queryAllByText(/^U-11$/);
    expect(u11Badges.length).toBe(0);
    const u13Badges = screen.queryAllByText(/^U-13$/);
    expect(u13Badges.length).toBe(0);
    const u15Badges = screen.queryAllByText(/^U-15$/);
    expect(u15Badges.length).toBe(0);
  }, 30000);

  it('should not display event selector for ineligible player even after selecting gender', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter ineligible DOB
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'No Events Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2011-01-15' }
    });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Select gender
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Male' }
    });

    // Verify event selector is NOT displayed
    const eventSelectorText = screen.queryByText(/Based on your Date of Birth/i);
    expect(eventSelectorText).not.toBeInTheDocument();

    // Verify no event checkboxes are available
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes.length).toBe(0);

    // Verify no Singles or Doubles events are displayed
    const singlesEvents = screen.queryAllByText(/Boys Singles/i);
    expect(singlesEvents.length).toBe(0);
    const doublesEvents = screen.queryAllByText(/Boys Doubles/i);
    expect(doublesEvents.length).toBe(0);
    const mixedDoublesEvents = screen.queryAllByText(/Mixed Doubles/i);
    expect(mixedDoublesEvents.length).toBe(0);
  }, 30000);

  it('should verify ineligibility message styling and visibility', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter ineligible DOB
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Styling Test' }
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: '2011-08-10' }
    });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify the warning icon is present
    const warningIcon = screen.getByText(/⚠️/);
    expect(warningIcon).toBeInTheDocument();

    // Verify the complete message is visible
    const ineligibleMessage = screen.getByText(/Player must be born on or after January 1, 2012 to participate/i);
    expect(ineligibleMessage).toBeInTheDocument();
    expect(ineligibleMessage).toBeVisible();
  }, 30000);

  it('should transition from eligible to ineligible when DOB is changed', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter player information
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Transition Test' }
    });

    // First, enter an eligible DOB (U-15)
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '2012-01-01' } });

    // Wait for eligible category to appear
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

    // Verify events are available
    const singlesElements = screen.getAllByText(/Boys Singles/i);
    expect(singlesElements.length).toBeGreaterThan(0);

    // Now change DOB to ineligible date
    fireEvent.change(dobInput, { target: { value: '2011-12-31' } });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify events are no longer displayed
    const eventSelectorText = screen.queryByText(/Based on your Date of Birth/i);
    expect(eventSelectorText).not.toBeInTheDocument();

    // Verify submit button is now disabled
    const submitButton = screen.getByText(/PROCEED TO PAYMENT/i);
    expect(submitButton).toBeDisabled();
  }, 30000);

  it('should clear event selections when changing from eligible to ineligible DOB', async () => {
    render(<App />);

    // Navigate to Register page
    const registerButtons = screen.getAllByText(/Register Now/i);
    fireEvent.click(registerButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText(/PLAYER REGISTRATION/i)).toBeInTheDocument();
    });

    // Enter player information with eligible DOB
    fireEvent.change(screen.getByPlaceholderText(/Enter player's full name/i), {
      target: { value: 'Clear Events Test' }
    });
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    fireEvent.change(dobInput, { target: { value: '2015-06-15' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: 'Female' }
    });

    // Wait for events to load
    await waitFor(() => {
      expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
    });

    // Select an event
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Verify fee breakdown appears
    await waitFor(() => {
      expect(screen.getByText(/FEE BREAKDOWN/i)).toBeInTheDocument();
    });

    // Change DOB to ineligible
    fireEvent.change(dobInput, { target: { value: '2011-12-31' } });

    // Wait for ineligibility message
    await waitFor(() => {
      expect(screen.getByText(/Ineligible:/i)).toBeInTheDocument();
    });

    // Verify fee breakdown is no longer displayed
    const feeBreakdown = screen.queryByText(/FEE BREAKDOWN/i);
    expect(feeBreakdown).not.toBeInTheDocument();

    // Verify no checkboxes are available
    const newCheckboxes = screen.queryAllByRole('checkbox');
    expect(newCheckboxes.length).toBe(0);
  }, 30000);
});
