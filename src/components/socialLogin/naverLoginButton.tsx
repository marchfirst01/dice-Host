import { signIn } from 'next-auth/react';

export const NaverLoginButton = () => {
  return (
    <button
      onClick={() =>
        signIn('naver', {
          callbackUrl: '/space',
        })
      }
      className="flex size-[52px] items-center justify-center rounded-full bg-[#03C75A] px-4 py-2 text-white transition-colors hover:bg-[#02B350]"
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
            d="M16.273 12.845L7.376 0H0V24H7.727V11.155L16.624 24H24V0H16.273V12.845Z"
            fill="white"
          />
        </svg>
      </div>
    </button>
  );
};
