/**
 * GSAP Animation Tokens and Constants
 * Curated from ui-ux-pro-max and gsap-react skills
 */

export const GSAP_EASE = {
  smooth: 'power2.out',
  cinematic: 'power3.out',
  snappy: 'power1.out',
  elastic: 'elastic.out(1, 0.4)',
  expo: 'expo.out',
} as const;

export const GSAP_DURATION = {
  micro: 0.2,
  quick: 0.35,
  standard: 0.6,
  cinematic: 0.9,
  slow: 1.4,
} as const;

export const roleTransitionDuration = 0.8;
