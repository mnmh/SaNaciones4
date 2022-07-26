//-- GSAP
import { gsap } from 'gsap';
//-- var locomotive
import { scroll } from './smooth.js';

//--
//-- variables
import { select, body, newMask, caminoSel } from './variables.js';

import { backDivs, tramas } from './menu-create.js';
import {
  caminos,
  menuBox,
  menuChange,
  menuToggle,
  dir,
  pos,
  names,
} from './menu-variables.js';

import { parall } from './menu-parallax.js';

export const menuClose = (ejeSel) => {
  return new Promise((done) => {
    menuBox.ariaHidden = 'true';
    menuToggle.ariaExpanded = 'false';
    document.removeEventListener('mousemove', parall);
    caminos.forEach((x) => x.classList.add('disable'));
    const scaleTime = gsap.utils.random(1.5, 2, 0.1);

    gsap
      .timeline({
        onComplete: () => {
          menuToggle.classList.remove('disable');
          body.classList.remove('menuOpen');
          if (ejeSel === true) {
            done();
          } else {
            gsap.to(select('.content'), {
              opacity: 1,
              duration: 0.8,
              onComplete: () => {
                scroll.start();
                done();
              },
            });
          }
        },
      })
      .to(tramas, {
        scale: '+=0.05',
        rotation: (i) => `${dir[i].dirNo}25`,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to(backDivs, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, '>-1')
      .addLabel('walk')
      .to(menuChange, { autoAlpha: 0, duration: 1, ease: 'power2.inOut' })
      .to(
        caminos,
        {
          x: 0,
          y: 0,
          left: (i) => pos[i].left,
          top: (i) => pos[i].top,
          duration: scaleTime,
          ease: 'power2.inOut',
          delay: 0.3,
        },
        'walk'
      )
      .to(
        names,
        { opacity: 0, duration: scaleTime, ease: 'power2.inOut', delay: 0.09 },
        'walk'
      )
      .to(
        tramas,
        {
          scale: 0.4,
          duration: scaleTime,
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
          delay: 0.3,
          onComplete: () => {
            if (ejeSel === true) {
              let rect = caminoSel.getBoundingClientRect();
              newMask(
                `${Math.round(rect.x + rect.width / 2)}px`,
                `${Math.round(rect.y + rect.height / 2)}px`
              );
            }
          },
        },
        'walk'
      )
      .to(
        tramas,
        {
          rotation: (i) => `${dir[i].dirSi}${'random(150, 200)'}`,
          duration: 'random(2, 2.8, .1)',
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
        },
        'walk'
      )
      .to(
        select('.terrainIn'),
        { opacity: 0.8, duration: 2, ease: 'power1.inOut' },
        '<'
      )
      .to(tramas, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, '-=1.5');
  });
};
