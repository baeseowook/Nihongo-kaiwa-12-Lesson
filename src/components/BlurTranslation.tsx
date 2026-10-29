import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BlurTranslationProps {
  text: string;
  className?: string;
  textClassName?: string;
  resetKey?: string | number;
}

export const BlurTranslation: React.FC<BlurTranslationProps> = ({
  text,
  className = '',
  textClassName = 'text-sm text-slate-600',
  resetKey
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [text, resetKey]);

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      <span
        onClick={() => setRevealed((prev) => !prev)}
        title={revealed ? '클릭하여 다시 블러 처리' : '클릭하여 해석 보기'}
        className={`transition-all duration-150 cursor-pointer rounded px-1 -mx-1 ${textClassName} ${
          revealed
            ? 'blur-none select-text'
            : 'blur-xs select-none bg-slate-100/80 text-slate-500'
        }`}
      >
        {text}
      </span>
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        className={`px-2 py-0.5 text-xs font-medium rounded-md border transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${
          revealed
            ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            : 'bg-sky-50 border-sky-200 text-[#0284C7] hover:bg-sky-100'
        }`}
      >
        {revealed ? (
          <>
            <EyeOff className="w-3 h-3" />
            <span>해석 가리기</span>
          </>
        ) : (
          <>
            <Eye className="w-3 h-3" />
            <span>블러 해제</span>
          </>
        )}
      </button>
    </div>
  );
};
