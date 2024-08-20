import React, { useEffect, useState } from 'react';
import './AccessibilityWidget.css';

const AccessibilityWidget = ({ position = "bottom-right", primaryColor = "#3498db" }) => {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
    document.body.style.fontSize = `${fontSize + 2}px`;
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
    document.body.style.fontSize = `${fontSize - 2}px`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
    if (!dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  };

  const increaseLetterSpacing = () => {
    setLetterSpacing((prevSpacing) => prevSpacing + 0.05);
    document.body.style.letterSpacing = `${letterSpacing + 0.05}em`;
  };

  const decreaseLetterSpacing = () => {
    setLetterSpacing((prevSpacing) => (prevSpacing > 0 ? prevSpacing - 0.05 : 0));
    document.body.style.letterSpacing = `${letterSpacing - 0.05 >= 0 ? letterSpacing - 0.05 : 0}em`;
  };

  const increaseWordSpacing = () => {
    setWordSpacing((prevSpacing) => prevSpacing + 0.1);
    document.body.style.wordSpacing = `${wordSpacing + 0.1}em`;
  };

  const decreaseWordSpacing = () => {
    setWordSpacing((prevSpacing) => (prevSpacing > 0 ? prevSpacing - 0.1 : 0));
    document.body.style.wordSpacing = `${wordSpacing - 0.1 >= 0 ? wordSpacing - 0.1 : 0}em`;
  };

  const increaseLineHeight = () => {
    setLineHeight((prevHeight) => prevHeight + 0.1);
    document.body.style.lineHeight = `${lineHeight + 0.1}`;
  };

  const decreaseLineHeight = () => {
    setLineHeight((prevHeight) => (prevHeight > 1.2 ? prevHeight - 0.1 : 1.2));
    document.body.style.lineHeight = `${lineHeight - 0.1 >= 1.2 ? lineHeight - 0.1 : 1.2}`;
  };

  return (
    <div className={`accessibility-widget ${position}`}>
      <button onClick={toggleCollapse} style={{ backgroundColor: primaryColor }}>
        {isCollapsed ? '☰ Open Accessibility' : '✕ Close Accessibility'}
      </button>
      {!isCollapsed && (
        <div className="widget-controls">
          <button onClick={increaseFontSize} style={{ backgroundColor: primaryColor }}>A+</button>
          <button onClick={decreaseFontSize} style={{ backgroundColor: primaryColor }}>A-</button>
          <button onClick={toggleHighContrast} style={{ backgroundColor: primaryColor }}>
            {highContrast ? 'Normal Contrast' : 'High Contrast'}
          </button>
          <button onClick={toggleDyslexiaFont} style={{ backgroundColor: primaryColor }}>
            {dyslexiaFont ? 'Normal Font' : 'Dyslexia Font'}
          </button>
          <button onClick={increaseLetterSpacing} style={{ backgroundColor: primaryColor }}>Increase Letter Spacing</button>
          <button onClick={decreaseLetterSpacing} style={{ backgroundColor: primaryColor }}>Decrease Letter Spacing</button>
          <button onClick={increaseWordSpacing} style={{ backgroundColor: primaryColor }}>Increase Word Spacing</button>
          <button onClick={decreaseWordSpacing} style={{ backgroundColor: primaryColor }}>Decrease Word Spacing</button>
          <button onClick={increaseLineHeight} style={{ backgroundColor: primaryColor }}>Increase Line Height</button>
          <button onClick={decreaseLineHeight} style={{ backgroundColor: primaryColor }}>Decrease Line Height</button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;
