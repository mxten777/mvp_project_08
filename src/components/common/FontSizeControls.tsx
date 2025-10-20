import React from 'react';

interface FontSizeControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const FontSizeControls: React.FC<FontSizeControlsProps> = ({ fontSize, setFontSize }) => {
  return (
    <div className="flex items-center gap-1 md:gap-2 bg-gray-100 rounded-lg px-1 md:px-2 py-1 shadow-sm min-h-[48px] md:min-h-[48px]" aria-label="글꼴 크기 조절" role="group">
      <button
        aria-label="글꼴 크기 축소"
        onClick={() => setFontSize(Math.max(16, fontSize - 2))}
        disabled={fontSize <= 16}
        tabIndex={0}
        className="px-2 md:px-4 py-2 rounded-lg text-sm md:text-base font-bold border-2 border-blue-500 text-blue-600 bg-white min-w-[40px] md:min-w-[48px] min-h-[40px] md:min-h-[48px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        A-
      </button>
      <span aria-live="polite" className="w-10 md:w-14 text-center text-sm md:text-lg font-semibold text-blue-700 select-none">{fontSize}px</span>
      <button
        aria-label="글꼴 크기 확대"
        onClick={() => setFontSize(Math.min(32, fontSize + 2))}
        disabled={fontSize >= 32}
        tabIndex={0}
        className="px-2 md:px-4 py-2 rounded-lg text-sm md:text-base font-bold border-2 border-blue-500 text-blue-600 bg-white min-w-[40px] md:min-w-[48px] min-h-[40px] md:min-h-[48px] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        A+
      </button>
    </div>
  );
};

export default FontSizeControls;
