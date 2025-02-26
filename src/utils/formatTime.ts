export function formatTimeTo24Hour(timeString: string) {
  const [period, time] = timeString.split(' ');
  const [hour, minute] = time.split(':');

  if (period === '오후') {
    const pmTime = Number(hour) + 12;
    const formattedTime = `${pmTime}:${minute}`;
    return formattedTime;
  }
  if (hour === '10' || hour === '11' || hour === '12') {
    return `${hour}:${minute}`;
  } else {
    return `0${hour}:${minute}`;
  }
}
export function formatTimeTo12Hour(timeString: string): string {
  const [hour, minute] = timeString.split(':');
  const hourNum = Number(hour);
  const period = hourNum >= 12 ? '오후' : '오전';
  const adjustedHour = hourNum % 12 === 0 ? 12 : hourNum % 12;

  return `${period} ${adjustedHour}:${minute}`;
}
