/**
 * Impact First — AnimatedCounter
 * React component that counts up numbers when scrolled into view.
 * Uses Intersection Observer for trigger, requestAnimationFrame for smooth counting.
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label: string;
  description?: string;
  size?: "default" | "large" | "hero";
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  label,
  description,
  size = "default",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(easedProgress * end);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, hasAnimated]);

  const sizeStyles: Record<string, React.CSSProperties> = {
    default: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
    },
    large: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
    },
    hero: {
      fontSize: "clamp(3.5rem, 8vw, 6rem)",
    },
  };

  return (
    <div ref={ref} style={styles.wrapper}>
      <div
        style={{
          ...styles.number,
          ...sizeStyles[size],
          opacity: hasAnimated ? 1 : 0.3,
          transform: hasAnimated ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <span style={styles.prefix}>{prefix}</span>
        {count.toLocaleString()}
        <span style={styles.suffix}>{suffix}</span>
      </div>
      <div style={styles.label}>{label}</div>
      {description && <div style={styles.description}>{description}</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    textAlign: "center",
  },
  number: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: "var(--if-gold, #FFCB70)",
    marginBottom: "0.5rem",
  },
  prefix: {
    fontSize: "0.65em",
    verticalAlign: "baseline",
  },
  suffix: {
    fontSize: "0.65em",
    verticalAlign: "baseline",
  },
  label: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--if-white, #FFFFFF)",
    letterSpacing: "-0.01em",
    marginBottom: "0.25rem",
  },
  description: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    color: "var(--if-sage, #B1D3BB)",
    maxWidth: "280px",
    margin: "0 auto",
  },
};
