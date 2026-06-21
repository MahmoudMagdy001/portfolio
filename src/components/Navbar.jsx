import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useMagneticEffect } from '../hooks/useAnimations';
import { useActiveSection } from '../hooks/useActiveSection';

const navItems = [
  { label: 'Story',    href: '#beginning' },
  { label: 'Journey',  href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
];

const sectionIds = ['beginning', 'journey', 'projects', 'services', 'skills', 'contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { scrollYProgress } = useScroll();
  const { activeSection } = useActiveSection(sectionIds);

  // M-2 fix: new hook signature returns { ref, x, y } MotionValues
  const { ref: logoRef, x: logoX, y: logoY } = useMagneticEffect(0.25);
  const { ref: hireRef, x: hireX, y: hireY } = useMagneticEffect(0.2);

  useEffect(() => {
    const onScroll = () => {
      const isAtTop    = window.scrollY <= 60;
      const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20;
      setScrolled(!isAtTop && !isAtBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    if (window.location.hash.startsWith('#/project/')) {
      window.location.hash = href;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled ? 'top-4 px-4' : 'top-0 w-full'
        }`}
      >
        <div
          className={`w-full transition-all duration-500 relative ${
            scrolled
              ? 'glass-strong rounded-full px-6 py-2.5 shadow-2xl border border-primary/10 max-w-4xl'
              : 'mx-auto max-w-[1440px] px-6 xl:px-32 py-4 border-b border-white/[0.03] bg-dark/10 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo — M-2: style receives MotionValues, no DOM style mutation */}
            <motion.a
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
              className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-0.5"
              style={{ x: logoX, y: logoY }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <span>M</span>
              <span className="text-primary relative inline-block" aria-hidden="true">
                .
                <span className="absolute inset-0 bg-primary/50 blur-[2px] rounded-full animate-pulse-glow" />
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div
              className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/[0.04] rounded-full backdrop-blur-md relative"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {navItems.map((item) => {
                const isActive  = activeSection === item.href.replace('#', '');
                const isHovered = hoveredItem === item.href;

                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    className={`relative px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 rounded-full ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-full -z-10 shadow-lg shadow-primary/5"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="hoverTab"
                        className="absolute inset-0 bg-white/5 border border-white/[0.03] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* CTA & Mobile hamburger */}
            <div className="flex items-center gap-4">
              <motion.a
                ref={hireRef}
                href="/Mahmoud_Magdy_Mansour_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ x: hireX, y: hireY }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block text-center relative px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-bold tracking-wider uppercase overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 group"
              >
                <span className="relative z-10">Hire Me</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <span className="absolute -inset-px rounded-full bg-gradient-to-r from-primary-light to-secondary opacity-0 group-hover:opacity-40 blur-[2px] transition-opacity duration-300 -z-10" aria-hidden="true" />
              </motion.a>

              {/* A-1: proper aria-label + aria-expanded on hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2.5 z-50 relative rounded-full hover:bg-white/5 transition-colors duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-menu"
              >
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-6 h-0.5 bg-white block origin-center"
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-6 h-0.5 bg-white block"
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-6 h-0.5 bg-white block origin-center"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-nav-menu"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-full left-0 right-0 mt-3 mx-auto w-full glass-strong rounded-2xl overflow-hidden shadow-2xl border border-primary/10 z-40"
              >
                <div className="flex flex-col p-6 gap-3">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <motion.button
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
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
                      </motion.button>
                    );
                  })}

                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    href="/Mahmoud_Magdy_Mansour_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center mt-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300"
                  >
                    Hire Me
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
