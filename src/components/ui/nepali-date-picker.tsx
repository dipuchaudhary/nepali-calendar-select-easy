import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  NepaliDate,
  nepaliMonths,
  nepaliDays,
  getDaysInNepaliMonth,
  formatNepaliDate,
  nepaliToGregorian,
  gregorianToNepali,
  getCurrentNepaliDate,
  convertToNepaliNumerals,
  isValidNepaliDate
} from "@/lib/nepali-date";

export interface NepaliDatePickerProps {
  value?: NepaliDate;
  onChange?: (date: NepaliDate) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  language?: 'nepali' | 'english';
  theme?: 'default' | 'traditional' | 'modern';
  showToday?: boolean;
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
  format?: 'short' | 'medium' | 'long';
}

interface CalendarProps {
  selectedDate?: NepaliDate;
  onDateSelect: (date: NepaliDate) => void;
  language: 'nepali' | 'english';
  theme: 'default' | 'traditional' | 'modern';
  showToday: boolean;
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
}

const NepaliCalendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  language,
  theme,
  showToday,
  minDate,
  maxDate
}) => {
  const [currentDate, setCurrentDate] = React.useState<NepaliDate>(
    selectedDate || getCurrentNepaliDate()
  );
  
  const today = getCurrentNepaliDate();
  const monthNames = language === 'nepali' ? nepaliMonths.nepali : nepaliMonths.english;
  const dayNames = language === 'nepali' ? nepaliDays.nepali : nepaliDays.english;
  
  const daysInMonth = getDaysInNepaliMonth(currentDate.year, currentDate.month);
  const firstDayOfMonth = nepaliToGregorian({ ...currentDate, day: 1 }).getDay();
  
  const handlePrevMonth = () => {
    if (currentDate.month === 1) {
      setCurrentDate({ year: currentDate.year - 1, month: 12, day: 1 });
    } else {
      setCurrentDate({ year: currentDate.year, month: currentDate.month - 1, day: 1 });
    }
  };
  
  const handleNextMonth = () => {
    if (currentDate.month === 12) {
      setCurrentDate({ year: currentDate.year + 1, month: 1, day: 1 });
    } else {
      setCurrentDate({ year: currentDate.year, month: currentDate.month + 1, day: 1 });
    }
  };
  
  const isDateDisabled = (day: number): boolean => {
    const date = { year: currentDate.year, month: currentDate.month, day };
    
    if (minDate) {
      if (date.year < minDate.year) return true;
      if (date.year === minDate.year && date.month < minDate.month) return true;
      if (date.year === minDate.year && date.month === minDate.month && date.day < minDate.day) return true;
    }
    
    if (maxDate) {
      if (date.year > maxDate.year) return true;
      if (date.year === maxDate.year && date.month > maxDate.month) return true;
      if (date.year === maxDate.year && date.month === maxDate.month && date.day > maxDate.day) return true;
    }
    
    return false;
  };
  
  const isToday = (day: number): boolean => {
    return currentDate.year === today.year && 
           currentDate.month === today.month && 
           day === today.day;
  };
  
  const isSelected = (day: number): boolean => {
    return selectedDate && 
           currentDate.year === selectedDate.year && 
           currentDate.month === selectedDate.month && 
           day === selectedDate.day;
  };
  
  const getThemeClasses = () => {
    switch (theme) {
      case 'traditional':
        return {
          container: 'bg-gradient-nepali text-white',
          header: 'border-white/20',
          dayButton: 'hover:bg-white/20 text-white',
          selectedButton: 'bg-white text-nepali-red',
          todayButton: 'bg-nepali-saffron text-white'
        };
      case 'modern':
        return {
          container: 'bg-gradient-to-br from-background to-muted',
          header: 'border-border',
          dayButton: 'hover:bg-accent hover:text-accent-foreground',
          selectedButton: 'bg-primary text-primary-foreground',
          todayButton: 'bg-accent text-accent-foreground border-2 border-primary'
        };
      default:
        return {
          container: 'bg-popover',
          header: 'border-border',
          dayButton: 'hover:bg-accent hover:text-accent-foreground',
          selectedButton: 'bg-primary text-primary-foreground',
          todayButton: 'bg-accent text-accent-foreground border border-primary'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  const formatDisplayText = (text: string) => {
    return language === 'nepali' ? convertToNepaliNumerals(text) : text;
  };
  
  return (
    <div className={cn("p-4 rounded-lg shadow-elegant", themeClasses.container)}>
      {/* Header */}
      <div className={cn("flex items-center justify-between mb-4 pb-4 border-b", themeClasses.header)}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className={cn("h-8 w-8 p-0", themeClasses.dayButton)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">
            {formatDisplayText(monthNames[currentDate.month - 1])}
          </span>
          <span className="font-semibold text-lg">
            {formatDisplayText(currentDate.year.toString())}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className={cn("h-8 w-8 p-0", themeClasses.dayButton)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-sm font-medium opacity-70">
              {formatDisplayText(day)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const disabled = isDateDisabled(day);
          const todayFlag = isToday(day);
          const selected = isSelected(day);
          
          return (
            <Button
              key={day}
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0 font-normal text-sm",
                themeClasses.dayButton,
                selected && themeClasses.selectedButton,
                todayFlag && showToday && !selected && themeClasses.todayButton,
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
              onClick={() => !disabled && onDateSelect({ 
                year: currentDate.year, 
                month: currentDate.month, 
                day 
              })}
            >
              {formatDisplayText(day.toString())}
            </Button>
          );
        })}
      </div>
      
      {/* Footer with today button */}
      {showToday && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDateSelect(today)}
            className="w-full"
          >
            {language === 'nepali' ? 'आज' : 'Today'}: {formatNepaliDate(today, 'medium', language)}
          </Button>
        </div>
      )}
    </div>
  );
};

export const NepaliDatePicker: React.FC<NepaliDatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  className,
  language = 'english',
  theme = 'default',
  showToday = true,
  minDate,
  maxDate,
  format = 'medium'
}) => {
  const [open, setOpen] = React.useState(false);
  
  const handleDateSelect = (date: NepaliDate) => {
    onChange?.(date);
    setOpen(false);
  };
  
  const displayText = value 
    ? formatNepaliDate(value, format, language)
    : placeholder;
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {language === 'nepali' && value 
            ? convertToNepaliNumerals(displayText)
            : displayText
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
        <NepaliCalendar
          selectedDate={value}
          onDateSelect={handleDateSelect}
          language={language}
          theme={theme}
          showToday={showToday}
          minDate={minDate}
          maxDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  );
};