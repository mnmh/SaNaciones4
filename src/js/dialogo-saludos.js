//--GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { scroll } from './smooth.js';

//--
import { body, create } from './variables.js';
import { blobs } from './blobs.js';

//--

const svgNs = 'http://www.w3.org/2000/svg';

let [
  quotes,
  pos,
  blobsShuffled,
  saludosPoints,
  pointsPaths,
  saludosGlows,
  glowsPaths,
  saludosMov,
  saludosClicks,
] = [[], [], [], [], [], [], [], [], []];
let indexOn,
  indexOff,
  controls,
  prevBtn,
  nextBtn,
  closeBtn,
  saludoBox,
  saludoBlob,
  saludoPath,
  saludosTitle;

const posDisorder = () => {
  pos = [
    {
      left: `${gsap.utils.random(5, 30, 1)}%`,
      top: `${gsap.utils.random(5, 40, 1)}%`,
    },
    {
      left: `${gsap.utils.random(35, 60, 1)}%`,
      top: `${gsap.utils.random(5, 40, 1)}%`,
    },
    {
      left: `${gsap.utils.random(65, 95, 1)}%`,
      top: `${gsap.utils.random(5, 40, 1)}%`,
    },
    {
      left: `${gsap.utils.random(5, 20, 1)}%`,
      top: `${gsap.utils.random(60, 95, 1)}%`,
    },
    {
      left: `${gsap.utils.random(30, 45, 1)}%`,
      top: `${gsap.utils.random(60, 95, 1)}%`,
    },
    {
      left: `${gsap.utils.random(55, 70, 1)}%`,
      top: `${gsap.utils.random(60, 95, 1)}%`,
    },
    {
      left: `${gsap.utils.random(80, 95, 1)}%`,
      top: `${gsap.utils.random(60, 95, 1)}%`,
    },
  ];
  // gsap.utils.shuffle(pos);
  pos = [...pos].sort(() => Math.random() - 0.5);
  blobsShuffled = [...blobs].sort(() => Math.random() - 0.5);
  quotes = [...quotes].sort(() => Math.random() - 0.5);
};

const prev = () => {
  indexOff = indexOn;
  if (indexOn <= 0) indexOn = quotes.length;
  indexOn--;
  return setQuote();
};

const next = () => {
  indexOff = indexOn;
  if (indexOn >= quotes.length - 1) indexOn = -1;
  indexOn++;
  return setQuote();
};

const close = () => {
  controlsOff();
  gsap
    .timeline({
      onComplete: () => scroll.start(),
    })
    .call(controlsOff)
    .to(quotes[indexOn], { opacity: 0, duration: 0.5, ease: 'linear' })
    .to(saludoBox, {
      left: () => pos[indexOn].left,
      top: () => pos[indexOn].top,
      width: '2%',
      duration: 1,
      ease: 'power1.in',
    })
    .to(saludosTitle, { opacity: 1, duration: 0.5, ease: 'none' })
    .to(
      saludoPath,
      {
        attr: {
          d: blobRandom(),
        },
        duration: 1.4,
        ease: 'power1.out',
      },
      '<'
    )
    .call(saludosPlay, null, '-=0.4')
    .set(saludoBox, {
      opacity: 0,
      duration: 0.3,
      ease: 'none',
    });
};

const setQuote = () => {
  gsap
    .timeline()
    .to(quotes[indexOff], { opacity: 0, duration: 0.5, ease: 'linear' })
    .to(
      saludoPath,
      {
        attr: {
          d: blobRandom(),
        },
        duration: 1.7,
        ease: 'back.out(2)',
        delay: 0.2,
      },
      '<'
    )
    .to(
      quotes[indexOn],
      {
        opacity: 1,
        duration: 0.8,
        ease: 'linear',
        delay: 0.5,
      },
      '<'
    );
};

