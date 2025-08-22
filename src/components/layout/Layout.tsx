import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from './Header.tsx';
import Navigation from './Navigation.tsx';
import './Layout.css';

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
    <div className="layout">
  {/* 접근성 컨트롤은 Header 내부로 이동 */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{ariaLiveMsg}</div>
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
        <div className="menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <Navigation onNavigate={closeMenu} />
          </div>
        </div>
      )}

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      {/* 하단 네비게이션: 메뉴 오픈 시 모바일에서 숨김 */}
      <div style={{ display: isMenuOpen ? 'none' : undefined }}>
        <Navigation />
      </div>
    </div>
  );
};

export default Layout;
