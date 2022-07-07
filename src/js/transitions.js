// smooth transitions
// BarbaJS https://barba.js.org/
import barba from '@barba/core';
import barbaCss from '@barba/css';
barba.use(barbaCss);

//Function to Delay
const delay = n => {
  n = n || 2000;
  return new Promise( done =>{
      setTimeout(()=>{
        done();
      },n)
  })
}
barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});
barba.init({
	debug: true,
  timeout: 5000,
  preventRunning: true,
  transitions: [
    {
      name: 'transMenu',
      sync: true,
      once() { },
      afterOnce: ({ next }) => {
        gsap.fromTo(next.container.querySelector("#content"), { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out'
        });
        mainDiv = next.container;
			},
      async beforeLeave() {
        const done = this.async();
        await menuClose(caminoSel);
        await delay(1000);
        gsap.to(loading, { opacity: 0, scale: 2, duration: 0.3, delay: 0.1, ease: 'power2.in', onComplete: () => loading.classList.remove("rotation") });
        done();
      },
      leave() { },
      enter() { },
      afterEnter: ({ next }) => {
        gsap.fromTo(next.container.querySelector("#content"), { opacity: 0 }, { opacity: 1, duration: 1, ease: "power3.out "});
        body.className = `${next.namespace}Body`;
        mainDiv = next.container;
        
      }
    }
  ],
});