// animations
// GSAP https://greensock.com/docs/
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Observer} from 'gsap/Observer';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import {Draggable} from 'gsap/Draggable';
gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable);

// smooth transitions
// BarbaJS https://barba.js.org/
import barba from '@barba/core';

// smooth scroll
// Locomotive Scroll https://github.com/locomotivemtl/locomotive-scroll
import LocomotiveScroll from 'locomotive-scroll';

//
let ulWidth = document.querySelector('#menuBox ul').clientWidth;
let ulHeight = document.querySelector('#menuBox ul').clientHeight;

let locoScroll;

// Create menu
const spanMenu = document.createElement('span');
spanMenu.ariaHidden = 'true';
spanMenu.classList.add(`trama${gsap.utils.random(1, 5, 1)}`);
document.querySelector('#menu-toggle').appendChild(spanMenu);
const iconMenu = document.createElement('i');
iconMenu.ariaHidden = 'true';
iconMenu.dataset.feather = 'x';
document.querySelector('#menu-toggle').appendChild(iconMenu);
const eye = document.createElement('span');
const eyeIcon = document.createElement('i');
eyeIcon.dataset.feather = 'eye';
eye.appendChild(eyeIcon);
document.querySelector('#menu-change').appendChild(eye);
const eyeClose = document.createElement('span');
document.querySelector('#menu-change').appendChild(eyeClose);
eye.classList.add('eye');
eyeClose.classList.add('eyeClose');
let [backDivs, descripciones, pos, xRandom, yRandom] = [[], [], [], [], []];
const vel = [-1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8];
const posRandom = () => {
  pos = [
    {
      left: `${gsap.utils.random(14, 40, 1)}%`,
      top: `${gsap.utils.random(18, 36, 1)}%`,
    },
    {
      left: `${gsap.utils.random(65, 90, 1)}%`,
      top: `${gsap.utils.random(14, 41, 1)}%`,
    },
    {
      left: `${gsap.utils.random(40, 60, 1)}%`,
      top: `${gsap.utils.random(40, 70, 1)}%`,
    },
    {
      left: `${gsap.utils.random(15, 30, 1)}%`,
      top: `${gsap.utils.random(68, 90, 1)}%`,
    },
    {
      left: `${gsap.utils.random(68, 84, 1)}%`,
      top: `${gsap.utils.random(68, 94, 1)}%`,
    },
  ];
};
let dir = [
  {dirSi: '-=', dirNo: '+='},
  {dirSi: '+=', dirNo: '-='},
  {dirSi: '-=', dirNo: '+='},
  {dirSi: '+=', dirNo: '-='},
  {dirSi: '-=', dirNo: '+='},
  {dirSi: '+=', dirNo: '-='},
  {dirSi: '-=', dirNo: '+='},
  {dirSi: '+=', dirNo: '-='},
  {dirSi: '-=', dirNo: '+='},
  {dirSi: '+=', dirNo: '-='},
];

const caminos = Array.from(document.querySelectorAll('#menuBox ul li'));
caminos.forEach(camino => {
  camino.classList.add('disable');
  const arrowDiv = document.createElement('div');
  arrowDiv.ariaHidden = 'true';
  arrowDiv.classList.add('arrow');
  const arrowIcon = document.createElement('i');
  arrowIcon.ariaHidden = 'true';
  arrowIcon.dataset.feather = 'arrow-right';
  camino.querySelector('.name').appendChild(arrowDiv);
  arrowDiv.appendChild(arrowIcon);

  const trama = document.createElement('div');
  trama.ariaHidden = 'true';
  trama.classList.add('trama');
  camino.querySelector('a').appendChild(trama);

  const descripcionDiv = document.createElement('div');
  descripcionDiv.innerHTML = camino.querySelector('.lead').innerHTML;
  document.querySelector('#descripciones').appendChild(descripcionDiv);
  descripciones.push(descripcionDiv);

  const backImgDiv = document.createElement('div');
  document.querySelector('#backImg').appendChild(backImgDiv);
  backDivs.push(backImgDiv);
});

