import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rules from './Rules.jsx';

describe('Rules Page', () => {
  it('renders the Rules page with all sections', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for main heading
    expect(screen.getByText(/RULES & REGULATIONS/i)).toBeInTheDocument();
  });

  it('displays all age categories', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for age categories
    expect(screen.getByText('U-9')).toBeInTheDocument();
    expect(screen.getByText('U-11')).toBeInTheDocument();
    expect(screen.getByText('U-13')).toBeInTheDocument();
    expect(screen.getByText('U-15')).toBeInTheDocument();
  });

  it('displays age eligibility dates', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for eligibility information
    expect(screen.getByText(/Born on or after January 1, 2018/i)).toBeInTheDocument();
    expect(screen.getByText(/Born between January 1, 2016 and December 31, 2017/i)).toBeInTheDocument();
    expect(screen.getByText(/Born between January 1, 2014 and December 31, 2015/i)).toBeInTheDocument();
    expect(screen.getByText(/Born between January 1, 2012 and December 31, 2013/i)).toBeInTheDocument();
  });

  it('displays all tournament events', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for events
    expect(screen.getByText('Boys Singles')).toBeInTheDocument();
    expect(screen.getByText('Girls Singles')).toBeInTheDocument();
    expect(screen.getByText('Boys Doubles')).toBeInTheDocument();
    expect(screen.getByText('Girls Doubles')).toBeInTheDocument();
    expect(screen.getByText('Mixed Doubles')).toBeInTheDocument();
  });

  it('shows Mixed Doubles restriction for U-13 & U-15 only', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for Mixed Doubles restriction
    expect(screen.getByText(/U-13 & U-15 only/i)).toBeInTheDocument();
  });

  it('displays event fees correctly', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for fees (there should be multiple instances)
    const fees600 = screen.getAllByText('₹600');
    const fees1000 = screen.getAllByText('₹1,000');
    
    expect(fees600.length).toBeGreaterThan(0);
    expect(fees1000.length).toBeGreaterThan(0);
  });

  it('displays general rules section', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for general rules heading
    expect(screen.getByText(/GENERAL RULES/i)).toBeInTheDocument();
    
    // Check for some specific rules
    expect(screen.getByText(/Players must register before the deadline/i)).toBeInTheDocument();
    expect(screen.getByText(/Singles events are mandatory/i)).toBeInTheDocument();
  });

  it('displays mandatory label for Singles events', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for MANDATORY labels
    const mandatoryLabels = screen.getAllByText('MANDATORY');
    expect(mandatoryLabels.length).toBe(2); // Boys Singles and Girls Singles
  });

  it('includes Navbar component', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Navbar should render with SMAASH branding
    expect(screen.getByText('SMAASH')).toBeInTheDocument();
  });

  it('includes Register Now CTA button', () => {
    const mockGo = vi.fn();
    render(<Rules go={mockGo} />);

    // Check for Register Now buttons
    const registerButtons = screen.getAllByText(/Register Now/i);
    expect(registerButtons.length).toBeGreaterThan(0);
  });
});
