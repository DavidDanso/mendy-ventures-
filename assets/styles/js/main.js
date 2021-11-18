//Navigation
$(document).ready(function () {
  //
  $(".content__item").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  //
  $(window).scroll(function () {
    var sc = $(window).scrollTop();
    if (sc > 0) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });
});

//Navigation Animation
var tl = gsap.timeline();
tl.from(".animate-this", {
  duration: 1,
  x: -30,
  opacity: 0,
  stagger: 1,
  delay: 0.1,
});
TweenMax.from(".animated", 2, {
  delay: 0.1,
  y: 10,
  opacity: 0,
  ease: Expo.easeInOut,
});

//text animation
const textrev = gsap.timeline();
textrev.from(".line span", 1.8, {
  y: 200,
  ease: "power4.out",
  delay: 0.1,
  skewY: 10,
  stagger: {
    amount: 0.4,
  },
});

//background animation
// var tll = gsap.timeline();
// tll.to('#image', {
//   clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
//   duration: 1.1,
// });

// Smooth Reveal ===========================================-->
window.sr = ScrollReveal();
sr.reveal("#page-h1", {
  duration: 1000,
  origin: "bottom",
  distance: "50px",
  mobile: true,
  viewFactor: 0.2,
});

//Button effect
document.querySelectorAll(".button").forEach((button) => {
  let div = document.createElement("div"),
    letters = button.textContent.trim().split("");

  function elements(letter, index, array) {
    let element = document.createElement("span"),
      part = index >= array.length / 2 ? -1 : 1,
      position =
        index >= array.length / 2
          ? array.length / 2 - index + (array.length / 2 - 1)
          : index,
      move = position / (array.length / 2),
      rotate = 1 - move;

    element.innerHTML = !letter.trim() ? "&nbsp;" : letter;
    element.style.setProperty("--move", move);
    element.style.setProperty("--rotate", rotate);
    element.style.setProperty("--part", part);

    div.appendChild(element);
  }

  letters.forEach(elements);

  button.innerHTML = div.outerHTML;

  button.addEventListener("mouseenter", (e) => {
    if (!button.classList.contains("out")) {
      button.classList.add("in");
    }
  });

  button.addEventListener("mouseleave", (e) => {
    if (button.classList.contains("in")) {
      button.classList.add("out");
      setTimeout(() => button.classList.remove("in", "out"), 950);
    }
  });
});

//Cursor animation
let mouseCursor = document.querySelector(".cursor");
let links = document.querySelectorAll("a");

window.addEventListener("mousemove", cursor);

function cursor(e) {
  gsap.to(mouseCursor, 0.4, {
    x: e.clientX,
    y: e.clientY,
  });
}

links.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-grow");
    gsap.to(mouseCursor, 0.4, {
      scale: 1,
    });
  });

  link.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-grow");
    gsap.to(mouseCursor, 0.4, {
      scale: 2,
    });
  });
});

//Lax effect
window.onload = function () {
  document.getElementById("main").classList.add("loaded");

  lax.setup();

  const update = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(update);
  };

  window.requestAnimationFrame(update);

  let w = window.innerWidth;
  window.addEventListener("resize", function () {
    if (w !== window.innerWidth) {
      lax.updateElements();
    }
  });
};

//ScrollTriger
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div>
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line div");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 100%",
      },
    });
    tl.set(lines, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.1,
    });
  });
});

//Smooth Scrolling ==========================================================-->
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });
