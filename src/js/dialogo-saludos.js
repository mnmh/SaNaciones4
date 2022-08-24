//--GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { scroll } from './smooth.js';

//--
import { create } from './variables.js';
import { blobs } from './blobs.js';

//--

const svgNs = 'http://www.w3.org/2000/svg';

let [
  quotes,
  pos,
  blobsShuffled,
  saludosDownAll,
  pathsAll,
  saludosMov,
  saludosUpAll,
] = [[], [], [], [], [], [], []];
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

const saludosPlay = (create) => {
  if (create == true) {
    disarray();
    saludosDownAll.forEach((saludo, i) => {
      gsap.set([saludo, saludosUpAll[i]], {
        left: () => pos[i].left,
        top: () => pos[i].top,
      });
    });
    pathsAll.forEach((path) => {
      gsap.set(path, { attr: { d: blobRandom() } });
    });
    gsap.to('.saludo path', {
      transformOrigin: '50% 50%',
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: 0.1,
      stagger: {
        each: 0.15,
        from: 'random',
        ease: 'power1.out',
      },
    });
  } else {
    gsap.to('.saludo path', {
      transformOrigin: '50% 50%',
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: 0.1,
      stagger: {
        each: 0.15,
        from: 'random',
        ease: 'power1.out',
      },
    });
  }
  saludosUpAll.forEach((saludo) => {
    saludo.classList.add('active');
  });

  /* saludosMov.forEach((mov) => {
    mov.play();
  }); */
};

const saludosPause = () => {
  saludosUpAll.forEach((saludo) => {
    saludo.classList.remove('active');
  });
  saludosMov.forEach((mov) => {
    mov.pause();
  });
  gsap.to('.saludo path', {
    opacity: 0,
    scale: 0.2,
    duration: 0.5,
  });
};

//--

export const saludosStart = (container) => {
  const saludos = container.querySelector('#saludos');
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
    const saludoUp = create('div');
    saludoUp.ariaHidden = 'true';
    saludoUp.classList.add('saludo');
    const saludoDown = create('div');
    saludoDown.ariaHidden = 'true';
    saludoDown.classList.add('saludo');

    const svg = document.createElementNS(svgNs, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', svgNs);
    svg.classList.add('saludoSvg');
    const path = document.createElementNS(svgNs, 'path');
    path.setAttribute('d', blobs[i]);
    path.setAttribute('transform', 'translate(100 100)');

    saludosUp.appendChild(saludoUp);
    svg.appendChild(path);
    saludoDown.appendChild(svg);
    saludosDown.appendChild(saludoDown);

    saludosDownAll.push(saludoDown);
    pathsAll.push(path);
    saludosUpAll.push(saludoUp);

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

    gsap.set(saludosAlt, {
      yPercent: -50,
    });

    gsap.set([saludoDown, saludoUp], {
      xPercent: -50,
      yPercent: -50,
    });

    saludosMov.push(mov);

    saludoUp.addEventListener('click', () => {
      indexOn = saludosUpAll.findIndex((x) => x === saludoUp);

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

  gsap.set(saludoBox, {
    left: 0,
    top: 0,
    xPercent: -50,
    yPercent: -50,
  });

  // saludosPlay(true);

  ScrollTrigger.create({
    markers: true,
    scroller: scrollContainer,
    trigger: saludos,
    start: '50% 50%',
    end: '+=1000 50%',
    pin: true,
    pinSpacing: true,
    onEnter: () => {
      terrain.classList.add('change');
    },
    onLeave: () => {
      terrain.classList.remove('change');
    },
    onEnterBack: () => {
      terrain.classList.add('change');
    },
    onLeaveBack: () => {
      terrain.classList.remove('change');
    },

    /* onEnter: () => {
      gsap.to(terrain, {
        backgroundColor: '#063916',
        duration: 0.5,
        ease: 'linear',
      });
    },
    onLeave: () => {
      gsap.to(terrain, {
        backgroundColor: '#e1b924',
        duration: 0.5,
        ease: 'linear',
      });
    },
    onEnterBack: () => {
      gsap.to(terrain, {
        backgroundColor: '#063916',
        duration: 0.5,
        ease: 'linear',
      });
    },
    onLeaveBack: () => {
      gsap.to(terrain, {
        backgroundColor: '#e1b924',
        duration: 0.5,
        ease: 'linear',
      });
    }, */
  });

  ScrollTrigger.create({
    // markers: true,
    scroller: scrollContainer,
    trigger: saludos,
    start: '40% 50%',
    end: '90% 20%',
    onEnter: () => {
      saludosPlay(true);
      gsap.set(saludosAlt, {
        top: Math.round(
          terrain.getBoundingClientRect().top * -1 + window.innerHeight / 2
        ),
      });
    },
    onLeave: saludosPause,
    onEnterBack: () => saludosPlay(true),
    onLeaveBack: saludosPause,
  });
};
