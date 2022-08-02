//--GSAP
import { gsap } from 'gsap';
//--

export const figureMask = (container) => {
  let figures = container.querySelectorAll('.figureMask');
  /* gsap.set(container.querySelector('.figureMask div'), {
    clipPath: 'url(#clip-figure)',
  }); */
  figures.forEach((figure) => {
    let figureBox = figure.querySelector('div');
    let maskFigure = figure.querySelector('svg');
    gsap.set(figureBox, { clipPath: 'url(#clip-figure)' });
    // gsap.set(maskFigure, { transformOrigin: 'center bottom',
  });
  console.log('figureMask');
};
