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

  // === SCATTERED POLAROID CAPTION (In-Frame) ===
  window.showCaption = function(el) {
    const caption = el.querySelector(".polaroid-caption");
    if (caption) {
      caption.classList.remove("opacity-0");
      setTimeout(() => {
        caption.classList.add("opacity-0");
      }, 2500);
    }
  };

  // === INTERACTIVE ENVELOPE ===
  const envelope = document.getElementById("love-letter-envelope");
  
  // Modal elements
  const letterModal = document.getElementById("letter-modal");
  const letterModalPaper = document.getElementById("letter-modal-paper");
  const letterClose = document.getElementById("letter-close");
  const letterArea = document.getElementById("letter-content-area");
  const letterSig = document.getElementById("letter-signature");
  
  const letterAudio = document.getElementById("letter-audio");
  
  if (envelope && letterModal && letterArea) {
    const letterText = `haloo sayangg 🥺\n\nmakasih yaa udah bertahan sejauh ini sama aku.\naku tau aku belum jadi orang yang sempurna, kadang nyebelin, kadang bikin kamu kesel juga 😔\n\ntapi percaya yaa, aku selalu serius waktu sayang sama kamu.\n\nmakasih udah hadir dan bikin hari-hari aku jadi lebih rame, lebih hangat, dan lebih bahagia 💗\n\naku suka semua hal tentang kamu, bahkan hal-hal kecil yang mungkin kamu sendiri ga sadar.\n\nsemoga kita bisa terus bareng-bareng yaa,\nmasih ketawa receh, masih cerita random, masih saling usahain satu sama lain 🫶\n\nand for the last time…\n\nhappy 1st anniversary bububb 😠💞`;
    
    let isOpened = false;
    let typeWriterInterval = null;
    
    const openLetterModal = () => {
      // Dapatkan posisi amplop untuk titik awal terbang
      const rect = envelope.getBoundingClientRect();
      const startX = rect.left + rect.width / 2 - window.innerWidth / 2;
      const startY = rect.top - window.innerHeight / 2 + 50; // offset sedikit ke atas
      
      letterModal.classList.remove("hidden");
      letterModal.classList.add("flex");
      void letterModal.offsetWidth; // reflow
      
      letterModal.classList.remove("opacity-0");
      
      // Pastikan kelas dasar tidak mengganggu GSAP
      letterModalPaper.classList.remove("scale-95", "transition-transform", "duration-500");
      letterModalPaper.classList.add("scale-100");
      
      // Animasi Terbang (FLIP) dari amplop ke tengah layar
      gsap.fromTo(letterModalPaper, 
        {
          x: startX,
          y: startY,
          scale: 0.15,
          opacity: 0,
          rotation: -10
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.9,
          ease: "back.out(1.2)"
        }
      );
      
      // Start typing animation
      let i = 0;
      letterArea.innerHTML = "";
      if(letterSig) letterSig.classList.add("opacity-0");
      
      clearInterval(typeWriterInterval);
      typeWriterInterval = setInterval(() => {
        if (i < letterText.length) {
          let char = letterText.charAt(i);
          if (char === '\n') {
            letterArea.innerHTML += "<br/>";
          } else {
            letterArea.innerHTML += char;
          }
          // Only auto scroll if the user hasn't scrolled manually much
          if (letterModalPaper.scrollTop + letterModalPaper.clientHeight >= letterModalPaper.scrollHeight - 50) {
             letterModalPaper.scrollTop = letterModalPaper.scrollHeight;
          }
          i++;
        } else {
          clearInterval(typeWriterInterval);
          if (letterSig) letterSig.classList.remove("opacity-0");
        }
      }, 40); // typing speed
    };

    const closeLetterModal = () => {
      letterModal.classList.add("opacity-0");
      
      // Animate back slightly
      gsap.to(letterModalPaper, {
        scale: 0.95,
        opacity: 0,
        duration: 0.4
      });
      
      setTimeout(() => {
        letterModal.classList.add("hidden");
        letterModal.classList.remove("flex");
        // Reset envelope state so it can be opened again
        envelope.classList.remove("is-open");
        isOpened = false;
        
        // Kembalikan kelas transisi standar
        letterModalPaper.classList.add("transition-transform", "duration-500");
      }, 500);
    };
    
    envelope.addEventListener("click", () => {
      if (isOpened) return;
      isOpened = true;
      
      // Open envelope CSS trigger
      envelope.classList.add("is-open");
      
      // Play Audio (if exists)
      if (letterAudio) {
        letterAudio.volume = 0.4;
        letterAudio.play().catch(e => console.log("Audio autoplay prevented"));
      }
      
      // Confetti effect
      setTimeout(() => {
        if (typeof confetti === "function") {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#D94F70', '#F2C2D4', '#ffffff'],
            disableForReducedMotion: true
          });
        }
      }, 400);
      
      // Show modal after envelope opens
      setTimeout(() => {
        openLetterModal();
      }, 900);
    });
    
    if (letterClose) {
      letterClose.addEventListener("click", closeLetterModal);
    }
    letterModal.addEventListener("click", (e) => {
      if (e.target === letterModal) closeLetterModal();
    });
  }
});
