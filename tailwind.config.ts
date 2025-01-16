import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        H1: ['Pretendard-Bold', 'System'],
        H2: ['Pretendard-SemiBold', 'System'],
        SUB1: ['Pretendard-SemiBold', 'System'],
        SUB2: ['Pretendard-SemiBold', 'System'],
        BODY1: ['Pretendard-Medium', 'System'],
        BODY2: ['Pretendard-Medium', 'System'],
        CAP1: ['Pretendard-SemiBold', 'System'],
        CAP2: ['Pretendard-Bold', 'System'],
        BTN1: ['Pretendard-SemiBold', 'System'],
      },
      fontSize: {
        H1: '24px',
        H2: '22px',
        SUB1: '20px',
        SUB2: '18px',
        BODY1: '16px',
        BODY2: '14px',
        CAP1: '13px',
        CAP2: '12px',
        BTN1: '14px',
      },
      lineHeight: {
        H1: '120%',
        H2: '140%',
        SUB1: '140%',
        SUB2: '150%',
        BODY1: '150%',
        BODY2: '150%',
        CAP1: '150%',
        CAP2: '150%',
        BTN1: '150%',
      },
      backgroundColor: {
        basic: 'rgba(0, 0, 0, 0.5)',
        light: 'rgba(0, 0, 0, 0.2)',
      },
      dropShadow: {
        basicShadow: '0px 0px 4px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        // Primary Color
        DEFAULT: 'black',

        // Gray Scale
        dark_gray: '#333333',
        deep_gray: '#666666',
        medium_gray: '#999999',
        light_gray: '#cccccc',

        // System Color
        purple: '#5B4FF4',
        green: '#4FF48E',
        yellow: '#FFD90C',
        red: '#FF357F',

        // Background Color
        back_gray: '#F4F4F4',

        // Stroke Color
        stroke: '#EEEEEE',
      },
    },
  },
  plugins: [],
} satisfies Config;
