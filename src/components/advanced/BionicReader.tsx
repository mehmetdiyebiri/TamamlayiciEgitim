import React from 'react';
import { formatBionicText } from '../../utils/bionicEngine';

export const BionicReader: React.FC<{ content: string; orpColor?: string }> = ({ 
  content, 
  orpColor = 'text-blue-600 dark:text-blue-400' 
}) => {
  const tokens = formatBionicText(content);
  return (
    <div className="text-xl leading-relaxed font-sans text-slate-800">
      {tokens.map((token, idx) => (
        <span key={idx}>
          <strong className={`font-extrabold ${orpColor}`}>{token.prefix}</strong>
          <span>{token.suffix}</span>
        </span>
      ))}
    </div>
  );
};
