export const baseUrl = 'http://localhost:8080/movies/';
export function isValidDate(toCheck) {
  // Check if the date is valid before proceeding. This will not detect invalid Feb 29 dates.
  const [day, month, year] = toCheck.split('/');
  // Attempt to convert the fields to numbers
  if (!day || !month || !year ) {
    alert('Please provide a complete date in DD/MM/YYYY format');
    return false;
  } else {
    const dayNum: number = parseInt(day, 10);
    const monthNum: number = parseInt(month, 10);
    const yearNum: number = parseInt(year, 10);
    if (dayNum < 1 ||
      monthNum < 1 ||
      yearNum < 1 ||
      dayNum > 31 ||
      monthNum > 12 ||
      yearNum > 9999 ||
      (dayNum > 30 && [4, 6, 9, 11].includes(monthNum)) ||
      (dayNum > 29 && monthNum === 2)
    ) {
      alert('Please provide a valid date in DD/MM/YYYY format');
      return false;
    }
    return true;
  }
}
