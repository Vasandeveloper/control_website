import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  block?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', block = false }) => {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // Check if the whole string is meant to be a single block math formula
    if (block) {
      try {
        const html = katex.renderToString(text, {
          displayMode: true,
          throwOnError: false,
        });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
      } catch (e) {
        return <span className="font-mono text-amber-400">{text}</span>;
      }
    }

    // Split text by display math ($$...$$) and inline math ($...$)
    // Regex matches $$...$$ or $...$
    const tokens: React.ReactNode[] = [];
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      // Plain text before the formula
      if (matchIndex > lastIndex) {
        tokens.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, matchIndex)}
          </span>
        );
      }

      const matchStr = match[0];
      const isDisplay = matchStr.startsWith('$$') && matchStr.endsWith('$$');
      const formula = isDisplay
        ? matchStr.slice(2, -2).trim()
        : matchStr.slice(1, -1).trim();

      try {
        const html = katex.renderToString(formula, {
          displayMode: isDisplay,
          throwOnError: false,
        });
        tokens.push(
          <span
            key={`math-${matchIndex}`}
            className={isDisplay ? 'block my-2 overflow-x-auto text-center' : 'inline-block mx-0.5'}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (err) {
        tokens.push(
          <span key={`fallback-${matchIndex}`} className="font-mono text-amber-300">
            {matchStr}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Trailing text after the last formula
    if (lastIndex < text.length) {
      tokens.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return tokens;
  }, [text, block]);

  return <span className={`inline-math-container leading-relaxed ${className}`}>{renderedContent}</span>;
};

