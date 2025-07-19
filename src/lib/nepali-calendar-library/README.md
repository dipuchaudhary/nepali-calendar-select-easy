# Nepali Calendar Library

A comprehensive JavaScript library for Nepali date conversion and date picker with Bikram Sambat calendar support.

## Features

### Core Features
- **Complete Bikram Sambat Support**: Full calendar data from 1970 to 2099
- **Bidirectional Conversion**: Convert between Nepali (BS) and Gregorian (AD) dates
- **Multiple Languages**: Support for English and Nepali (Devanagari)
- **Date Validation**: Robust validation for Nepali dates
- **Multiple Formats**: Support for various date formats

### Date Picker Features
- **Multiple Themes**: Light, Dark, and Modern themes
- **Selection Modes**: Single date, multiple dates, and date range selection
- **Customizable**: Extensive configuration options
- **Responsive**: Works on desktop and mobile devices
- **Keyboard Accessible**: Full keyboard navigation support
- **Animation Support**: Smooth fade and slide animations

## Installation

### Using ES6 Modules
```javascript
import { NepaliFunctions, NepaliDatePicker } from './nepali-calendar-library/index.js';
```

### Using Script Tags
```html
<link rel="stylesheet" href="nepali-calendar-library/nepali-date-picker.css">
<script src="nepali-calendar-library/index.js"></script>
```

## Quick Start

### Basic Date Conversion
```javascript
// Get current Nepali date
const today = NepaliFunctions.getCurrentNepaliDate();
console.log(today); // { year: 2081, month: 4, day: 15 }

// Convert Nepali to Gregorian
const gregorianDate = NepaliFunctions.nepaliToGregorian({ year: 2081, month: 1, day: 1 });
console.log(gregorianDate); // { year: 2024, month: 4, day: 13 }

// Convert Gregorian to Nepali
const nepaliDate = NepaliFunctions.gregorianToNepali({ year: 2024, month: 12, day: 25 });
console.log(nepaliDate); // { year: 2081, month: 9, day: 10 }
```

### Basic Date Picker
```html
<input type="text" id="nepali-date" placeholder="Select Nepali Date">

<script>
const input = document.getElementById('nepali-date');
const picker = new NepaliDatePicker(input, {
  language: 'english',
  theme: 'light',
  onSelect: function(result) {
    console.log('Selected:', result.dates);
  }
});
</script>
```

### Advanced Date Picker
```javascript
const picker = new NepaliDatePicker(input, {
  language: 'nepali',
  theme: 'modern',
  dateFormat: 'YYYY-MM-DD',
  range: true,
  minDate: { year: 2080, month: 1, day: 1 },
  maxDate: { year: 2082, month: 12, day: 30 },
  disabledDates: [
    { year: 2081, month: 1, day: 1 }, // New Year
    { year: 2081, month: 9, day: 15 }  // Constitution Day
  ],
  showTodayButton: true,
  animation: 'slide',
  onSelect: function(result) {
    console.log('Selected dates:', result.formattedDates);
  }
});
```

## NepaliFunctions API

### Date Conversion
```javascript
// Convert Nepali to Gregorian
NepaliFunctions.nepaliToGregorian(nepaliDate)

// Convert Gregorian to Nepali
NepaliFunctions.gregorianToNepali(gregorianDate)

// Get current dates
NepaliFunctions.getCurrentNepaliDate()
NepaliFunctions.getCurrentGregorianDate()
```

### Date Utilities
```javascript
// Validate Nepali date
NepaliFunctions.validateDate(year, month, day)

// Get days in month
NepaliFunctions.getDaysInMonth(year, month)

// Add days to date
NepaliFunctions.addDays(dateObj, numberOfDays)

// Compare dates
NepaliFunctions.compareDates(date1, date2, operator) // operator: '==', '>', '<', '>=', '<='

// Get day of week
NepaliFunctions.getDayOfWeek(nepaliDate) // Returns 0-6 (Sunday-Saturday)
```

