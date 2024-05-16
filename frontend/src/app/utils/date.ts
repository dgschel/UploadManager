// Convert string to German date format
export const formatDate = (dateAsString: string): string => {
  const date = new Date(dateAsString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('de-DE', options).format(date);
};
