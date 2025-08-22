
// (중복 import 제거)
import { requestFcmPermissionAndGetToken, onFcmMessage } from './services/firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import WelfarePage from './pages/WelfarePage.tsx';
import SchedulePage from './pages/SchedulePage.tsx';
import MenuPage from './pages/MenuPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import './styles/global.css';

function App() {
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? Number(saved) : 18;
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem('highContrast');
    return saved === 'true';
  });

  useEffect(() => {
    document.body.style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    // FCM 권한 요청 및 토큰 발급
    requestFcmPermissionAndGetToken().then(token => {
      if (token) {
        console.log('FCM 토큰:', token);
      } else {
        console.log('FCM 권한 거부 또는 토큰 발급 실패');
      }
    });
    // 포그라운드 알림 수신
    onFcmMessage((payload) => {
      alert('새 알림: ' + (payload?.notification?.title || ''));
      console.log('FCM 메시지 수신:', payload);
    });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welfare" element={<WelfarePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/profile" element={<ProfilePage fontSize={fontSize} setFontSize={setFontSize} highContrast={highContrast} setHighContrast={setHighContrast} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
