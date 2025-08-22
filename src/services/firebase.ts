// FCM: 알림 권한 요청 및 토큰 발급 함수
export async function requestFcmPermissionAndGetToken(): Promise<string | null> {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;
    // 아래 VAPID 키는 Firebase 콘솔 > 클라우드 메시징 > 웹 푸시 인증서에서 복사해 입력
    const VAPID_KEY = 'YOUR_PUBLIC_VAPID_KEY';
    // @ts-ignore
    const { getToken } = await import('firebase/messaging');
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
    });
    return token;
  } catch (err) {
    console.error('FCM 토큰 발급 오류:', err);
    return null;
  }
}

// FCM: 포그라운드 알림 수신 리스너 등록
export function onFcmMessage(callback: (payload: any) => void) {
  if (!messaging) return;
  // @ts-ignore
  import('firebase/messaging').then(({ onMessage }) => {
    onMessage(messaging, callback);
  });
}
// Firebase 설정 파일
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  // Firebase 프로젝트 설정 정보는 환경변수로 관리
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
export const db = getFirestore(app);
export const auth = getAuth(app);

// FCM은 브라우저에서 지원되는 경우에만 초기화
let messaging: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { messaging };
export default app;
