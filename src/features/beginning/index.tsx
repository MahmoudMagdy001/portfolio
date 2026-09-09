import { useRef, type FC } from 'react';
import { useIsDesktop } from '../../hooks';
import { storyParagraphs } from './data/beginningData';
import { gsap, useGSAP } from '../../lib/gsap';

const BeginningMobile: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.story-mobile-card');
    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="beginning" className="relative bg-transparent py-20 px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-5" />
      </div>
      <div className="container mx-auto max-w-3xl relative z-10">
        <h2 className="chapter-label text-center mb-12">
          Chapter 02 — The Prologue
        </h2>
        <div className="space-y-16">
          {storyParagraphs.map((para) => (
            <div
              key={para.id}
              className="story-mobile-card text-center px-4"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {para.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeginningDesktop: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cards = gsap.utils.toArray<HTMLElement>('.story-desktop-card');
    if (cards.length === 0) return;

    if (prefersReducedMotion) {
      cards.forEach((c, idx) => {
        gsap.set(c, { opacity: idx === 0 ? 1 : 0 });
      });
      return;
    }

    // Set initial state: card 0 is visible, all others hidden below
    cards.forEach((card, i) => {
      gsap.set(card, {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 40,
        scale: i === 0 ? 1 : 0.96,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: containerRef.current,
        scrub: 1,
      },
    });

    // Animate each paragraph step
    cards.forEach((card, i) => {
      if (i > 0) {
        // Fade out previous card
        tl.to(cards[i - 1], {
          opacity: 0,
          y: -40,
          scale: 1.04,
          duration: 0.6,
          ease: 'power2.inOut',
        });
        // Fade in current card
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '<+=0.2'
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="beginning" className="relative bg-transparent">
      <div 
        ref={containerRef}
        className="h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[160px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[200px]" />
          </div>
          <div className="absolute inset-0 grid-pattern opacity-10" />
        </div>

        <div className="container-safe relative z-10 w-full">
          <h2 className="chapter-label text-center mb-12">
            Chapter 02 — The Prologue
          </h2>

          <div className="relative h-[40vh] flex items-center justify-center max-w-4xl mx-auto">
            {storyParagraphs.map((para) => (
              <div
                key={para.id}
                className="story-desktop-card absolute inset-x-0 text-center px-4"
                style={{ willChange: 'transform, opacity' }}
              >
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {para.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Beginning: FC = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <BeginningDesktop /> : <BeginningMobile />;
};

export default Beginning;
