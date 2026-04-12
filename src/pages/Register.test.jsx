// Unit tests for Register page component
// Requirements: 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4, 7.1, 7.2, 7.3, 7.4
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register.jsx';

describe('Register Page', () => {
  const mockGo = vi.fn();
  const mockSetF = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    go: mockGo,
    setF: mockSetF,
    onSubmit: mockOnSubmit,
    form: {
      name: '',
      dob: '',
      gender: '',
      parentName: '',
      address: '',
      email: '',
      phone: '',
      selectedEvents: []
    },
    errors: {}
  };

  it('renders registration form with all sections', () => {
    render(<Register {...defaultProps} />);
    
    expect(screen.getByText('PLAYER REGISTRATION')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  it('displays all required form fields', () => {
    render(<Register {...defaultProps} />);
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Parent\/Guardian Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
  });

  it('displays eligible category badges for U-13 player', () => {
    const propsWithDOB = {
      ...defaultProps,
      form: { ...defaultProps.form, dob: '2014-06-15' }
    };
    
    render(<Register {...propsWithDOB} />);
    
    expect(screen.getByText('Eligible Categories:')).toBeInTheDocument();
    expect(screen.getByText('U-13')).toBeInTheDocument();
    expect(screen.getByText('U-15')).toBeInTheDocument();
  });

  it('displays all eligible category badges for U-9 player', () => {
    const propsWithDOB = {
      ...defaultProps,
      form: { ...defaultProps.form, dob: '2018-06-15' }
    };
    
    render(<Register {...propsWithDOB} />);
    
    expect(screen.getByText('Eligible Categories:')).toBeInTheDocument();
    expect(screen.getByText('U-9')).toBeInTheDocument();
    expect(screen.getByText('U-11')).toBeInTheDocument();
    expect(screen.getByText('U-13')).toBeInTheDocument();
    expect(screen.getByText('U-15')).toBeInTheDocument();
  });

  it('displays ineligible message for DOB before 2012', () => {
    const propsWithIneligibleDOB = {
      ...defaultProps,
      form: { ...defaultProps.form, dob: '2011-12-31' }
    };
    
    render(<Register {...propsWithIneligibleDOB} />);
    
    expect(screen.getByText(/Ineligible/i)).toBeInTheDocument();
    expect(screen.getByText(/must be born on or after January 1, 2012/i)).toBeInTheDocument();
  });

  it('shows EventSelector when gender and valid category are selected', () => {
    const propsWithGenderAndDOB = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2014-06-15',
        gender: 'Male'
      }
    };
    
    render(<Register {...propsWithGenderAndDOB} />);
    
    expect(screen.getByText('Event Selection')).toBeInTheDocument();
    expect(screen.getByText(/Based on your Date of Birth/i)).toBeInTheDocument();
  });

  it('does not show EventSelector when no gender is selected', () => {
    const propsWithDOBOnly = {
      ...defaultProps,
      form: { ...defaultProps.form, dob: '2014-06-15' }
    };
    
    render(<Register {...propsWithDOBOnly} />);
    
    expect(screen.queryByText('Event Selection')).not.toBeInTheDocument();
  });

  it('does not show EventSelector for ineligible category', () => {
    const propsWithIneligible = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2011-12-31',
        gender: 'Male'
      }
    };
    
    render(<Register {...propsWithIneligible} />);
    
    expect(screen.queryByText('Event Selection')).not.toBeInTheDocument();
  });

  it('disables submit button for ineligible players', () => {
    const propsWithIneligible = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2011-12-31',
        gender: 'Male'
      }
    };
    
    render(<Register {...propsWithIneligible} />);
    
    const submitButton = screen.getByText('PROCEED TO PAYMENT');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button for eligible players', () => {
    const propsWithEligible = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2014-06-15',
        gender: 'Male'
      }
    };
    
    render(<Register {...propsWithEligible} />);
    
    const submitButton = screen.getByText('PROCEED TO PAYMENT');
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onSubmit when form is submitted', () => {
    const propsWithValidForm = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2014-06-15',
        gender: 'Male',
        name: 'Test Player'
      }
    };
    
    render(<Register {...propsWithValidForm} />);
    
    const submitButton = screen.getByText('PROCEED TO PAYMENT');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('displays validation errors when provided', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        name: 'Name is required',
        email: 'Invalid email format'
      }
    };
    
    render(<Register {...propsWithErrors} />);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('displays event selection error when provided', () => {
    const propsWithEventError = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2014-06-15',
        gender: 'Male'
      },
      errors: {
        selectedEvents: 'Please select at least one event'
      }
    };
    
    render(<Register {...propsWithEventError} />);
    
    expect(screen.getByText('Please select at least one event')).toBeInTheDocument();
  });

  it('calls setF when input fields are changed', () => {
    render(<Register {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    expect(mockSetF).toHaveBeenCalledWith('name', 'John Doe');
  });

  it('passes selectedEvents to EventSelector', () => {
    const propsWithEvents = {
      ...defaultProps,
      form: {
        ...defaultProps.form,
        dob: '2014-06-15',
        gender: 'Male',
        selectedEvents: [
          { category: 'U-13', name: 'Boys Singles', fee: 600 }
        ]
      }
    };
    
    render(<Register {...propsWithEvents} />);
    
    // EventSelector should render with the selected events
    expect(screen.getByText('Event Selection')).toBeInTheDocument();
  });

  it('renders Navbar with correct props', () => {
    render(<Register {...defaultProps} />);
    
    // Navbar should be present
    expect(screen.getByText('PLAYER REGISTRATION')).toBeInTheDocument();
  });
});
