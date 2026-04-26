import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Elementor-like reveal for all sections
  const sections = document.querySelectorAll('section, .reveal-on-scroll');
  
  sections.forEach((section) => {
    gsap.fromTo(section, 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Parallax layers
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  parallaxLayers.forEach((layer: any) => {
    const speed = layer.dataset.speed || 0.2;
    gsap.to(layer, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: layer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // "Manteau" effect (depth shadow/gradient movement)
  const coats = document.querySelectorAll('.manteau-effect');
  coats.forEach((coat) => {
    gsap.to(coat, {
      backgroundPosition: '100% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: coat,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
};
