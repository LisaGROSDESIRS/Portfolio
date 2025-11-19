document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  const contents = gsap.utils.toArray("#horizontal-scroll .content");
  
  // Fonction pour appliquer le scroll en fonction de la taille d'écran
  function applyScroll() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Scroll vertical sur mobile
      gsap.to(contents, {
        yPercent: -100 * (contents.length - 1),
        scrollTrigger: {
          trigger: "#horizontal-scroll",
          pin: true,
          scrub: 1,
        }
      });
    } else {
      // Scroll horizontal sur desktop
      gsap.to(contents, {
        xPercent: -100 * (contents.length - 1),
        scrollTrigger: {
          trigger: "#horizontal-scroll",
          pin: true,
          scrub: 1,
        }
      });
    }
  }
  
  // Appliquer au chargement
  applyScroll();
  
  // Réappliquer en cas de resize (pour basculer entre modes)
  window.addEventListener('resize', () => {
    // Kill les ScrollTriggers existants pour éviter les conflits
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Réappliquer
    applyScroll();
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Text animations (inchangées)
  gsap.registerPlugin(SplitText);
  
  document.fonts.ready.then(() => {
    gsap.set(".chars", { opacity: 1 });
    
    let split = SplitText.create(".chars", {
      type: "words"
    });
    
    gsap.from(split.words, {
      y: 100,
      autoAlpha: 0,
      stagger: 0.15,
      rotation: "random(-40, 40)",
      duration: 0.5,
      ease: "back",
    });
  });
});

// Burger menu (inchangé)
document.querySelectorAll('.burger').forEach(burger => {
  const menu = burger.nextElementSibling;
  const toggleMenu = () => {
    const active = burger.classList.toggle('active');
    menu.style.display = active ? 'flex' : 'none';
  };
  burger.addEventListener('click', toggleMenu);
  burger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.style.display = 'none';
    })
  );
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Smooth scrolling (inchangé)
  gsap.registerPlugin(ScrollSmoother);
  let smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 2,
    smoothTouch: 0.1,
    effects: true,
  });
});
