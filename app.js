/* =========================================================
   TORGIO DONUBARI PORTFOLIO
   app.js
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const clamp = (
  value,
  minimum,
  maximum
) => {

  return Math.min(
    Math.max(
      value,
      minimum
    ),
    maximum
  );

};


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;



/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton =
  document.getElementById(
    "menuButton"
  );


const mobileMenu =
  document.getElementById(
    "mobileMenu"
  );


menuButton?.addEventListener(
  "click",
  () => {

    mobileMenu?.classList.toggle(
      "hidden"
    );

  }
);


mobileMenu
  ?.querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu.classList.add(
          "hidden"
        );

      }
    );

  });



/* =========================================================
   YEAR
========================================================= */

const year =
  document.getElementById(
    "year"
  );


if (year) {

  year.textContent =
    new Date().getFullYear();

}



/* =========================================================
   HERO TEXT ROTATION
========================================================= */

const heroPhrase =
  document.getElementById(
    "heroPhrase"
  );


const heroMessages = [

  "that sell & scale.",

  "built for growth.",

  "that automate the follow-up.",

  "that move leads forward.",

  "that work after you log off.",

  "without the manual chasing."

];


let currentHeroMessage = 0;



function changeHeroMessage() {

  if (
    !heroPhrase ||
    prefersReducedMotion
  ) {
    return;
  }


  heroPhrase.classList.add(
    "changing"
  );


  setTimeout(
    () => {

      currentHeroMessage =
        (
          currentHeroMessage + 1
        )
        %
        heroMessages.length;


      heroPhrase.textContent =
        heroMessages[
          currentHeroMessage
        ];


      heroPhrase.classList.remove(
        "changing"
      );

    },
    350
  );

}



if (
  heroPhrase &&
  !prefersReducedMotion
) {

  setInterval(
    changeHeroMessage,
    3000
  );

}



/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver"
  in
  window
) {

  const revealObserver =
    new IntersectionObserver(

      (
        entries,
        observer
      ) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target
              .classList
              .add(
                "show"
              );


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: .12
      }

    );


  revealElements.forEach(
    (
      element,
      index
    ) => {

      element.style.transitionDelay =
        `${
          Math.min(
            index,
            4
          )
          *
          65
        }ms`;


      revealObserver.observe(
        element
      );

    }
  );

}

else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "show"
      );

    }
  );

}



/* =========================================================
   WHAT I BUILD ACCORDION
========================================================= */

const serviceItems =
  document.querySelectorAll(
    "[data-service]"
  );


const serviceButtons =
  document.querySelectorAll(
    "[data-service-toggle]"
  );


serviceButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selectedService =
          button.closest(
            "[data-service]"
          );


        if (!selectedService) {
          return;
        }


        const alreadyOpen =
          selectedService
            .classList
            .contains(
              "open"
            );


        serviceItems.forEach(
          (service) => {

            service
              .classList
              .remove(
                "open"
              );

          }
        );


        if (!alreadyOpen) {

          selectedService
            .classList
            .add(
              "open"
            );

        }

      }
    );

  }
);



/* =========================================================
   SKILLS ANIMATION
========================================================= */

const skillsBlock =
  document.getElementById(
    "skillsBlock"
  );


if (
  skillsBlock &&
  "IntersectionObserver"
  in
  window
) {

  const skillsObserver =
    new IntersectionObserver(

      (
        entries,
        observer
      ) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target
              .classList
              .add(
                "skills-visible"
              );


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: .25
      }

    );


  skillsObserver.observe(
    skillsBlock
  );

}

else if (skillsBlock) {

  skillsBlock
    .classList
    .add(
      "skills-visible"
    );

}



/* =========================================================
   HORIZONTAL PROCESS SCROLL
========================================================= */

const processSection =
  document.getElementById(
    "process"
  );


const processTrack =
  document.getElementById(
    "processTrack"
  );


const processCards = [
  ...document.querySelectorAll(
    ".process-card"
  )
];


let horizontalDistance = 0;

let processAnimationFrame = null;



/* ---------------------------------------------------------
   CALCULATE WIDTH
--------------------------------------------------------- */

function calculateProcessWidth() {

  if (
    !processSection ||
    !processTrack
  ) {
    return;
  }


  const extraEndSpace =
    window.innerWidth < 768
      ? 30
      : 100;


  horizontalDistance =
    Math.max(

      0,

      processTrack.scrollWidth
      -
      window.innerWidth
      +
      extraEndSpace

    );


  /*
    This is important.

    The section becomes taller than
    the viewport by exactly enough
    distance to travel through all
    horizontal cards.

    This means you cannot reach
    the next section until the
    horizontal process is finished.
  */

  processSection.style.height =
    `${
      window.innerHeight
      +
      horizontalDistance
    }px`;


  updateProcess();

}



