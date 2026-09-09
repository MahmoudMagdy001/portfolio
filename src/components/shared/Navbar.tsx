import { useState, useEffect, useRef, type FC } from 'react';
import { useMagneticEffect, useActiveSection } from '../../hooks';
import { CV_URL } from '../../constants';
import { gsap, useGSAP } from '../../lib/gsap';

interface NavItem {
  label: string;
  href: string;
}

const navItems: readonly NavItem[] = [
  { label: 'Story',    href: '#beginning' },
  { label: 'Journey',  href: '#journey' },
  { label: 'Mobile',   href: '#projects' },
  { label: 'Web',      href: '#web-projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
];

const sectionIds: readonly string[] = ['beginning', 'journey', 'projects', 'web-projects', 'services', 'contact'];

const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { activeSection } = useActiveSection(sectionIds);
  const { ref: logoRef } = useMagneticEffect<HTMLAnchorElement>(0.25);
  const { ref: hireRef } = useMagneticEffect<HTMLAnchorElement>(0.2);

  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Initial nav entrance (clean fade-in without vertical displacement that causes clipping)
    gsap.fromTo(
      navRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
        clearProps: 'opacity',
      }
    );

    // Scroll progress bar scrub across full document height
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.2,
        },
      });
    }
  }, { scope: navRef });

  // Animate mobile menu open/close with GSAP
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape key press (A11y / UX)
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    if (window.location.hash.startsWith('#/project/')) {
      window.location.assign(href);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar (GSAP scaleX) */}
      <div
        ref={progressRef}
        className="scroll-progress fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent z-[100] origin-left scale-x-0"
        aria-hidden="true"
      />

      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
          scrolled ? 'top-4 px-4' : 'top-0 px-0'
        }`}
      >
        <div
          className={`w-full transition-all duration-300 relative ${
            scrolled
              ? 'glass-strong rounded-full px-5 md:px-7 py-2.5 shadow-2xl border border-primary/15 max-w-5xl'
              : 'mx-auto max-w-[1440px] px-6 xl:px-32 py-4 border-b border-white/[0.03] bg-dark/10 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Logo with GSAP Magnetic Effect */}
            <a
              ref={logoRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.hash.startsWith('#/project/')) {
                  window.location.hash = '#';
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-0.5 flex-shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label="Back to top"
            >
              <span>M</span>
              <span className="text-primary relative inline-block" aria-hidden="true">
                .
                <span className="absolute inset-0 bg-primary/50 blur-[2px] rounded-full animate-pulse-glow" />
              </span>
            </a>

            {/* Desktop Navigation Items */}
            <div
              className="hidden md:flex items-center gap-1 p-1 bg-white/[0.02] border border-white/[0.04] rounded-full backdrop-blur-md relative flex-shrink-0"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                const isHovered = hoveredItem === item.href;

                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    className={`relative px-3.5 lg:px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full whitespace-nowrap active:scale-95 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full -z-10 shadow-lg shadow-primary/5 transition-all duration-300"
                      />
                    )}
                    {isHovered && !isActive && (
                      <div
                        className="absolute inset-0 bg-white/5 border border-white/[0.03] rounded-full -z-10 transition-all duration-200"
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* CTA & Mobile Hamburger */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <a
                ref={hireRef}
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block text-center relative px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-bold tracking-wider uppercase overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 group whitespace-nowrap active:scale-95"
              >
                <span className="relative z-10">Hire Me</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <span className="absolute -inset-px rounded-full bg-gradient-to-r from-primary-light to-secondary opacity-0 group-hover:opacity-40 blur-[2px] transition-opacity duration-300 -z-10" aria-hidden="true" />
              </a>

              {/* Hamburger Button */}
              <button
                className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2.5 z-50 relative rounded-full hover:bg-white/5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                <span
                  className={`w-6 h-0.5 bg-white block transition-transform duration-300 origin-center ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white block transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-white block transition-transform duration-300 origin-center ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <>
              <div
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
                aria-hidden="true"
              />
              <div
                ref={mobileMenuRef}
                id="mobile-nav-menu"
                className="absolute top-full left-0 right-0 mt-3 mx-auto w-full glass-strong rounded-2xl overflow-hidden shadow-2xl border border-primary/10 z-40"
              >
                <div className="flex flex-col p-6 gap-3">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <button
                        key={item.href}
                        onClick={() => scrollTo(item.href)}
                        className={`text-left text-base font-medium py-4 px-6 rounded-xl transition-all duration-300 border-l-2 flex items-center justify-between ${
                          isActive
                            ? 'bg-primary/10 border-primary text-white font-semibold'
                            : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}

                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center mt-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
