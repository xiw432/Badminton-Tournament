// Main application component
// Implements routing, state management, and page navigation
// Requirements: 3.7, 4.8, 5.6, 5.7, 8.1, 8.2, 8.3, 8.7

import { useState } from 'react';
import Home from './pages/Home.jsx';
import Rules from './pages/Rules.jsx';
import Register from './pages/Register.jsx';
import Payment from './pages/Payment.jsx';
import Confirm from './pages/Confirm.jsx';
import { getCategory } from './utils/category.js';
import { calculateFee } from './utils/fee.js';

export default function App() {
  // Page state - tracks current page
  const [page, setPage] = useState("home");
  
  // Form state - stores registration form data
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    parentName: "",
    address: "",
    email: "",
    phone: "",
    selectedEvents: []
  });
  
  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Registration data state (after successful submission)
  const [registration, setRegistration] = useState(null);
  
  // Payment loading state
  const [paymentLoading, setPaymentLoading] = useState(false);

  /**
   * Navigate to a different page
   * @param {string} newPage - Page to navigate to
   */
  const navigate = (newPage) => {
    setPage(newPage);
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  };

  /**
   * Update form field value
   * @param {string} field - Form field name
   * @param {any} value - New value for the field
   */
  const updateForm = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
    
    // Reset event selections when DOB or gender changes
    if (field === 'dob' || field === 'gender') {
      setForm(prev => ({
        ...prev,
        [field]: value,
        selectedEvents: []
      }));
    }
  };

  /**
   * Validate registration form
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Player name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Date of birth validation
    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const category = getCategory(form.dob);
      if (category === "INELIGIBLE") {
        newErrors.dob = "Player must be born on or after January 1, 2012";
      }
    }
    
    // Gender validation
    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }
    
    // Parent name validation
    if (!form.parentName.trim()) {
      newErrors.parentName = "Parent/Guardian name is required";
    }
    
    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // Address validation
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    // Event selection validation
    if (!form.selectedEvents || form.selectedEvents.length === 0) {
      newErrors.selectedEvents = "Please select at least one event";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submit registration form
   * Validates form and navigates to payment page
   */
  const submitRegistration = () => {
    if (validateForm()) {
      navigate("payment");
    }
  };

  /**
   * Process payment and complete registration
   * Generates player ID and creates registration record
   */
  const processPayment = () => {
    setPaymentLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate player ID (format: LKO2026-XXXX)
      const playerId = `LKO2026-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Compute category
      const category = getCategory(form.dob);
      
      // Use selected events from form
      const selectedEvents = form.selectedEvents || [];
      
      // Calculate total fee
      const totalFee = calculateFee(selectedEvents);
      
      // Create registration record
      const registrationData = {
        playerId,
        name: form.name,
        dob: form.dob,
        gender: form.gender,
        category,
        parentName: form.parentName,
        address: form.address,
        email: form.email,
        phone: form.phone,
        events: selectedEvents,
        totalFee,
        registeredAt: new Date().toISOString()
      };
      
      setRegistration(registrationData);
      setPaymentLoading(false);
      navigate("confirm");
    }, 2000);
  };

  // Compute derived values for current form state
  const category = getCategory(form.dob);
  const selectedEvents = form.selectedEvents || [];
  const totalFee = calculateFee(selectedEvents);

  // Render current page
  return (
    <>
      {page === "home" && (
        <Home go={navigate} />
      )}
      
      {page === "rules" && (
        <Rules go={navigate} />
      )}
      
      {page === "register" && (
        <Register
          go={navigate}
          form={form}
          setF={updateForm}
          errors={errors}
          onSubmit={submitRegistration}
        />
      )}
      
      {page === "payment" && (
        <Payment
          go={navigate}
          form={form}
          events={selectedEvents}
          totalFee={totalFee}
          cat={category}
          onPay={processPayment}
          loading={paymentLoading}
        />
      )}
      
      {page === "confirm" && registration && (
        <Confirm
          reg={registration}
          go={navigate}
        />
      )}
    </>
  );
}