### Formatting and Parsing
```javascript
// Format date
NepaliFunctions.formatDate(dateObj, 'YYYY-MM-DD')

// Parse date string
NepaliFunctions.parseDate('2081-04-15', 'YYYY-MM-DD')

// Format readable date
NepaliFunctions.formatNepaliDate(dateObj, {
  language: 'nepali',
  includeDay: true,
  unicodeNumerals: true
})
```

### Numeral Conversion
```javascript
// Convert to Nepali numerals
NepaliFunctions.toNepaliNumerals('2081') // '२०८१'

// Convert to English numerals
NepaliFunctions.toEnglishNumerals('२०८१') // '2081'
```

## NepaliDatePicker API

### Basic Usage
```javascript
// Initialize
const picker = new NepaliDatePicker(element, options);

// Get selected dates
const dates = picker.getSelectedDates();

// Set date programmatically
picker.setDate({ year: 2081, month: 4, day: 15 });

// Clear selection
picker.clear();

// Destroy picker
picker.destroy();
```

### Configuration Options
```javascript
const options = {
  // Display options
  language: 'english',        // 'english' | 'nepali'
  theme: 'light',            // 'light' | 'dark' | 'modern'
  dateFormat: 'YYYY-MM-DD',  // Date format for input value
  
  // Behavior options
  inline: false,             // Display inline instead of popup
  multiple: false,           // Allow multiple date selection
  range: false,              // Allow date range selection
  
  // Date constraints
  minDate: { year: 1970, month: 1, day: 1 },
  maxDate: { year: 2099, month: 12, day: 30 },
  disabledDates: [],         // Array of disabled dates
  disableToday: false,       // Disable today's date
  
  // UI options
  showTodayButton: true,     // Show "Today" button
  animation: 'fade',         // 'fade' | 'slide' | 'none'
  position: 'auto',          // 'auto' | 'top' | 'bottom'
  container: 'body',         // CSS selector for container
  
  // Callbacks
  onSelect: null,            // Function called on date selection
  onOpen: null,              // Function called when picker opens
  onClose: null              // Function called when picker closes
};
```

### Event Callbacks
```javascript
const picker = new NepaliDatePicker(input, {
  onSelect: function(result) {
    console.log('Selected dates:', result.dates);
    console.log('Formatted dates:', result.formattedDates);
  },
  
  onOpen: function() {
    console.log('Picker opened');
  },
  
  onClose: function() {
    console.log('Picker closed');
  }
});
```

## Styling and Themes

### Built-in Themes
- **Light Theme**: Clean, minimal design with light colors
- **Dark Theme**: Dark background with light text
- **Modern Theme**: Gradient backgrounds with rounded corners

### Custom Styling
You can customize the appearance by overriding CSS classes:

```css
.nepali-date-picker {
  /* Customize main container */
}

.ndp-header {
  /* Customize header */
}

.ndp-day.ndp-selected {
  /* Customize selected days */
}

.ndp-day.ndp-today {
  /* Customize today's date */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (with polyfills)

## Examples

### Range Selection
```javascript
const picker = new NepaliDatePicker(input, {
  range: true,
  language: 'nepali',
  onSelect: function(result) {
    if (result.dates.length === 2) {
      console.log('From:', result.formattedDates[0]);
      console.log('To:', result.formattedDates[1]);
    }
  }
});
```

### Multiple Date Selection
```javascript
const picker = new NepaliDatePicker(input, {
  multiple: true,
  theme: 'modern',
  onSelect: function(result) {
    console.log('Selected dates:', result.formattedDates.join(', '));
  }
});
```

### Inline Calendar
```javascript
const container = document.getElementById('calendar-container');
const picker = new NepaliDatePicker(container, {
  inline: true,
  language: 'nepali',
  theme: 'dark'
});
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use in your projects!

## Support

For issues and questions, please create an issue in the repository or contact the maintainers.