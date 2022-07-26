//--GSAP
import { gsap } from 'gsap';
//--
import { select, create } from './variables.js';
import { caminos, menuTrama, menuChange } from './menu-variables.js';
//--

export let [backDivs, descripciones, tramas] = [[], [], []];

//--
export const menuCreate = () => {
  caminos.forEach((camino) => {
    camino.classList.add('disable');
    const arrowDiv = create('div');
    arrowDiv.ariaHidden = 'true';
    arrowDiv.classList.add('arrow');
    const arrowIcon = create('i');
    arrowIcon.ariaHidden = 'true';
    arrowIcon.dataset.feather = 'arrow-right';
    camino.querySelector('.name').appendChild(arrowDiv);
    arrowDiv.appendChild(arrowIcon);
    //--
    const trama = create('div');
    trama.ariaHidden = 'true';
    trama.classList.add('trama');
    camino.querySelector('a').appendChild(trama);
    tramas.push(trama);
    //--
    const descripcionDiv = create('div');
    descripcionDiv.innerHTML = camino.querySelector('.lead').innerHTML;
    select('#descripciones').appendChild(descripcionDiv);
    descripciones.push(descripcionDiv);
    //--
    const backImgDiv = create('div');
    select('#backImg').appendChild(backImgDiv);
    backDivs.push(backImgDiv);
  });

  menuTrama.classList.add(`trama${gsap.utils.random(1, 5, 1)}`);

  gsap.set(caminos, { xPercent: -50, yPercent: -50 });
  gsap.set(menuChange, { top: select('#headerBar').offsetHeight + 20 });
  gsap.set(tramas, { scale: 0.4, transformOrigin: '50% 50%', opacity: 0 });
};
