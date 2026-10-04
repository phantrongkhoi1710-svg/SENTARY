import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text?: string;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

export const MathText: React.FC<MathTextProps> = ({ text = '', className = '', as: Component = 'span' }) => {
  if (!text) return null;

  // Split by $$ for display math first, then by $ for inline math
  const renderFormatted = (content: string) => {
    if (!content) return null;

    // Pattern to catch $$...$$ or $...$
    // Using regex with non-greedy match
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    const parts = content.split(regex);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        try {
          const html = katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
            strict: false,
          });
          return (
            <span
              key={index}
              className="block my-2 overflow-x-auto text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <span key={index} className="font-mono text-red-600">{part}</span>;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        try {
          const html = katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
            strict: false,
          });
          return (
            <span
              key={index}
              className="inline-block px-0.5 align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <span key={index} className="font-mono text-red-600">{part}</span>;
        }
      }

      // Plain text parts: preserve newlines
      return (
        <React.Fragment key={index}>
          {part.split('\n').map((line, lIdx, arr) => (
            <React.Fragment key={lIdx}>
              {line}
              {lIdx < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    });
  };

  return <Component className={className}>{renderFormatted(text)}</Component>;
};

export default MathText;
