//--GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//--
import { create } from './variables.js';
import { blobs } from './blobs.js';

//--

const svgNs = 'http://www.w3.org/2000/svg';

let [quotes, pos, blobsShuffled, saludosAll, pathsAll, saludosMov] = [
  [],
  [],
  [],
  [],
  [],
  [],
];
let indexOn,
  indexOff,
  controls,
  prevBtn,
  nextBtn,
  closeBtn,
  saludoBlob,
  saludoPath;

const disarray = () => {
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
    .timeline()
    .call(controlsOff)
    .to(quotes[indexOn], { opacity: 0, duration: 0.5, ease: 'linear' })
    .to(saludoBlob, {
      left: () => pos[indexOn].left,
      top: () => pos[indexOn].top,
      width: '3%',
      duration: 1,
      ease: 'power1.in',
    })
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
    .call(saludosPlay, null, '-=0.5')
    .to(saludoBlob, {
      opacity: 0,
      duration: 0.6,
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
          d: blobsShuffled[indexOn],
        },
        duration: 1,
        ease: 'sine.inOut',
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

const saludosPlay = (create) => {
  if (create == true) {
    disarray();
    saludosAll.forEach((saludo, i) => {
      gsap.set(saludo, {
        left: () => pos[i].left,
        top: () => pos[i].top,
      });
    });
    pathsAll.forEach((path) => {
      gsap.set(path, { attr: { d: blobRandom() } });
    });
    gsap.fromTo(
      '.saludo path',
      { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.1,
        stagger: {
          each: 0.15,
          from: 'random',
          ease: 'power1.out',
        },
      }
    );
  } else {
    gsap.fromTo(
      '.saludo path',
      { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power1.out',
      }
    );
  }
  saludosAll.forEach((saludo) => {
    saludo.classList.add('active');
  });

  saludosMov.forEach((mov) => {
    mov.play();
  });
};
const saludosPause = () => {
  saludosAll.forEach((saludo) => {
    saludo.classList.remove('active');
  });
  gsap.fromTo(
    '.saludo path',
    { opacity: 1, scale: 1, transformOrigin: '50% 50%' },
    {
      opacity: 0,
      scale: 0.2,
      duration: 0.5,
    }
  );
  saludosMov.forEach((mov) => {
    mov.pause();
  });
};

//--

export const saludos = (container) => {
  const section = container.querySelector('#saludos');
  saludoBlob = container.querySelector('#saludoBlob');
  saludoPath = container.querySelector('#saludoPath');
  quotes = Array.from(section.querySelectorAll('blockquote'));
  controls = container.querySelector('#saludoControls');
  prevBtn = container.querySelector('#saludoPrev');
  nextBtn = container.querySelector('#saludoNext');
  closeBtn = container.querySelector('#saludoClose');

  quotes.forEach((quote, i) => {
    const saludo = create('div');
    saludo.ariaHidden = 'true';
    saludo.classList.add('saludo');

    const svg = document.createElementNS(svgNs, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', svgNs);
    svg.classList.add('saludoSvg');
    const path = document.createElementNS(svgNs, 'path');
    path.setAttribute('d', blobs[i]);
    path.setAttribute('transform', 'translate(100 100)');

    section.appendChild(saludo);
    saludo.appendChild(svg);
    svg.appendChild(path);

    saludosAll.push(saludo);
    pathsAll.push(path);

    let newPath = blobs[Math.floor(Math.random() * blobs.length)];
    let newDuration = blobTime();

    let mov = gsap.to(path, {
      attr: {
        d: () => newPath,
      },
      duration: () => newDuration,
      ease: 'none',
      paused: true,
      repeat: -1,
      repeatRefresh: true,
      onRepeat: () => {
        newPath = () => blobRandom();
        newDuration = () => blobTime();
      },
    });

    gsap.set(saludo, {
      xPercent: -50,
      yPercent: -50,
    });

    saludosMov.push(mov);

    saludo.addEventListener('click', () => {
      indexOn = saludosAll.findIndex((x) => x === saludo);
      saludosPause();
      gsap
        .timeline()
        .set(saludoBlob, {
          left: () => pos[indexOn].left,
          top: () => pos[indexOn].top,
          width: '5%',
          opacity: 1,
        })
        .addLabel('inicio')
        .to(saludoBlob, {
          width: '10%',
          duration: 0.5,
          ease: 'none',
        })
        .to(saludoBlob, {
          left: section.offsetWidth / 2,
          top: section.offsetHeight / 2,
          width: '100%',
          duration: 1.2,
          ease: 'sine.out',
        })
        .to(saludoBlob, {
          width: '130%',
          duration: 0.4,
          ease: 'none',
        })
        .to(
          saludoPath,
          { attr: { d: blobRandom() }, duration: 1.5, ease: 'none' },
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

  gsap.set(saludoBlob, {
    left: 0,
    top: 0,
    xPercent: -50,
    yPercent: -50,
  });

  // saludosPlay(true);

  ScrollTrigger.create({
    scroller: container.querySelector('[data-scroll-container]'),
    trigger: section,
    start: 'top 50%',
    end: '90% 20%',
    onEnter: () => saludosPlay(true),
    onLeave: saludosPause,
    onEnterBack: () => saludosPlay(true),
    onLeaveBack: saludosPause,
  });
};
