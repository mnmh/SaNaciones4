//--GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//--
import { create } from './variables.js';
import { blobsShuffled } from './blobs.js';

//--

const svgNs = 'http://www.w3.org/2000/svg';

let [quotes, pos, saludosAll] = [[], [], []];
let indexOn, indexOff, prevBtn, nextBtn, closeBtn;

const posRandom = () => {
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
  gsap.utils.shuffle(pos);
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
  gsap.to(quotes[indexOn], { opacity: 0, duration: 0.5, ease: 'linear' });
};

const setQuote = () => {
  console.log(`${indexOff} -> ${indexOn}`);
  gsap.to(quotes[indexOff], { opacity: 0, duration: 0.5, ease: 'linear' });
  gsap.to(quotes[indexOn], { opacity: 1, duration: 0.8, ease: 'linear' });
};

const controlsOn = () => {
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  closeBtn.addEventListener('click', close);
};

const controlsOff = () => {
  prevBtn.removeEventListener('click', prev);
  nextBtn.removeEventListener('click', next);
  closeBtn.removeEventListener('click', close);
  console.log('controlsOff');
};

//--

export const saludos = (container) => {
  posRandom();
  const section = container.querySelector('#saludos');
  const saludosBlob = container.querySelector('#saludosSvg');
  quotes = Array.from(section.querySelectorAll('blockquote'));
  prevBtn = container.querySelector('#saludoPrev');
  nextBtn = container.querySelector('#saludoNext');
  closeBtn = container.querySelector('#saludoClose');

  quotes.forEach((quote, i) => {
    const blobRandom = Math.floor(Math.random() * blobsShuffled.length);

    const saludo = create('div');
    saludo.ariaHidden = 'true';
    // saludo.classList.add('saludo', `move${gsap.utils.random(1, 6, 1)}`);
    saludo.classList.add('saludo');

    const svg = document.createElementNS(svgNs, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('xmlns', svgNs);
    // svg.ariaHidden = 'true';
    svg.classList.add('saludoSvg');
    const path = document.createElementNS(svgNs, 'path');
    path.setAttribute('d', blobsShuffled[blobRandom]);
    path.setAttribute('transform', 'translate(100 100)');

    section.appendChild(saludo);
    saludo.appendChild(svg);
    svg.appendChild(path);

    saludosAll.push(saludo);

    gsap.set(saludo, {
      left: () => pos[i].left,
      top: () => pos[i].top,
      xPercent: -50,
      yPercent: -50,
    });

    const saludoMov = () => {
      const blob = Math.floor(Math.random() * blobsShuffled.length);
      const dur = gsap.utils.random(3, 5, 0.5);

      gsap.timeline({ onComplete: saludoMov }).to(path, {
        attr: {
          d: blobsShuffled[blob],
        },
        duration: dur,
        ease: 'sine.inOut',
      });
    };
    // saludoMov();

    saludo.addEventListener('click', () => {
      indexOn = saludosAll.findIndex((x) => x === saludo);
      console.log(indexOn);
      gsap.to(quotes[indexOn], { opacity: 1, duration: 0.8, ease: 'linear' });
      controlsOn();
    });
  });

  /* gsap.set(saludosBlob, {
    transformOrigin: '50% 50%',
    x: section.offsetWidth / 2,
    y: section.offsetHeight / 2,
  }); */

  console.log(quotes);
};
