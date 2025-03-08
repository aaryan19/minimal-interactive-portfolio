
import { useEffect, useRef } from 'react';

interface ParallaxEffectProps {
  speed?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
  children: React.ReactNode;
}

const ParallaxEffect = ({
  speed = 0.05,
  direction = 'both',
  className = '',
  children
}: ParallaxEffectProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef({ top: 0, left: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Store initial position
    const rect = element.getBoundingClientRect();
    initialPositionRef.current = {
      top: rect.top,
      left: rect.left
    };
    
    const handleScroll = () => {
      if (!element) return;
      
      const scrollY = window.scrollY;
      
      if (direction === 'vertical' || direction === 'both') {
        element.style.transform = `translateY(${scrollY * speed}px)`;
      } else if (direction === 'horizontal') {
        element.style.transform = `translateX(${scrollY * speed}px)`;
      } else if (direction === 'both') {
        element.style.transform = `translate(${scrollY * speed}px, ${scrollY * speed}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxEffect;
