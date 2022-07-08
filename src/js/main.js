// Styles
import '../styles/main.scss';

// animations
// GSAP https://greensock.com/docs/
/* import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, Draggable); */

// smooth scroll
// Locomotive Scroll https://github.com/locomotivemtl/locomotive-scroll
/* import LocomotiveScroll from 'locomotive-scroll';
const scroll = new LocomotiveScroll(); */

// Add-to-Calendar Button
// https://github.com/jekuer/add-to-calendar-button
/* import { atcb_action, atcb_init } from 'add-to-calendar-button'; */

// scripts

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

//
// modules JS
//
// icons
import './icons.js';
// menu
import './menu.js';

//
