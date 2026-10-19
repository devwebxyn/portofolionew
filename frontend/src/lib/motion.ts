import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const stagger = (delay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;

/* Word-by-word reveal (used by <WordReveal/>) */
export const wordReveal: Variants = {
  hidden: { y: "115%", rotate: 2 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/* Clip-path wipe reveal for panels */
export const wipeUp: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: EASE },
  },
};
