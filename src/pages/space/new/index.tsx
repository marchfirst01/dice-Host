import SpaceSettingComponent from '@components/space/setting';

// SpaceSettingComponent에서 폼 관리
// 여기에 초기값을 null로 지정해주면 새로운 공간 등록
// id 공간 정보의 값을 초기값으로 지정해주면 공간 수정
export default function NewSpacePage() {
  return <SpaceSettingComponent />;
}
