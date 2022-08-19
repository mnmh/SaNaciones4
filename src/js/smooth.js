//-- GSAP + ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

//-- Locomotive (smooth scroll)
import LocomotiveScroll from 'locomotive-scroll';

export let scroll;

export const initSmoothScroll = (container) => {
  scroll = new LocomotiveScroll({
    el: container.querySelector('[data-scroll-container]'),
    smooth: true,
    scrollFromAnywhere: true,
  });

  scroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: container.querySelector('[data-scroll-container]').style.transform
      ? 'transform'
      : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => scroll.update());
  ScrollTrigger.refresh();
};
