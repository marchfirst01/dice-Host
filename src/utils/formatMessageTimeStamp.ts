export function formatMessageListTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDays = (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 1) {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
  } else if (diffDays < 2) {
    return '어제';
  } else {
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  }
}

export function formatMessageTimeStampToDay(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export function formatMessageTimeStampTo12Hour(isoString: string) {
  const date = new Date(isoString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${ampm} ${formattedHours}:${formattedMinutes}`;
}
