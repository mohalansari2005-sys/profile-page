import { type ReactNode } from "react";
import { motion, type Transition } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
    children: ReactNode;
    /** Extra class names forwarded to the wrapper div. */
    className?: string;
    /** Vertical offset (px) the element slides up from. Default: 40 */
    offsetY?: number;
    /** IntersectionObserver threshold (0–1). Default: 0.15 */
    threshold?: number;
    /** Custom framer-motion transition override. */
    transition?: Transition;
    /** When true, skips the scroll trigger — reveals immediately on mount. */
    immediate?: boolean;
}

const defaultTransition: Transition = {
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier — smooth Apple-like ease
};

/**
 * Wraps children in a `<motion.div>` that fades + slides into view
 * when the element enters the viewport (or immediately if `immediate` is set).
 */
export function ScrollReveal({
    children,
    className,
    offsetY = 40,
    threshold = 0.15,
    transition = defaultTransition,
    immediate = false,
}: ScrollRevealProps) {
    const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold });

    const shouldAnimate = immediate || isInView;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: offsetY }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: offsetY }}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    );
}
