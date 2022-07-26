//-- GSAP
import { gsap } from 'gsap';
//--
import { body, mask } from './variables.js';
//-- array formas(blobs) para las transiciones
import { blobRandom } from './blobs.js';

export const terrainMask = (box, name) => {
  return new Promise((done) => {
    //--
    let maskNew = box.querySelector(`#${name}Mask`);
    //--
    gsap
      .timeline({
        onComplete: () => {
          done();
        },
      })
      .set(maskNew, {
        scale: 0.5,
        x: mask.x,
        y: mask.y,
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[0],
        },
      })
      .to(box.querySelector('.terrain'), {
        opacity: 1,
        duration: 0.8,
        ease: 'power1.in',
        delay: 0.3,
      })
      .to(maskNew, {
        scale: 1.5,
        x: mask.x,
        y: mask.y,
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[1],
        },
        duration: 1,
        ease: 'power1.in',
      })
      .to(maskNew, {
        scale: 3,
        x: mask.x,
        y: mask.y,
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[2],
        },
        duration: 1,
        ease: 'power1.out',
      })
      .to(maskNew, {
        scale: 12,
        x: '50vw',
        y: '50vh',
        transformOrigin: 'center center',
        attr: {
          d: blobRandom[3],
        },
        duration: 0.8,
        ease: 'power1.in',
        onComplete: () => {
          box.querySelector('.terrain').classList.remove('next');
          body.className = `${name}Body`;
          gsap.fromTo(
            box.querySelector('.content'),
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.5 }
          );
        },
      });
  });
};
