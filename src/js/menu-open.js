//-- GSAP
import { gsap } from 'gsap';
//-- var locomotive
import { scroll } from './smooth.js';
//--
import { body, select } from './variables.js';
import {
  caminos,
  names,
  menuBox,
  menuToggle,
  menuChange,
  dir,
  dirRandom,
  pos,
  posRandom,
} from './menu-variables.js';

import { tramas } from './menu-create.js';
import { menuParall, parall } from './menu-parallax.js';
import { blinkChange, blinkPlay } from './menu-eye.js';

//--
let [xRandom, yRandom] = [[], [], []];

export const menuOpen = (open) => {
  scroll.stop();
  menuBox.ariaHidden = 'false';
  menuToggle.ariaExpanded = 'true';
  body.classList.add('menuOpen');
  document.removeEventListener('mousemove', parall);
  posRandom();
  dirRandom();
  scaleTime = gsap.utils.random(2, 2.5, 0.1);
  gsap.to(select('.content'), { opacity: 0, duration: 0.8 });

  const openM = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        menuToggle.classList.remove('disable');
        caminos.forEach((i, j) => {
          i.classList.remove('disable');
        });
        blinkChange(true);
        gsap.delayedCall(gsap.utils.random(3, 3.5), blinkPlay);
      },
    })
    .addLabel('terra')
    .to(
      tramas,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      'terra'
    )
    .to(
      tramas,
      {
        scale: '-=0.05',
        rotation: (i) => `${dir[i].dirNo}25`,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      'terra'
    )
    .addLabel('walk')
    .call(caminoRota)
    .to(
      caminos,
      {
        x: 0,
        y: 0,
        left: (i) => pos[i].left,
        top: (i) => pos[i].top,
        duration: scaleTime,
        ease: 'power2.inOut',
      },
      'walk+=0.8'
    )
    .to(
      tramas,
      {
        scale: 'random(0.95, 1.25)',
        duration: scaleTime,
        transformOrigin: '50% 50%',
        ease: 'power1.inOut',
      },
      'walk+=0.8'
    )
    .to(
      names,
      { opacity: 1, duration: scaleTime, ease: 'power2.inOut' },
      'walk+=1'
    )
    .call(menuParall)
    .to(menuChange, { autoAlpha: 1, duration: 1, ease: 'power2.inOut' });
  if (open == true) {
    [xRandom, yRandom] = [[], []];
    caminos.forEach((x) => {
      xRandom.push(`${gsap.utils.random(20, 80, 5)}%`);
      yRandom.push(`${gsap.utils.random(0, 100, 5)}%`);
    });
    gsap.set(caminos, {
      x: 0,
      y: 0,
      left: (i) => xRandom[i],
      top: (i) => yRandom[i],
    });
    openM.invalidate().play(0);
  } else {
    openM.invalidate().play(0);
  }
};

export const vTweens = [];
for (let i = 0; i < caminos.length; i++) {
  vTweens[`tween${i}`];
}

export const caminoRota = () => {
  tramas.forEach((x, i) => {
    gsap.to(x, {
      rotation: `${dir[i].dirSi}${'random(200, 300)'}`,
      duration: 'random(3.5, 6)',
      transformOrigin: '50% 50%',
      ease: 'power1.inOut',
      onComplete: () => {
        vTweens[i] = gsap
          .to(x, {
            rotation: `${dir[i].dirSi}360`,
            duration: 30,
            transformOrigin: '50% 50%',
            ease: 'none',
            repeat: -1,
            overwrite: 'auto',
          })
          .timeScale(gsap.utils.random(0.06, 0.6));
      },
    });
  });
};
