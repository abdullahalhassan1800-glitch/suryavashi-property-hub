/* ==========================================================================
   Embassy Autograph — page-specific behaviour
   Gallery lightbox (prev/next, keyboard, swipe), lazy video, smooth anchors.
   Loaded ONLY by embassy-autograph/index.html — never touches site JS.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Smooth in-page anchors (hero CTAs, nav enquire) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var figures = Array.prototype.slice.call(document.querySelectorAll(".ea-gallery-item"));
  var lb = document.getElementById("eaLb");
  var lbImg = document.getElementById("eaLbImg");
  var lbCounter = document.getElementById("eaLbCounter");
  var current = 0;

  var items = figures.map(function (fig) {
    var img = fig.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") || "" };
  });

  function show(i) {
    if (!items.length) return;
    current = (i + items.length) % items.length;
    lbImg.src = items[current].src;
    lbImg.alt = items[current].alt;
    lbCounter.textContent = (current + 1) + " / " + items.length;
  }
  function open(i) {
    if (!lb) return;
    show(i);
    lb.classList.add("open");
    document.body.classList.add("ea-lb-open");
  }
  function close() {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.classList.remove("ea-lb-open");
  }

  figures.forEach(function (fig, i) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "View image " + (i + 1) + " of " + figures.length + " full screen");
    fig.addEventListener("click", function () { open(i); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  if (lb) {
    document.getElementById("eaLbClose").addEventListener("click", close);
    document.getElementById("eaLbPrev").addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
    document.getElementById("eaLbNext").addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.id === "eaLbStage") close(); });
  }

  document.addEventListener("keydown", function (e) {
    if (!lb || !lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });

  /* Touch swipe */
  var touchX = null;
  if (lb) {
    lb.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].screenX;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 45) show(dx > 0 ? current - 1 : current + 1);
      touchX = null;
    }, { passive: true });
  }

  /* ---------- Lazy video (no download until user presses play) ---------- */
  var playBtn = document.getElementById("eaPlayBtn");
  var poster = document.getElementById("eaPoster");
  var video = document.getElementById("eaVideo");
  if (playBtn && video) {
    playBtn.addEventListener("click", function () {
      if (!video.getAttribute("src")) {
        var source = document.createElement("source");
        source.src = "../images/embassy-autograph/ea-video.mp4";
        source.type = "video/mp4";
        video.appendChild(source);
        video.load();
      }
      video.setAttribute("controls", "");
      if (poster) poster.style.display = "none";
      playBtn.style.display = "none";
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    });
  }
})();
