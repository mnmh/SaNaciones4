//--animations
//--GSAP https://greensock.com/docs/
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable);

import { select, newCamino } from './variables.js';

import {
  caminos,
  menuTrama,
  menuBox,
  menuChange,
  menuToggle,
} from './menu-variables.js';

import { backDivs, descripciones, menuCreate } from './menu-create.js';

menuCreate();

import { menuClose } from './menu-close.js';
import { menuOpen, vTweens } from './menu-open.js';
import { menuParall, parall } from './menu-parallax.js';
import { blink, blinkChange, blinkPlay } from './menu-eye.js';

//
let ulWidth = select('#menuBox ul').clientWidth;
let ulHeight = select('#menuBox ul').clientHeight;

//
//--Create menu
//
//--

//--
// const arrows = Array.from(selectAll("#menuBox .arrow .feather"));

caminos.forEach((camino, i) => {
  const lead = camino.querySelector('.lead');
  const arrow = camino.querySelector('.arrow');
  const backImg = backDivs[i];
  const backOthers = backDivs.filter((x) => x !== backImg);
  const others = caminos.filter((y) => y !== camino);
  const descripcion = descripciones[i];

  const caminoTl = gsap
    .timeline({
      paused: true,
    })
    .addLabel('walk')
    .to(lead, { height: 'auto', duration: 0.4, ease: 'power1.inOut' }, 'walk')
    .to(
      lead,
      { opacity: 1, duration: 0.3, ease: 'power1.inOut', delay: 0.3 },
      'walk'
    )
    .to(
      arrow,
      { height: '5vh', autoAlpha: 1, duration: 0.5, ease: 'power1.inOut' },
      'walk'
    )
    .to(
      camino,
      { scale: '+=0.05', duration: 0.5, ease: 'power1.inOut' },
      'walk'
    );
  const caminoOver = () => {
    camino.setAttribute('data-over', '');
    gsap.set(others, { zIndex: 10 });
    gsap.to(others, { opacity: 0.2, duration: 0.5, ease: 'power2.inOut' });
    gsap.set(camino, { zIndex: 20 });
    gsap.to(camino, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    gsap.to(backImg, { opacity: 0.7, duration: 0.5, ease: 'power2.inOut' });
    gsap.to(select('.terrainIn'), {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    });
    gsap.to(backOthers, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    caminoTl.play();
  };

  const caminoOut = () => {
    camino.removeAttribute('data-over');
    gsap.to(caminos, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(backImg, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    gsap.to(select('.terrainIn'), {
      opacity: 0.8,
      duration: 0.4,
      ease: 'power2.out',
    });
    caminoTl.reverse();
  };

  Draggable.create(camino, {
    onClick: () => {
      if (camino.hasAttribute('data-over')) {
        return true;
      } else {
        caminoOver();
        e.preventDefault();
        return false;
      }
    },
    onDragStart: () => {
      document.removeEventListener('mousemove', parall);
      caminoOver();
    },
    onDragEnd: function () {
      let Xpercent = `${Math.round(
        (this.x / ulWidth) * 100 + (this.target.offsetLeft / ulWidth) * 100
      )}%`;
      let Ypercent = `${Math.round(
        (this.y / ulHeight) * 100 + (this.target.offsetTop / ulHeight) * 100
      )}%`;
      gsap.to(this.target, {
        x: 0,
        y: 0,
        left: Xpercent,
        top: Ypercent,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: menuParall,
      });
    },
  });

  camino.addEventListener('mouseover', caminoOver, false);
  camino.addEventListener('mouseout', caminoOut, false);
  camino.addEventListener(
    'touchstart',
    () => {
      let othersDesc = descripciones.filter((k) => k !== descripcion);
      if (camino.hasAttribute('data-over')) {
      } else {
        gsap.to(othersDesc, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(descripcion, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    },
    false
  );
  camino.addEventListener(
    'click',
    () => {
      newCamino(camino);
    },
    false
  );
});

const menuRotate = gsap
  .fromTo(
    menuTrama,
    { rotation: 0 },
    {
      rotation: 360,
      duration: 1,
      transformOrigin: '50% 50%',
      ease: 'linear',
      repeat: -1,
      paused: true,
    }
  )
  .timeScale(0);

menuToggle.addEventListener(
  'click',
  () => {
    menuToggle.classList.add('disable');
    if (menuBox.ariaHidden == 'true') {
      menuOpen(true);
    } else {
      menuClose();
    }
  },
  false
);

menuToggle.addEventListener(
  'mouseover',
  () => {
    menuRotate.play();
    gsap.to(menuRotate, { timeScale: 0.1, duration: 1 });
  },
  false
);
menuToggle.addEventListener(
  'mouseout',
  () => gsap.to(menuRotate, { timeScale: 0, duration: 1 }),
  false
);

menuChange.addEventListener(
  'click',
  (event) => {
    event.preventDefault();
    blinkChange(false);
    blink.clear();
    blinkPlay();
    for (let i = 0; i < caminos.length; i++) {
      vTweens[i].kill();
    }
    caminos.forEach((x) => x.classList.add('disable'));
    menuOpen(false);
  },
  false
);
//
//
//
