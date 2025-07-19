/**
 * Nepali Functions Library
 * Comprehensive utilities for Nepali date conversion and manipulation
 */

export class NepaliFunctions {
  static dateFormats = [
    "YYYY-MM-DD", "YYYY/MM/DD", "YYYY.MM.DD",
    "DD-MM-YYYY", "DD/MM/YYYY", "DD.MM.DD",
    "MM-DD-YYYY", "MM/DD/YYYY"
  ];

  static operators = {
    EQUAL: "==",
    LESS: "<",
    LESS_EQUAL: "<=",
    GREATER: ">",
    GREATER_EQUAL: ">="
  };

  static defaultBsFormat = "YYYY-MM-DD";
  static defaultAdFormat = "MM/DD/YYYY";

  // Nepali calendar data with days in each month for different years
  static nepaliCalendarData = {
    1970: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1971: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    1972: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1973: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    1974: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1975: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1976: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1977: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1989: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1991: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    1993: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1998: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
    2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2091: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
    2092: [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2093: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2094: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2095: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
    2096: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2097: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2098: [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31],
    2099: [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30]
  };

  // Reference dates for conversion
  static referenceNepali = { year: 2000, month: 9, day: 17 };
  static referenceGregorian = { year: 1944, month: 1, day: 1 };
  static minDate = { year: 1970, month: 1, day: 1 };
  static maxDate = { year: 2099, month: 12, day: 30 };

  // Nepali numerals mapping
  static nepaliNumerals = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };

