// 시간 형식 변환 함수
// SpaceSettingComponent - TimePicker
export function formatTimeToKorean(timeString: string) {
  if (!timeString) return '';

  // 형식이 "08:00:00"인 경우 처리
  const match = timeString.match(/(\d{2}):(\d{2}):(\d{2})/);
  if (match) {
    const [_, hours, minutes] = match;
    const hour = parseInt(hours, 10);

    // 오전/오후 구분
    const period = hour < 12 ? '오전' : '오후';
    // 12시간제로 변환 (0시는 12시로, 13시는 1시로 등)
    const hour12 = hour === 0 ? '12' : hour > 12 ? String(hour - 12) : String(hour);

    return `${period} ${hour12}:${minutes}`;
  }

  return timeString; // 매칭되지 않으면 원래 값 반환
}
