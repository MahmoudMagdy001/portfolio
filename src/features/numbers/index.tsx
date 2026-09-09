import { useRef, type FC } from 'react';
import { stats } from './data/numbersData';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';

const Numbers: FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cards = gsap.utils.toArray<HTMLElement>('.counter-card-item');

    if (prefersReducedMotion) {
      cards.forEach((card, idx) => {
        const numEl = card.querySelector('.counter-value');
        if (numEl) numEl.textContent = stats[idx].value.toLocaleString();
      });
      return;
    }

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.numbers-header', {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
        });

        cards.forEach((card, idx) => {
          gsap.from(card, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            delay: idx * 0.1,
            ease: 'power2.out',
          });

          const counterObj = { val: 0 };
          const targetVal = stats[idx].value;

          gsap.to(counterObj, {
            val: targetVal,
            duration: 2,
            delay: idx * 0.12,
            ease: 'power2.out',
            onUpdate: () => {
              const numEl = card.querySelector('.counter-value');
              if (numEl) {
                numEl.textContent = Math.floor(counterObj.val).toLocaleString();
              }
            },
          });
        });
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="numbers" className="relative py-24 md:py-32 px-6 bg-transparent overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-safe relative z-10">
        <div className="text-center mb-16">
          <p className="numbers-header chapter-label mb-6">
            Chapter 07 — The Numbers
          </p>
          <div className="overflow-hidden">
            <h2 className="numbers-header text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              Impact in <span className="gradient-text">numbers.</span>
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="counter-card-item h-full">
              <div className="glass-card rounded-3xl p-8 md:p-10 text-center group hover:ring-1 hover:ring-primary/30 transition-all duration-500 hover:-translate-y-2 h-full cursor-default">
                <div className="mb-4">
                  <span className="counter-value text-5xl md:text-7xl font-bold gradient-text font-display">
                    0
                  </span>
                  <span className="text-3xl md:text-5xl font-bold text-primary">{stat.suffix}</span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {stat.label}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{stat.description}</p>

                <div className="mt-6 h-0.5 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary w-[40%] group-hover:w-[60%] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numbers;
