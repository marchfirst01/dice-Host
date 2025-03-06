export function formatMessageTimestamp(isoString: string): string {
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
