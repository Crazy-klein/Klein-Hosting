import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Reveal = ({ children, direction = 'up', delay = 0 }: { children: React.ReactNode, direction?: 'up' | 'down' | 'left' | 'right' | 'scale', delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fromVars: any = { opacity: 0 };
    switch (direction) {
      case 'up': fromVars.y = 50; break;
      case 'down': fromVars.y = -50; break;
      case 'left': fromVars.x = 50; break;
      case 'right': fromVars.x = -50; break;
      case 'scale': fromVars.scale = 0.8; break;
    }

    gsap.fromTo(el, fromVars, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }, [direction, delay]);

  return <div ref={ref}>{children}</div>;
};

export const Parallax = ({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: (index, target) => -ScrollTrigger.maxScroll(window) * (speed * 0.1),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, [speed]);

  return <div ref={ref} className="will-change-transform">{children}</div>;
};
