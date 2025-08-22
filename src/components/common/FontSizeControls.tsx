import React from 'react';

interface FontSizeControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const FontSizeControls: React.FC<FontSizeControlsProps> = ({ fontSize, setFontSize }) => {
  return (
    <div className="font-size-controls" aria-label="글꼴 크기 조절" role="group">
      <button
        aria-label="글꼴 크기 축소"
        onClick={() => setFontSize(Math.max(16, fontSize - 2))}
        disabled={fontSize <= 16}
        tabIndex={0}
      >
        A-
      </button>
      <span aria-live="polite" style={{ minWidth: 32, display: 'inline-block', textAlign: 'center' }}>{fontSize}px</span>
      <button
        aria-label="글꼴 크기 확대"
        onClick={() => setFontSize(Math.min(32, fontSize + 2))}
        disabled={fontSize >= 32}
        tabIndex={0}
      >
        A+
      </button>
    </div>
  );
};

export default FontSizeControls;
