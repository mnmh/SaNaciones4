const scrolls = container => {
  let sections = container.querySelectorAll('section');
  sections.forEach(x => x.setAttribute('data-scroll-section', ''));
  container.querySelector('.terrain').setAttribute('data-scroll-sticky', '');
  console.log('scrolls!');
};

export default scrolls;