const names = Array.from(document.querySelectorAll('#menuBox .name'));
//const arrows = Array.from(document.querySelectorAll("#menuBox .arrow .feather"));
const caminoBox = Array.from(document.querySelectorAll('#menuBox .trama'));
gsap.set(caminoBox, {scale: 0.4, transformOrigin: '50% 50%', opacity: 0});

// Start menu
const menuToggle = document.querySelector('#menu-toggle');
const body = document.querySelector('body');
//const terrain = document.querySelector(".terrain");
const terrainIn = document.querySelector('.terrainIn');
const textMenu = document.querySelector('#text-menu');
const menu = document.querySelector('#menuBox');
const menuChange = document.querySelector('#menu-change');
let mainDiv, caminoSel;

gsap.set(caminos, {xPercent: -50, yPercent: -50});
gsap.set(menuChange, {
  top: document.querySelector('#headerBar').offsetHeight + 20,
});

caminos.forEach((camino, i) => {
  const lead = camino.querySelector('.lead');
  const arrow = camino.querySelector('.arrow');
  const backImg = backDivs[i];
  const backOthers = backDivs.filter(x => x !== backImg);
  const others = caminos.filter(y => y !== camino);
  const descripcion = descripciones[i];

  const caminoTl = gsap
    .timeline({
      paused: true,
    })
    .addLabel('walk')
    .to(lead, {height: 'auto', duration: 0.4, ease: 'power1.inOut'}, 'walk')
    .to(
      lead,
      {opacity: 1, duration: 0.3, ease: 'power1.inOut', delay: 0.3},
      'walk'
    )
    .to(
      arrow,
      {height: '5vh', autoAlpha: 1, duration: 0.5, ease: 'power1.inOut'},
      'walk'
    )
    .to(camino, {scale: '+=0.05', duration: 0.5, ease: 'power1.inOut'}, 'walk');
  const caminoOver = () => {
    camino.setAttribute('data-over', '');
    gsap.set(others, {zIndex: 10});
    gsap.to(others, {opacity: 0.2, duration: 0.5, ease: 'power2.inOut'});
    gsap.set(camino, {zIndex: 20});
    gsap.to(camino, {opacity: 1, duration: 0.5, ease: 'power2.inOut'});
    gsap.to(backImg, {opacity: 0.7, duration: 0.5, ease: 'power2.inOut'});
    gsap.to(terrainIn, {opacity: 1, duration: 0.5, ease: 'power2.inOut'});
    gsap.to(backOthers, {opacity: 0, duration: 0.5, ease: 'power2.inOut'});
    caminoTl.play();
  };
  const caminoOut = () => {
    camino.removeAttribute('data-over');
    gsap.to(caminos, {opacity: 1, duration: 0.5, ease: 'power2.out'});
    gsap.to(backImg, {opacity: 0, duration: 0.5, ease: 'power2.out'});
    gsap.to(terrainIn, {opacity: 0.8, duration: 0.4, ease: 'power2.out'});
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
      let othersDesc = descripciones.filter(k => k !== descripcion);
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
    function () {
      caminoSel = this;
    },
    false
  );
});

const menuParall = () => {
  gsap.utils.shuffle(vel);
  document.addEventListener('mousemove', parall, false);
  /* document.addEventListener("touchmove", parall, false); */
};
const parall = e => {
  caminos.forEach((i, j) => {
    let x = (window.innerWidth - e.pageX * vel[j]) / 100;
    let y = (window.innerHeight - e.pageY * vel[j]) / 100;
    gsap.to(i, {x: x, y: y, duration: 1, ease: 'sine'});
  });
};

