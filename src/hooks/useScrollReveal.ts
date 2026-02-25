import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
    /** Fraction of the element that must be visible (0–1). Default: 0.15 */
    threshold?: number;
    /** Fire only once, then disconnect the observer. Default: true */
    triggerOnce?: boolean;
    /** Root margin passed to IntersectionObserver. Default: "0px" */
    rootMargin?: string;
}

/**
 * Observes an element's intersection with the viewport and returns
 * whether it is (or has been) in view.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollRevealOptions = {},
) {
    const { threshold = 0.15, triggerOnce = true, rootMargin = "0px" } = options;

    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) observer.disconnect();
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, triggerOnce, rootMargin]);

    return { ref, isInView } as const;
}
