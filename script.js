/* =========================================================
   GITHUB PAGES SAFE INITIALIZATION
========================================================= */

/*
   This class enables the reveal animation.

   If JavaScript doesn't load for any reason,
   the CSS keeps everything visible.
*/

document.body.classList.add("js-ready");



/* =========================================================
   ELEMENTS
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const themeBtn =
    document.getElementById("themeBtn");

const paletteBtn =
    document.getElementById("paletteBtn");

const palette =
    document.getElementById("palette");

const paletteInput =
    document.getElementById("paletteInput");

const terminalInput =
    document.getElementById("terminalInput");

const terminalOutput =
    document.getElementById("terminalOutput");

const mouseGlow =
    document.getElementById("mouseGlow");



/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

}



/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById(
        "typingText"
    );


const phrases = [

    "Developer",
    "Computer Engineering Student",
    "Tech Enthusiast",
    "Gamer",
    "Hardware Nerd",
    "Problem Solver"

];


let phraseIndex = 0;

let characterIndex = 0;

let isDeleting = false;


function typeEffect() {

    if (!typingText) {
        return;
    }


    const currentPhrase =
        phrases[phraseIndex];


    if (!isDeleting) {

        typingText.textContent =
            currentPhrase.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex >=
            currentPhrase.length
        ) {

            isDeleting = true;

            setTimeout(
                typeEffect,
                1400
            );

            return;

        }

    }
    else {

        typingText.textContent =
            currentPhrase.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (
            characterIndex <= 0
        ) {

            characterIndex = 0;

            isDeleting = false;

            phraseIndex =
                (
                    phraseIndex + 1
                )
                %
                phrases.length;

        }

    }


    setTimeout(

        typeEffect,

        isDeleting
            ? 45
            : 85

    );

}


typeEffect();



/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("show");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}
else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}



/* =========================================================
   MOUSE GLOW
========================================================= */

if (mouseGlow) {

    document.addEventListener(
        "mousemove",
        event => {

            mouseGlow.style.left =
                `${event.clientX}px`;

            mouseGlow.style.top =
                `${event.clientY}px`;

        }
    );

}



/* =========================================================
   THEME
========================================================= */

function updateThemeIcon() {

    if (!themeBtn) {
        return;
    }


    const lightMode =
        document.body.classList.contains(
            "light"
        );


    themeBtn.textContent =
        lightMode
            ? "☀"
            : "☾";

}


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light"
    );

}


updateThemeIcon();


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );


            const theme =
                document.body.classList.contains(
                    "light"
                )
                    ? "light"
                    : "dark";


            localStorage.setItem(
                "portfolio-theme",
                theme
            );


            updateThemeIcon();

        }
    );

}



/* =========================================================
   STATS COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".stat-number[data-target]"
    );


if (
    "IntersectionObserver"
    in window
) {

    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            Number(
                                counter.dataset.target
                            );


                        let current = 0;


                        const duration = 1000;

                        const stepTime =
                            Math.max(
                                20,
                                Math.floor(
                                    duration /
                                    target
                                )
                            );


                        const interval =
                            setInterval(
                                () => {

                                    current++;

                                    counter.textContent =
                                        `${current}+`;


                                    if (
                                        current >=
                                        target
                                    ) {

                                        clearInterval(
                                            interval
                                        );

                                    }

                                },
                                stepTime
                            );


                        counterObserver
                            .unobserve(
                                counter
                            );

                    }
                );

            },

            {
                threshold: 0.7
            }

        );


    counters.forEach(
        counter => {

            counterObserver.observe(
                counter
            );

        }
    );

}



/* =========================================================
   COMMAND PALETTE
========================================================= */

function openPalette() {

    if (!palette) {
        return;
    }


    palette.classList.add(
        "active"
    );


    setTimeout(
        () => {

            if (paletteInput) {

                paletteInput.focus();

            }

        },
        50
    );

}


function closePalette() {

    if (!palette) {
        return;
    }


    palette.classList.remove(
        "active"
    );


    if (paletteInput) {

        paletteInput.value = "";

    }


    document
        .querySelectorAll(
            ".palette-item"
        )
        .forEach(item => {

            item.style.display =
                "block";

        });

}


if (paletteBtn) {

    paletteBtn.addEventListener(
        "click",
        openPalette
    );

}



/* =========================================================
   CTRL + K
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (

            (
                event.ctrlKey ||
                event.metaKey
            )

            &&

            event.key.toLowerCase()
                === "k"

        ) {

            event.preventDefault();

            openPalette();

        }


        if (
            event.key === "Escape"
        ) {

            closePalette();

        }

    }
);



/* =========================================================
   CLOSE PALETTE WHEN CLICKING OUTSIDE
========================================================= */

if (palette) {

    palette.addEventListener(
        "click",
        event => {

            if (
                event.target === palette
            ) {

                closePalette();

            }

        }
    );

}



/* =========================================================
   PALETTE NAVIGATION
========================================================= */

