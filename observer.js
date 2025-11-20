// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Création d'un objet MatchMedia GSAP pour gérer les conditions
const mm = gsap.matchMedia();

mm.add(
  {
    // Définition des conditions d'écran
    isDesktop: "(min-width: 769px)",
    isMobile: "(max-width: 768px)",
  },
  (context) => {
    const { isDesktop, isMobile } = context.conditions;

    if (isDesktop) {
      // Sélection du conteneur et des sections
      const container = document.querySelector("#horizontal-scroll");
      const sections = gsap.utils.toArray("#horizontal-scroll .content");

      // Nettoyage des ScrollTrigger existants au cas où
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Configuration du conteneur pour scroll horizontal
      container.style.overflowX = "hidden";
      container.style.display = "flex";

      // Animation GSAP pour défilement horizontal des sections
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#horizontal-scroll",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (container.scrollWidth - window.innerWidth),
        },
      });
    }

    if (isMobile) {
      // Désactivation des ScrollTrigger au mobile pour scroll vertical naturel
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Réinitialisation du style pour le scroll vertical classique
      const container = document.querySelector("#horizontal-scroll");
      container.style.removeProperty("transform");
      container.style.removeProperty("overflow-x");
      container.style.display = "block";
    }
  }
);

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
