// Styles
import '../styles/main.scss';

// Add-to-Calendar Button
// https://github.com/jekuer/add-to-calendar-button
/* import { atcb_action, atcb_init } from 'add-to-calendar-button'; */

// scripts

//-- ajusta las mascaras de las imágenes
import { resizeFigMask } from './figure-mask.js';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

//
// modules JS
//
// menu
import './menu.js';
// transitions
import './transition-barba.js';

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  resizeFigMask();
});