document
    .querySelectorAll(
        ".palette-item[data-target]"
    )
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const selector =
                    item.dataset.target;


                const target =
                    document.querySelector(
                        selector
                    );


                closePalette();


                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });



/* =========================================================
   GITHUB COMMAND
========================================================= */

const githubCommand =
    document.getElementById(
        "githubCommand"
    );


if (githubCommand) {

    githubCommand.addEventListener(
        "click",
        () => {

            window.open(
                "https://github.com/Goyal-Armaan",
                "_blank",
                "noopener,noreferrer"
            );


            closePalette();

        }
    );

}



/* =========================================================
   PALETTE SEARCH
========================================================= */

if (paletteInput) {

    paletteInput.addEventListener(
        "input",
        () => {

            const search =
                paletteInput.value
                    .toLowerCase()
                    .trim();


            document
                .querySelectorAll(
                    ".palette-item"
                )
                .forEach(item => {

                    const text =
                        item.textContent
                            .toLowerCase();


                    item.style.display =
                        text.includes(search)
                            ? "block"
                            : "none";

                });

        }
    );

}



/* =========================================================
   TERMINAL
========================================================= */

const terminalCommands = {

    help:
        "Available commands: about, skills, projects, education, contact, status, github, clear",

    about:
        "I'm Armaan Goyal — a Computer Engineering student interested in development, hardware and technology.",

    skills:
        "HTML · CSS · JavaScript · C · Python · Databases · Computer Systems",

    projects:
        "Projects: Personal Developer Portfolio, Computer Systems Lab, Programming Experiments.",

    education:
        "Diploma in Computer Engineering — Rayat-Bahra University Polytechnic.",

    contact:
        "Use the contact form at the bottom of the page.",

    status:
        "● Online — currently building & learning",

    whoami:
        "Armaan Goyal — Computer Engineering Student & Developer"

};


function runTerminalCommand(command) {

    if (!terminalOutput) {
        return;
    }


    if (
        command === "clear"
    ) {

        terminalOutput.textContent =
            "";

        return;

    }


    if (
        command === "github"
    ) {

        terminalOutput.textContent =
            "Opening GitHub...";


        window.open(
            "https://github.com/Goyal-Armaan",
            "_blank",
            "noopener,noreferrer"
        );


        return;

    }


    if (
        terminalCommands[command]
    ) {

        terminalOutput.textContent =
            terminalCommands[command];

        return;

    }


    terminalOutput.textContent =
        "Command not found. Type 'help'.";

}


if (terminalInput) {

    terminalInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) {
                return;
            }


            const command =
                terminalInput.value
                    .trim()
                    .toLowerCase();


            terminalInput.value = "";


            if (!command) {
                return;
            }


            runTerminalCommand(
                command
            );


            /* Scroll commands */

            const sections = {

                about: "#about",

                skills: "#skills",

                projects: "#projects",

                education: "#journey",

                contact: "#contact"

            };


            if (
                sections[command]
            ) {

                const section =
                    document.querySelector(
                        sections[command]
                    );


                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        }
    );

}



/* =========================================================
   CONTACT FORM
========================================================= */

/*
   CHANGE THIS EMAIL to your real email.
*/

const CONTACT_EMAIL =
    "your-email@example.com";


const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name}`
                );


            const body =
                encodeURIComponent(

                    `Name: ${name}\n\n` +

                    `Email: ${email}\n\n` +

                    `Message:\n${message}`

                );


            window.location.href =

                `mailto:${CONTACT_EMAIL}` +

                `?subject=${subject}` +

                `&body=${body}`;

        }
    );

}



/* =========================================================
   KONAMI CODE
========================================================= */

const konamiCode = [

    "ArrowUp",
    "ArrowUp",

    "ArrowDown",
    "ArrowDown",

    "ArrowLeft",
    "ArrowRight",

    "ArrowLeft",
    "ArrowRight"

];


let konamiIndex = 0;


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            konamiCode[konamiIndex]
        ) {

            konamiIndex++;


            if (
                konamiIndex ===
                konamiCode.length
            ) {

                const easterEgg =
                    document.getElementById(
                        "easterEgg"
                    );


                if (easterEgg) {

                    easterEgg.classList.add(
                        "active"
                    );

                }


                konamiIndex = 0;

            }

        }
        else {

            konamiIndex = 0;

        }

    }
);



/* =========================================================
   CLOSE EASTER EGG
========================================================= */

const closeEgg =
    document.getElementById(
        "closeEgg"
    );


if (closeEgg) {

    closeEgg.addEventListener(
        "click",
        () => {

            const easterEgg =
                document.getElementById(
                    "easterEgg"
                );


            if (easterEgg) {

                easterEgg.classList.remove(
                    "active"
                );

            }

        }
    );

}



/* =========================================================
   CURRENT YEAR
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
   CONSOLE EASTER EGG
========================================================= */

console.log(
    "%c👋 Hey, developer!",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "%cWelcome to Armaan's portfolio.",
    "font-size: 13px;"
);

console.log(
    "%cTry the terminal. Type: help",
    "font-size: 12px;"
);
