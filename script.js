(() => {
    const pagesEl = document.getElementById('pages');
    const pages = document.querySelectorAll('.page');
    const numPages = pages.length;
    let currentPage = 0;
    let isScrolling = false;
  
    function animatePage(index) {
      pages.forEach(p => p.classList.remove('animated'));
      const active = pages[index];
      if (active) active.classList.add('animated');
    }
  
    function scrollToPage(index) {
      if (index < 0) index = numPages - 1;
      if (index >= numPages) index = 0;
      pagesEl.scrollTo({
        top: window.innerHeight * index,
        behavior: 'smooth'
      });
      currentPage = index;
      animatePage(index);
    }
  
    // Défilement à la molette
    let wheelTimeout;
    pagesEl.addEventListener('wheel', e => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;
      if (e.deltaY > 0) scrollToPage(currentPage + 1);
      else if (e.deltaY < 0) scrollToPage(currentPage - 1);
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => { isScrolling = false; }, 700);
    }, { passive: false });
  
    // Défilement tactile
    let startY = 0;
    pagesEl.addEventListener('touchstart', e => startY = e.touches[0].clientY);
    pagesEl.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    pagesEl.addEventListener('touchend', e => {
      const delta = startY - e.changedTouches[0].clientY;
      if (isScrolling) return;
      if (delta > 50) scrollToPage(currentPage + 1);
      else if (delta < -50) scrollToPage(currentPage - 1);
      isScrolling = true;
      setTimeout(() => isScrolling = false, 700);
    });
  
    // Initialisation
    window.addEventListener('load', () => {
      scrollToPage(0);
      animatePage(0);
    });
  
    // Gestion des menus burgers
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
  })();
  
 // Improved JS for responsive iframe resizing
      function resizeIframes() {
        const iframes = document.querySelectorAll("iframe");
        iframes.forEach((frame) => {
          const container = frame.parentElement;
          if (container.classList.contains("iframe-container")) {
            // The CSS handles the aspect ratio, but we can add dynamic adjustments if needed
            frame.style.width = "100%";
            frame.style.height = "100%";
          }
        });
      }
  
      window.addEventListener("resize", resizeIframes);
      window.addEventListener("load", resizeIframes); // Ensure it runs on load

      
  
 
  
  // overlay
  
  document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.DDF-image'));
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeBtn = document.getElementById('overlay-close');
    const prevBtn = document.getElementById('overlay-prev');
    const nextBtn = document.getElementById('overlay-next');
    let currentIndex = -1;
  
    if (!overlay || !overlayImg) return; // sécurité
  
    function openOverlay(index) {
      if (index < 0 || index >= images.length) return;
      const img = images[index];
      overlayImg.src = img.src;
      overlayImg.alt = img.alt || 'Image agrandie';
      currentIndex = index;
      overlay.classList.add('active');
      document.body.classList.add('overlay-open');
      overlay.setAttribute('aria-hidden', 'false');
    }
  
    function closeOverlay() {
      overlay.classList.remove('active');
      document.body.classList.remove('overlay-open');
      overlay.setAttribute('aria-hidden', 'true');
      // libérer src si tu veux
      // overlayImg.src = '';
      currentIndex = -1;
    }
  
    function showNext(step = 1) {
      if (images.length === 0) return;
      let next = currentIndex + step;
      if (next < 0) next = images.length - 1;
      if (next >= images.length) next = 0;
      openOverlay(next);
    }
  
    // clic sur image ouvre l'overlay
    images.forEach((img, i) => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        openOverlay(i);
      });
    });
  
    // fermeture par croix
    closeBtn && closeBtn.addEventListener('click', closeOverlay);
  
    // fermeture en cliquant en-dehors de l'image
    overlay.addEventListener('click', (e) => {
      // si on clique sur le fond (overlay lui-même), fermer
      if (e.target === overlay) closeOverlay();
    });
  
    // navigation prev/next
    prevBtn && prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(-1); });
    nextBtn && nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(1); });
  
    // clavier: Esc pour fermer, flèches pour navigation
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeOverlay();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    });
  
    // prévention : si une image est en train de charger, on attend (optionnel)
    overlayImg.addEventListener('error', () => {
      // fallback : désactiver l'image ou afficher un message
      overlayImg.alt = 'Erreur de chargement de l’image';
    });
  
  
    // Fonction pour charger la nouvelle page
    function loadNewPage(url) {
      const container = document.querySelector('.container');
      fetch(url)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const newDoc = parser.parseFromString(html, 'text/html');
          const newContainer = newDoc.querySelector('.container');
          if (newContainer) {
            // Sauvegarder la référence avant remplacement
            const oldPagesEl = document.getElementById('pages') || container;
            container.innerHTML = newContainer.innerHTML;
            // Obtenir la nouvelle référence après remplacement
            const newPagesEl = document.getElementById('pages') || document.querySelector('.container');
            // Réinitialiser la position sur le nouveau conteneur
            gsap.set(newPagesEl, { y: 0 });
            // Réinitialiser les scripts si nécessaire (recharger script.js)
            const newScript = newDoc.querySelector('script[src="script.js"]');
            if (newScript) {
              const script = document.createElement('script');
              script.src = 'script.js';
              document.body.appendChild(script);
            }
            // Désactiver ScrollSmoother temporairement si actif pour éviter les conflits
            if (smoother) smoother.kill();
          }
        })
        .catch(err => console.error('Erreur de chargement:', err));
    }
  
    // Gestionnaire pour les liens de navigation
    document.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === 'projet.html') {
          e.preventDefault();
          slideUpToPage(href);
        } else if (href === 'index.html') {
          e.preventDefault();
          slideDownToPage(href);
        }
      });
    });
  });


  window.onload = () => {
  const transition = document.querySelector('.transition');
  const links = document.querySelectorAll('.transition-link');

  // Effet d'entrée (wipe descend)
  setTimeout(() => {
    transition.classList.remove('active');
  }, 100);

  // Effet de sortie (wipe monte avant navigation)
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.href;

      transition.classList.add('active');

      setTimeout(() => {
        window.location.href = target;
      }, 600);
    });
  });
};



