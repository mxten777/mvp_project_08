import React, { useState } from 'react';
import FontSizeControls from '../common/FontSizeControls';
import ContrastToggle from '../common/ContrastToggle';
import { Volume2, VolumeX, Settings, Menu, X } from 'lucide-react';
import './Header.css';

import type { Dispatch, SetStateAction } from 'react';
interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  highContrast: boolean;
  setHighContrast: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false, fontSize, setFontSize, highContrast, setHighContrast }) => {
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
          <div className="header-a11y-controls">
            {/* 접근성 컨트롤: 폰트 크기/고대비 */}
            <FontSizeControls fontSize={fontSize} setFontSize={setFontSize} />
            <ContrastToggle highContrast={highContrast} setHighContrast={setHighContrast} />
          </div>
          {/* 햄버거 메뉴 버튼 (모바일용) */}
          <button
            className="hamburger-btn"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            title={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-pressed={isMenuOpen}
            tabIndex={0}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

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
            <div className="action-button">
              <button
                className={`btn-icon ${isTTSEnabled ? 'active' : ''}`}
                onClick={handleTTSToggle}
                aria-label={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
                title={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
                aria-pressed={isTTSEnabled}
                tabIndex={0}
              >
                {isTTSEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
              <span className="action-label">음성안내</span>
            </div>
            
            <div className="action-button">
              <button
                className="btn-icon"
                aria-label="설정"
                title="설정"
                onClick={() => speakText('설정 메뉴')}
                tabIndex={0}
              >
                <Settings size={24} />
              </button>
              <span className="action-label">설정</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
