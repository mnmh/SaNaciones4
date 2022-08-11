// Lucide icons
// https://github.com/lucide-icons/lucide
// view: https://iconer.app/lucide/
import { createIcons, Camera, X, ArrowLeft, ArrowRight } from 'lucide';

export const icons = () => {
  createIcons({
    icons: {
      Camera,
      X,
      ArrowLeft,
      ArrowRight,
    },
    attrs: {
      class: ['icon'],
    },
  });
};
