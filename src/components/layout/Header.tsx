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
    <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md border-b border-blue-700">
      <div className="w-full px-2 md:px-4 py-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 relative justify-between min-h-[64px]">
          
          {/* 모바일 상단: 접근성 컨트롤 + 햄버거 메뉴 */}
          <div className="flex w-full md:w-auto justify-between items-center">
            {/* 접근성 컨트롤: 폰트 크기/고대비 */}
            <div className="flex gap-1 md:gap-2 items-center bg-blue-100/80 rounded-lg px-2 md:px-3 py-1 shadow-sm">
              <FontSizeControls fontSize={fontSize} setFontSize={setFontSize} />
              <ContrastToggle highContrast={highContrast} setHighContrast={setHighContrast} />
            </div>

            {/* 햄버거 메뉴 버튼 (모바일용) */}
            <button
              className="md:hidden flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              title={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-pressed={isMenuOpen}
              tabIndex={0}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* 로고/타이틀 - 중앙 정렬 */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center w-full md:w-auto">
            <h1 
              className="flex items-center gap-2 text-xl md:text-3xl font-extrabold cursor-pointer select-none drop-shadow-sm hover:scale-105 transition-transform"
              onClick={() => speakText('시니어 복지 알림 앱')}
            >
              <span className="text-2xl md:text-4xl drop-shadow-md">🏠</span>
              복지알림
            </h1>
            <p className="text-sm md:text-lg opacity-90 font-medium mt-1 text-center">안전하고 편리한 복지 정보</p>
          </div>

          {/* 우측 액션(음성안내/설정) - 모바일에서는 작게 */}
          <div className="hidden md:flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-blue-500 hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white ${isTTSEnabled ? 'ring-2 ring-yellow-400' : ''}`}
                onClick={handleTTSToggle}
                aria-label={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
                title={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
                aria-pressed={isTTSEnabled}
                tabIndex={0}
              >
                {isTTSEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
              <span className="text-xs mt-1">음성안내</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-blue-500 hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="설정"
                title="설정"
                onClick={() => speakText('설정 메뉴')}
                tabIndex={0}
              >
                <Settings size={24} />
              </button>
              <span className="text-xs mt-1">설정</span>
            </div>
          </div>

          {/* 모바일용 작은 액션 버튼들 */}
          <div className="flex md:hidden gap-2 w-full justify-center mt-1">
            <button
              className={`flex items-center justify-center px-3 py-2 rounded-lg border border-white bg-blue-500 hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white text-sm ${isTTSEnabled ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={handleTTSToggle}
              aria-label={isTTSEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
              aria-pressed={isTTSEnabled}
              tabIndex={0}
            >
              {isTTSEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span className="ml-1">음성</span>
            </button>
            <button
              className="flex items-center justify-center px-3 py-2 rounded-lg border border-white bg-blue-500 hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              aria-label="설정"
              onClick={() => speakText('설정 메뉴')}
              tabIndex={0}
            >
              <Settings size={18} />
              <span className="ml-1">설정</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
