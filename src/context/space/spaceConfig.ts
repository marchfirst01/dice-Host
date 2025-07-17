import { SpaceConfigList } from '@type/space/spaceConfig';

export const SpaceConfig: SpaceConfigList = {
  name: {
    name: 'name',
    type: '',
    display: '공간 이름',
    placeholder: '팝업 공간의 이름을 입력해주세요',
    rules: '팝업 공간의 이름을 입력해주세요',
  },
  openingTime: {
    name: 'openingTime',
    type: '',
    display: '공간 영업 시간',
    placeholder: '시작 시간',
    rules: '시작시간을 입력해주세요',
  },
  closingTime: {
    name: 'closingTime',
    type: '',
    display: '공간 영업 시간',
    placeholder: '마감 시간',
    rules: '마감시간을 입력해주세요',
  },
  size: {
    name: 'size',
    type: 'number',
    display: '공간 크기 (m²)',
    placeholder: '팝업 공간의 크기를 입력해주세요',
    rules: '팝업 공간의 크기를 입력해주세요',
    handleOnChange: (e, filed) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      filed.onChange(Number(value));
    },
  },
  pricePerDay: {
    name: 'pricePerDay',
    type: 'number',
    display: '1일 대여 비용 정가',
    placeholder: '가격을 입력해주세요',
    rules: '가격을 입력해주세요',
    handleOnChange: (e, filed) => {
      const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기;
      filed.onChange(Number(value));
    },
  },
  discountRate: {
    name: 'discountRate',
    type: 'number',
    display: '할인',
    placeholder: '0%',
    rules: '할인율을 입력해주세요',
    handleOnChange: (e, filed) => {
      let value = e.target.value.replace(/[^0-9]/g, '');
      if (value !== '') {
        value = Math.min(Math.max(Number(value), 0), 100).toString(); // 0~100 범위 제한
      }
      filed.onChange(Number(value));
    },
  },
  details: {
    name: 'details',
    type: '',
    display: '자세한 소개',
    placeholder:
      '소상공인 및 자영업자분들과 신뢰할 수 있는 거래를 위해 공간을 상세하게 설명해주세요',
    rules: '공간 설명을 작성해주세요',
  },
  address: {
    name: 'address',
    type: '',
    display: '위치',
    placeholder: '주소를 입력해주세요',
    rules: '주소를 입력해주세요',
  },
  detailAddress: {
    name: 'detailAddress',
    type: '',
    display: '위치',
    placeholder: '공간의 상세주소를 입력해주세요',
    rules: '공간 주소를 입력해주세요',
  },
  contactNumber: {
    name: 'contactNumber',
    type: '',
    display: '문의 전화번호',
    placeholder: '게스트가 연락할 휴대폰/유선번호를 입력해주세요',
    handleOnChange: (e, filed) => {
      const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기;
      let phoneValue;

      // 000-0000-0000 형식으로 변환
      if (value.length <= 3) {
        phoneValue = value;
      } else if (value.length <= 7) {
        phoneValue = value.slice(0, 3) + '-' + value.slice(3);
      } else {
        phoneValue = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
      }
      filed.onChange(phoneValue);
    },
    rules: '게스트가 연락할 휴대폰/유선번호를 입력해주세요',
  },
  facilityInfo: {
    name: 'facilityInfo',
    type: '',
    display: '',
    placeholder:
      '예) 공간별 조명 밝기 조절 가능/빔프로젝터/스피커(RoomA/C 각 2개)/Wifi, CCTV, 소화기',
    rules: '시설 이용 및 공지사항을 작성해주세요',
  },
  notice: {
    name: 'notice',
    type: '',
    display: '시설 이용 안내',
    placeholder:
      '예) 채팅 상담을 추천드려요/설치 및 철수는 계약 기간 내 포함이에요/보안상 문제로 전시기간 중 관리 인원 1명 이상 상주해야 해요',
    rules: '시설 이용 안내를 작성해주세요',
  },
};
