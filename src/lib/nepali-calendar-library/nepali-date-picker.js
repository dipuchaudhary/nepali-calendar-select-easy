/**
 * Nepali Date Picker
 * A customizable date picker for Nepali calendar
 */

import { NepaliFunctions } from './nepali-functions.js';
import './nepali-date-picker.css';

export class NepaliDatePicker {
  constructor(element, options = {}) {
    if (options === 'destroy') {
      this.destroy(element);
      return;
    }

    this.element = element;
    this.options = {
      dateFormat: 'YYYY-MM-DD',
      language: 'english', // 'english' or 'nepali'
      theme: 'light', // 'light', 'dark', 'modern'
      inline: false,
      multiple: false,
      range: false,
      minDate: NepaliFunctions.minDate,
      maxDate: NepaliFunctions.maxDate,
      disabledDates: [],
      disableToday: false,
      showTodayButton: true,
      animation: 'fade', // 'fade', 'slide', 'none'
      position: 'auto', // 'auto', 'top', 'bottom'
      container: 'body',
      onSelect: null,
      onOpen: null,
      onClose: null,
      ...options
    };

    this.currentDate = NepaliFunctions.getCurrentNepaliDate();
    this.viewDate = { ...this.currentDate };
    this.selectedDates = [];
    this.isOpen = false;
    this.picker = null;

    this.init();
  }

  init() {
    if (this.options.inline) {
      this.createInlinePicker();
    } else {
      this.attachEventListeners();
      this.parseInitialValue();
    }
  }

  parseInitialValue() {
    const value = this.element.value;
    if (!value) return;

    if (this.options.multiple || this.options.range) {
      const separator = this.options.range ? ' - ' : ', ';
      const dates = value.split(separator)
        .map(dateStr => NepaliFunctions.parseDate(dateStr.trim(), this.options.dateFormat))
        .filter(date => date && NepaliFunctions.validateDate(date.year, date.month, date.day));
      
      this.selectedDates = dates;
      if (dates.length > 0) {
        this.viewDate = { ...dates[0] };
      }
    } else {
      const date = NepaliFunctions.parseDate(value, this.options.dateFormat);
      if (date && NepaliFunctions.validateDate(date.year, date.month, date.day)) {
        this.selectedDates = [date];
        this.viewDate = { ...date };
      }
    }
  }

  attachEventListeners() {
    this.handleFocus = () => this.open();
    this.handleClick = () => this.open();
    this.handleDocumentClick = (e) => {
      if (this.isOpen && !this.element.contains(e.target) && 
          (!this.picker || !this.picker.contains(e.target))) {
        this.close();
      }
    };

    this.element.addEventListener('focus', this.handleFocus);
    this.element.addEventListener('click', this.handleClick);
    document.addEventListener('click', this.handleDocumentClick);
  }