const controlsOn = () => {
  gsap.to('#saludoControls', {
    opacity: 1,
    duration: 0.5,
    ease: 'none',
  });
  controls.classList.add('active');
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  closeBtn.addEventListener('click', close);
};

const controlsOff = () => {
  gsap.to('#saludoControls', { opacity: 0, duration: 0.5, ease: 'none' });
  controls.classList.remove('active');
  prevBtn.removeEventListener('click', prev);
  nextBtn.removeEventListener('click', next);
  closeBtn.removeEventListener('click', close);
};

const blobRandom = () => {
  return blobsShuffled[Math.floor(Math.random() * blobsShuffled.length)];
};
const blobTime = gsap.utils.random(2, 4, 0.5, true);

const pathOn = gsap.timeline({ paused: true });

const saludosPlay = (create) => {
  if (create == true) {
    posDisorder();
    saludosPoints.forEach((saludoPoint, i) => {
      gsap.set([saludoPoint, saludosGlows[i], saludosClicks[i]], {
        left: () => pos[i].left,
        top: () => pos[i].top,
      });
      gsap.set([pointsPaths[i], glowsPaths[i]], { attr: { d: blobRandom() } });
    });
    pathOn.restart(true, false);
  } else {
    pathOn.restart(true, false);
  }
  saludosClicks.forEach((saludo) => {
    saludo.classList.add('active');
  });

  /* saludosMov.forEach((mov) => {
    mov.play();
  }); */
};

const saludosPause = () => {
  saludosClicks.forEach((saludo) => {
    saludo.classList.remove('active');
  });
  saludosMov.forEach((mov) => {
    mov.pause();
  });
  pathOn.reverse();
};

//--

