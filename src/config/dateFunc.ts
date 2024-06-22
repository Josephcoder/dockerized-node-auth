import moment from 'moment-timezone';

// Function to get the current time in Rwanda timezone with the specified format
export const getKigaliRwandaTime = () => {
  const timezone = 'Africa/Kigali';
  return moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
};
