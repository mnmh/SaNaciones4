//--animations
//--GSAP https://greensock.com/docs/
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable);

//--smooth transitions
//--BarbaJS https://barba.js.org/
import barba from '@barba/core';

//--smooth scroll
//--Locomotive Scroll https://github.com/locomotivemtl/locomotive-scroll
import LocomotiveScroll from 'locomotive-scroll';

//--scripts
//--locomotive data
//--import scrolls from './scroll';

//--array formas(blobs) para las transiciones
import { blobRandom } from './blobs.js';

//
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const create = (e) => document.createElement(e);
let ulWidth = select('#menuBox ul').clientWidth;
let ulHeight = select('#menuBox ul').clientHeight;
let maskX = `${gsap.utils.random(10, 90, 1)}vw`;
let maskY = `${gsap.utils.random(10, 90, 1)}vh`;
let scroll;

//
//--Create menu
//
//--
const menuText = create('span');
menuText.classList.add('menuText');
const textMenu = document.createTextNode('menú');
menuText.appendChild(textMenu);
select('#menu-toggle').appendChild(menuText);
//--
const iconClose = create('i');
iconClose.ariaHidden = 'true';
iconClose.setAttribute('icon-name', 'x');
select('#menu-toggle').appendChild(iconClose);
//--
const tramaMenu = create('div');
tramaMenu.ariaHidden = 'true';
tramaMenu.classList.add(`trama${gsap.utils.random(1, 5, 1)}`);
select('#menu-toggle').appendChild(tramaMenu);
//--
const eye = create('span');
eye.classList.add('eye');
const eyeIcon = create('i');
eyeIcon.setAttribute('icon-name', 'eye');
eye.appendChild(eyeIcon);
select('#menu-change').appendChild(eye);
//--
const eyeClose = create('span');
select('#menu-change').appendChild(eyeClose);
eyeClose.classList.add('eyeClose');
//--
let [backDivs, descripciones, pos, xRandom, yRandom] = [[], [], [], [], []];
//--
const vel = [-1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8];
//--
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
//--
let dir = [
  { dirSi: '-=', dirNo: '+=' },
  { dirSi: '+=', dirNo: '-=' },
  { dirSi: '-=', dirNo: '+=' },
  { dirSi: '+=', dirNo: '-=' },
  { dirSi: '-=', dirNo: '+=' },
  { dirSi: '+=', dirNo: '-=' },
  { dirSi: '-=', dirNo: '+=' },
  { dirSi: '+=', dirNo: '-=' },
  { dirSi: '-=', dirNo: '+=' },
  { dirSi: '+=', dirNo: '-=' },
];
//--
const caminos = Array.from(selectAll('#menuBox ul li'));
caminos.forEach((camino) => {
  camino.classList.add('disable');
  const arrowDiv = create('div');
  arrowDiv.ariaHidden = 'true';
  arrowDiv.classList.add('arrow');
  const arrowIcon = create('i');
  arrowIcon.ariaHidden = 'true';
  arrowIcon.dataset.feather = 'arrow-right';
  camino.querySelector('.name').appendChild(arrowDiv);
  arrowDiv.appendChild(arrowIcon);
  //--
  const trama = create('div');
  trama.ariaHidden = 'true';
  trama.classList.add('trama');
  camino.querySelector('a').appendChild(trama);
  //--
  const descripcionDiv = create('div');
  descripcionDiv.innerHTML = camino.querySelector('.lead').innerHTML;
  select('#descripciones').appendChild(descripcionDiv);
  descripciones.push(descripcionDiv);
  //--
  const backImgDiv = create('div');
  select('#backImg').appendChild(backImgDiv);
  backDivs.push(backImgDiv);
});
//--
const names = Array.from(selectAll('#menuBox .name'));
// const arrows = Array.from(selectAll("#menuBox .arrow .feather"));
const caminoBox = Array.from(selectAll('#menuBox .trama'));
gsap.set(caminoBox, { scale: 0.4, transformOrigin: '50% 50%', opacity: 0 });

//--Start menu
const menuToggle = select('#menu-toggle');
const body = select('body');
//const terrain = select(".terrain");
const terrainIn = select('.terrainIn');
const menu = select('#menuBox');
const menuChange = select('#menu-change');
let mainDiv, caminoSel;

gsap.set(caminos, { xPercent: -50, yPercent: -50 });
gsap.set(menuChange, {
  top: select('#headerBar').offsetHeight + 20,
});

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
    gsap.to(terrainIn, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    gsap.to(backOthers, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
    caminoTl.play();
  };

  const caminoOut = () => {
    camino.removeAttribute('data-over');
    gsap.to(caminos, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    gsap.to(backImg, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    gsap.to(terrainIn, { opacity: 0.8, duration: 0.4, ease: 'power2.out' });
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
      caminoSel = camino;
      // console.log(caminoSel);
    },
    false
  );
});

const menuParall = () => {
  gsap.utils.shuffle(vel);
  document.addEventListener('mousemove', parall, false);
  /* document.addEventListener("touchmove", parall, false); */
};
const parall = (e) => {
  caminos.forEach((i, j) => {
    let x = (window.innerWidth - e.pageX * vel[j]) / 100;
    let y = (window.innerHeight - e.pageY * vel[j]) / 100;
    gsap.to(i, { x: x, y: y, duration: 1, ease: 'sine' });
  });
};

