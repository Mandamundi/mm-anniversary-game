function typewriterEffect(elementId, text, callback) {
  const element = document.getElementById(elementId);
  element.textContent = '';
  element.dataset.fullText = text;
  let charIndex = 0;
  const typingSpeed = 50;

  function typeNextChar() {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      if (charIndex % 2 === 0) { playSound('typing'); }
      charIndex++;
      setTimeout(typeNextChar, typingSpeed);
    } else {
      if (callback && typeof callback === 'function') callback();
    }
  }

  typeNextChar();
}

function enableSkipTypewriter(elementId) {
  const element = document.getElementById(elementId);
  function skipHandler() {
    const fullText = element.dataset.fullText;
    if (fullText) {
      element.textContent = fullText;
      element.removeEventListener('click', skipHandler);
    }
  }
  element.addEventListener('click', skipHandler);
}

