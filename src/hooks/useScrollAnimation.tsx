
import { useEffect, useRef } from 'react';

interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = ({ threshold = 0.1, rootMargin = '0px' }: ScrollAnimationConfig = {}) => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold, rootMargin }
    );

    const currentElements = elementsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach((el) => observer.observe(el));

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
    };
  }, [threshold, rootMargin]);

  const addElement = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el;
  };

  return { addElement };
};

export default useScrollAnimation;
