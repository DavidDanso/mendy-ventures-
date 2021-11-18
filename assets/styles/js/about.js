//ScrollOut
ScrollOut({
  threshold: 0.6,
});

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

//text animation
const textrev = gsap.timeline();
textrev.from(".line span", 1.8, {
  y: 200,
  ease: "power4.out",
  delay: 0.6,
  skewY: 10,
  stagger: {
    amount: 0.4,
  },
});

// Smooth Reveal ===========================================-->
window.sr = ScrollReveal();
sr.reveal("#col", {
  duration: 1000,
  origin: "bottom",
  distance: "50px",
  mobile: true,
  viewFactor: 0.2,
});
sr.reveal("#page-h1", {
  duration: 1000,
  origin: "bottom",
  distance: "50px",
  mobile: true,
  viewFactor: 0.2,
});

//Navigation Animation
var tl = gsap.timeline();
tl.from(".animate-this", {
  duration: 1,
  x: -30,
  opacity: 0,
  stagger: 1,
  delay: 0.2,
});
TweenMax.from(".animated", 2, {
  delay: 0.1,
  y: 10,
  opacity: 0,
  ease: Expo.easeInOut,
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
