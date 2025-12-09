// hooks/useScrollAnimation.ts
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options = {}) {
    const elementRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Opzionale: smetti di osservare dopo la prima apparizione
                    if (elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            },
            {
                threshold: 0.1, // Trigger quando 10% dell'elemento è visibile
                ...options,
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return { elementRef, isVisible };
}
