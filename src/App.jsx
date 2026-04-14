// Main application component
// Implements routing, state management, and page navigation
// Requirements: 3.7, 4.8, 5.6, 5.7, 8.1, 8.2, 8.3, 8.7

import { useState } from 'react';
import Home from './pages/Home.jsx';
import Rules from './pages/Rules.jsx';
import Register from './pages/Register.jsx';
import Confirm from './pages/Confirm.jsx';
import AdmitCard from './pages/AdmitCard.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { getCategory } from './utils/category.js';
import { calculateFee } from './utils/fee.js';

export default function App() {
  // Page state - tracks current page
  const [page, setPage] = useState(() => {
    // Check URL for admit card route
    const path = window.location.pathname;
    if (path.startsWith('/admit-card/')) {
      return 'admit-card';
    }
    return 'home';
  });
  
  // Store player ID for admit card
  const [admitCardPlayerId, setAdmitCardPlayerId] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admit-card/')) {
      return path.split('/admit-card/')[1];
    }
    return null;
  });
  
  // Form state - stores registration form data
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    parentName: "",
    address: "",
    email: "",
    phone: "",
    selectedCategory: "",
    selectedEvents: [],
    photoUrl: "",
    photoError: ""
  });
  
  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Loading state during registration API call
  const [submitting, setSubmitting] = useState(false);
  
  // Registration data state (after successful submission)
  const [registration, setRegistration] = useState(null);

  /**
   * Navigate to a different page
   * @param {string} newPage - Page to navigate to
   * @param {string} param - Optional parameter (e.g., player ID for admit card)
   */
  const navigate = (newPage, param = null) => {
    setPage(newPage);
    
    // Update URL and store player ID for admit card
    if (newPage === 'admit-card' && param) {
      setAdmitCardPlayerId(param);
      window.history.pushState({}, '', `/admit-card/${param}`);
    } else if (newPage !== 'admit-card') {
      setAdmitCardPlayerId(null);
      window.history.pushState({}, '', '/');
    }
    
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
    
    // Reset event selections and category when DOB or gender changes
    if (field === 'dob' || field === 'gender') {
      setForm(prev => ({
        ...prev,
        [field]: value,
        selectedCategory: "",
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
    
    // Category selection validation
    if (!form.selectedCategory) {
      newErrors.selectedCategory = "Please select a category to play in";
    }
    
    // Photo validation
    if (!form.photoUrl) {
      newErrors.photoUrl = "Player photo is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submit registration form and complete registration
   * Validates form, generates player ID, and saves data
   */
  const submitRegistration = async () => {
    if (validateForm()) {
      try {
        setSubmitting(true);
        
        const registrationPayload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          dob: form.dob,
          gender: form.gender,
          category: form.selectedCategory,
          parentName: form.parentName,
          address: form.address,
          events: form.selectedEvents,
          totalFee: calculateFee(form.selectedEvents),
          photoUrl: form.photoUrl
        };

        // Call backend registration function
        const response = await fetch('/api/register-player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationPayload)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Registration failed');
        }

        if (result.success) {
          // Create registration record for frontend display
          const registrationData = {
            playerId: result.data.playerId,
            name: result.data.name,
            email: result.data.email,
            dob: form.dob,
            gender: form.gender,
            category: form.selectedCategory,
            parentName: form.parentName,
            address: form.address,
            events: form.selectedEvents,
            totalFee: calculateFee(form.selectedEvents),
            photoUrl: form.photoUrl,
            paymentMode: 'cash',
            paymentStatus: 'pending',
            registeredAt: new Date().toISOString(),
            pdfUrl: result.data.pdfUrl
          };
          
          setRegistration(registrationData);
          navigate("confirm");
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        if (error.message.includes('Email already registered')) {
          setErrors({ email: 'This email is already registered. Please use a different email.' });
        } else {
          alert(`Registration failed: ${error.message}`);
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

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
          submitting={submitting}
        />
      )}
      
      {page === "confirm" && registration && (
        <Confirm
          reg={registration}
          go={navigate}
        />
      )}
      
      {page === "admit-card" && (
        <AdmitCard 
          playerId={admitCardPlayerId}
          go={navigate}
        />
      )}
      
      {/* Global Floating WhatsApp Button - Visible on all pages */}
      <WhatsAppButton variant="floating" text="Join WhatsApp" />
    </>
  );
}