export const saludosStart = (container) => {
  const saludos = container.querySelector('#saludos');
  const saludosBox = container.querySelector('.saludos-box');
  saludosTitle = container.querySelector('#saludos h2');
  const saludosAlt = container.querySelectorAll('.saludosAlt');
  const saludosUp = container.querySelector('#saludosUp');
  const saludosDown = container.querySelector('#saludosDown');
  const terrain = container.querySelector('.terrain');
  const scrollContainer = container.querySelector('[data-scroll-container]');
  saludoBox = container.querySelector('#saludoBox');
  saludoBlob = container.querySelector('#saludoBlob');
  saludoPath = container.querySelector('#saludoPath');
  quotes = Array.from(saludos.querySelectorAll('blockquote'));
  controls = container.querySelector('#saludoControls');
  prevBtn = container.querySelector('#saludoPrev');
  nextBtn = container.querySelector('#saludoNext');
  closeBtn = container.querySelector('#saludoClose');

  quotes.forEach((quote, i) => {
    const saludoClick = create('div');
    saludoClick.classList.add('saludo');
    saludosUp.appendChild(saludoClick);
    saludosClicks.push(saludoClick);

    // const saludoWrap = create('div');
    // saludoWrap.classList.add('saludo');
    const saludoPoint = create('div');
    saludoPoint.classList.add('saludo', 'saludoPoint');
    const svg = document.createElementNS(svgNs, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', svgNs);
    const path = document.createElementNS(svgNs, 'path');
    path.setAttribute('d', blobs[i]);
    path.setAttribute('transform', 'translate(100 100)');

    saludosDown.appendChild(saludoPoint);
    saludoPoint.appendChild(svg);
    svg.appendChild(path);

    const saludoGlow = saludoPoint.cloneNode(true);
    saludoGlow.classList.replace('saludoPoint', 'saludoGlow');
    saludoPoint.after(saludoGlow);

    saludosPoints.push(saludoPoint);
    pointsPaths.push(path);
    saludosGlows.push(saludoGlow);
    glowsPaths.push(saludoGlow.querySelector('path'));

    let newPath = blobs[Math.floor(Math.random() * blobs.length)];
    let newDuration = blobTime();

    let mov = gsap.to(path, {
      attr: {
        d: () => newPath,
      },
      duration: () => newDuration,
      ease: 'sine.inOut',
      paused: true,
      repeat: -1,
      repeatRefresh: true,
      onRepeat: () => {
        newPath = () => blobRandom();
        newDuration = () => blobTime();
      },
    });
    saludosMov.push(mov);

    gsap.set(saludosAlt, {
      yPercent: -50,
    });

    gsap.set([saludoClick, saludoPoint, saludoGlow], {
      xPercent: -50,
      yPercent: -50,
    });

    saludoClick.addEventListener('click', () => {
      indexOn = saludosClicks.findIndex((x) => x === saludoClick);

      const center = ((window.innerHeight - saludos.offsetHeight) / 2) * -1;
      scroll.scrollTo(saludos, {
        offset: center,
        duration: 500,
        callback: () => {
          scroll.stop();
          gsap
            .timeline()
            .delay(3)
            .to('.saludosAlt', {
              top: Math.round(
                terrain.getBoundingClientRect().top * -1 +
                  window.innerHeight / 2
              ),
              duration: 0.5,
              ease: 'none',
            });
        },
      });

      saludosPause();

      gsap
        .timeline()
        .set(saludoBox, {
          left: () => pos[indexOn].left,
          top: () => pos[indexOn].top,
          width: '2%',
          opacity: 1,
          delay: 0.3,
        })
        .delay(0.5)
        .addLabel('inicio')
        .to(saludoBox, {
          width: '7%',
          duration: 0.5,
          ease: 'sine.in',
        })
        .to(saludosTitle, { opacity: 0, duration: 0.5, ease: 'none' })
        .to(saludoBox, {
          left: saludosDown.offsetWidth / 2,
          top: saludosDown.offsetHeight / 2,
          width: '130%',
          duration: 2.5,
          ease: 'back.out(2)',
        })
        .to(
          saludoPath,
          { attr: { d: blobRandom() }, duration: 2.2, ease: 'sine.inOut' },
          'inicio'
        )
        .call(controlsOn)
        .to(quotes[indexOn], {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.8,
          ease: 'linear',
        });
    });
  });

  gsap.set('.saludoPoint path', {
    transformOrigin: '50% 50%',
    scale: 0.3,
    fillOpacity: 0,
  });
  gsap.set('.saludoGlow path', {
    transformOrigin: '50% 50%',
    scale: 0.3,
    fillOpacity: 0,
  });

  pathOn
    .to(pointsPaths, {
      fillOpacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'sine.inOut',
      stagger: 0.5,
    })
    .to(
      glowsPaths,
      {
        fillOpacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'sine.inOut',
        stagger: 0.5,
      },
      '<0.2'
    );

  gsap.set(saludoBox, {
    left: 0,
    top: 0,
    xPercent: -50,
    yPercent: -50,
  });

  ScrollTrigger.create({
    // markers: true,
    scroller: scrollContainer,
    trigger: saludos,
    start: '50% 50%',
    endTrigger: saludosBox,
    end: '80% 50%',
    onEnter: () => {
      body.classList.add('color-alt');
    },
    onLeave: () => {
      body.classList.remove('color-alt');
    },
    onEnterBack: () => {
      body.classList.add('color-alt');
    },
    onLeaveBack: () => {
      body.classList.remove('color-alt');
    },
  });

  ScrollTrigger.create({
    // markers: true,
    scroller: scrollContainer,
    trigger: saludos,
    start: '50% 50%',
    endTrigger: saludosBox,
    end: '80% 50%',
    pin: true,
    pinSpacing: false,
    preventOverlaps: true,
    fastScrollEnd: true,
    onEnter: () => {
      saludosPlay(true);
      gsap.set(saludosAlt, {
        top: Math.round(
          terrain.getBoundingClientRect().top * -1 + window.innerHeight / 2 + 60
        ),
      });
    },
    onLeave: saludosPause,
    onEnterBack: () => saludosPlay(true),
    onLeaveBack: saludosPause,
  });
};
