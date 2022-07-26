export const select = (e) => document.querySelector(e);
export const selectAll = (e) => document.querySelectorAll(e);
export const create = (e) => document.createElement(e);
//
export const body = select('body');

export let mask;
export const newMask = (newX, newY) => {
  mask = {
    x: newX,
    y: newY,
  };
};
export let caminoSel;
export const newCamino = (newMain) => {
  caminoSel = newMain;
};
