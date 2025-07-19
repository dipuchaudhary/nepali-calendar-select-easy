/**
 * Nepali Calendar Library
 * A comprehensive JavaScript library for Nepali date conversion and date picker
 * Supports Bikram Sambat calendar with full conversion capabilities
 */

import { NepaliFunctions } from './nepali-functions.js';
import { NepaliDatePicker } from './nepali-date-picker.js';

// Export the main classes
export { NepaliFunctions, NepaliDatePicker };

// Also make them available globally for script tag usage
if (typeof window !== 'undefined') {
  window.NepaliFunctions = NepaliFunctions;
  window.NepaliDatePicker = NepaliDatePicker;
}

// Default export
export default {
  NepaliFunctions,
  NepaliDatePicker
};