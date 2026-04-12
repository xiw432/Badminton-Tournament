// Example usage of Register page component
// This demonstrates how the Register page should be used in the application

import { useState } from 'react';
import Register from './Register.jsx';
import { getCategory } from '../utils/category.js';
import { getAutoEvents, getOptionalEvents } from '../utils/events.js';
import { calculateFee } from '../utils/fee.js';

/**
 * Example wrapper component demonstrating Register page integration
 */
export default function RegisterExample() {
  // Form state
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    parentName: '',
    address: '',
    email: '',
    phone: '',
    wantsDoubles: false,
    wantsMixed: false
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Navigation handler
  const navigate = (page) => {
    console.log('Navigate to:', page);
  };

  // Form field update handler
  const updateField = (field, value) => {
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
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!form.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!form.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!form.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', form);
      // Navigate to payment page
      navigate('payment');
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <Register
      go={navigate}
      form={form}
      setF={updateField}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
}

/**
 * Example with pre-filled form data for testing
 */
export function RegisterExampleWithData() {
  const [form, setForm] = useState({
    name: 'Rahul Sharma',
    dob: '2014-06-15',
    gender: 'Male',
    parentName: 'Vijay Sharma',
    address: '123 Main Street, Lucknow, UP 226001',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    wantsDoubles: true,
    wantsMixed: false
  });

  const [errors] = useState({});

  const navigate = (page) => {
    console.log('Navigate to:', page);
  };

  const updateField = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    navigate('payment');
  };

  return (
    <Register
      go={navigate}
      form={form}
      setF={updateField}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
}

/**
 * Example with validation errors for testing
 */
export function RegisterExampleWithErrors() {
  const [form] = useState({
    name: '',
    dob: '',
    gender: '',
    parentName: '',
    address: '',
    email: 'invalid-email',
    phone: '123',
    wantsDoubles: false,
    wantsMixed: false
  });

  const [errors] = useState({
    name: 'Name is required',
    dob: 'Date of birth is required',
    gender: 'Gender is required',
    parentName: 'Parent/Guardian name is required',
    address: 'Address is required',
    email: 'Invalid email format',
    phone: 'Phone number must be 10 digits'
  });

  const navigate = (page) => {
    console.log('Navigate to:', page);
  };

  const updateField = (field, value) => {
    console.log('Update field:', field, value);
  };

  const handleSubmit = () => {
    console.log('Form submission blocked due to errors');
  };

  return (
    <Register
      go={navigate}
      form={form}
      setF={updateField}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
}

/**
 * Example with ineligible player (DOB before 2012)
 */
export function RegisterExampleIneligible() {
  const [form] = useState({
    name: 'Older Player',
    dob: '2011-12-31',
    gender: 'Male',
    parentName: 'Parent Name',
    address: '123 Street',
    email: 'player@example.com',
    phone: '9876543210',
    wantsDoubles: false,
    wantsMixed: false
  });

  const [errors] = useState({});

  const navigate = (page) => {
    console.log('Navigate to:', page);
  };

  const updateField = (field, value) => {
    console.log('Update field:', field, value);
  };

  const handleSubmit = () => {
    console.log('Form submission blocked - player ineligible');
  };

  return (
    <Register
      go={navigate}
      form={form}
      setF={updateField}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
}
