```javascript
/* =========================================================
   MOBILE MENU
========================================================= */

const menu =
    document.getElementById("menu");

const navLinks =
    document.getElementById("navLinks");


menu.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });



/* =========================================================
   TYPING EFFECT
========================================================= */

const typingText =
    document.getElementById("typingText");


const phrases = [

    "Developer",
    "Computer Engineering Student",
    "Tech Enthusiast",
    "Gamer",
    "Hardware Nerd",
    "Problem Solver"

];


let phraseIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const currentPhrase =
        phrases[phraseIndex];


    if (!deleting) {

        typingText.textContent =
            currentPhrase.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            currentPhrase.length
        ) {

            deleting = true;

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
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            phraseIndex =
                (phraseIndex + 1)
                % phrases.length;

        }

    }


    setTimeout(

        typeEffect,

        deleting
            ? 45
            : 85

    );

}


typeEffect();



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("show");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   MOUSE GLOW
========================================================= */

const mouseGlow =
    document.getElementById("mouseGlow");


document.addEventListener(
    "mousemove",
    event => {

        mouseGlow.style.left =
            event.clientX + "px";

        mouseGlow.style.top =
            event.clientY + "px";

    }
);



/* =========================================================
   THEME SWITCH
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");


function updateThemeIcon() {

    const isLight =
        document.body.classList.contains(
            "light"
        );


    themeBtn.textContent =
        isLight
            ? "☀"
            : "☾";

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const isLight =
            document.body.classList.contains(
                "light"
            );


        localStorage.setItem(
            "theme",
            isLight
                ? "light"
                : "dark"
        );


        updateThemeIcon();

    }
);


if (
    localStorage.getItem("theme")
    === "light"
) {

    document.body.classList.add(
        "light"
    );

}


updateThemeIcon();



/* =========================================================
   ANIMATED STAT COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".stat-number[data-target]"
    );


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

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


                const interval =
                    setInterval(() => {

                        current++;


                        counter.textContent =
                            current + "+";


                        if (
                            current >= target
                        ) {

                            clearInterval(
                                interval
                            );

                        }

                    }, 90);


                counterObserver.unobserve(
                    counter
                );

            });

        },

        {
            threshold: 0.7
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* =========================================================
   COMMAND PALETTE
========================================================= */

const palette =
    document.getElementById("palette");


const paletteBtn =
    document.getElementById(
        "paletteBtn"
    );


const paletteInput =
    document.getElementById(
        "paletteInput"
    );


function openPalette() {

    palette.classList.add(
        "active"
    );


    setTimeout(() => {

        paletteInput.focus();

    }, 50);

}


function closePalette() {

    palette.classList.remove(
        "active"
    );


    paletteInput.value = "";


    document
        .querySelectorAll(".palette-item")
        .forEach(item => {

            item.style.display =
                "block";

        });

}


paletteBtn.addEventListener(
    "click",
    openPalette
);



/* Ctrl + K */

document.addEventListener(
    "keydown",
    event => {

        if (

            (event.ctrlKey || event.metaKey)

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



/* Click outside palette */

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



/* Palette navigation */

document
    .querySelectorAll(
        ".palette-item[data-target]"
    )
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const target =
                    document.querySelector(
                        item.dataset.target
                    );


                closePalette();


                target.scrollIntoView({

                    behavior: "smooth"

                });

            }
        );

    });



/* GitHub command */

document
    .getElementById(
        "githubCommand"
    )
    .addEventListener(
        "click",
        () => {

            window.open(
                "https://github.com/Goyal-Armaan",
                "_blank"
            );


            closePalette();

        }
    );



/* =========================================================
   PALETTE SEARCH
========================================================= */

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



/* =========================================================
   INTERACTIVE TERMINAL
========================================================= */

const terminalInput =
    document.getElementById(
        "terminalInput"
    );


const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


const terminalCommands = {

    help:
        "Available commands: about, skills, projects, education, contact, github, clear",

    about:
        "Computer Engineering student who loves technology, coding and hardware.",

    skills:
        "HTML · CSS · JavaScript · C · Python · Databases · Systems",

    projects:
        "Available projects: Personal Portfolio, Computer Systems Lab, Programming Experiments.",

    education:
        "Diploma in Computer Engineering — Rayat-Bahra University Polytechnic.",

    contact:
        "Scroll down to the contact section or use the contact form.",

    status:
        "● Online — currently building & learning",

    whoami:
        "Armaan Goyal — Computer Engineering Student & Developer"

};


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
                "_blank"
            );


            return;

        }


        if (
            terminalCommands[command]
        ) {

            terminalOutput.textContent =
                terminalCommands[command];

        }
        else {

            terminalOutput.textContent =
                "Command not found. Type 'help'.";

        }

    }
);



/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


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
                "Portfolio Contact from "
                + name
            );


        const body =
            encodeURIComponent(

                "Name: "
                + name

                + "\n\nEmail: "
                + email

                + "\n\nMessage:\n"
                + message

            );


        window.location.href =

            "mailto:beingoyal@gmail.com"

            + "?subject="
            + subject

            + "&body="
            + body;

    }
);



/* =========================================================
   KONAMI CODE EASTER EGG
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

                document
                    .getElementById(
                        "easterEgg"
                    )
                    .classList
                    .add("active");


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

function closeEgg() {

    document
        .getElementById(
            "easterEgg"
        )
        .classList
        .remove("active");

}



/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();
```
