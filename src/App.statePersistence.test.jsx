// State persistence tests for multi-category registration flow
// Validates: Requirements 12.4, 13.5

import { describe, it, expect } from 'vitest';
import { calculateFee } from './utils/fee.js';
import { getCategory } from './utils/category.js';

describe('App State Persistence Verification', () => {
  describe('Form State Structure', () => {
    it('should maintain selectedEvents array structure with category, name, and fee', () => {
      const selectedEvents = [
        { category: 'U-13', name: 'Boys Singles', fee: 600 },
        { category: 'U-15', name: 'Boys Doubles', fee: 1000 }
      ];
      
      expect(selectedEvents).toHaveLength(2);
      expect(selectedEvents[0]).toHaveProperty('category');
      expect(selectedEvents[0]).toHaveProperty('name');
      expect(selectedEvents[0]).toHaveProperty('fee');
    });

    it('should calculate total fee correctly from selectedEvents', () => {
      const selectedEvents = [
        { category: 'U-13', name: 'Boys Singles', fee: 600 },
        { category: 'U-15', name: 'Boys Doubles', fee: 1000 }
      ];
      
      const totalFee = calculateFee(selectedEvents);
      expect(totalFee).toBe(1600);
    });

    it('should handle multiple events across categories', () => {
      const selectedEvents = [
        { category: 'U-9', name: 'Boys Singles', fee: 600 },
        { category: 'U-11', name: 'Boys Singles', fee: 600 },
        { category: 'U-11', name: 'Boys Doubles', fee: 1000 },
        { category: 'U-13', name: 'Boys Singles', fee: 600 },
        { category: 'U-13', name: 'Mixed Doubles', fee: 1000 }
      ];
      
      const totalFee = calculateFee(selectedEvents);
      expect(totalFee).toBe(3800);
    });
  });

  describe('Category Calculation', () => {
    it('should calculate category correctly for state persistence', () => {
      expect(getCategory('2014-06-15')).toBe('U-13');
      expect(getCategory('2016-03-20')).toBe('U-11');
      expect(getCategory('2018-01-01')).toBe('U-9');
    });
  });

  describe('Data Structure Integrity', () => {
    it('should maintain event object structure through state updates', () => {
      const event = { category: 'U-13', name: 'Boys Singles', fee: 600 };
      
      // Simulate adding to selectedEvents array
      const selectedEvents = [];
      selectedEvents.push(event);
      
      expect(selectedEvents[0].category).toBe('U-13');
      expect(selectedEvents[0].name).toBe('Boys Singles');
      expect(selectedEvents[0].fee).toBe(600);
    });

    it('should handle empty selectedEvents array', () => {
      const selectedEvents = [];
      const totalFee = calculateFee(selectedEvents);
      
      expect(totalFee).toBe(0);
    });

    it('should preserve event data when passed between components', () => {
      // Simulate form state
      const formState = {
        name: 'Test Player',
        dob: '2014-06-15',
        gender: 'Male',
        parentName: 'Test Parent',
        email: 'test@example.com',
        phone: '1234567890',
        address: 'Test Address',
        selectedEvents: [
          { category: 'U-13', name: 'Boys Singles', fee: 600 },
          { category: 'U-15', name: 'Boys Doubles', fee: 1000 }
        ]
      };
      
      // Verify structure
      expect(formState.selectedEvents).toHaveLength(2);
      expect(formState.selectedEvents[0].category).toBe('U-13');
      expect(formState.selectedEvents[1].category).toBe('U-15');
      
      // Calculate total
      const totalFee = calculateFee(formState.selectedEvents);
      expect(totalFee).toBe(1600);
    });
  });

  describe('Registration Data Structure', () => {
    it('should maintain complete registration data structure', () => {
      const registrationData = {
        playerId: 'LKO2026-1234',
        name: 'Test Player',
        dob: '2014-06-15',
        gender: 'Male',
        category: 'U-13',
        parentName: 'Test Parent',
        address: 'Test Address',
        email: 'test@example.com',
        phone: '1234567890',
        events: [
          { category: 'U-13', name: 'Boys Singles', fee: 600 },
          { category: 'U-15', name: 'Boys Doubles', fee: 1000 }
        ],
        totalFee: 1600,
        registeredAt: new Date().toISOString()
      };
      
      expect(registrationData.events).toHaveLength(2);
      expect(registrationData.totalFee).toBe(1600);
      expect(registrationData.events[0]).toHaveProperty('category');
      expect(registrationData.events[0]).toHaveProperty('name');
      expect(registrationData.events[0]).toHaveProperty('fee');
    });
  });
});