/* ---------------------------------------------------------
   ACTIVE CARD
--------------------------------------------------------- */

function updateActiveProcessCard(
  progress
) {

  if (!processCards.length) {
    return;
  }


  const activeIndex =
    Math.min(

      processCards.length - 1,

      Math.round(
        progress
        *
        (
          processCards.length - 1
        )
      )

    );


  processCards.forEach(
    (
      card,
      index
    ) => {

      card.classList.toggle(
        "active",
        index === activeIndex
      );

    }
  );

}



/* ---------------------------------------------------------
   MOVE PROCESS
--------------------------------------------------------- */

function updateProcess() {

  if (
    !processSection ||
    !processTrack
  ) {
    return;
  }


  const sectionRect =
    processSection
      .getBoundingClientRect();


  const availableVerticalScroll =
    Math.max(

      1,

      processSection.offsetHeight
      -
      window.innerHeight

    );


  const progress =
    clamp(

      -sectionRect.top
      /
      availableVerticalScroll,

      0,

      1

    );


  const horizontalPosition =
    -horizontalDistance
    *
    progress;


  processTrack.style.transform =
    `translate3d(${horizontalPosition}px,0,0)`;


  updateActiveProcessCard(
    progress
  );

}



/* ---------------------------------------------------------
   REQUEST ANIMATION FRAME
--------------------------------------------------------- */

function requestProcessUpdate() {

  if (
    processAnimationFrame
  ) {
    return;
  }


  processAnimationFrame =
    requestAnimationFrame(
      () => {

        updateProcess();

        processAnimationFrame =
          null;

      }
    );

}



/* ---------------------------------------------------------
   PROCESS EVENTS
--------------------------------------------------------- */

if (
  processSection &&
  processTrack
) {

  calculateProcessWidth();


  window.addEventListener(
    "resize",
    calculateProcessWidth
  );


  window.addEventListener(
    "scroll",
    requestProcessUpdate,
    {
      passive: true
    }
  );

}



/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
  document.getElementById("contactForm");


contactForm?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const submitButton =
      contactForm.querySelector(
        'button[type="submit"]'
      );

    const originalText =
      submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";


    try {

      const response =
        await fetch(
          contactForm.action,
          {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
              Accept: "application/json"
            }
          }
        );


      if (!response.ok) {
        throw new Error(
          "Form submission failed"
        );
      }


      contactForm.reset();

      submitButton.textContent =
        "Message Sent ✓";


      setTimeout(
        () => {

          submitButton.textContent =
            originalText;

          submitButton.disabled =
            false;

        },
        3000
      );


    } catch (error) {

      submitButton.textContent =
        "Something went wrong. Try again.";

      submitButton.disabled =
        false;

    }

  }
);



/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
  document.querySelector(
    ".cursor-dot"
  );


const cursorRing =
  document.querySelector(
    ".cursor-ring"
  );


const finePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;


let mouseX = 0;

let mouseY = 0;

let ringX = 0;

let ringY = 0;



if (
  finePointer &&
  cursorDot &&
  cursorRing
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;


      mouseY =
        event.clientY;


      cursorDot.style.left =
        `${mouseX}px`;


      cursorDot.style.top =
        `${mouseY}px`;

    }
  );



  function animateCursor() {

    ringX +=
      (
        mouseX - ringX
      )
      *
      .15;


    ringY +=
      (
        mouseY - ringY
      )
      *
      .15;


    cursorRing.style.left =
      `${ringX}px`;


    cursorRing.style.top =
      `${ringY}px`;


    requestAnimationFrame(
      animateCursor
    );

  }


  animateCursor();



  document
    .querySelectorAll(
      `
      a,
      button,
      input,
      textarea,
      select
      `
    )
    .forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            document.body
              .classList
              .add(
                "cursor-hover"
              );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            document.body
              .classList
              .remove(
                "cursor-hover"
              );

          }
        );

      }
    );

}



/* =========================================================
   CURSOR COLOUR BASED ON SECTION
========================================================= */

function updateCursorTheme() {

  if (!finePointer) {
    return;
  }


  const centreX =
    window.innerWidth / 2;


  const centreY =
    window.innerHeight / 2;


  const centreElement =
    document.elementFromPoint(
      centreX,
      centreY
    );


  const darkArea =
    centreElement
      ?.closest(
        "[data-dark-section]"
      );


  document.body
    .classList
    .toggle(
      "cursor-dark",
      Boolean(darkArea)
    );

}



window.addEventListener(
  "scroll",
  updateCursorTheme,
  {
    passive: true
  }
);


window.addEventListener(
  "mousemove",
  updateCursorTheme,
  {
    passive: true
  }
);



/* =========================================================
   ON FULL PAGE LOAD
========================================================= */

window.addEventListener(
  "load",
  () => {

    calculateProcessWidth();

    updateProcess();

    updateCursorTheme();

  }
);
