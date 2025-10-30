// src/utils/settingFCM.ts
import { getApps, initializeApp } from 'firebase/app';
import { Messaging, getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Firebase 앱 초기화 (중복 방지)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 클라이언트 사이드에서만 messaging 초기화
export const getMessagingInstance = (): Messaging | null => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    return getMessaging(app);
  }
  return null;
};
