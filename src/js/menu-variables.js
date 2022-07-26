//--GSAP
import { gsap } from 'gsap';
//-- variables
import { select, selectAll } from './variables.js';

//--
//--
export let pos = [];
export const posRandom = () => {
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
  gsap.utils.shuffle(pos);
};
//--
export const dir = [
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
export const dirRandom = () => {
  gsap.utils.shuffle(dir);
};

export const caminos = Array.from(selectAll('#menuBox ul li'));
export const names = Array.from(selectAll('#menuBox .name'));
export const arrows = Array.from(selectAll('#menuBox .arrow .feather'));

export const menuBox = select('#menuBox');
export const menuToggle = select('#menu-toggle');
export const menuChange = select('#menu-change');
export const menuTrama = select('#menuTrama');

export const eye = select('.eye');
export const eyeClose = select('.eyeClose');
