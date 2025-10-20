import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from './Header.tsx';
import Navigation from './Navigation.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? Number(saved) : 18;
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem('highContrast');
    return saved === 'true';
  });
  const [ariaLiveMsg, setAriaLiveMsg] = useState('');

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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 메뉴 오픈 시 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // 포커스 이동 시 TTS/aria-live 안내 (전역)
  useEffect(() => {
    const handler = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.getAttribute('aria-label')) {
        const msg = target.getAttribute('aria-label')!;
        setAriaLiveMsg(msg);
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance(msg);
          utter.lang = 'ko-KR';
          utter.rate = 0.8;
          speechSynthesis.speak(utter);
        }
      }
    };
    window.addEventListener('focusin', handler);
    return () => window.removeEventListener('focusin', handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 접근성 안내 메시지 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{ariaLiveMsg}</div>
      
      {/* 헤더 - 전체 상단 고정 */}
      <Header
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMenuOpen}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          style={{ paddingTop: '120px' }}
          onClick={closeMenu}
        >
          <div 
            className="bg-white w-72 max-w-[85vw] h-full shadow-xl rounded-r-2xl animate-in slide-in-from-left duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Navigation onNavigate={closeMenu} />
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* 데스크탑 사이드바 네비게이션 */}
        <aside className="hidden md:block fixed left-0 top-24 h-[calc(100vh-6rem)] w-72 bg-white shadow-lg z-10 overflow-y-auto">
          <Navigation />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 w-full md:ml-72 pt-4 md:pt-6 pb-20 md:pb-6 px-4 md:px-6">
          <div className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <Navigation />
      </div>
    </div>
  );
};

export default Layout;
