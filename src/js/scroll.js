//--animations
//--GSAP https://greensock.com/docs/
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const scrolls = (container) => {
  // let sections = container.querySelectorAll('section');
  // sections.forEach(x => x.setAttribute('data-scroll-section', ''));
  // container.querySelector('.terrain').setAttribute('data-scroll-sticky', '');
};

export const terrainParallax = (container) => {
  //--
  const terrain = container.querySelector('.terrain');
  const terrainUp = container.querySelector('.terrainUp');
  const triggerBox = container.querySelector('[data-scroll-container]');
  gsap.to([terrain, terrainUp], {
    y: '-80vh',
    ease: 'linear',
    scrollTrigger: {
      scroller: triggerBox,
      trigger: triggerBox,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  });
};
