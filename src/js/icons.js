// Lucide icons
// https://github.com/lucide-icons/lucide
// view: https://iconer.app/lucide/
import { createIcons, X, Eye, Camera } from 'lucide';

export const icons = () => {
  createIcons({
    icons: {
      X,
      Eye,
      Camera,
    },
    attrs: {
      class: ['icon'],
    },
  });
};
