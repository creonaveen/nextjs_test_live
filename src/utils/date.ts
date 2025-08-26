import { format, parseISO, parse, isValid } from 'date-fns';

/**
 * Formats a Date object to 'yyyy-MM-dd' string.
 * @param date Date object
 * @returns formatted date string or empty string if invalid
 */
export function dateToDB(date?: Date | null): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  return format(date, 'yyyy-MM-dd');
}

/**
 * Formats a date string (or Date object) to 'dd-MMM-yyyy' (e.g., 05-May-2025)
 * Returns empty string for invalid input.
 * @param value string or Date
 * @returns formatted date string
 */
export function dateToDisplay(value?: string | Date | null): string {
  if (!value) return '';
  let dateObj: Date;
  if (typeof value === 'string') {
    dateObj = parseISO(value);
    if (!isValid(dateObj)) return '';
  } else if (value instanceof Date) {
    if (!isValid(value)) return '';
    dateObj = value;
  } else {
    return '';
  }
  return format(dateObj, 'dd-MMM-yyyy');
}

/**
 * Returns the current date formatted as specified (default: 'yyyy-MM-dd').
 * @param formatString date-fns format string
 * @returns formatted current date string
 */
export const getCurrentDate = (formatString = 'yyyy-MM-dd') => {
  try {
    return format(new Date(), formatString);
  } catch {
    return '';
  }
};

/**
 * Parses a date input (string, number, or Date) to a Date object.
 * Returns new Date() for invalid input.
 * @param dateInput string | number | Date
 * @returns Date object
 */
export const parseDate = (dateInput: string | number | Date): Date => {
  if (dateInput instanceof Date) {
    return isValid(dateInput) ? dateInput : new Date();
  }
  if (typeof dateInput === 'string') {
    // Handle ISO strings (e.g., 2024-06-01T00:00:00Z)
    if (/^\d{4}-\d{2}-\d{2}([T ].*)?$/.test(dateInput)) {
      const isoDate = parseISO(dateInput);
      if (isValid(isoDate)) return isoDate;
    }
    // Handle yyyy-MM-dd (Safari fix: replace '-' with '/')
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      const safariDate = new Date(dateInput.replace(/-/g, '/'));
      if (isValid(safariDate)) return safariDate;
    }
    // Fallback: try parsing with date-fns parse
    const parsed = parse(dateInput, 'yyyy-MM-dd', new Date());
    return isValid(parsed) ? parsed : new Date();
  }
  if (typeof dateInput === 'number') {
    const date = new Date(dateInput);
    return isValid(date) ? date : new Date();
  }
  return new Date();
};

/**
 * Extracts time in HH:mm format from a date string.
 * Handles various date string formats and provides fallback for invalid input.
 * @param dateString string - Date string in various formats
 * @returns formatted time string (HH:mm) or empty string if invalid
 */
export const getTimeFromDate = (dateString?: string | null): string => {
  if (!dateString) return '';

  try {
    // Use the existing parseDate function for consistent date parsing
    const date = parseDate(dateString);

    // Check if the parsed date is valid
    if (!isValid(date)) return '';

    // Format time using date-fns for consistency and better performance
    return format(date, 'HH:mm');
  } catch {
    return '';
  }
};

/**
 * Formats a Date object to ISO string with proper timezone handling.
 * This function works across all browsers and handles timezone offsets correctly.
 * Includes time in UTC format.
 * @param date Date object
 * @returns ISO formatted date string with time in UTC or empty string if invalid
 */
export function dateToISOString(date?: Date | null): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

  try {
    // Get the timezone offset in minutes
    const timezoneOffset = date.getTimezoneOffset();

    // Create a new date with the timezone offset applied
    const adjustedDate = new Date(date.getTime() - timezoneOffset * 60000);

    // Return the ISO string (includes time in UTC)
    return adjustedDate.toISOString();
  } catch (error) {
    console.error('Error formatting date to ISO string:', error);
    return '';
  }
}

/**
 * Formats a Date object to ISO string with time in UTC format.
 * This function preserves the original time and converts it to UTC.
 * @param date Date object
 * @returns ISO formatted date string with time in UTC or empty string if invalid
 */
export function dateToISOStringWithTime(date?: Date | null): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

  try {
    // Convert to UTC while preserving the time
    const utcYear = date.getUTCFullYear();
    const utcMonth = date.getUTCMonth();
    const utcDay = date.getUTCDate();
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
    const utcSeconds = date.getUTCSeconds();
    const utcMilliseconds = date.getUTCMilliseconds();

    // Create UTC date
    const utcDate = new Date(
      Date.UTC(utcYear, utcMonth, utcDay, utcHours, utcMinutes, utcSeconds, utcMilliseconds)
    );

    return utcDate.toISOString();
  } catch (error) {
    console.error('Error formatting date to ISO string with time:', error);
    return '';
  }
}

/**
 * Combines a date and time string into a single Date object.
 * Cross-browser compatible with proper error handling.
 * @param date Date object
 * @param timeString Time string in HH:MM:SS or HH:MM format
 * @returns Combined Date object or undefined if invalid
 */
export function combineDateAndTime(date?: Date | null, timeString?: string): Date | undefined {
  if (!date || !(date instanceof Date) || isNaN(date.getTime()) || !timeString) {
    return undefined;
  }

  try {
    // Parse time string (HH:MM:SS or HH:MM)
    const timeParts = timeString.split(':');
    if (timeParts.length < 2 || timeParts.length > 3) {
      console.error('Invalid time format. Expected HH:MM or HH:MM:SS');
      return undefined;
    }

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = timeParts[2] ? parseInt(timeParts[2], 10) : 0;

    // Validate time components
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      console.error('Invalid time values');
      return undefined;
    }

    // Create a new date object to avoid mutating the original
    const combinedDate = new Date(date.getTime());

    // Set the time components
    combinedDate.setHours(hours, minutes, seconds, 0);

    // Validate the resulting date
    if (isNaN(combinedDate.getTime())) {
      console.error('Invalid date after combining date and time');
      return undefined;
    }

    return combinedDate;
  } catch (error) {
    console.error('Error combining date and time:', error);
    return undefined;
  }
}

//Example output: "14 August 2025 – 10:50 AM"
export function getDateAndTime(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return `${day} ${month} ${year} – ${time}`;
}

//Example output: "14 Aug 2025"
// export function formatDate(dateString?: string | null): string {
//   try {
//     if (!dateString) return '';

//     const numeric = Number(dateString);
//     if (isNaN(numeric)) return '';

//     const date = new Date(
//       Number(numeric.toString().slice(0, 4)), // year
//       Number(numeric.toString().slice(4, 6)) - 1, // month (0-based)
//       Number(numeric.toString().slice(6, 8)) // day
//     );

//     return new Intl.DateTimeFormat('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     }).format(date);
//   } catch (error) {
//     console.error('Error formatting date to dd-MMM-yyyy:', error);
//     return '';
//   }
// }
