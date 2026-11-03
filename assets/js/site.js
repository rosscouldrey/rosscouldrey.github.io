(function () {
  "use strict";

  document.querySelectorAll(".post-body img").forEach(function (image) {
    if (image.closest("a")) {
      return;
    }

    var link = document.createElement("a");
    var figure = image.closest("figure");
    var caption = figure && figure.querySelector("figcaption");
    link.href = image.getAttribute("src");
    link.className = "screenshot-link";
    link.setAttribute("aria-label", "Enlarge image: " + (image.alt || "Post illustration"));
    link.title = caption ? caption.textContent.trim() : (image.title || image.alt);
    image.parentNode.insertBefore(link, image);
    link.appendChild(image);
  });

  document.querySelectorAll(".sidebar__right .toc").forEach(function (toc, index) {
    var header = toc.querySelector("header");
    var menu = toc.querySelector(".toc__menu");
    var button = document.createElement("button");
    var mobile = window.matchMedia("(max-width: 63.999em)");

    menu.id = menu.id || "post-toc-" + index;
    button.type = "button";
    button.className = "toc__toggle";
    button.textContent = header.textContent.trim();
    button.setAttribute("aria-controls", menu.id);
    header.appendChild(button);
    toc.setAttribute("data-collapsible", "");

    function setExpanded(expanded) {
      button.setAttribute("aria-expanded", String(expanded));
      menu.hidden = !expanded;
    }

    button.addEventListener("click", function () {
      setExpanded(button.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (mobile.matches && event.target.closest("a")) {
        setExpanded(false);
      }
    });

    mobile.addEventListener("change", function () {
      setExpanded(!mobile.matches);
    });

    setExpanded(!mobile.matches);
  });
}());
