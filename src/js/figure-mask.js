//--GSAP
import { gsap } from 'gsap';

//--

const svgNs = 'http://www.w3.org/2000/svg';
let figures;
const paths = [
  'M4000,2000H2625.35c0,0-44.58,0.15-76.46-6.68c-23.44-5.02-48.54,2.66-68.37,1.35 c-32.93-2.19-69.26-38.32-95.21-26.88c-18.25,8.05-19.72,26.09-49.02,26.09s-59.02-7.26-82.65,0c-22.46,6.9-69.77,6.12-69.77,6.12 H0V0h4000V2000z',
  'M4000,2000H2625.35c0,0-44.58,0.15-76.46-6.68c-23.44-5.02-48.54,2.66-68.37,1.35 c-32.93-2.19-69.26-38.32-95.21-26.88c-18.25,8.05-19.72,26.09-49.02,26.09s-59.02-7.26-82.65,0c-22.46,6.9-69.77,6.12-69.77,6.12 H0V0h4000V2000z',
  'M4000,2000H2625.35c0,0-44.58,0.15-76.46-6.68c-23.44-5.02-48.54,2.66-68.37,1.35 c-32.93-2.19-69.26-38.32-95.21-26.88c-18.25,8.05-19.72,26.09-49.02,26.09s-59.02-7.26-82.65,0c-22.46,6.9-69.77,6.12-69.77,6.12 H0V0h4000V2000z',
  'M4000,2000H2625.35c0,0-44.58,0.15-76.46-6.68c-23.44-5.02-48.54,2.66-68.37,1.35 c-32.93-2.19-69.26-38.32-95.21-26.88c-18.25,8.05-19.72,26.09-49.02,26.09s-59.02-7.26-82.65,0c-22.46,6.9-69.77,6.12-69.77,6.12 H0V0h4000V2000z',
  'M4000,2000H2625.35c0,0-44.58,0.15-76.46-6.68c-23.44-5.02-48.54,2.66-68.37,1.35 c-32.93-2.19-69.26-38.32-95.21-26.88c-18.25,8.05-19.72,26.09-49.02,26.09s-59.02-7.26-82.65,0c-22.46,6.9-69.77,6.12-69.77,6.12 H0V0h4000V2000z',
  'M4000,2000H2625.35c0,0-44.58,0.15-76.46-6.68c-23.44-5.02-48.54,2.66-68.37,1.35 c-32.93-2.19-69.26-38.32-95.21-26.88c-18.25,8.05-19.72,26.09-49.02,26.09s-59.02-7.26-82.65,0c-22.46,6.9-69.77,6.12-69.77,6.12 H0V0h4000V2000z',
];
//--desordena el array de paths
const pathsShuffled = [...paths].sort(() => Math.random() - 0.5);
const pathsRandom = Math.floor(Math.random() * pathsShuffled.length);

export const figureMask = (container) => {
  figures = container.querySelectorAll('.figureMask');
  figures.forEach((figure, i) => {
    let svg = document.createElementNS(svgNs, 'svg');
    svg.xmlns = svgNs;
    svg.ariaHidden = 'true';
    svg.classList.add('svgMask');
    let defs = document.createElementNS(svgNs, 'defs');
    let clipPath = document.createElementNS(svgNs, 'clipPath');
    clipPath.id = `clip${i}`;
    let path = document.createElementNS(svgNs, 'path');
    path.id = `path${i}`;
    path.setAttribute('d', pathsShuffled[pathsRandom]);
    figure.appendChild(svg);
    svg.appendChild(defs);
    defs.appendChild(clipPath);
    clipPath.appendChild(path);

    let image = figure.querySelector('img');
    let iconX =
      figure.querySelector('figcaption').offsetLeft +
      figure.querySelector('.figIcon').offsetLeft +
      figure.querySelector('.figIcon').offsetWidth / 2;

    image.style.clipPath = `url(#clip${i})`;

    gsap.set(`#path${i}`, {
      transformOrigin: '60% 100%',
      xPercent: -60,
      yPercent: -100,
    });
    gsap.set(`#path${i}`, {
      x: iconX,
      y: image.offsetHeight,
    });
  });
};

export const resizeFigMask = () => {
  figures.forEach((figure, i) => {
    let image = figure.querySelector('img');
    let iconX =
      figure.querySelector('figcaption').offsetLeft +
      figure.querySelector('.figIcon').offsetLeft +
      figure.querySelector('.figIcon').offsetWidth / 2;

    gsap.set(`#path${i}`, {
      x: iconX,
      y: image.offsetHeight,
    });
  });
};
