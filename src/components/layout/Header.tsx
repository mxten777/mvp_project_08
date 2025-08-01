import React, { useState } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  
  const handleTTSToggle = () => {
    setIsTTSEnabled(!isTTSEnabled);
    // TTS 기능 구현 예정
  };

  const speakText = (text: string) => {
    if (isTTSEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8; // 조금 느리게
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h1 
              className="app-title"
              onClick={() => speakText('시니어 복지 알림 앱')}
            >
              <span className="logo-icon">🏠</span>
              복지알림
            </h1>
            <p className="app-subtitle">안전하고 편리한 복지 정보</p>
          </div>
          
          <div className="header-actions">
            <button
              className={`btn-icon ${isTTSEnabled ? 'active' : ''}`}
              onClick={handleTTSToggle}
              aria-label={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
              title={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
            >
              {isTTSEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            
            <button
              className="btn-icon"
              aria-label="설정"
              title="설정"
              onClick={() => speakText('설정 메뉴')}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
