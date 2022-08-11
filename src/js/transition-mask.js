//-- GSAP
import { gsap } from 'gsap';
//--
import { body, mask } from './variables.js';
//-- array formas(blobs) para las transiciones
import { blobRandom } from './blobs.js';

export const terrainMask = (container, name) => {
  return new Promise((done) => {
    //--
    let maskNew = container.querySelector(`#${name}Mask`);
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
      .to(container.querySelector('.terrain'), {
        opacity: 1,
        duration: 0.8,
        ease: 'power1.in',
        delay: 0.3,
      })
      .to(maskNew, {
        scale: 1.5,
        attr: {
          d: blobRandom[1],
        },
        duration: 1,
        ease: 'power1.in',
      })
      .to(maskNew, {
        scale: 3,
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
        attr: {
          d: blobRandom[3],
        },
        duration: 0.8,
        ease: 'power1.in',
        onComplete: () => {
          container.querySelector('.terrain').classList.remove('next');
          body.className = `${name}Body`;
          gsap.fromTo(
            container.querySelector('.content'),
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 0.5 }
          );
        },
      });
  });
};
