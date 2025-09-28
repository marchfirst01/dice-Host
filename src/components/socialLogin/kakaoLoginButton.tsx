import { fetchOAuthLogin } from '@api/member';

const KakaoLoginButton = () => {
  const handleSocialLoginBtn = async (social: string) => {
    const res = await fetchOAuthLogin(social);
    window.open(res.socialLoginUrl, '_blank');
  };
  return (
    <button
      onClick={() => handleSocialLoginBtn('kakao')}
      className="flex size-[52px] items-center justify-center rounded-full bg-yellow px-4 py-2 text-black transition-colors"
    >
      <div className="flex items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C7.58172 4 4 6.8147 4 10.2C4 12.4242 5.44162 14.4 7.61458 15.5155L6.58375 19.3045C6.52659 19.4836 6.6041 19.6798 6.77578 19.7611C6.8591 19.8023 6.95455 19.8023 7.04276 19.7662L11.3638 17.3851C11.5724 17.3962 11.7849 17.4 12 17.4C16.4183 17.4 20 14.5853 20 10.2C20 6.8147 16.4183 4 12 4Z"
            fill="black"
          />
        </svg>
      </div>
    </button>
  );
};

export default KakaoLoginButton;
