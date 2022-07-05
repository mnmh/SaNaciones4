// animations
// GSAP https://greensock.com/docs/
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable);

// smooth transitions
// BarbaJS https://barba.js.org/
import barba from '@barba/core';
import barbaCss from '@barba/css';
barba.use(barbaCss);

// smooth scroll
// Locomotive Scroll https://github.com/locomotivemtl/locomotive-scroll
import LocomotiveScroll from 'locomotive-scroll';
const scroll = new LocomotiveScroll();

// modules JS
// icons
import './icons.js';

// Styles
import '../styles/main.scss';

//
console.log('conectado!');
