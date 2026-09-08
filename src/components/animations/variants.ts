import type { Variants, Transition, TargetAndTransition } from 'framer-motion';

// ponytail: shared Framer Motion variants — hoist here to avoid per-file duplication

/** Standard fade-up entry: use with whileInView on section content */
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

/** Card hover lift — hoist outside components to avoid object allocation per render */
export const cardHoverVariant: TargetAndTransition = { y: -6 };
export const cardTapVariant: TargetAndTransition   = { scale: 0.98 };
export const cardTransition: Transition            = { duration: 0.3 };

/** Role text cycle (Hero) */
export const roleTransition: Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

/** Scroll indicator bounce */
export const scrollIndicatorTransition: Transition = { duration: 2, repeat: Infinity };

/** Standard viewport settings */
export const viewportOnce = { once: true } as const;
export const viewportOnceMargin = { once: true, margin: '-10%' } as const;
