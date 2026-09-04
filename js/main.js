/* ==========================================================================
   SURYAVASHI PROPERTY HUB — Main JS
   Nav, mobile menu, counters, carousel, testimonials, filters, gallery,
   forms, lightbox.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Deferred hero video (fast first paint, then enhance) ---------- */
  var heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    function playHeroVideo() {
      try { heroVideo.muted = true; heroVideo.play().catch(function(){}); } catch (e) {}
    }
    if (document.readyState === "complete") {
      setTimeout(playHeroVideo, 400);
    } else {
      window.addEventListener("load", function () { setTimeout(playHeroVideo, 400); }, { once: true });
    }
  }

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.querySelector(".nav");
  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile menu toggle ---------- */
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
      });
    });
  }

  /* ---------- Animated counters ---------- */
  function animateCounters() {
    var statEls = document.querySelectorAll("[data-count]");
    if (!statEls.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (String(target).split(".")[1] || "").length;
      var duration = 1800;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = target * eased;
        el.textContent = val.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            run(e.target);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      statEls.forEach(function (el) { obs.observe(el); });
    } else {
      statEls.forEach(run);
    }
  }
  animateCounters();

  /* ---------- Reveal on scroll (re-runnable for dynamic content) ---------- */
  var revealObserver = null;
  function initReveal() {
    var els = document.querySelectorAll(".reveal:not(.revealed)");
    if (!els.length) return;
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
    els.forEach(function (el) { el.classList.add("revealed"); });
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { revealObserver.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("revealed"); });
    }
  }
  initReveal();

  /* ---------- Smooth scroll for same-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var targetId = a.getAttribute("href");
      if (targetId.length <= 1) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.replaceState) history.replaceState(null, "", targetId);
      }
    });
  });

  /* ---------- Scroll-to-top button ---------- */
  var topBtn = document.createElement("button");
  topBtn.className = "scroll-top";
  topBtn.setAttribute("aria-label", "Scroll to top");
  topBtn.innerHTML = "↑";
  document.body.appendChild(topBtn);

  /* ---------- Floating WhatsApp button ---------- */
  var waBtn = document.createElement("a");
  waBtn.className = "wa-float";
  waBtn.setAttribute("href", "https://wa.me/919732300007?text=" + encodeURIComponent("Hello Suryavashi Property Hub, I'd like to enquire about Green Heaven."));
  waBtn.setAttribute("target", "_blank");
  waBtn.setAttribute("rel", "noopener");
  waBtn.setAttribute("aria-label", "Chat on WhatsApp");
  waBtn.innerHTML =
    '<span class="wa-icon">' +
      '<svg viewBox="0 0 32 32" width="28" height="28" fill="none">' +
        '<path fill="#fff" d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7C11.6 28.4 13.7 29 16 29c7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.5c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 .9 1-3.9-.3-.5c-1-1.6-1.6-3.5-1.6-5.4 0-5.9 4.8-10.7 10.7-10.7S26.7 11 26.7 16.9 21.9 26.5 16 26.5zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-.9 1.1-.4.3-.7.1c-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.6-.7c.2-.2.2-.3.3-.5s0-.4 0-.5c0-.2-.7-1.8-1-2.4-.3-.6-.5-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.2 3 1.3 3.2c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"/>' +
      '</svg>' +
    "</span>" +
    '<span class="wa-tip">Chat with us</span>';
  document.body.appendChild(waBtn);
  function onScrollTop() {
    if (window.scrollY > 500) topBtn.classList.add("show");
    else topBtn.classList.remove("show");
  }
  window.addEventListener("scroll", onScrollTop, { passive: true });
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  onScrollTop();

  /* Add .revealed to hero content on load for entrance */
  var heroContent = document.querySelector(".hero-content");
  if (heroContent) heroContent.classList.add("hero-in");

  /* ---------- Testimonials slider ---------- */
  var track = document.querySelector(".t-slide");
  var dots = document.querySelectorAll(".t-dot");
  if (track && dots.length) {
    var index = 0;
    var slides = track.children.length;
    function go(i) {
      index = (i + slides) % slides;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (d, di) {
        d.classList.toggle("active", di === index);
      });
    }
    dots.forEach(function (d, di) {
      d.addEventListener("click", function () { go(di); });
    });
    setInterval(function () { go(index + 1); }, 6000);
  }

  /* ---------- Project type filter ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projCards = document.querySelectorAll("[data-category]");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        projCards.forEach(function (card) {
          var cat = card.getAttribute("data-category");
          var upcoming = card.getAttribute("data-upcoming") === "true";
          var show;
          if (f === "all") show = true;
          else if (f === "Upcoming") show = upcoming;
          else show = cat === f;
          card.style.display = show ? "flex" : "none";
        });
      });
    });
  }

  /* ---------- Render project cards into containers ---------- */
  function buildProjectCards(containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return;
    opts = opts || {};
    var projects = VIHAAN.projects.filter(function (p) {
      if (opts.filter === "types" && opts.types) return opts.types.indexOf(p.type) !== -1;
      return true;
    });
    if (opts.limit) projects = projects.slice(0, opts.limit);
    var html = "";
    projects.forEach(function (p) {
      html += projectCardHtml(p);
    });
    container.innerHTML = html;
  }

  /* Map a project to a list of filter categories it belongs to */
  function projectCategories(p) {
    var cats = [p.type];
    if (p.status === "upcoming" || p.tag === "Upcoming") cats.push("Upcoming");
    return cats;
  }

  function projectCardHtml(p) {
    var cats = projectCategories(p);
    var chips = p.configs.map(function (c) {
      return '<span class="chip">' + c + "</span>";
    }).join("");
    var tagCls = p.tag === "New Launch" ? "" : " tag-navy";
    var page = "project-detail.html?id=" + p.id;

    var detailsHtml = "";
    if (p.details) {
      var d = p.details;
      detailsHtml =
        '<div class="proj-details">' +
          (d.area ? '<div class="pd-item"><span class="pd-ic">📐</span><span>' + d.area + "</span></div>" : "") +
          (d.possession ? '<div class="pd-item"><span class="pd-ic">🗓️</span><span>' + d.possession + "</span></div>" : "") +
          (d.rera ? '<div class="pd-item"><span class="pd-ic">✔</span><span>' + d.rera + "</span></div>" : "") +
          (d.floors ? '<div class="pd-item"><span class="pd-ic">🏢</span><span>' + d.floors + "</span></div>" : "") +
        "</div>";
    }

    return (
      '<article class="proj-card reveal" data-category="' + p.type + '" data-upcoming="' + (p.status === "upcoming" || p.tag === "Upcoming") + '">' +
        '<a class="proj-media" href="' + page + '">' +
          '<span class="proj-tag' + tagCls + '">' + p.tag + "</span>" +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        "</a>" +
        '<div class="proj-body">' +
          '<div class="proj-loc">' + p.location + "</div>" +
          "<h3>" + p.name + "</h3>" +
          '<div class="proj-config">' + chips + "</div>" +
          detailsHtml +
          '<div class="proj-foot">' +
            '<div class="proj-price">' + p.price + "</div>" +
            '<a class="link-arrow" href="' + page + '">View Details →</a>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* Attach renderers if present */
  if (document.getElementById("projGrid")) {
    buildProjectCards("projGrid", {});
    initReveal();
  }

  /* ---------- Project type filter (supports "Upcoming" tag) ---------- */
  if (document.getElementById("projGridFeatured")) {
    buildProjectCards("projGridFeatured", { limit: 3 });
    initReveal();
  }
  if (document.getElementById("blogGrid")) {
    var blogContainer = document.getElementById("blogGrid");
    var bhtml = "";
    VIHAAN.blogs.forEach(function (b) {
      bhtml +=
        '<article class="blog-card reveal">' +
          '<div class="blog-media"><img src="' + b.image + '" alt="' + b.title + '" loading="lazy"></div>' +
          '<div class="blog-body">' +
            '<div class="blog-meta"><span class="cat">' + b.cat + "</span> · " + b.date + " · " + b.read + "</div>" +
            "<h3>" + b.title + "</h3>" +
            "<p>" + b.excerpt + "</p>" +
            '<a class="link-arrow" href="#">Continue Reading →</a>' +
          "</div>" +
        "</article>";
    });
    blogContainer.innerHTML = bhtml;
    initReveal();
  }

  /* ---------- Project detail page ---------- */
  function renderProjectDetail() {
    var detailWrap = document.getElementById("projectDetail");
    if (!detailWrap) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id") || "green-heaven";
    var p = VIHAAN.getProject(id);
    if (!p) p = VIHAAN.projects[0];

    /* Gallery */
    var gallery = document.getElementById("pdGallery");
    var mainImg = document.getElementById("pdMainImg");
    var thumbs = document.getElementById("pdThumbs");

    if (gallery) {
      var mainSet = false;
      function showMain(src, isVideo) {
        if (isVideo) {
          mainImg.outerHTML =
            '<video id="pdMainImg" class="pd-main-media" controls autoplay muted playsinline>' +
            '<source src="' + src + '" type="video/mp4"></video>';
        } else {
          if (mainImg.tagName && mainImg.tagName.toLowerCase() === "img") {
            mainImg.src = src;
          } else {
            var old = document.getElementById("pdMainImg");
            var img = document.createElement("img");
            img.id = "pdMainImg";
            img.src = src;
            img.alt = p.name;
            if (old && old.parentNode) old.parentNode.replaceChild(img, old);
          }
        }
      }
      var media = p.gallery.slice();
      if (p.video) media = [p.video].concat(p.gallery);
      var thtml = "";
      media.forEach(function (m, i) {
        var isV = m.indexOf(".mp4") !== -1 || m.indexOf(".webm") !== -1;
        thtml +=
          '<div class="pd-thumb' + (isV ? " video" : "") + '" data-src="' + m + '" data-video="' + isV + '">' +
            (isV ? '<img src="' + p.image + '" alt="video preview">' : '<img src="' + m + '" alt="' + p.name + ' gallery ' + (i + 1) + '">') +
          "</div>";
      });
      thumbs.innerHTML = thtml;
      /* default main */
      var mainMedia = p.video ? p.video : p.gallery[0];
      mainImg.src = p.gallery[0];
      mainImg.alt = p.name;
      thumbs.querySelectorAll(".pd-thumb").forEach(function (t) {
        t.addEventListener("click", function () {
          var src = t.getAttribute("data-src");
          var isV = t.getAttribute("data-video") === "true";
          mainImg.src = isV ? p.image : src;
          /* open video in lightbox if it's video; else swap */
          if (isV) openLightbox(src, true);
          else mainImg.src = src;
        });
      });
      /* main image click -> lightbox */
      mainImg.addEventListener("click", function () {
        openLightbox(mainImg.src, false);
      });
    }

    /* Info */
    function setText(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
    setText("pdTitle", p.name);
    setText("pdLoc", p.location);
    setText("pdPrice", p.price);
    setText("pdDesc", p.description);
    setText("pdLong", p.longDescription);
    document.title = p.name + " | " + VIHAAN.brand;

    var facts = document.getElementById("pdFacts");
    if (facts) {
      var fhtml = "";
      p.facts.forEach(function (f) {
        fhtml += '<div class="fact"><div class="k">' + f.k + '</div><div class="v">' + f.v + "</div></div>";
      });
      facts.innerHTML = fhtml;
    }

    var ahtml = "";
    VIHAAN.amenities.forEach(function (a) {
      ahtml += '<div class="amenity"><div class="ic">' + a.icon + "</div><span>" + a.name + "</span></div>";
    });
    var amWrap = document.getElementById("pdAmenities");
    if (amWrap) amWrap.innerHTML = ahtml;

    /* Amenity gallery */
    var agWrap = document.getElementById("pdAmenityGallery");
    if (agWrap && p.amenityGallery && p.amenityGallery.length) {
      var ag = "";
      p.amenityGallery.forEach(function (item) {
        ag +=
          '<figure class="amenity-fig">' +
            '<img src="' + item.img + '" alt="' + item.label + '" loading="lazy">' +
            "<figcaption>" + item.label + "</figcaption>" +
          "</figure>";
      });
      agWrap.innerHTML = ag;
      agWrap.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("click", function () { openLightbox(img.src, false); });
      });
    }

    var cfg = document.getElementById("pdConfig");
    if (cfg) {
      cfg.innerHTML = p.configs.map(function (c) { return '<span class="chip">' + c + "</span>"; }).join("");
    }

    /* phone / whatsapp in enquiry */
    var phoneInput = document.getElementById("enqPhone");
    if (phoneInput) phoneInput.setAttribute("placeholder", "Your phone number");
  }

  renderProjectDetail();

  /* ---------- Lightbox ---------- */
  function openLightbox(src, isVideo) {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.innerHTML = "";
    if (isVideo) {
      lb.innerHTML = '<video src="' + src + '" autoplay controls playsinline></video>';
    } else {
      lb.innerHTML = '<img src="' + src + '" alt="Gallery — enlarged view">';
    }
    lb.innerHTML += '<button class="lb-close" aria-label="Close">&times;</button>';
    lb.classList.add("open");
    lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
  }
  function closeLightbox() {
    var lb = document.getElementById("lightbox");
    if (lb) lb.classList.remove("open");
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* Bind dynamically created close buttons (renderProjectDetail may add) */
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList && e.target.classList.contains("lb-close")) closeLightbox();
  });

  /* ---------- Forms ---------- */
  function attachForm(formId, msgId) {
    var form = document.getElementById(formId);
    var msg = msgId ? document.getElementById(msgId) : null;
    if (!form) return;

    function setMsg(ok, text) {
      if (!msg) return;
      msg.className = "form-msg " + (ok ? "ok" : "err");
      msg.textContent = text;
      msg.setAttribute("role", "alert");
      if (msg.scrollIntoView) msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var isBad = !input.value.trim();
        input.style.borderColor = isBad ? "#c22" : "";
        if (isBad) valid = false;
        else input.style.borderColor = "";
      });
      var email = form.querySelector('input[type="email"]');
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderColor = "#c22";
        valid = false;
      }
      if (!valid) {
        setMsg(false, "Please fill the required fields correctly.");
        return;
      }

      // Collect name & phone from either enquire or contact form
      var nameInp = document.getElementById("name") || document.getElementById("enqName");
      var phoneInp = document.getElementById("phone") || document.getElementById("enqPhone");

      var sendWa = form.hasAttribute("data-wa") && nameInp && phoneInp && phoneInp.value.trim();
      var text = "";
      if (sendWa) {
        text = "Hello " + VIHAAN.brand + ", I'd like to enquire about your property.\n";
        if (nameInp && nameInp.value) text += "Name: " + nameInp.value + "\n";
        if (phoneInp && phoneInp.value) text += "Phone: " + phoneInp.value + "\n";
        var projSel = form.querySelector("select");
        if (projSel && projSel.value) text += "Interested in: " + projSel.value;
      }

      // Show success locally
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { var originalText = btn.textContent; btn.textContent = "Sending..."; btn.disabled = true; }

      setTimeout(function () {
        setMsg(true, "Thank you! Your enquiry has been received. We will contact you shortly.");
        form.reset();
        if (btn) { btn.textContent = originalText; btn.disabled = false; }
        if (sendWa) {
          window.open("https://wa.me/919732300007?text=" + encodeURIComponent(text), "_blank");
        }
      }, 300);
    });
  }
  attachForm("contactForm", "contactMsg");
  attachForm("enqForm", "enqMsg");

  /* ---------- Contact page branch select ---------- */
  var branchSel = document.getElementById("branchSelect");
  var branchInfo = document.getElementById("branchInfo");
  if (branchSel && branchInfo) {
    var branches = {
      "Noida (Head Office)": "2nd Floor, Tower-B, Tapasya Corporate Heights, Sector 126, Noida, UP 201313",
      "Greater Noida West": "Sector 16, Greater Noida West, Uttar Pradesh",
      "Delhi / NCR": "Patparganj, Delhi — landmark site",
    };
    branchSel.addEventListener("change", function () {
      branchInfo.textContent = branches[branchSel.value] || branches[Object.keys(branches)[0]];
    });
  }
})();
