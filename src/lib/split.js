'use client';

/**
 * Lightweight text splitter (chars / words / lines) used for the
 * staggered reveal animations. Returns the created elements and a
 * revert() to restore the original markup.
 */
export function splitText(el, { type = 'chars' } = {}) {
  if (!el) return { chars: [], words: [], lines: [], revert: () => {} };
  const original = el.innerHTML;
  const text = el.textContent || '';
  const chars = [];
  const words = [];

  if (type === 'chars' || type === 'words,chars') {
    el.textContent = '';
    const wordTokens = text.split(/(\s+)/);
    wordTokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      [...token].forEach((ch) => {
        const c = document.createElement('span');
        c.className = 'split-char';
        c.textContent = ch;
        wordSpan.appendChild(c);
        chars.push(c);
      });
      el.appendChild(wordSpan);
      words.push(wordSpan);
    });
  } else if (type === 'words') {
    el.textContent = '';
    text.split(/(\s+)/).forEach((token) => {
      if (/^\s+$/.test(token)) {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const w = document.createElement('span');
      w.className = 'split-word';
      w.style.display = 'inline-block';
      w.style.overflow = 'hidden';
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = token;
      w.appendChild(inner);
      el.appendChild(w);
      words.push(inner);
    });
  }

  return {
    chars,
    words,
    lines: [],
    revert: () => {
      el.innerHTML = original;
    },
  };
}
