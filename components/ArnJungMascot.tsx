import React from 'react';

interface ArnJungMascotProps {
  className?: string;
  emotion?: 'happy' | 'thinking' | 'excited';
}

export const ArnJungMascot: React.FC<ArnJungMascotProps> = ({ className = "w-32 h-32", emotion = 'happy' }) => {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="100" cy="100" r="90" fill="#FCE7F3" />
      
      {/* Body/Head Shape (Bookish blob) */}
      <rect x="50" y="60" width="100" height="120" rx="20" fill="#F48FB1" />
      
      {/* Pages detail (like a book spine) */}
      <rect x="130" y="60" width="15" height="120" rx="5" fill="#F06292" />
      
      {/* Face Area */}
      <circle cx="90" cy="110" r="35" fill="white" />
      
      {/* Eyes */}
      {emotion === 'happy' && (
        <>
          <path d="M75 105 Q80 100 85 105" stroke="#374151" strokeWidth="3" fill="none" />
          <path d="M95 105 Q100 100 105 105" stroke="#374151" strokeWidth="3" fill="none" />
        </>
      )}
      {emotion === 'thinking' && (
        <>
          <circle cx="80" cy="105" r="3" fill="#374151" />
          <circle cx="100" cy="105" r="3" fill="#374151" />
        </>
      )}
      
      {/* Mouth */}
      {emotion === 'happy' || emotion === 'excited' ? (
         <path d="M85 115 Q90 125 95 115" stroke="#F06292" strokeWidth="3" fill="none" />
      ) : (
         <path d="M85 120 Q90 120 95 120" stroke="#F06292" strokeWidth="3" fill="none" />
      )}

      {/* Glasses */}
      <circle cx="80" cy="105" r="12" stroke="#374151" strokeWidth="2" fill="none" fillOpacity="0.1" />
      <circle cx="100" cy="105" r="12" stroke="#374151" strokeWidth="2" fill="none" fillOpacity="0.1" />
      <line x1="92" y1="105" x2="88" y2="105" stroke="#374151" strokeWidth="2" />

      {/* Book on head (Hat) */}
      <path d="M70 50 L100 65 L130 50 L100 35 Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="2"/>
      
      {/* Hands holding a book */}
      <circle cx="60" cy="150" r="10" fill="#F48FB1" />
      <circle cx="120" cy="150" r="10" fill="#F48FB1" />
      <rect x="70" y="140" width="40" height="30" fill="#FFF" stroke="#CBD5E1" rx="2" />
    </svg>
  );
};
