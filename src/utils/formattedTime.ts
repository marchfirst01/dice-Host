import { Time } from '@type/popUpSetting';

export default function formattedTime(time: Time) {
  if (time.period === '오후') {
    const pmTime = Number(time.hours) + 12;
    const formattedTime = `${pmTime}:${time.minutes}`;
    return formattedTime;
  }
  if (time.hours === '10' || time.hours === '11' || time.hours === '12') {
    return `${time.hours}:${time.minutes}`;
  } else {
    return `0${time.hours}:${time.minutes}`;
  }
}
