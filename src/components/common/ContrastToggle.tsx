import React from 'react';

interface ContrastToggleProps {
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
}

const ContrastToggle: React.FC<ContrastToggleProps> = ({ highContrast, setHighContrast }) => {
  return (
    <button
      className={`px-2 md:px-5 py-2 rounded-lg text-sm md:text-base font-bold border-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[48px] md:min-w-[48px] min-h-[40px] md:min-h-[48px] shadow-sm
        ${highContrast ? 'bg-black text-white border-white' : 'bg-white text-black border-blue-500 hover:bg-blue-50'}
      `}
      aria-label={highContrast ? '고대비 모드 해제' : '고대비 모드 적용'}
      aria-pressed={highContrast}
      onClick={() => setHighContrast(!highContrast)}
      tabIndex={0}
    >
      {highContrast ? '해제' : '고대비'}
    </button>
  );
};

export default ContrastToggle;
