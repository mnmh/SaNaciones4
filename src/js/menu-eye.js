//-- GSAP
import { gsap } from 'gsap';

import { eye, eyeClose } from './menu-variables.js';

let blinkOn = true;

export const blinkChange = (param) => {
  blinkOn = param;
};
export let blink;
export const blinkPlay = () => {
  blink = gsap
    .timeline({
      onComplete: () => {
        if (blinkOn == true) {
          gsap.delayedCall(gsap.utils.random(1, 8), () => blink.restart());
        }
      },
    })
    .to(eye, { opacity: 0, duration: 0.2, ease: 'power2.in' })
    .to(eyeClose, { opacity: 1, duration: 0.3, ease: 'power2.in' }, '<')
    .call(() => {
      if (blinkOn == true) {
        blink.resume();
      } else {
        blink.pause();
        gsap.delayedCall(1.4, () => blink.resume());
      }
    })
    .to(eyeClose, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      delay: 0.07,
    })
    .to(eye, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '<0.05');
};
