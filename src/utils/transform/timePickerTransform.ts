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

// 한국어 시간 형식(오전/오후)을 24시간 형식(HH:MM)으로 변환하는 함수
export function formatKoreanTimeTo24(koreanTimeString: string): string {
  if (!koreanTimeString) return '';

  // "오전/오후 H:MM" 형식의 시간을 매칭
  const match = koreanTimeString.match(/(오전|오후)\s+(\d{1,2}):(\d{2})/);
  if (match) {
    const [_, period, hourStr, minutes] = match;
    let hour = parseInt(hourStr, 10);

    // 오전/오후에 따라 시간 조정
    if (period === '오전' && hour === 12) {
      // 오전 12시는 00시
      hour = 0;
    } else if (period === '오후' && hour !== 12) {
      // 오후 1시~11시는 13시~23시 (오후 12시는 그대로 12시)
      hour += 12;
    }

    // HH:MM 형식으로 반환
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  }

  // 매칭되지 않으면 원래 값 반환
  return koreanTimeString;
}
