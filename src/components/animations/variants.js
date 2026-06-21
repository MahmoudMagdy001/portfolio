// ponytail: shared Framer Motion variants — hoist here to avoid per-file duplication

/** Standard fade-up entry: use with whileInView on section content */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

/** Card hover lift — hoist outside components to avoid object allocation per render */
export const cardHoverVariant = { y: -6 };
export const cardTapVariant   = { scale: 0.98 };
export const cardTransition   = { duration: 0.3 };

/** Role text cycle (Hero) */
export const roleTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

/** Scroll indicator bounce */
export const scrollIndicatorTransition = { duration: 2, repeat: Infinity };

/** Standard viewport settings */
export const viewportOnce = { once: true };
export const viewportOnceMargin = { once: true, margin: '-10%' };
