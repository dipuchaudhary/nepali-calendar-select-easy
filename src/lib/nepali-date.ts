// Nepali Date conversion utilities
// Bikram Sambat calendar support with conversion to/from Gregorian

export interface NepaliDate {
  year: number;
  month: number;
  day: number;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

// Nepali month names in both Nepali and English
export const nepaliMonths = {
  nepali: [
    'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन',
    'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
  ],
  english: [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ]
};

// Days of week in Nepali and English
export const nepaliDays = {
  nepali: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
  english: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  englishFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

// Nepali calendar data (days in each month for different years)
// This is a simplified version - in a real library, you'd have comprehensive data
const nepaliCalendarData: { [year: number]: number[] } = {
  2080: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2023-2024
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2024-2025
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2025-2026
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2026-2027
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2027-2028
};

// Reference date for conversion (1st Baisakh 2080 = April 14, 2023)
const referenceNepali: NepaliDate = { year: 2080, month: 1, day: 1 };
const referenceGregorian: GregorianDate = { year: 2023, month: 4, day: 14 };

export function getDaysInNepaliMonth(year: number, month: number): number {
  const yearData = nepaliCalendarData[year];
  if (!yearData) {
    // Default fallback - this should be expanded with real data
    return month <= 6 ? 31 : (month <= 8 ? 32 : (month <= 12 ? 30 : 30));
  }
  return yearData[month - 1] || 30;
}

export function isValidNepaliDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;
  const daysInMonth = getDaysInNepaliMonth(year, month);
  return day <= daysInMonth;
}

// Simplified conversion - in production, use proper algorithm with complete calendar data
export function nepaliToGregorian(nepaliDate: NepaliDate): Date {
  // This is a simplified conversion for demo purposes
  // In a real implementation, you'd use proper calendar conversion algorithms
  
  const refGregorian = new Date(2023, 3, 14); // April 14, 2023
  const refNepali = { year: 2080, month: 1, day: 1 };
  
  // Calculate days difference from reference
  let daysDiff = 0;
  
  // Year difference
  for (let y = refNepali.year; y < nepaliDate.year; y++) {
    daysDiff += getTotalDaysInNepaliYear(y);
  }
  
  // Month difference in current year
  for (let m = 1; m < nepaliDate.month; m++) {
    daysDiff += getDaysInNepaliMonth(nepaliDate.year, m);
  }
  
  // Day difference
  daysDiff += nepaliDate.day - refNepali.day;
  
  const result = new Date(refGregorian);
  result.setDate(result.getDate() + daysDiff);
  
  return result;
}

export function gregorianToNepali(date: Date): NepaliDate {
  // Simplified conversion - in production, use proper algorithm
  const refGregorian = new Date(2023, 3, 14);
  const refNepali = { year: 2080, month: 1, day: 1 };
  
  const timeDiff = date.getTime() - refGregorian.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  let currentYear = refNepali.year;
  let currentMonth = refNepali.month;
  let currentDay = refNepali.day + daysDiff;
  
  // Adjust for month/year overflow
  while (currentDay > getDaysInNepaliMonth(currentYear, currentMonth)) {
    currentDay -= getDaysInNepaliMonth(currentYear, currentMonth);
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }
  
  while (currentDay < 1) {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    currentDay += getDaysInNepaliMonth(currentYear, currentMonth);
  }
  
  return { year: currentYear, month: currentMonth, day: currentDay };
}

function getTotalDaysInNepaliYear(year: number): number {
  let total = 0;
  for (let month = 1; month <= 12; month++) {
    total += getDaysInNepaliMonth(year, month);
  }
  return total;
}

export function formatNepaliDate(
  nepaliDate: NepaliDate, 
  format: 'short' | 'medium' | 'long' = 'medium',
  language: 'nepali' | 'english' = 'english'
): string {
  const monthNames = language === 'nepali' ? nepaliMonths.nepali : nepaliMonths.english;
  const monthName = monthNames[nepaliDate.month - 1];
  
  switch (format) {
    case 'short':
      return `${nepaliDate.year}/${nepaliDate.month.toString().padStart(2, '0')}/${nepaliDate.day.toString().padStart(2, '0')}`;
    case 'medium':
      return `${nepaliDate.day} ${monthName} ${nepaliDate.year}`;
    case 'long':
      return `${nepaliDate.day} ${monthName}, ${nepaliDate.year}`;
    default:
      return `${nepaliDate.day} ${monthName} ${nepaliDate.year}`;
  }
}

export function getCurrentNepaliDate(): NepaliDate {
  return gregorianToNepali(new Date());
}

// Convert Nepali numerals to English numerals and vice versa
export function convertToNepaliNumerals(text: string): string {
  const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = text;
  englishNumerals.forEach((english, index) => {
    const regex = new RegExp(english, 'g');
    result = result.replace(regex, nepaliNumerals[index]);
  });
  
  return result;
}

export function convertToEnglishNumerals(text: string): string {
  const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = text;
  nepaliNumerals.forEach((nepali, index) => {
    const regex = new RegExp(nepali, 'g');
    result = result.replace(regex, englishNumerals[index]);
  });
  
  return result;
}