import React, { useEffect, useRef, useState } from 'react';
import { Typography, Flex } from '@components/base';
import styles from './ProcessSection.module.css';

export interface ProcessSectionProps {
  className?: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ className = '' }) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const stepRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'פגישת ייעוץ ומדידות',
      description: 'הכרת הסגנון האישי ולקיחת מידות מדויקות.',
    },
    {
      number: '02',
      title: 'בחירת בדים וגזרות',
      description: 'בחירה מתוך קטלוג בדים איטלקיים ואיכותיים.',
    },
    {
      number: '03',
      title: 'התאמה אישית ודיוק',
      description: 'התאמת החליפה בדיוק מושלם לפי מידותיך.',
    },
    {
      number: '04',
      title: 'מדידה אחרונה ואיסוף',
      description: 'התאמות אחרונות עד לתוצאה המושלמת.',
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepNumber = entry.target.getAttribute('data-step-number');
          if (stepNumber) {
            setActiveStep(stepNumber);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    stepRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const setStepRef = (number: string) => (element: HTMLDivElement | null) => {
    if (element) {
      stepRefs.current.set(number, element);
    } else {
      stepRefs.current.delete(number);
    }
  };

  return (
    <section id="process" className={`${styles.processSection} ${className}`} aria-label="Craftsmanship process">
      <div className={styles.container}>
        <Flex direction="column" gap={48} align="center">
          <Flex direction="column" gap={12} align="center">
            <Typography 
              variant="h2" 
              color="text-primary"
              weight="light"
              align="center"
              className={styles.heading}
            >
              תהליך השירות
            </Typography>
            <Typography 
              variant="body1" 
              color="text-secondary"
              align="center"
              className={styles.subtext}
            >
              ארבעה שלבים להתאמה מושלמת
            </Typography>
          </Flex>

          <div className={styles.stepsWrapper}>
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div 
                  ref={setStepRef(step.number)}
                  data-step-number={step.number}
                  className={styles.step}
                >
                  <Flex direction="column" gap={16} align="center">
                    <div className={`${styles.stepNumber} ${activeStep === step.number ? styles['stepNumber--active'] : ''}`}>
                      <Typography 
                        variant="h3" 
                        weight="light"
                        className={styles.numberText}
                      >
                        {step.number}
                      </Typography>
                    </div>
                    <Typography 
                      variant="h5" 
                      weight="normal"
                      align="center"
                      className={styles.stepTitle}
                    >
                      {step.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text-secondary"
                      align="center"
                      className={styles.stepDescription}
                    >
                      {step.description}
                    </Typography>
                  </Flex>
                </div>
                {index < steps.length - 1 && (
                  <div className={styles.divider} aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Flex>
      </div>
    </section>
  );
};
