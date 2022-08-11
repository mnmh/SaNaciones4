//--formas "blobs"
//--creadas en https://www.blobmaker.app
//-- <svg <clipPath <path d=
const blobs = [
  'M50.1,-51.2C61.7,-38.4,65.8,-19.2,67.7,1.9C69.6,23,69.2,45.9,57.6,57.3C45.9,68.8,23,68.6,1.8,66.8C-19.4,65,-38.7,61.5,-53.4,50.1C-68,38.7,-77.9,19.4,-77.8,0.1C-77.7,-19.1,-67.5,-38.2,-52.8,-51C-38.2,-63.8,-19.1,-70.2,0.1,-70.3C19.2,-70.4,38.4,-64,50.1,-51.2Z',
  'M50.7,-56.1C59.7,-41.7,56.7,-20.9,55.7,-1C54.7,18.9,55.8,37.9,46.8,49.3C37.9,60.8,18.9,64.8,1.4,63.5C-16.2,62.1,-32.4,55.4,-46.5,43.9C-60.6,32.4,-72.5,16.2,-72.4,0.2C-72.2,-15.8,-59.8,-31.7,-45.7,-46C-31.7,-60.3,-15.8,-73.1,2.5,-75.6C20.9,-78.1,41.7,-70.4,50.7,-56.1Z',
  'M52,-56.3C62.9,-41.2,64.1,-20.6,60.3,-3.7C56.6,13.1,47.9,26.2,37,42.3C26.2,58.5,13.1,77.7,-4.6,82.3C-22.3,86.9,-44.6,76.9,-58.5,60.7C-72.4,44.6,-77.8,22.3,-73,4.9C-68.1,-12.6,-52.9,-25.1,-39,-40.3C-25.1,-55.5,-12.6,-73.3,4,-77.3C20.6,-81.3,41.2,-71.5,52,-56.3Z',
  'M48.1,-41.2C64.2,-32,80.3,-16,81.1,0.8C81.9,17.6,67.3,35.2,51.3,47.9C35.2,60.6,17.6,68.4,1.4,67C-14.9,65.7,-29.8,55.2,-46,42.5C-62.2,29.8,-79.8,14.9,-81,-1.2C-82.2,-17.3,-67.1,-34.6,-50.9,-43.8C-34.6,-52.9,-17.3,-53.9,-0.6,-53.3C16,-52.6,32,-50.4,48.1,-41.2Z',
  'M60.6,-58C74.2,-46.9,78,-23.5,75.5,-2.6C72.9,18.3,64,36.7,50.3,48.7C36.7,60.7,18.3,66.4,0.6,65.8C-17.2,65.3,-34.4,58.5,-50,46.5C-65.5,34.4,-79.3,17.2,-80.7,-1.4C-82.1,-20,-71,-39.9,-55.4,-51C-39.9,-62.1,-20,-64.4,1.8,-66.2C23.5,-67.9,46.9,-69.2,60.6,-58Z',
  'M51.2,-53.6C59.7,-42.7,55.2,-21.4,54.3,-0.9C53.3,19.5,55.9,38.9,47.4,48.8C38.9,58.7,19.5,59,3.5,55.5C-12.5,52,-25,44.7,-34.3,34.8C-43.6,25,-49.7,12.5,-51.6,-2C-53.6,-16.4,-51.4,-32.8,-42.1,-43.7C-32.8,-54.6,-16.4,-60,2.5,-62.5C21.4,-65,42.7,-64.6,51.2,-53.6Z',
  'M40.1,-40.8C52.8,-27.3,64.7,-13.7,66.1,1.4C67.6,16.6,58.6,33.1,45.9,41.5C33.1,49.8,16.6,50,1.2,48.7C-14.1,47.5,-28.3,45,-43,36.6C-57.7,28.3,-72.9,14.1,-73,-0.1C-73.2,-14.4,-58.2,-28.9,-43.6,-42.4C-28.9,-55.9,-14.4,-68.4,-0.4,-68C13.7,-67.6,27.3,-54.3,40.1,-40.8Z',
  'M44.7,-48.8C56,-33.4,61.9,-16.7,64.9,3C68,22.7,68.1,45.5,56.8,59.3C45.5,73.1,22.7,78,4,74C-14.7,70,-29.5,57.1,-43.9,43.3C-58.3,29.5,-72.4,14.7,-72.8,-0.4C-73.2,-15.6,-60,-31.2,-45.6,-46.6C-31.2,-62,-15.6,-77.1,0.5,-77.7C16.7,-78.2,33.4,-64.1,44.7,-48.8Z',
];

//--desordena el array
export const blobsShuffled = [...blobs].sort(() => Math.random() - 0.5);
//--nuevo array solo con 4 elementos
export let blobRandom = blobsShuffled.slice(0, 4);
