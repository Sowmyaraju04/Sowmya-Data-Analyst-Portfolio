/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.getElementById("theme-toggle");

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.setAttribute(
        "data-theme",
        "dark"
    );

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

} else {

    document.body.setAttribute(
        "data-theme",
        "light"
    );

    themeToggle.innerHTML =
        '<i class="fas fa-moon"></i>';
}


themeToggle.addEventListener(
    "click",
    function () {

        const currentTheme =
            document.body.getAttribute(
                "data-theme"
            );


        if (currentTheme === "dark") {

            document.body.setAttribute(
                "data-theme",
                "light"
            );

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

            themeToggle.innerHTML =
                '<i class="fas fa-moon"></i>';

        } else {

            document.body.setAttribute(
                "data-theme",
                "dark"
            );

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i>';
        }

    }
);


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener(
    "click",
    function () {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        if (isOpen) {

            menuToggle.innerHTML =
                '<i class="fas fa-xmark"></i>';

        } else {

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';
        }

    }
);


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fas fa-bars"></i>';

            }
        );

    });


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';
        }

    }
);


/* =========================================================
   PROJECT SLIDER
========================================================= */

const projectsContainer =
    document.getElementById(
        "projectsContainer"
    );

const prevButton =
    document.getElementById(
        "prevProject"
    );

const nextButton =
    document.getElementById(
        "nextProject"
    );

const indicators =
    document.getElementById(
        "sliderIndicators"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


let currentIndex = 0;


/* =========================================================
   CREATE SLIDER DOTS
========================================================= */

projectCards.forEach(
    (project, index) => {

        const dot =
            document.createElement(
                "span"
            );

        dot.classList.add(
            "slider-dot"
        );

        if (index === 0) {

            dot.classList.add(
                "active"
            );
        }

        dot.addEventListener(
            "click",
            () => {

                scrollToProject(index);

            }
        );

        indicators.appendChild(dot);

    }
);


const sliderDots =
    document.querySelectorAll(
        ".slider-dot"
    );


/* =========================================================
   GET PROJECT SCROLL AMOUNT
========================================================= */

function getScrollAmount() {

    if (!projectCards.length) {

        return 0;
    }

    const card =
        projectCards[0];

    const cardWidth =
        card.offsetWidth;

    const gap = 25;

    return cardWidth + gap;
}


/* =========================================================
   SCROLL TO PROJECT
========================================================= */

function scrollToProject(index) {

    if (!projectCards.length) {

        return;
    }


    if (index < 0) {

        index =
            projectCards.length - 1;
    }


    if (
        index >=
        projectCards.length
    ) {

        index = 0;
    }


    currentIndex = index;


    const scrollPosition =
        projectCards[index].offsetLeft -
        projectsContainer.offsetLeft;


    projectsContainer.scrollTo({

        left: scrollPosition,

        behavior: "smooth"

    });


    updateIndicators();
}


/* =========================================================
   UPDATE PROJECT INDICATORS
========================================================= */

function updateIndicators() {

    sliderDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        }
    );

}


/* =========================================================
   PREVIOUS PROJECT
========================================================= */

prevButton.addEventListener(
    "click",
    () => {

        scrollToProject(
            currentIndex - 1
        );

    }
);


/* =========================================================
   NEXT PROJECT
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        scrollToProject(
            currentIndex + 1
        );

    }
);


/* =========================================================
   DETECT MANUAL HORIZONTAL SCROLL
========================================================= */

projectsContainer.addEventListener(
    "scroll",
    function () {

        const scrollLeft =
            projectsContainer.scrollLeft;

        let closestIndex = 0;

        let closestDistance =
            Infinity;


        projectCards.forEach(
            (card, index) => {

                const position =
                    card.offsetLeft -
                    projectsContainer.offsetLeft;


                const distance =
                    Math.abs(
                        position -
                        scrollLeft
                    );


                if (
                    distance <
                    closestDistance
                ) {

                    closestDistance =
                        distance;

                    closestIndex =
                        index;
                }

            }
        );


        currentIndex =
            closestIndex;

        updateIndicators();

    }
);


/* =========================================================
   AUTO PROJECT SLIDER
========================================================= */

let autoSlide =
    setInterval(
        () => {

            scrollToProject(
                currentIndex + 1
            );

        },
        6000
    );


/* =========================================================
   PAUSE AUTO SLIDER ON HOVER
========================================================= */

projectsContainer.addEventListener(
    "mouseenter",
    () => {

        clearInterval(
            autoSlide
        );

    }
);


projectsContainer.addEventListener(
    "mouseleave",
    () => {

        autoSlide =
            setInterval(
                () => {

                    scrollToProject(
                        currentIndex + 1
                    );

                },
                6000
            );

    }
);


/* =========================================================
   PAUSE AUTO SLIDER WHILE TOUCHING ON MOBILE
========================================================= */

projectsContainer.addEventListener(
    "touchstart",
    () => {

        clearInterval(
            autoSlide
        );

    },
    {
        passive: true
    }
);


projectsContainer.addEventListener(
    "touchend",
    () => {

        autoSlide =
            setInterval(
                () => {

                    scrollToProject(
                        currentIndex + 1
                    );

                },
                6000
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   SCROLL FADE-IN ANIMATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section:not(#home)"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


sections.forEach(
    (section) => {

        observer.observe(
            section
        );

    }
);


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        }
    );


/* =========================================================
   KEYBOARD PROJECT NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
         Only use arrow keys for the project
         slider when the user is not typing.
        */

        if (
            event.key === "ArrowRight"
        ) {

            scrollToProject(
                currentIndex + 1
            );

        }


        if (
            event.key === "ArrowLeft"
        ) {

            scrollToProject(
                currentIndex - 1
            );

        }

    }
);


/* =========================================================
   CLOSE MENU WHEN SCREEN BECOMES DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 850
        ) {

            navLinks.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        }

    }
);