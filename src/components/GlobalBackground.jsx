import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Zap, Shield, Smartphone } from 'lucide-react';
import { SiFlutter, SiDart } from 'react-icons/si';

const FloatingCard = ({ icon: Icon, label, techLabel, x, y, delay, color, scrollYProgress, tiltX, tiltY, shouldReduceMotion }) => {
  // Parallax scroll drift (mid-background depth)
  const parallaxY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [60, -180]);

  // Combine scroll parallax and mouse tilt (cards are in the midground, so they move slightly more than heavy icons)
  const combinedX = useTransform(tiltX, (tx) => shouldReduceMotion ? 0 : tx * 1.25);
  const combinedY = useTransform([parallaxY, tiltY], ([py, ty]) => shouldReduceMotion ? py : py + ty * 1.25);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.35, 0.75, 0.35],
        y: [0, -25, 0],
        rotate: [0, 6, 0]
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      style={{ 
        left: x, 
        top: y, 
        x: combinedX,
        y: combinedY,
        borderColor: `${color}25`,
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 16px ${color}15`,
        willChange: 'transform, opacity'
      }}
      className="absolute hidden lg:flex items-center gap-3 px-4 py-2.5 glass border rounded-2xl pointer-events-none transition-shadow duration-300"
    >
      <div 
        className="w-9 h-9 rounded-xl flex items-center justify-center relative"
        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
      >
        <Icon size={18} style={{ color, filter: `drop-shadow(0 0 6px ${color}80)` }} aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">{label}</span>
        {/* Micro tech label */}
        <span className="text-[8px] font-mono text-white/30 tracking-wider flex items-center gap-1.5 mt-0.5">
          <span className="w-1 h-1 rounded-full bg-current" style={{ color }} />
          {techLabel}
        </span>
      </div>
    </motion.div>
  );
};

const mouseSpringConfig = { damping: 35, stiffness: 100 }; // softer spring for mouse tilt

const GlobalBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, mouseSpringConfig);
  const smoothY = useSpring(mouseY, mouseSpringConfig);

  const [winSize, setWinSize] = useState({ width: 1920, height: 1080 });
  const canvasRef = useRef(null);
  const mouseMoved = useRef(false);

  const { scrollYProgress } = useScroll(); // tracks the entire page scroll progress

  // Interactive radial gradient following the mouse
  const bgGradient = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.1) 0%, transparent 45%)`
  );

  // Background scale pulsing/expanding slightly on scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.15]);

  // Heavy icons parallax drift over the entire page scroll (far-background depth)
  const flutterIconY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [120, -360]);
  const dartIconY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-120, 360]);

  // Compute 3D tilt values based on screen size and cursor coordinates
  // Negative factors create a parallax feel (background moves opposite to mouse)
  const tiltX = useTransform(smoothX, (x) => (x - winSize.width / 2) * -0.015);
  const tiltY = useTransform(smoothY, (y) => (y - winSize.height / 2) * -0.015);

  const flutterCombinedX = useTransform(tiltX, (tx) => shouldReduceMotion ? 0 : tx);
  const flutterCombinedY = useTransform([flutterIconY, tiltY], ([fy, ty]) => shouldReduceMotion ? fy : fy + ty);

  const dartCombinedX = useTransform(tiltX, (tx) => shouldReduceMotion ? 0 : tx * 0.85);
  const dartCombinedY = useTransform([dartIconY, tiltY], ([dy, ty]) => shouldReduceMotion ? dy : dy + ty * 0.85);

  useEffect(() => {
    const handleResize = () => {
      setWinSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mouseMoved.current = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Canvas particle system logic
  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 25 : 85;

    const ripple = {
      x: 0,
      y: 0,
      radius: 0,
      maxRadius: 260,
      active: false,
      speed: 7
    };

    const beams = [];
    const maxBeams = 3;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.6;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
      }

      update(mX, mY) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse avoidance/pull
        if (mouseMoved.current) {
          const dx = mX - this.x;
          const dy = mY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 160;

          if (dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            this.x -= (dx / dist) * force * 0.8;
            this.y -= (dy / dist) * force * 0.8;
          }
        }

        // Click ripple effect
        if (ripple.active) {
          const rdx = this.x - ripple.x;
          const rdy = this.y - ripple.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          if (Math.abs(rdist - ripple.radius) < 30) {
            const force = (1 - ripple.radius / ripple.maxRadius) * 4.5;
            const angle = Math.atan2(rdy, rdx);
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    function spawnBeam() {
      if (beams.length >= maxBeams) return;
      const isHorizontal = Math.random() > 0.5;
      const speed = Math.random() * 8 + 12;
      const length = Math.random() * 120 + 80;
      const color = Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.35)' : 'rgba(6, 182, 212, 0.35)';

      if (isHorizontal) {
        const gridCount = Math.ceil(height / 50);
        const gridIndex = Math.floor(Math.random() * gridCount);
        const coord = gridIndex * 50;
        beams.push({
          dir: 'horizontal',
          pos: -length,
          coord,
          speed,
          length,
          color
        });
      } else {
        const gridCount = Math.ceil(width / 50);
        const gridIndex = Math.floor(Math.random() * gridCount);
        const coord = gridIndex * 50;
        beams.push({
          dir: 'vertical',
          pos: -length,
          coord,
          speed,
          length,
          color
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const currentMouseX = smoothX.get();
      const currentMouseY = smoothY.get();

      // Render & update particles
      particles.forEach((p) => {
        p.update(currentMouseX, currentMouseY);
        p.draw();
      });

      // Render constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color === '#6366f1' ? `rgba(99, 102, 241, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Cursor connections
        if (mouseMoved.current) {
          const mdx = currentMouseX - p1.x;
          const mdy = currentMouseY - p1.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 160) {
            const alpha = (1 - mdist / 160) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(currentMouseX, currentMouseY);

            const grad = ctx.createLinearGradient(p1.x, p1.y, currentMouseX, currentMouseY);
            grad.addColorStop(0, p1.color === '#6366f1' ? `rgba(99, 102, 241, ${alpha * 0.5})` : `rgba(6, 182, 212, ${alpha * 0.5})`);
            grad.addColorStop(1, p1.color === '#6366f1' ? `rgba(6, 182, 212, ${alpha})` : `rgba(99, 102, 241, ${alpha})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Spawn and draw cyber-beams
      if (Math.random() < 0.006) {
        spawnBeam();
      }

      ctx.globalAlpha = 1;
      for (let i = beams.length - 1; i >= 0; i--) {
        const b = beams[i];
        b.pos += b.speed;

        if (b.pos - b.length > (b.dir === 'horizontal' ? width : height)) {
          beams.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        let grad;
        if (b.dir === 'horizontal') {
          grad = ctx.createLinearGradient(b.pos - b.length, b.coord, b.pos, b.coord);
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(0.7, b.color);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.85)');
          ctx.moveTo(b.pos - b.length, b.coord);
          ctx.lineTo(b.pos, b.coord);
        } else {
          grad = ctx.createLinearGradient(b.coord, b.pos - b.length, b.coord, b.pos);
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(0.7, b.color);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.85)');
          ctx.moveTo(b.coord, b.pos - b.length);
          ctx.lineTo(b.coord, b.pos);
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Render click ripple
      if (ripple.active) {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - ripple.radius / ripple.maxRadius) * 0.3})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
        
        ripple.radius += ripple.speed;
        if (ripple.radius > ripple.maxRadius) {
          ripple.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleWindowClick = (e) => {
      ripple.x = e.clientX;
      ripple.y = e.clientY;
      ripple.radius = 0;
      ripple.active = true;
    };

    const handleCanvasResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('click', handleWindowClick);
    window.addEventListener('resize', handleCanvasResize);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('resize', handleCanvasResize);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-dark">
      {/* Background Interactive Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none animate-pulse-glow"
        style={{ scale: bgScale, background: bgGradient, willChange: 'transform' }}
      />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Aurora fluid blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/20 blur-[130px]"
          animate={shouldReduceMotion ? {} : {
            x: [0, 80, -40, 0],
            y: [0, -100, 60, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[120px]"
          animate={shouldReduceMotion ? {} : {
            x: [0, -100, 70, 0],
            y: [0, 70, -90, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ bottom: '15%', right: '10%' }}
        />
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[140px]"
          animate={shouldReduceMotion ? {} : {
            x: [0, 60, -50, 0],
            y: [0, 80, -70, 0],
            scale: [1, 1.05, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Interactive canvas constellation overlay */}
      {!shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}

      {/* Cinematic Asset Drifting (Floating Cards) */}
      <FloatingCard 
        icon={Zap} 
        label="Performance" 
        techLabel="[FPS: 120]"
        x="18%" 
        y="26%" 
        delay={0} 
        color="#6366f1" 
        scrollYProgress={scrollYProgress} 
        tiltX={tiltX}
        tiltY={tiltY}
        shouldReduceMotion={shouldReduceMotion} 
      />
      <FloatingCard 
        icon={Shield} 
        label="Security" 
        techLabel="[SSL: ACTIVE]"
        x="74%" 
        y="38%" 
        delay={1} 
        color="#06b6d4" 
        scrollYProgress={scrollYProgress} 
        tiltX={tiltX}
        tiltY={tiltY}
        shouldReduceMotion={shouldReduceMotion} 
      />
      <FloatingCard 
        icon={Smartphone} 
        label="Experience" 
        techLabel="[UI: 60FPS]"
        x="22%" 
        y="68%" 
        delay={2} 
        color="#8b5cf6" 
        scrollYProgress={scrollYProgress} 
        tiltX={tiltX}
        tiltY={tiltY}
        shouldReduceMotion={shouldReduceMotion} 
      />

      {/* SVG Gradient Definitions for Icons */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="flutterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#02569B" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0175C2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#13B9FD" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="dartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#01579B" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#00B0FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Heavy Icons */}
      <motion.div
        style={{ x: flutterCombinedX, y: flutterCombinedY, willChange: 'transform' }}
        animate={shouldReduceMotion ? {} : { rotate: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 32px rgba(99, 102, 241, 0.45))' }}
        className="absolute top-[15%] right-[6%] hidden xl:flex items-center justify-center pointer-events-auto cursor-pointer group"
        aria-hidden="true"
      >
        {/* Futuristic Holographic HUD Container */}
        <div className="absolute w-[260px] h-[260px] flex items-center justify-center pointer-events-none">
          {/* Outer Dashed Tech Circle */}
          <div className="absolute w-full h-full rounded-full border border-dashed border-primary/10 animate-[spin_40s_linear_infinite] group-hover:animate-[spin_12s_linear_infinite]" />
          {/* Inner Thin Border Circle */}
          <div className="absolute w-[85%] h-[85%] rounded-full border border-primary/5 animate-[spin_25s_linear_infinite_reverse] group-hover:animate-[spin_8s_linear_infinite_reverse]" />
          
          {/* SVG Concentric Radar HUD */}
          <svg className="absolute w-[280px] h-[280px] animate-[spin_60s_linear_infinite] group-hover:animate-[spin_15s_linear_infinite] opacity-40 text-primary/30" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="30 150" />
            <path d="M 100 8 L 100 13 M 100 187 L 100 192 M 8 100 L 13 100 M 187 100 L 192 100" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* SVG Rotating Code Ring */}
          <svg className="absolute w-[240px] h-[240px] animate-[spin_30s_linear_infinite_reverse] group-hover:animate-[spin_10s_linear_infinite_reverse] opacity-35 text-primary/70" viewBox="0 0 200 200">
            <defs>
              <path id="textPathFlutter" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
            </defs>
            <text className="text-[6.5px] font-mono fill-current uppercase tracking-[0.22em]">
              <textPath href="#textPathFlutter">
                FLUTTER ENGINE • RENDER PIPELINE • MAHMOUD MAGDY • SYSTEM ACTIVE • 
              </textPath>
            </text>
          </svg>

          {/* Inner Tech Crosshair */}
          <div className="absolute w-[95%] h-[95%] rounded-full border border-primary/5 flex items-center justify-center opacity-30">
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
            <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          
          {/* Orbiting Tech Node */}
          <div className="absolute w-full h-full animate-[spin_12s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_#6366f1]" />
          </div>
        </div>

        {/* Subtle Inner Glow */}
        <div className="absolute w-[180px] h-[180px] rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
        
        <SiFlutter size={150} style={{ fill: 'url(#flutterGradient)', filter: 'drop-shadow(0 0 24px rgba(99, 102, 241, 0.2))' }} className="transition-all duration-500 group-hover:filter-[drop-shadow(0_0_36px_rgba(99,102,241,0.4))]" />
      </motion.div>

      <motion.div
        style={{ x: dartCombinedX, y: dartCombinedY, willChange: 'transform' }}
        animate={shouldReduceMotion ? {} : { rotate: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 32px rgba(6, 182, 212, 0.45))' }}
        className="absolute bottom-[15%] left-[6%] hidden xl:flex items-center justify-center pointer-events-auto cursor-pointer group"
        aria-hidden="true"
      >
        {/* Futuristic Holographic HUD Container */}
        <div className="absolute w-[230px] h-[230px] flex items-center justify-center pointer-events-none">
          {/* Outer Dashed Tech Circle */}
          <div className="absolute w-full h-full rounded-full border border-dashed border-secondary/10 animate-[spin_45s_linear_infinite_reverse] group-hover:animate-[spin_14s_linear_infinite_reverse]" />
          {/* Inner Thin Border Circle */}
          <div className="absolute w-[85%] h-[85%] rounded-full border border-secondary/5 animate-[spin_30s_linear_infinite] group-hover:animate-[spin_9s_linear_infinite]" />
          
          {/* SVG Concentric Radar HUD */}
          <svg className="absolute w-[250px] h-[250px] animate-[spin_50s_linear_infinite_reverse] group-hover:animate-[spin_13s_linear_infinite_reverse] opacity-40 text-secondary/30" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="40 140" />
            <path d="M 100 8 L 100 13 M 100 187 L 100 192 M 8 100 L 13 100 M 187 100 L 192 100" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* SVG Rotating Code Ring */}
          <svg className="absolute w-[210px] h-[210px] animate-[spin_35s_linear_infinite] group-hover:animate-[spin_11s_linear_infinite] opacity-35 text-secondary/70" viewBox="0 0 200 200">
            <defs>
              <path id="textPathDart" d="M 100, 100 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
            </defs>
            <text className="text-[6.5px] font-mono fill-current uppercase tracking-[0.25em]">
              <textPath href="#textPathDart">
                DART COMPILER • AOT STREAM • ASYNC ISOLATE • CORE RUNTIME • 
              </textPath>
            </text>
          </svg>

          {/* Inner Tech Crosshair */}
          <div className="absolute w-[95%] h-[95%] rounded-full border border-secondary/5 flex items-center justify-center opacity-30">
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
            <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
          </div>
          
          {/* Orbiting Tech Node */}
          <div className="absolute w-full h-full animate-[spin_15s_linear_infinite_reverse] group-hover:animate-[spin_5s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_10px_#06b6d4]" />
          </div>
        </div>

        {/* Subtle Inner Glow */}
        <div className="absolute w-[160px] h-[160px] rounded-full bg-secondary/5 blur-2xl transition-all duration-500 group-hover:bg-secondary/10" />
        
        <SiDart size={130} style={{ fill: 'url(#dartGradient)', filter: 'drop-shadow(0 0 24px rgba(6, 182, 212, 0.2))' }} className="transition-all duration-500 group-hover:filter-[drop-shadow(0_0_36px_rgba(6,182,212,0.4))]" />
      </motion.div>
    </div>
  );
};

export default GlobalBackground;
