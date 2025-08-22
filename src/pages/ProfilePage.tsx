

import React, { useEffect, useState } from 'react';
import FontSizeControls from '../components/common/FontSizeControls';
import ContrastToggle from '../components/common/ContrastToggle';

interface ProfilePageProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ fontSize, setFontSize, highContrast, setHighContrast }) => {
  const [guardianMode, setGuardianMode] = useState(() => localStorage.getItem('guardianMode') === 'true');
  const [ariaMsg, setAriaMsg] = useState('');

  useEffect(() => {
    // 페이지 진입 시 TTS 안내
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance('내 정보 페이지입니다. 개인정보 및 설정, 보호자 모드 전환이 가능합니다.');
      utter.lang = 'ko-KR';
      utter.rate = 0.8;
      speechSynthesis.speak(utter);
    }
  }, []);

  // 보호자 모드 안내 TTS/aria-live
  useEffect(() => {
    if (ariaMsg) {
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(ariaMsg);
        utter.lang = 'ko-KR';
        utter.rate = 0.8;
        speechSynthesis.speak(utter);
      }
    }
  }, [ariaMsg]);

  const handleGuardianToggle = () => {
    const next = !guardianMode;
    setGuardianMode(next);
    localStorage.setItem('guardianMode', String(next));
    setAriaMsg(next ? '보호자 모드가 활성화되었습니다.' : '보호자 모드가 해제되었습니다.');
  };

  return (
    <div>
      <div aria-live="polite" className="sr-only">{ariaMsg}</div>
      {guardianMode && (
        <div style={{background:'#e0f2fe',color:'#0369a1',padding:'10px 0',borderRadius:8,marginBottom:16,textAlign:'center',fontWeight:600}}>
          보호자 모드 활성화됨
        </div>
      )}
      <h1>내 정보</h1>
      <button
        onClick={handleGuardianToggle}
        aria-label={guardianMode ? '보호자 모드 해제' : '보호자 모드 진입'}
        style={{marginBottom:20,padding:'10px 20px',fontSize:'1.1rem',borderRadius:8,border:'1.5px solid #2563eb',background:guardianMode?'#2563eb':'#fff',color:guardianMode?'#fff':'#2563eb',fontWeight:600,cursor:'pointer'}}
      >
        {guardianMode ? '보호자 모드 해제' : '보호자 모드 진입'}
      </button>
      <section style={{marginBottom:24}}>
        <h2 style={{fontSize:'1.15rem',margin:'18px 0 8px 0'}}>접근성 설정</h2>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <FontSizeControls fontSize={fontSize} setFontSize={setFontSize} />
          <ContrastToggle highContrast={highContrast} setHighContrast={setHighContrast} />
        </div>
      </section>
      <p>개인 설정이 여기에 표시됩니다.</p>
    </div>
  );
};

export default ProfilePage;
