gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // === HERO SECTION ===
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    const bg = heroSection.querySelector(".hero-bg");
    const overlay = heroSection.querySelector(".hero-overlay");
    const meta = heroSection.querySelector(".hero-meta");
    const heart = heroSection.querySelector(".hero-heart");
    const headline = heroSection.querySelector(".hero-headline");
    const words = headline ? headline.querySelectorAll(".word") : [];
    const caption = heroSection.querySelector(".hero-caption");
    const scrollHint = heroSection.querySelector(".hero-scroll-hint");

    // AUTO-PLAY ENTRANCE (on page load)
    const loadTl = gsap.timeline({ delay: 0.2 });

    if (bg) loadTl.fromTo(bg, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" }, 0);
    if (overlay) loadTl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
    if (meta) loadTl.fromTo(meta, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
    if (heart) loadTl.fromTo(heart, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.28);
    if (words.length) {
      loadTl.fromTo(words, 
        { opacity: 0, y: 40, rotate: -2 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" },
        0.35
      );
    }
    if (caption) loadTl.fromTo(caption, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.6);
    if (scrollHint) loadTl.fromTo(scrollHint, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.8);

    // SCROLL-DRIVEN ANIMATION
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.5,
        onLeaveBack: () => {
          gsap.set(bg, { scale: 1, y: 0, opacity: 1 });
          gsap.set(overlay, { opacity: 1 });
          gsap.set([meta, headline, caption].filter(Boolean), { x: 0, opacity: 1 });
          gsap.set(scrollHint, { opacity: 1 });
        }
      }
    });

    if (bg) scrollTl.fromTo(bg, { y: 0 }, { y: "-2vh", ease: "none" }, 0);
    const animTargets = [meta, headline, caption].filter(Boolean);
    if (animTargets.length) {
      scrollTl.fromTo(animTargets, { y: 0 }, { y: "-1vh", ease: "none" }, 0);
    }

    const exitStart = 0.70;
    if (animTargets.length) {
      scrollTl.fromTo(animTargets, { x: 0, opacity: 1 }, { x: "-18vw", opacity: 0, ease: "power2.in" }, exitStart);
    }
    if (scrollHint) scrollTl.fromTo(scrollHint, { opacity: 1 }, { opacity: 0, ease: "power2.in" }, exitStart);
    if (bg) scrollTl.fromTo(bg, { scale: 1, y: "-2vh" }, { scale: 1.08, y: "-6vh", ease: "none" }, exitStart);
  }

  // === SCENE SECTIONS ===
  const scenes = ["scene-a", "scene-b", "scene-c", "scene-d"];
  
  scenes.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const bg = section.querySelector(".scene-bg");
    const overlay = section.querySelector(".scene-overlay");
    const content = section.querySelector(".scene-content");
    const divider = section.querySelector(".divider-line");
    const closing = section.querySelector(".scene-closing");

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.5,
        onLeaveBack: () => {
          gsap.set(bg, { scale: 1, opacity: 1 });
          gsap.set(overlay, { opacity: 1 });
          gsap.set(content, { x: 0, opacity: 1 });
          gsap.set(divider, { scaleX: 1, opacity: 1 });
          if (closing) gsap.set(closing, { opacity: 1, y: 0 });
        }
      }
    });

    if (bg) scrollTl.fromTo(bg, { scale: 1.12, opacity: 0.25 }, { scale: 1.0, opacity: 1, ease: "none" }, 0);
    if (overlay) scrollTl.fromTo(overlay, { opacity: 0 }, { opacity: 1, ease: "none" }, 0);
    if (content) scrollTl.fromTo(content, { x: "-40vw", opacity: 0 }, { x: 0, opacity: 1, ease: "power3.out" }, 0.06);
    if (divider) scrollTl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, ease: "power2.out" }, 0.18);
    if (closing) scrollTl.fromTo(closing, { opacity: 0, y: 12 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.20);

    const exitStart = 0.70;
    if (content) scrollTl.fromTo(content, { x: 0, opacity: 1 }, { x: "-18vw", opacity: 0, ease: "power2.in" }, exitStart);
    if (divider) scrollTl.fromTo(divider, { scaleX: 1, opacity: 1 }, { scaleX: 0.6, opacity: 0, ease: "power2.in" }, exitStart);
    if (bg) scrollTl.fromTo(bg, { scale: 1.0, y: 0 }, { scale: 1.08, y: "-5vh", ease: "none" }, exitStart);
    if (closing) scrollTl.fromTo(closing, { opacity: 1 }, { opacity: 0, ease: "power2.in" }, exitStart);
  });

  // Global Snap Config
  setTimeout(() => {
    const pinned = ScrollTrigger.getAll()
      .filter((st) => st.vars.pin)
      .sort((a, b) => a.start - b.start);

    const maxScroll = ScrollTrigger.maxScroll(window);
    if (!maxScroll || pinned.length === 0) return;

    const pinnedRanges = pinned.map((st) => {
      const start = st.start / maxScroll;
      const end = (st.end || st.start) / maxScroll;
      const center = start + (end - start) * 0.35;
      return { start, end, center };
    });

    ScrollTrigger.create({
      snap: {
        snapTo: (value) => {
          const inPinned = pinnedRanges.some((r) => value >= r.start - 0.02 && value <= r.end + 0.02);
          if (!inPinned) return value;
          
          return pinnedRanges.reduce(
            (closest, r) => Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
            pinnedRanges[0] ? pinnedRanges[0].center : 0
          );
        },
        duration: { min: 0.15, max: 0.35 },
        delay: 0,
        ease: "power2.out"
      }
    });
  }, 500);

  // === LIGHTBOX FUNCTIONALITY ===
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const polaroids = document.querySelectorAll(".polaroid-trigger");

  if (lightbox && lightboxImg && polaroids.length > 0) {
    const openLightbox = (src) => {
      lightboxImg.src = src;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      // Memicu reflow agar transisi CSS berjalan mulus
      void lightbox.offsetWidth;
      lightbox.classList.remove("opacity-0");
      lightboxImg.classList.remove("scale-95");
      lightboxImg.classList.add("scale-100");
    };

    const closeLightbox = () => {
      lightbox.classList.add("opacity-0");
      lightboxImg.classList.remove("scale-100");
      lightboxImg.classList.add("scale-95");
      setTimeout(() => {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
      }, 300); // 300ms sesuai dengan duration-300 di Tailwind
    };

    polaroids.forEach(p => {
      p.addEventListener("click", () => {
        const img = p.querySelector("img");
        if (img) openLightbox(img.src);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // === SCATTERED POLAROID POPUP ===
  const cutePopup = document.getElementById("cute-popup");
  const scatteredPolaroids = document.querySelectorAll(".scattered-polaroid");
  let popupTimeout;
  
  if (cutePopup && scatteredPolaroids.length > 0) {
    scatteredPolaroids.forEach(p => {
      p.addEventListener("click", (e) => {
        clearTimeout(popupTimeout);
        const msg = p.getAttribute("data-msg");
        if (msg) {
          cutePopup.innerText = msg;
          // Posisikan popup dekat dengan kursor
          cutePopup.style.left = e.clientX + "px";
          cutePopup.style.top = (e.clientY - 50) + "px";
          
          cutePopup.classList.remove("opacity-0", "scale-75");
          cutePopup.classList.add("opacity-100", "scale-100");
          
          popupTimeout = setTimeout(() => {
            cutePopup.classList.remove("opacity-100", "scale-100");
            cutePopup.classList.add("opacity-0", "scale-75");
          }, 2000);
        }
      });
    });
  }
});
