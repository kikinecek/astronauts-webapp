/**
 * Options for formating date.
 * Used for having dates formated uniformly
 */
export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

/**
 * Options for formating date including time.
 * Used for having dates formated uniformly
 */
export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "medium"
}