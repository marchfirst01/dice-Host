import { PopUpConfigList } from '@type/popUpSetting';

export const popUpConfigList: PopUpConfigList = {
  name: { name: 'name', display: '공간 이름', placeholder: '팝업 공간의 이름을 입력해주세요' },
  subTitle: {
    name: 'subTitle',
    display: '공간 한줄 소개',
    placeholder: '공간의 특징을 짧게 소개해주세요',
  },
  placeStart: { name: 'placeStart', display: '공간 영업 시간', placeholder: '시작 시간' },
  placeEnd: { name: 'placeEnd', display: '공간 영업 시간', placeholder: '마감 시간' },
  numOfPeople: {
    name: 'numOfPeople',
    display: '수용 인원',
    placeholder: '수용 가능한 최대 인원을 입력해주세요',
  },
  hashTagList: {
    name: 'hashTagList',
    display: '공간 해시태그(최대 5개)',
    placeholder: '예) #갤러리 #성수동 #촬영 #성수역 도보 5분',
  },
  price: { name: 'price', display: '1일 대여 비용 정가', placeholder: '가격을 입력해주세요' },
  discount: { name: 'discount', display: '할인', placeholder: '0%' },
  description: {
    name: 'description',
    display: '자세한 소개',
    placeholder:
      '소상공인 및 자영업자분들과 신뢰할 수 있는 거래를 위해 공간을 상세하게 설명해주세요',
  },
  location: { name: 'location', display: '위치', placeholder: '주소를 입력해주세요' },
  locationDescription: {
    name: 'locationDescription',
    display: '위치',
    placeholder: '공간의 상세주소를 입력해주세요',
  },
  homepage: {
    name: 'homepage',
    display: '웹사이트',
    placeholder: '팝업 공간 관련 웹사이트 URL을 입력해주세요',
  },
  phoneNumber: {
    name: 'phoneNumber',
    display: '문의 전화번호',
    placeholder: '게스트가 연락할 휴대폰/유선번호를 입력해주세요',
  },
  usageInformation: {
    name: 'usageInformation',
    display: '시설 이용 및 공지사항 안내 작성',
    placeholder:
      '예) 공간별 조명 밝기 조절 가능/빔프로젝터/스피커(RoomA/C 각 2개)/Wifi, CCTV, 소화기',
  },
  noticeInformation: {
    name: 'noticeInformation',
    display: '시설 이용 안내',
    placeholder:
      '예) 채팅 상담을 추천드려요/설치 및 철수는 계약 기간 내 포함이에요/보안상 문제로 전시기간 중 관리 인원 1명 이상 상주해야 해요',
  },
};