const menuClose = (ejeSel) => {
  return new Promise((done) => {
    menu.ariaHidden = 'true';
    menuToggle.ariaExpanded = 'false';
    document.removeEventListener('mousemove', parall);
    caminos.forEach((x) => x.classList.add('disable'));
    const scaleTime = gsap.utils.random(1.5, 2, 0.1);

    gsap
      .timeline({
        onComplete: () => {
          menuToggle.classList.remove('disable');
          body.classList.remove('menuOpen');
          if (!ejeSel) {
            gsap.to(document.querySelector('#contentIn'), {
              opacity: 1,
              duration: 0.8,
              onComplete: () => scroll.start(),
            });
          }
          done();
        },
      })
      .to(caminoBox, {
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
        caminoBox,
        {
          scale: 0.4,
          duration: scaleTime,
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
          delay: 0.3,
          onComplete: () => {
            if (ejeSel) {
              let rect = ejeSel.getBoundingClientRect();
              maskX = `${Math.round(rect.x + rect.width / 2)}px`;
              maskY = `${Math.round(rect.y + rect.height / 2)}px`;
              console.log(`${maskX} - ${maskY}`);
            }
          },
        },
        'walk'
      )
      .to(
        caminoBox,
        {
          rotation: (i) => `${dir[i].dirSi}${'random(150, 200)'}`,
          duration: 'random(2, 2.8, .1)',
          transformOrigin: '50% 50%',
          ease: 'power2.inOut',
        },
        'walk'
      )
      .to(terrainIn, { opacity: 0.8, duration: 2, ease: 'power1.inOut' }, '<')
      .to(
        caminoBox,
        { opacity: 0, duration: 0.9, ease: 'power2.inOut' },
        '-=1.5'
      );
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

const openMenu = (open) => {
  scroll.stop();
  menu.ariaHidden = 'false';
  menuToggle.ariaExpanded = 'true';
  body.classList.add('menuOpen');
  document.removeEventListener('mousemove', parall);
  posRandom();
  gsap.utils.shuffle(pos);
  gsap.utils.shuffle(dir);
  scaleTime = gsap.utils.random(2, 2.5, 0.1);
  menuText.classList.add('hideText');
  gsap.to(document.querySelector('#contentIn'), { opacity: 0, duration: 0.8 });

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
    .to(
      caminoBox,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      'terra'
    )
    .to(
      caminoBox,
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

const menuRotate = gsap
  .fromTo(
    tramaMenu,
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
    .to(eye, { opacity: 0, duration: 0.2, ease: 'power2.in' })
    .to(eyeClose, { opacity: 1, duration: 0.3, ease: 'power2.in' }, '<')
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
    .to(eye, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '<0.05');
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
    blinkOn = false;
    blink.clear();
    blinkPlay();
    for (let i = 0; i < caminos.length; i++) {
      vTweens[i].kill();
    }
    caminos.forEach((x) => x.classList.add('disable'));
    openMenu(false);
  },
  false
);
//
//
//

initPageTransitions();

function initPageTransitions() {
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
          initSmoothScroll(next.container);
          nextMask(next.container, next.namespace);
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
          await menuClose(caminoSel);
          await nextMask(data.next.container, data.next.namespace);
          data.current.container.remove();
          done();
        },
        leave() {},
        beforeEnter: ({ next }) => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
          scroll.destroy();
          initSmoothScroll(next.container);
        },
        enter: ({ next }) => {
          let scrollbar = document.querySelectorAll('.c-scrollbar');
          if (scrollbar.length > 1) {
            scrollbar[0].remove();
          }
          terrainParallax(next.container);
        },
        after: () => {
          let scrollbar = document.querySelectorAll('.c-scrollbar');
          if (scrollbar.length > 1) {
            scrollbar[0].remove();
          }
        },
      },
    ],
  });

  function initSmoothScroll(box) {
    scroll = new LocomotiveScroll({
      el: box.querySelector('[data-scroll-container]'),
      smooth: true,
      getDirection: true,
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
      pinType: box.querySelector('[data-scroll-container]').style.transform
        ? 'transform'
        : 'fixed',
    });

    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();
  }
}

function terrainParallax(box) {
  //--
  let terreno = box.querySelector('.terrain');
  let triggerBox = box.querySelector('#content');
  gsap.to(terreno, {
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
}

function nextMask(box, name) {
  return new Promise((done) => {
    //--
    let terrainMask = box.querySelector(`#${name}Mask`);
    //--
    gsap
      .timeline({
        onComplete: () => done(),
      })
      .set(terrainMask, {
        scale: 0.5,
        x: maskX,
        y: maskY,
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[0],
        },
      })
      .to(box.querySelector('.terrain'), {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.in',
        delay: 1,
      })
      .to(terrainMask, {
        scale: 1.5,
        x: maskX,
        y: maskY,
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[1],
        },
        duration: 1,
        ease: 'power1.in',
      })
      .to(terrainMask, {
        scale: 3,
        x: maskX,
        y: maskY,
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[2],
        },
        duration: 1,
        ease: 'power1.out',
      })
      .to(terrainMask, {
        scale: 12,
        x: '50vw',
        y: '50vh',
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[3],
        },
        duration: 0.8,
        ease: 'power1.in',
        onComplete: () => {
          box.querySelector('.terrain').classList.remove('next');
          body.className = `${name}Body`;
          gsap.fromTo(
            box.querySelector('#contentIn'),
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.5 }
          );
        },
      });
  });
}
