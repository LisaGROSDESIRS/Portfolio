import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 769px)",
    isMobile: "(max-width: 768px)",
  },
  (context) => {
    let { isDesktop, isMobile } = context.conditions;

    if (isDesktop) {
      // SELECTEUR des sections à scroller horizontalement
      const sections = gsap.utils.toArray("#horizontal-scroll .content");

      // Nettoyer au cas où dans un resize, on relance la fonction.
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Réinitialiser les styles au cas où (utile si reload ou resize)
      const container = document.querySelector("#horizontal-scroll");
      container.style.overflowX = "hidden";
      container.style.display = "flex";

      // Animation GSAP : translation en % selon le nombre de sections
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#horizontal-scroll",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + container.offsetWidth,
        },
      });
    }

    if (isMobile) {
      // On désactive tous les ScrollTriggers (dont le pin et tween)
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // On peut remettre le container à un affichage normal, scroll vertical naturel.
      const container = document.querySelector("#horizontal-scroll");
      container.style.removeProperty("transform");
      container.style.removeProperty("overflow-x");
      container.style.display = "block";
    }
  }
);
