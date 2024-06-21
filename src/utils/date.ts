
import { formatInTimeZone } from 'date-fns-tz';

// export const formatTime = (timeString: string): string =>
//   formatInTimeZone(new Date(timeString), 'UTC', 'dd/MM/yyyy HH:mm:ss');

export const formatTime = (timeString: string): string =>
  formatInTimeZone(new Date(timeString), 'UTC', 'dd/MM/yyyy');