  createInlinePicker() {
    this.picker = this.createPickerElement();
    this.picker.classList.add('inline');
    this.renderCalendar();
    this.element.appendChild(this.picker);
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.picker = this.createPickerElement();
    this.renderCalendar();
    this.positionPicker();
    
    document.body.appendChild(this.picker);

    if (this.options.animation === 'fade') {
      this.picker.style.opacity = '0';
      this.picker.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.picker.style.opacity = '1';
        this.picker.style.transform = 'scale(1)';
      }, 10);
    } else if (this.options.animation === 'slide') {
      this.picker.style.transform = 'translateY(-10px)';
      this.picker.style.opacity = '0';
      setTimeout(() => {
        this.picker.style.transform = 'translateY(0)';
        this.picker.style.opacity = '1';
      }, 10);
    }

    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    if (this.options.animation !== 'none') {
      this.picker.style.opacity = '0';
      this.picker.style.transform = this.options.animation === 'slide' ? 'translateY(-10px)' : 'scale(0.9)';
      setTimeout(() => {
        if (this.picker && this.picker.parentNode) {
          this.picker.parentNode.removeChild(this.picker);
        }
        this.picker = null;
      }, 200);
    } else {
      if (this.picker && this.picker.parentNode) {
        this.picker.parentNode.removeChild(this.picker);
      }
      this.picker = null;
    }

    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  createPickerElement() {
    const picker = document.createElement('div');
    picker.className = `nepali-date-picker theme-${this.options.theme} lang-${this.options.language}`;
    
    if (this.options.animation !== 'none') {
      picker.style.transition = 'all 0.2s ease';
    }

    return picker;
  }

  positionPicker() {
    if (!this.picker || this.options.inline) return;

    const rect = this.element.getBoundingClientRect();
    const pickerRect = this.picker.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let top = rect.bottom + scrollTop + 5;
    let left = rect.left + window.pageXOffset;

    // Check if picker fits below the input
    if (this.options.position === 'auto') {
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (spaceBelow < pickerRect.height && spaceAbove > pickerRect.height) {
        top = rect.top + scrollTop - pickerRect.height - 5;
      }
    } else if (this.options.position === 'top') {
      top = rect.top + scrollTop - pickerRect.height - 5;
    }

    // Ensure picker doesn't go off screen horizontally
    const rightEdge = left + pickerRect.width;
    const viewportWidth = window.innerWidth;
    if (rightEdge > viewportWidth) {
      left = viewportWidth - pickerRect.width - 10;
    }

    this.picker.style.position = 'absolute';
    this.picker.style.top = `${top}px`;
    this.picker.style.left = `${left}px`;
    this.picker.style.zIndex = '9999';
  }

  renderCalendar() {
    if (!this.picker) return;

    this.picker.innerHTML = '';

    const header = this.createHeader();
    const calendar = this.createCalendar();

    this.picker.appendChild(header);
    this.picker.appendChild(calendar);

    if (this.options.showTodayButton) {
      const footer = this.createFooter();
      this.picker.appendChild(footer);
    }
  }

  createHeader() {
    const header = document.createElement('div');
    header.className = 'ndp-header';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'ndp-nav-btn ndp-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.addEventListener('click', () => this.previousMonth());

    const nextBtn = document.createElement('button');
    nextBtn.className = 'ndp-nav-btn ndp-next';
    nextBtn.innerHTML = '›';
    nextBtn.addEventListener('click', () => this.nextMonth());

    const title = document.createElement('div');
    title.className = 'ndp-title';
    
    const monthNames = this.options.language === 'nepali' ? 
      NepaliFunctions.nepaliMonths : NepaliFunctions.englishMonths;
    
    let monthName = monthNames[this.viewDate.month - 1];
    let year = this.viewDate.year;
    
    if (this.options.language === 'nepali') {
      year = NepaliFunctions.toNepaliNumerals(year);
    }
    
    title.textContent = `${monthName} ${year}`;

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);

    return header;
  }

  createCalendar() {
    const calendar = document.createElement('div');
    calendar.className = 'ndp-calendar';

    // Create weekday headers
    const weekdays = document.createElement('div');
    weekdays.className = 'ndp-weekdays';

    const dayNames = this.options.language === 'nepali' ? 
      ['आ', 'सो', 'म', 'बु', 'बि', 'शु', 'श'] : 
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    dayNames.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.className = 'ndp-weekday';
      dayElement.textContent = day;
      weekdays.appendChild(dayElement);
    });

    calendar.appendChild(weekdays);

    // Create days grid
    const daysContainer = document.createElement('div');
    daysContainer.className = 'ndp-days';

    const daysInMonth = NepaliFunctions.getDaysInMonth(this.viewDate.year, this.viewDate.month);
    const firstDayOfMonth = NepaliFunctions.getDayOfWeek({
      year: this.viewDate.year,
      month: this.viewDate.month,
      day: 1
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'ndp-day ndp-empty';
      daysContainer.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'ndp-day';
      
      const dateObj = {
        year: this.viewDate.year,
        month: this.viewDate.month,
        day: day
      };

      let displayDay = day;
      if (this.options.language === 'nepali') {
        displayDay = NepaliFunctions.toNepaliNumerals(day);
      }
      
      dayElement.textContent = displayDay;
      dayElement.dataset.date = JSON.stringify(dateObj);

      // Add classes for different states
      if (this.isToday(dateObj)) {
        dayElement.classList.add('ndp-today');
      }

      if (this.isSelected(dateObj)) {
        dayElement.classList.add('ndp-selected');
      }

      if (this.isDisabled(dateObj)) {
        dayElement.classList.add('ndp-disabled');
      } else {
        dayElement.addEventListener('click', () => this.selectDate(dateObj));
      }

      if (this.isInRange(dateObj)) {
        dayElement.classList.add('ndp-in-range');
      }

      daysContainer.appendChild(dayElement);
    }

    calendar.appendChild(daysContainer);

    return calendar;
  }

  createFooter() {
    const footer = document.createElement('div');
    footer.className = 'ndp-footer';

    const todayBtn = document.createElement('button');
    todayBtn.className = 'ndp-today-btn';
    todayBtn.textContent = this.options.language === 'nepali' ? 'आज' : 'Today';
    todayBtn.addEventListener('click', () => this.goToToday());

    footer.appendChild(todayBtn);

    return footer;
  }

  previousMonth() {
    if (this.viewDate.month === 1) {
      this.viewDate.month = 12;
      this.viewDate.year--;
    } else {
      this.viewDate.month--;
    }
    this.renderCalendar();
  }

  nextMonth() {
    if (this.viewDate.month === 12) {
      this.viewDate.month = 1;
      this.viewDate.year++;
    } else {
      this.viewDate.month++;
    }
    this.renderCalendar();
  }

  goToToday() {
    this.viewDate = { ...NepaliFunctions.getCurrentNepaliDate() };
    this.renderCalendar();
  }

  selectDate(dateObj) {
    if (this.isDisabled(dateObj)) return;

    if (this.options.multiple) {
      const index = this.selectedDates.findIndex(date => 
        date.year === dateObj.year && 
        date.month === dateObj.month && 
        date.day === dateObj.day
      );

      if (index >= 0) {
        this.selectedDates.splice(index, 1);
      } else {
        this.selectedDates.push({ ...dateObj });
      }
    } else if (this.options.range) {
      if (this.selectedDates.length === 0 || this.selectedDates.length === 2) {
        this.selectedDates = [{ ...dateObj }];
      } else {
        this.selectedDates.push({ ...dateObj });
        this.selectedDates.sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          if (a.month !== b.month) return a.month - b.month;
          return a.day - b.day;
        });
      }
    } else {
      this.selectedDates = [{ ...dateObj }];
      if (!this.options.inline) {
        this.close();
      }
    }

    this.updateInputValue();
    this.renderCalendar();

    if (this.options.onSelect) {
      this.options.onSelect({
        dates: [...this.selectedDates],
        formattedDates: this.selectedDates.map(date => 
          NepaliFunctions.formatDate(date, this.options.dateFormat)
        )
      });
    }

    // Close picker for range selection when two dates are selected
    if (this.options.range && this.selectedDates.length === 2 && !this.options.inline) {
      this.close();
    }
  }

  updateInputValue() {
    if (this.options.inline) return;

    const formattedDates = this.selectedDates.map(date => 
      NepaliFunctions.formatDate(date, this.options.dateFormat)
    );

    let value = '';
    if (this.options.multiple) {
      value = formattedDates.join(', ');
    } else if (this.options.range) {
      value = formattedDates.join(' - ');
    } else {
      value = formattedDates[0] || '';
    }

    if (this.options.language === 'nepali') {
      value = NepaliFunctions.toNepaliNumerals(value);
    }

    this.element.value = value;
  }

  isToday(dateObj) {
    const today = NepaliFunctions.getCurrentNepaliDate();
    return dateObj.year === today.year && 
           dateObj.month === today.month && 
           dateObj.day === today.day;
  }

  isSelected(dateObj) {
    return this.selectedDates.some(date => 
      date.year === dateObj.year && 
      date.month === dateObj.month && 
      date.day === dateObj.day
    );
  }

  isDisabled(dateObj) {
    // Check min/max dates
    if (NepaliFunctions.compareDates(dateObj, this.options.minDate, '<') ||
        NepaliFunctions.compareDates(dateObj, this.options.maxDate, '>')) {
      return true;
    }

    // Check disabled dates
    if (this.options.disabledDates.some(disabledDate => 
        NepaliFunctions.compareDates(dateObj, disabledDate, '=='))) {
      return true;
    }

    // Check disable today
    if (this.options.disableToday && this.isToday(dateObj)) {
      return true;
    }

    return false;
  }

  isInRange(dateObj) {
    if (!this.options.range || this.selectedDates.length !== 2) {
      return false;
    }

    const [start, end] = this.selectedDates;
    return NepaliFunctions.compareDates(dateObj, start, '>=') && 
           NepaliFunctions.compareDates(dateObj, end, '<=');
  }

  getSelectedDates() {
    return [...this.selectedDates];
  }

  setDate(date) {
    if (Array.isArray(date)) {
      this.selectedDates = date.map(d => ({ ...d }));
    } else {
      this.selectedDates = [{ ...date }];
    }
    this.viewDate = { ...this.selectedDates[0] };
    this.updateInputValue();
    if (this.picker) {
      this.renderCalendar();
    }
  }

  clear() {
    this.selectedDates = [];
    this.updateInputValue();
    if (this.picker) {
      this.renderCalendar();
    }
  }

  destroy(element = null) {
    const el = element || this.element;
    
    if (this.handleFocus) {
      el.removeEventListener('focus', this.handleFocus);
    }
    if (this.handleClick) {
      el.removeEventListener('click', this.handleClick);
    }
    if (this.handleDocumentClick) {
      document.removeEventListener('click', this.handleDocumentClick);
    }

    if (this.picker && this.picker.parentNode) {
      this.picker.parentNode.removeChild(this.picker);
    }

    this.picker = null;
    this.isOpen = false;
  }
}

// jQuery-style plugin support
if (typeof window !== 'undefined') {
  // Add to HTMLElement prototype for vanilla JS
  HTMLElement.prototype.nepaliDatePicker = function(options) {
    return new NepaliDatePicker(this, options);
  };

  // jQuery support if available
  if (window.jQuery) {
    window.jQuery.fn.nepaliDatePicker = function(options) {
      return this.each(function() {
        new NepaliDatePicker(this, options);
      });
    };
  }
}