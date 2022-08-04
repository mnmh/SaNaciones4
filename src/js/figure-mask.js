//--GSAP
import { gsap } from 'gsap';
//--

export const figureMask = (container) => {
  // let figures = container.querySelectorAll('.figureMask');
  /* gsap.set(container.querySelector('#svgMask'), {
    width: '100%',
    height: '100%',
  }); */
  gsap.set(container.querySelector('.shape2'), {
    transformOrigin: 'center center',
    scale: 0.5,
  });
  /* figures.forEach((figure) => {
    let figureBox = figure.querySelector('div');
    let maskFigure = figure.querySelector('svg');
    gsap.set(figureBox, { clipPath: 'url(#clip-figure)' });
    gsap.set(maskFigure, { transformOrigin: 'center bottom',
  }); */
  console.log('figureMask');
};
