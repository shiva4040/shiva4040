import { useState, useEffect } from 'react';

/**
 * Custom hook providing a real-time ticking UTC clock string formatted as HH:MM:SS UTC.
 * @returns {string} Formatted UTC time string.
 */
export function useUtcClock() {
  const [utcTime, setUtcTime] = useState('--:--:-- UTC');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${mins}:${secs} UTC`);
    };

    update();
    const timerId = setInterval(update, 1000);

    return () => clearInterval(timerId);
  }, []);

  return utcTime;
}
