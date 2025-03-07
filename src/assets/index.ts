// bank
import BankHana from '@assets/bank/bank_hana.svg';
import BankIbk from '@assets/bank/bank_ibk.svg';
import BankKakao from '@assets/bank/bank_kakao.svg';
import BankKookmin from '@assets/bank/bank_kookmin.svg';
import BankNh from '@assets/bank/bank_nh.svg';
import BankSaemaeul from '@assets/bank/bank_saemaeul.svg';
import BankSinhan from '@assets/bank/bank_sinhan.svg';
import BankToss from '@assets/bank/bank_toss.svg';
import BankWoori from '@assets/bank/bank_woori.svg';
// chat
import CameraGray from '@assets/chat/camera-gray.svg';
import ChatBlack from '@assets/chat/chatBlack.svg';
import ReportGray from '@assets/chat/report-gray.svg';
import SendGrayFull from '@assets/chat/send-gray-full.svg';
// common/arrow
import ArrowBackBlack from '@assets/common/arrow/arrow-back-black.svg';
import ArrowBackWhite from '@assets/common/arrow/arrow-back-white.svg';
import ArrowBlackDown from '@assets/common/arrow/arrow-down-black.svg';
import ArrowDownGray from '@assets/common/arrow/arrow-down-gray.svg';
import DiceLoading from '@assets/common/dice_loading.gif';
// common/logo
import DiceBlack from '@assets/common/logo/dice-black.svg';
import DiceWhite from '@assets/common/logo/dice-white.svg';
import LogoBlack from '@assets/common/logo/logo-black.svg';
import LogoWhite from '@assets/common/logo/logo-white.svg';
// mainFooter
import MyBlack from '@assets/mainFooter/my-black.svg';
import MyGray from '@assets/mainFooter/my-gray.svg';
import PlaceBlack from '@assets/mainFooter/place-black.svg';
import PlaceGray from '@assets/mainFooter/place-gray.svg';
import ReservationBlack from '@assets/mainFooter/reservation-black.svg';
import ReservationGray from '@assets/mainFooter/reservation-gray.svg';
// mainHeader
import Chat from '@assets/mainHeader/chat.svg';
import EditGray from '@assets/mainHeader/edit-gray.svg';
import Heart from '@assets/mainHeader/heart.svg';
import SendGray from '@assets/mainHeader/send-gray.svg';
// member
import Close from '@assets/member/close.svg';
import Delete from '@assets/member/delete.svg';
import EyeOff from '@assets/member/eye-off.svg';
import EyeOn from '@assets/member/eye-on.svg';
// popUp
import HeartDisabled from '@assets/popUp/HeartDisabled.svg';
import FloatingAddButton from '@assets/popUp/floatingAddButton.svg';
import HeaderBack from '@assets/popUp/headerBack.svg';
import HeartFull from '@assets/popUp/heart-full.svg';
import Search from '@assets/popUp/search.svg';
// popUpDetail
import Globe from '@assets/popUpDetail/globe.svg';
import Phone from '@assets/popUpDetail/phone.svg';
import PlaceMarker from '@assets/popUpDetail/place-marker.svg';
import SendBlack from '@assets/popUpDetail/send-black.svg';
import SendWhite from '@assets/popUpDetail/send-white.svg';
// popUpSetting
import ImageDelete from '@assets/popUpSetting/image-delete.svg';
import ImageUpload from '@assets/popUpSetting/upload.svg';

const BANK = [
  { bankImage: BankHana, bankName: '하나' },
  { bankImage: BankIbk, bankName: 'IBK기업' },
  { bankImage: BankKakao, bankName: '카카오뱅크' },
  { bankImage: BankKookmin, bankName: 'KB국민' },
  { bankImage: BankNh, bankName: 'NH농협' },
  { bankImage: BankSaemaeul, bankName: '새마을' },
  { bankImage: BankSinhan, bankName: '신한' },
  { bankImage: BankToss, bankName: '토스뱅크' },
  { bankImage: BankWoori, bankName: '우리' },
];
const IMAGES = {
  // common/arrow
  DiceLoading,
  ArrowBackBlack,
  ArrowBackWhite,
  ArrowDownGray,
  ArrowBlackDown,
  // common/logo
  DiceBlack,
  DiceWhite,
  LogoBlack,
  LogoWhite,
  //chat
  CameraGray,
  ChatBlack,
  ReportGray,
  SendGrayFull,
  // mainFooter
  MyBlack,
  MyGray,
  PlaceBlack,
  PlaceGray,
  ReservationBlack,
  ReservationGray,
  //mainHeader
  Chat,
  Heart,
  EditGray,
  SendGray,
  // member
  Close,
  Delete,
  EyeOff,
  EyeOn,
  // popUp
  FloatingAddButton,
  HeaderBack,
  HeartFull,
  HeartDisabled,
  Search,
  // popUpDetail
  Globe,
  Phone,
  PlaceMarker,
  SendBlack,
  SendWhite,
  // popUpSetting
  ImageDelete,
  ImageUpload,
};

export { IMAGES, BANK };