  static englishNumerals = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };

  // Month names
  static nepaliMonths = [
    'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन',
    'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
  ];

  static englishMonths = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ];

  static gregorianMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  static nepaliDays = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
  static englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  static englishDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   * Get days in a specific Nepali month
   */
  static getDaysInMonth(year, month) {
    const yearData = this.nepaliCalendarData[year];
    if (!yearData) {
      return month <= 6 ? 31 : (month <= 8 ? 32 : 30);
    }
    return yearData[month - 1] || 30;
  }

  /**
   * Validate Nepali date
   */
  static validateDate(year, month, day) {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    const daysInMonth = this.getDaysInMonth(year, month);
    return day <= daysInMonth;
  }

  /**
   * Convert Nepali date to Gregorian
   */
  static nepaliToGregorian(nepaliDate) {
    const refGregorian = new Date(1944, 0, 1); // January 1, 1944
    const refNepali = { year: 2000, month: 9, day: 17 };
    
    let daysDiff = 0;
    
    // Calculate days difference
    for (let y = refNepali.year; y < nepaliDate.year; y++) {
      daysDiff += this.getTotalDaysInYear(y);
    }
    
    for (let m = 1; m < nepaliDate.month; m++) {
      daysDiff += this.getDaysInMonth(nepaliDate.year, m);
    }
    
    daysDiff += nepaliDate.day - refNepali.day;
    
    const result = new Date(refGregorian);
    result.setDate(result.getDate() + daysDiff);
    
    return {
      year: result.getFullYear(),
      month: result.getMonth() + 1,
      day: result.getDate()
    };
  }

  /**
   * Convert Gregorian date to Nepali
   */
  static gregorianToNepali(gregorianDate) {
    const refGregorian = new Date(1944, 0, 1);
    const refNepali = { year: 2000, month: 9, day: 17 };
    
    const inputDate = gregorianDate instanceof Date ? gregorianDate : 
      new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    
    const timeDiff = inputDate.getTime() - refGregorian.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    let currentYear = refNepali.year;
    let currentMonth = refNepali.month;
    let currentDay = refNepali.day + daysDiff;
    
    // Adjust for month/year overflow
    while (currentDay > this.getDaysInMonth(currentYear, currentMonth)) {
      currentDay -= this.getDaysInMonth(currentYear, currentMonth);
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
      currentDay += this.getDaysInMonth(currentYear, currentMonth);
    }
    
    return { year: currentYear, month: currentMonth, day: currentDay };
  }

  /**
   * Get total days in a Nepali year
   */
  static getTotalDaysInYear(year) {
    let total = 0;
    for (let month = 1; month <= 12; month++) {
      total += this.getDaysInMonth(year, month);
    }
    return total;
  }

  /**
   * Format date according to specified format
   */
  static formatDate(dateObj, format = 'YYYY-MM-DD') {
    const year = dateObj.year.toString();
    const month = dateObj.month.toString().padStart(2, '0');
    const day = dateObj.day.toString().padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  }

  /**
   * Parse date string according to format
   */
  static parseDate(dateString, format = 'YYYY-MM-DD') {
    if (!dateString || !format) return null;
    
    const parts = [];
    let year, month, day;
    
    switch (format) {
      case 'YYYY-MM-DD':
        parts = dateString.split('-');
        if (parts.length === 3) {
          [year, month, day] = parts.map(Number);
        }
        break;
      case 'YYYY/MM/DD':
        parts = dateString.split('/');
        if (parts.length === 3) {
          [year, month, day] = parts.map(Number);
        }
        break;
      case 'DD-MM-YYYY':
        parts = dateString.split('-');
        if (parts.length === 3) {
          [day, month, year] = parts.map(Number);
        }
        break;
      case 'DD/MM/YYYY':
        parts = dateString.split('/');
        if (parts.length === 3) {
          [day, month, year] = parts.map(Number);
        }
        break;
      case 'MM/DD/YYYY':
        parts = dateString.split('/');
        if (parts.length === 3) {
          [month, day, year] = parts.map(Number);
        }
        break;
      default:
        return null;
    }
    
    if (year && month && day && this.validateDate(year, month, day)) {
      return { year, month, day };
    }
    
    return null;
  }

  /**
   * Convert to Nepali numerals
   */
  static toNepaliNumerals(text) {
    return text.toString().replace(/[0-9]/g, digit => this.nepaliNumerals[digit] || digit);
  }

  /**
   * Convert to English numerals
   */
  static toEnglishNumerals(text) {
    return text.toString().replace(/[०-९]/g, digit => this.englishNumerals[digit] || digit);
  }

  /**
   * Get current Nepali date
   */
  static getCurrentNepaliDate() {
    const now = new Date();
    // Adjust for Nepal timezone (UTC+5:45)
    now.setHours(now.getHours() + 5);
    now.setMinutes(now.getMinutes() + 45);
    
    return this.gregorianToNepali({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    });
  }

  /**
   * Get current Gregorian date
   */
  static getCurrentGregorianDate() {
    const now = new Date();
    now.setHours(now.getHours() + 5);
    now.setMinutes(now.getMinutes() + 45);
    
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  /**
   * Compare two dates
   */
  static compareDates(date1, date2, operator = '==') {
    const val1 = date1.year * 10000 + date1.month * 100 + date1.day;
    const val2 = date2.year * 10000 + date2.month * 100 + date2.day;
    
    switch (operator) {
      case '==': return val1 === val2;
      case '>': return val1 > val2;
      case '>=': return val1 >= val2;
      case '<': return val1 < val2;
      case '<=': return val1 <= val2;
      default: return false;
    }
  }

  /**
   * Add days to a date
   */
  static addDays(dateObj, days) {
    const gregorianDate = this.nepaliToGregorian(dateObj);
    const jsDate = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    jsDate.setDate(jsDate.getDate() + days);
    
    return this.gregorianToNepali({
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      day: jsDate.getDate()
    });
  }

  /**
   * Get day of week for a Nepali date
   */
  static getDayOfWeek(nepaliDate) {
    const gregorianDate = this.nepaliToGregorian(nepaliDate);
    const jsDate = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    return jsDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  }

  /**
   * Format Nepali date in a readable format
   */
  static formatNepaliDate(nepaliDate, options = {}) {
    const {
      language = 'english',
      includeDay = false,
      unicodeNumerals = false
    } = options;
    
    const monthNames = language === 'nepali' ? this.nepaliMonths : this.englishMonths;
    const dayNames = language === 'nepali' ? this.nepaliDays : this.englishDays;
    
    let formatted = `${nepaliDate.day} ${monthNames[nepaliDate.month - 1]} ${nepaliDate.year}`;
    
    if (includeDay) {
      const dayOfWeek = this.getDayOfWeek(nepaliDate);
      formatted = `${dayNames[dayOfWeek]}, ${formatted}`;
    }
    
    if (unicodeNumerals && language === 'nepali') {
      formatted = this.toNepaliNumerals(formatted);
    }
    
    return formatted;
  }
}