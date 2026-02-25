import { type ReactNode } from "react";
import { motion, type Transition, type Variants } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ------------------------------------------------------------------ */
/*  Shared easing — Apple-like cubic-bezier                           */
/* ------------------------------------------------------------------ */

const appleEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  ScrollReveal — single-element reveal                              */
/* ------------------------------------------------------------------ */

interface ScrollRevealProps {
    children: ReactNode;
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
    ease: appleEase,
};

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

/* ------------------------------------------------------------------ */
/*  StaggerReveal — container that staggers its children               */
/* ------------------------------------------------------------------ */

interface StaggerRevealProps {
    children: ReactNode;
    className?: string;
    /** Delay (seconds) before the first child starts animating. Default: 0.1 */
    delayChildren?: number;
    /** Gap (seconds) between each child's animation start. Default: 0.08 */
    staggerChildren?: number;
    /** IntersectionObserver threshold (0–1). Default: 0.15 */
    threshold?: number;
}

export function StaggerReveal({
    children,
    className,
    delayChildren = 0.1,
    staggerChildren = 0.08,
    threshold = 0.15,
}: StaggerRevealProps) {
    const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren,
                staggerChildren,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  StaggerItem — individual child inside a StaggerReveal             */
/* ------------------------------------------------------------------ */

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    /** Vertical offset (px). Default: 24 */
    offsetY?: number;
}

const itemVariants: Variants = {
    hidden: (offsetY: number) => ({
        opacity: 0,
        y: offsetY,
        scale: 0.95,
    }),
    visible: (_offsetY: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: appleEase,
            y: { duration: 0.5, ease: appleEase },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4, ease: appleEase },
        },
    }),
};

export function StaggerItem({
    children,
    className,
    offsetY = 24,
}: StaggerItemProps) {

    return (
        <motion.div
            variants={itemVariants}
            custom={offsetY}
            className={className}
        >
            {children}
        </motion.div>
    );
}
