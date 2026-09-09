import { useEffect, useState, useRef, type FC, type ComponentType, type CSSProperties } from 'react';
import { Zap, Shield, Smartphone } from 'lucide-react';
import { SiFlutter, SiDart } from 'react-icons/si';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { gsap, useGSAP } from '../lib/gsap';

interface FloatingCardProps {
  icon: ComponentType<{ size?: number; style?: CSSProperties; className?: string }>;
  label: string;
  techLabel: string;
  x: string;
  y: string;
  delay: number;
  color: string;
}

const FloatingCard: FC<FloatingCardProps> = ({
  icon: Icon,
  label,
  techLabel,
  x,
  y,
  delay,
  color,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 0.5 });
      return;
    }

    // Floating idle animation
    gsap.to(el, {
      y: '-=20',
      rotation: 4,
      opacity: 0.75,
      duration: 5 + delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    });

    // Parallax scroll scrub
    gsap.to(el, {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      style={{
        left: x,
        top: y,
        borderColor: `${color}25`,
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 16px ${color}15`,
        willChange: 'transform, opacity',
      }}
      className="absolute hidden lg:flex items-center gap-3 px-4 py-2.5 glass border rounded-2xl pointer-events-none transition-shadow duration-300 opacity-40"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center relative"
        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
      >
        <Icon size={18} style={{ color, filter: `drop-shadow(0 0 6px ${color}80)` }} aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">{label}</span>
        <span className="text-[8px] font-mono text-white/30 tracking-wider flex items-center gap-1.5 mt-0.5">
          <span className="w-1 h-1 rounded-full bg-current" style={{ color }} />
          {techLabel}
        </span>
      </div>
    </div>
  );
};

interface WindowSize {
  width: number;
  height: number;
}

interface Beam {
  dir: 'horizontal' | 'vertical';
  pos: number;
  coord: number;
  speed: number;
  length: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  active: boolean;
}

const GlobalBackground: FC = () => {
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseGlowRef = useRef<HTMLDivElement | null>(null);
  const flutterRef = useRef<HTMLDivElement | null>(null);
  const dartRef = useRef<HTMLDivElement | null>(null);

  const [, setWinSize] = useState<WindowSize>({ width: 1920, height: 1080 });
  const mouseMoved = useRef<boolean>(false);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse glow follower
    if (mouseGlowRef.current && !prefersReducedMotion) {
      const glowX = gsap.quickTo(mouseGlowRef.current, 'x', { duration: 0.5, ease: 'power2.out' });
      const glowY = gsap.quickTo(mouseGlowRef.current, 'y', { duration: 0.5, ease: 'power2.out' });

      const onMouseMove = (e: MouseEvent) => {
        glowX(e.clientX - 250);
        glowY(e.clientY - 250);
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    // Heavy icons idle float + rotation
    if (flutterRef.current && !prefersReducedMotion) {
      gsap.to(flutterRef.current, {
        rotation: 12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(flutterRef.current, {
        yPercent: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    }

    if (dartRef.current && !prefersReducedMotion) {
      gsap.to(dartRef.current, {
        rotation: -12,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(dartRef.current, {
        yPercent: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    }
  }, { scope: containerRef });

  useEffect(() => {
    const handleResize = () => {
      setWinSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Canvas particle grid and light beams
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2 };

    const onPointerMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseMoved.current = true;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const ripple: Ripple = {
      x: 0,
      y: 0,
      radius: 0,
      maxRadius: 180,
      speed: 3.5,
      active: false,
    };

    const beams: Beam[] = [];
    const maxBeams = 3;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.6;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
      }

      update(mX: number, mY: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouseMoved.current) {
          const dx = mX - this.x;
          const dy = mY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 140;

          if (dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            this.x -= (dx / dist) * force * 0.7;
            this.y -= (dy / dist) * force * 0.7;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = isDesktop ? 45 : 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const spawnBeam = () => {
      if (beams.length >= maxBeams || prefersReducedMotion) return;
      const isHorizontal = Math.random() > 0.5;
      beams.push({
        dir: isHorizontal ? 'horizontal' : 'vertical',
        pos: 0,
        coord: isHorizontal ? Math.random() * height : Math.random() * width,
        speed: Math.random() * 4 + 3,
        length: Math.random() * 120 + 80,
        color: Math.random() > 0.5 ? '#6366f1' : '#06b6d4',
      });
    };

    let lastBeamTime = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle grid points on desktop
      if (isDesktop) {
        const spacing = 80;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
        for (let x = spacing; x < width; x += spacing) {
          for (let y = spacing; y < height; y += spacing) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Render floating particles
      for (const p of particles) {
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
      }

      // Render beams
      if (time - lastBeamTime > 2500) {
        spawnBeam();
        lastBeamTime = time;
      }

      for (let i = beams.length - 1; i >= 0; i--) {
        const b = beams[i];
        b.pos += b.speed;
        const limit = b.dir === 'horizontal' ? width + b.length : height + b.length;

        if (b.pos > limit) {
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

      // Ripple animation
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

    const handleWindowClick = (e: MouseEvent) => {
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

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('resize', handleCanvasResize);
      window.removeEventListener('mousemove', onPointerMove);
    };
  }, [isDesktop]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-dark">
      {/* Background Radial Glow Follower */}
      <div
        ref={mouseGlowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* HTML5 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />

      {/* Ambient Radial Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Micro Tech Cards on Desktop */}
      {isDesktop && (
        <>
          <FloatingCard
            icon={Zap}
            label="Flutter 3.x"
            techLabel="Impeller Engine"
            x="12%"
            y="22%"
            delay={0}
            color="#6366f1"
          />
          <FloatingCard
            icon={Shield}
            label="Architecture"
            techLabel="Clean / BLoC"
            x="76%"
            y="35%"
            delay={1.5}
            color="#06b6d4"
          />
          <FloatingCard
            icon={Smartphone}
            label="Ecosystem"
            techLabel="Cross-Platform"
            x="18%"
            y="72%"
            delay={3}
            color="#10b981"
          />
        </>
      )}

      {/* Heavy Floating Flutter & Dart Holograms on XL Desktops */}
      {isDesktop && (
        <>
          {/* Floating Heavy Flutter Hologram */}
          <div
            ref={flutterRef}
            className="absolute top-[18%] right-[7%] hidden xl:flex items-center justify-center pointer-events-auto cursor-pointer group"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          >
            <div className="absolute w-[240px] h-[240px] flex items-center justify-center pointer-events-none">
              <div className="absolute w-full h-full rounded-full border border-dashed border-primary/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[85%] h-[85%] rounded-full border border-primary/5 animate-[spin_25s_linear_infinite_reverse]" />
            </div>
            <div className="absolute w-[160px] h-[160px] rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/15 transition-all duration-500" />
            <SiFlutter
              size={130}
              className="text-primary/40 group-hover:text-primary transition-all duration-500 drop-shadow-[0_0_24px_rgba(99,102,241,0.25)]"
            />
          </div>

          {/* Floating Heavy Dart Hologram */}
          <div
            ref={dartRef}
            className="absolute bottom-[18%] left-[7%] hidden xl:flex items-center justify-center pointer-events-auto cursor-pointer group"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          >
            <div className="absolute w-[220px] h-[220px] flex items-center justify-center pointer-events-none">
              <div className="absolute w-full h-full rounded-full border border-dashed border-secondary/10 animate-[spin_45s_linear_infinite_reverse]" />
              <div className="absolute w-[85%] h-[85%] rounded-full border border-secondary/5 animate-[spin_30s_linear_infinite]" />
            </div>
            <div className="absolute w-[150px] h-[150px] rounded-full bg-secondary/5 blur-2xl group-hover:bg-secondary/15 transition-all duration-500" />
            <SiDart
              size={120}
              className="text-secondary/40 group-hover:text-secondary transition-all duration-500 drop-shadow-[0_0_24px_rgba(6,182,212,0.25)]"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalBackground;
