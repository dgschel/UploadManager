// Convert string to German date format
export const formatDate = (dateAsString: string | Date): string => {
  const date = new Date(dateAsString); // Always convert to date

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('de-DE', options).format(date);
};
