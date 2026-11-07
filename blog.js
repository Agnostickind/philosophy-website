/* blog.js — listing filters/search/load-more + post TOC, progress, share */
(function () {
  "use strict";

  /* ---------- Listing page ---------- */
  var grid = document.getElementById("postGrid");
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".post-card"));
    var tabs = document.querySelectorAll(".filter-tabs button");
    var search = document.getElementById("blogSearch");
    var more = document.getElementById("loadMore");
    var empty = document.getElementById("noResults");
    var PAGE = 6; // cards shown per "page"
    var shown = PAGE;
    var filter = "all";
    var query = "";

    function render() {
      var matches = cards.filter(function (c) {
        var okCat = filter === "all" || c.dataset.category === filter;
        var okText = !query || c.textContent.toLowerCase().indexOf(query) !== -1;
        return okCat && okText;
      });
      cards.forEach(function (c) { c.hidden = true; });
      matches.slice(0, shown).forEach(function (c) { c.hidden = false; });
      empty.hidden = matches.length > 0;
      more.hidden = matches.length <= shown;
    }

    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("active"); });
        t.classList.add("active");
        filter = t.dataset.filter;
        shown = PAGE;
        render();
      });
    });

    search.addEventListener("input", function () {
      query = search.value.trim().toLowerCase();
      shown = PAGE;
      render();
    });

    more.addEventListener("click", function () { shown += PAGE; render(); });
    render();
  }

  /* ---------- Post page ---------- */
  var body = document.getElementById("postBody");
  if (!body) return;

  // Auto-build table of contents from h2s
  var toc = document.getElementById("toc");
  var heads = Array.prototype.slice.call(body.querySelectorAll("h2"));
  heads.forEach(function (h, i) {
    if (!h.id) {
      h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section-" + i;
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  });

  // Scroll-spy
  var links = toc.querySelectorAll("a");
  if ("IntersectionObserver" in window && heads.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id);
          });
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    heads.forEach(function (h) { io.observe(h); });
  }

  // Reading progress bar
  var bar = document.getElementById("readProgress");
  function progress() {
    var r = body.getBoundingClientRect();
    var total = r.height - window.innerHeight * 0.6;
    var done = Math.min(Math.max(-r.top + window.innerHeight * 0.2, 0), total);
    bar.style.width = (total > 0 ? (done / total) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", progress, { passive: true });
  progress();

  // Share buttons
  document.querySelectorAll("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = encodeURIComponent(location.href);
      var title = encodeURIComponent(document.title);
      var type = btn.dataset.share;
      if (type === "x") window.open("https://twitter.com/intent/tweet?url=" + url + "&text=" + title, "_blank", "noopener");
      else if (type === "linkedin") window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + url, "_blank", "noopener");
      else if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          var old = btn.textContent;
          btn.textContent = "Copied ✓";
          setTimeout(function () { btn.textContent = old; }, 1600);
        });
      }
    });
  });
})();