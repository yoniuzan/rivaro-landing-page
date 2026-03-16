import React, { useState, useEffect } from 'react';
import { Typography, Flex } from '@components/base';
import styles from './AccessibilityWidget.module.css';

export interface AccessibilityWidgetProps {
  className?: string;
}

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
}

export const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    grayscale: false,
    underlineLinks: false,
  });

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('rivaro-accessibility');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch (e) {
        console.error('Failed to load accessibility settings');
      }
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${newSettings.fontSize}%`;
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Grayscale
    if (newSettings.grayscale) {
      root.classList.add('grayscale');
    } else {
      root.classList.remove('grayscale');
    }
    
    // Underline links
    if (newSettings.underlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }
    
    // Save to localStorage
    localStorage.setItem('rivaro-accessibility', JSON.stringify(newSettings));
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      updateSetting('fontSize', settings.fontSize + 10);
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSetting('fontSize', settings.fontSize - 10);
    }
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 100,
      highContrast: false,
      grayscale: false,
      underlineLinks: false,
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.accessibilityButton} ${className}`}
        aria-label="פתח תפריט נגישות"
        aria-expanded={isOpen}
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label="תפריט נגישות">
          <div className={styles.panelHeader}>
            <Typography variant="h6" weight="normal" className={styles.panelTitle}>
              נגישות
            </Typography>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="סגור תפריט נגישות"
            >
              ✕
            </button>
          </div>

          <Flex direction="column" gap={16} className={styles.panelContent}>
            {/* Font Size */}
            <div className={styles.control}>
              <Typography variant="body2" className={styles.controlLabel}>
                גודל טקסט
              </Typography>
              <Flex direction="row" gap={8} align="center">
                <button
                  onClick={decreaseFontSize}
                  className={styles.controlButton}
                  aria-label="הקטן טקסט"
                  disabled={settings.fontSize <= 80}
                >
                  A-
                </button>
                <Typography variant="body2" className={styles.fontSizeValue}>
                  {settings.fontSize}%
                </Typography>
                <button
                  onClick={increaseFontSize}
                  className={styles.controlButton}
                  aria-label="הגדל טקסט"
                  disabled={settings.fontSize >= 150}
                >
                  A+
                </button>
              </Flex>
            </div>

            {/* High Contrast */}
            <div className={styles.control}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => updateSetting('highContrast', e.target.checked)}
                  className={styles.checkbox}
                />
                <Typography variant="body2" className={styles.controlLabel}>
                  ניגודיות גבוהה
                </Typography>
              </label>
            </div>

            {/* Grayscale */}
            <div className={styles.control}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={settings.grayscale}
                  onChange={(e) => updateSetting('grayscale', e.target.checked)}
                  className={styles.checkbox}
                />
                <Typography variant="body2" className={styles.controlLabel}>
                  גווני אפור
                </Typography>
              </label>
            </div>

            {/* Underline Links */}
            <div className={styles.control}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={settings.underlineLinks}
                  onChange={(e) => updateSetting('underlineLinks', e.target.checked)}
                  className={styles.checkbox}
                />
                <Typography variant="body2" className={styles.controlLabel}>
                  הדגש קישורים
                </Typography>
              </label>
            </div>

            {/* Reset Button */}
            <button onClick={resetSettings} className={styles.resetButton}>
              <Typography variant="body2">
                איפוס הגדרות
              </Typography>
            </button>
          </Flex>
        </div>
      )}
    </>
  );
};
