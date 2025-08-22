import React from 'react';

interface ContrastToggleProps {
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
}

const ContrastToggle: React.FC<ContrastToggleProps> = ({ highContrast, setHighContrast }) => {
  return (
    <button
      className={`contrast-toggle${highContrast ? ' active' : ''}`}
      aria-label={highContrast ? '고대비 모드 해제' : '고대비 모드 적용'}
      aria-pressed={highContrast}
      onClick={() => setHighContrast(!highContrast)}
      tabIndex={0}
    >
      {highContrast ? '고대비 해제' : '고대비'}
    </button>
  );
};

export default ContrastToggle;
