//--GSAP
import { gsap } from 'gsap';
import { caminos } from './menu-variables.js';

//--
const vel = [-1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8];

export const menuParall = () => {
  gsap.utils.shuffle(vel);
  document.addEventListener('mousemove', parall, false);
  /* document.addEventListener("touchmove", parall, false); */
};
export const parall = (e) => {
  caminos.forEach((i, j) => {
    let x = (window.innerWidth - e.pageX * vel[j]) / 100;
    let y = (window.innerHeight - e.pageY * vel[j]) / 100;
    gsap.to(i, { x: x, y: y, duration: 1, ease: 'sine' });
  });
};