const menuClose = ejeSel => {
  return new Promise(done => {
    let mainNext = mainDiv;
    menu.ariaHidden = 'true';
    menuToggle.ariaExpanded = 'false';
    document.removeEventListener('mousemove', parall);
    caminos.forEach(x => x.classList.add('disable'));
    const scaleTime = gsap.utils.random(1.5, 2, 0.1);

    gsap
      .timeline({
        onComplete: () => {
          locoScroll.start();
          menuToggle.classList.remove('disable');
          body.classList.remove('menuOpen');
          textMenu.classList.remove('hideText');
          if (!ejeSel) {
            gsap.to(document.querySelector('#content'), {
              opacity: 1,
              duration: 0.8,
            });
          }
          done();
        },
      })
      .to(caminoBox, {
        scale: '+=0.05',
        rotation: i => `${dir[i].dirNo}25`,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to(backDivs, {opacity: 0, duration: 0.7, ease: 'power1.inOut'}, '>-1')
      .addLabel('walk')
      .to(menuChange, {autoAlpha: 0, duration: 1, ease: 'power2.inOut'})
      .to(
        caminos,
        {
          x: 0,
          y: 0,
          left: i => pos[i].left,
          top: i => pos[i].top,
          duration: scaleTime,
          ease: 'power2.inOut',
          delay: 0.3,
        },
        'walk'
      )
      .to(
        names,
        {opacity: 0, duration: scaleTime, ease: 'power2.inOut', delay: 0.09},
        'walk'
      )
      .to(
        caminoBox,
        {
          scale: 0.4,
          duration: scaleTime,
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
          delay: 0.3,
          onComplete: () => {
            if (ejeSel) {
              let ejeSelX = `${Math.round(
                ejeSel.getBoundingClientRect().x +
                  ejeSel.getBoundingClientRect().width / 2
              )}px`;
              let ejeSelY = `${Math.round(
                ejeSel.getBoundingClientRect().y +
                  ejeSel.getBoundingClientRect().height / 2
              )}px`;
              body.style.setProperty('--x', ejeSelX);
              body.style.setProperty('--y', ejeSelY);
            }
          },
        },
        'walk'
      )
      .to(
        caminoBox,
        {
          rotation: i => `${dir[i].dirSi}${'random(150, 200)'}`,
          duration: 'random(2, 2.8, .1)',
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
        },
        'walk'
      )
      .to(terrainIn, {opacity: 0.8, duration: 2, ease: 'power1.inOut'}, '<')
      .to(caminoBox, {opacity: 0, duration: 0.9, ease: 'power2.inOut'}, '-=1.5')
      .add(function () {
        mainNext.querySelector('.terrain').classList.add('nextTo');
      })
      .to({}, {duration: 1});
  });
};

let scaleTime = gsap.utils.random(2, 2.5, 0.1);

const vTweens = {};
for (let i = 0; i < caminos.length; i++) {
  vTweens[`tween${i}`];
}

const caminoRota = () => {
  caminoBox.forEach((x, i) => {
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

const openMenu = open => {
  locoScroll.stop();
  menu.ariaHidden = 'false';
  menuToggle.ariaExpanded = 'true';
  body.classList.add('menuOpen');
  document.removeEventListener('mousemove', parall);
  posRandom();
  gsap.utils.shuffle(pos);
  gsap.utils.shuffle(dir);
  scaleTime = gsap.utils.random(2, 2.5, 0.1);
  textMenu.classList.add('hideText');
  gsap.to(document.querySelector('#content'), {opacity: 0, duration: 0.8});

  const openM = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        menuToggle.classList.remove('disable');
        caminos.forEach((i, j) => {
          i.classList.remove('disable');
        });
        blinkOn = true;
        gsap.delayedCall(gsap.utils.random(3, 3.5), blinkPlay);
      },
    })
    .addLabel('terra')
    .to(caminoBox, {opacity: 1, duration: 0.6, ease: 'power2.inOut'}, 'terra')
    .to(
      caminoBox,
      {
        scale: '-=0.05',
        rotation: i => `${dir[i].dirNo}25`,
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
        left: i => pos[i].left,
        top: i => pos[i].top,
        duration: scaleTime,
        ease: 'power2.inOut',
      },
      'walk+=0.8'
    )
    .to(
      caminoBox,
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
      {opacity: 1, duration: scaleTime, ease: 'power2.inOut'},
      'walk+=1'
    )
    .call(menuParall)
    .to(menuChange, {autoAlpha: 1, duration: 1, ease: 'power2.inOut'});
  if (open == true) {
    [xRandom, yRandom] = [[], []];
    caminos.forEach(x => {
      xRandom.push(`${gsap.utils.random(20, 80, 5)}%`);
      yRandom.push(`${gsap.utils.random(0, 100, 5)}%`);
    });
    gsap.set(caminos, {
      x: 0,
      y: 0,
      left: i => xRandom[i],
      top: i => yRandom[i],
    });
    openM.invalidate().play(0);
  } else {
    openM.invalidate().play(0);
  }
};

const menuRotate = gsap
  .fromTo(
    spanMenu,
    {rotation: 0},
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

let blinkOn = true;
let blink;
const blinkPlay = () => {
  blink = gsap
    .timeline({
      onComplete: () => {
        if (blinkOn == true) {
          gsap.delayedCall(gsap.utils.random(1, 8), () => blink.restart());
        }
      },
    })
    .to(eye, {opacity: 0, duration: 0.2, ease: 'power2.in'})
    .to(eyeClose, {opacity: 1, duration: 0.3, ease: 'power2.in'}, '<')
    .call(() => {
      if (blinkOn == true) {
        blink.resume();
      } else {
        blink.pause();
        gsap.delayedCall(1.4, () => blink.resume());
      }
    })
    .to(eyeClose, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      delay: 0.07,
    })
    .to(eye, {opacity: 1, duration: 0.3, ease: 'power2.out'}, '<0.05');
};

menuToggle.addEventListener(
  'click',
  () => {
    menuToggle.classList.add('disable');
    if (menu.ariaHidden == 'true') {
      openMenu(true);
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
    gsap.to(menuRotate, {timeScale: 0.1, duration: 1});
  },
  false
);
menuToggle.addEventListener(
  'mouseout',
  () => gsap.to(menuRotate, {timeScale: 0, duration: 1}),
  false
);

menuChange.addEventListener(
  'click',
  event => {
    event.preventDefault();
    blinkOn = false;
    blink.clear();
    blinkPlay();
    for (let i = 0; i < caminos.length; i++) {
      vTweens[i].kill();
    }
    caminos.forEach(x => x.classList.add('disable'));
    openMenu(false);
  },
  false
);
//
//

let smooth = () => {
  locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: true,
    scrollFromAnywhere: true,
  });
};

barba.hooks.beforeEnter(() => {
  locoScroll.setScroll(0, 0);
});
barba.hooks.after(() => {
  locoScroll.update();
});
barba.init({
  timeout: 5000,
  preventRunning: true,
  transitions: [
    {
      sync: true,
      once: ({next}) => {
        gsap.fromTo(
          next.container.querySelector('#content'),
          {opacity: 0},
          {opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out'}
        );
        smooth();
      },
      before: ({next}) => {
        mainDiv = next.container;
        next.container.querySelector('.terrain').classList.add('next');
      },
      async beforeLeave() {
        const done = this.async();
        await menuClose(caminoSel);
        done();
      },
      leave() {},
      enter() {},
      afterEnter: ({next}) => {
        gsap.fromTo(
          next.container.querySelector('#content'),
          {opacity: 0},
          {opacity: 1, duration: 1, ease: 'power3.out '}
        );
        body.className = `${next.namespace}Body`;
        next.container
          .querySelector('.terrain')
          .classList.remove('next', 'nextTo');
      },
    },
  ],
});
