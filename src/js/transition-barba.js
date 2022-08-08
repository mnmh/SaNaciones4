//--GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

//-- BarbaJS (transitions)
import barba from '@barba/core';
//-- función cerrar menú
import { menuClose } from './menu-close.js';
//--
import { selectAll, newMask } from './variables.js';
//-- mascara imágenes
import { figureMask } from './figure-mask.js';
//-- parallax terreno
import { terrainParallax } from './scroll.js';
//-- animación de la mascara del terreno
import { terrainMask } from './transition-mask.js';
//-- var locomotive
import { scroll, initSmoothScroll } from './smooth.js';

//--
import { icons } from './icons.js';

newMask(
  `${gsap.utils.random(10, 90, 1)}vw`,
  `${gsap.utils.random(10, 90, 1)}vh`
);

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});
barba.hooks.after(() => {
  scroll.init();
});

barba.init({
  timeout: 5000,
  preventRunning: true,
  transitions: [
    {
      name: 'once-transition',
      sync: true,
      once: ({ next }) => {
        icons();
        figureMask(next.container);
        initSmoothScroll(next.container);
        terrainMask(next.container, next.namespace);
        terrainParallax(next.container);
      },
      leave() {},
      enter() {},
    },
    {
      name: 'menu-transition',
      sync: true,
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('menu-transition')
          );
        },
      },
      async beforeLeave(data) {
        const done = this.async();
        await menuClose(true);
        await terrainMask(data.next.container, data.next.namespace);
        data.current.container.remove();
        done();
      },
      leave() {},
      beforeEnter: ({ next }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        scroll.destroy();
        icons();
        figureMask(next.container);
        initSmoothScroll(next.container);
      },
      enter: ({ next }) => {
        // figureMask(next.container);
        terrainParallax(next.container);
      },
      after: () => {
        let scrollbar = selectAll('.c-scrollbar');
        if (scrollbar.length > 1) {
          scrollbar[0].remove();
        }
      },
    },
  ],
});
