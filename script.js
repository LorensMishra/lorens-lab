// ================= THEME SWITCHER =================

const themes = ["theme-dark", "theme-light"];

// Load saved theme from localStorage
let currentThemeIndex = localStorage.getItem("themeIndex");

if (currentThemeIndex === null) {
    currentThemeIndex = 0;
} else {
    currentThemeIndex = Number(currentThemeIndex);
}

// Apply theme on page load
document.body.classList.add(themes[currentThemeIndex]);

function changeTheme() {
    document.body.classList.remove(...themes);

    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    document.body.classList.add(themes[currentThemeIndex]);

    // Save selected theme
    localStorage.setItem("themeIndex", currentThemeIndex);
}


// ================= NAVBAR SCROLL EFFECT =================
// (Optional but professional UI)

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    } else {
        navbar.style.boxShadow = "none";
    }
});


// ================= SMOOTH SCROLL =================
// (For anchor links like #about, #projects)

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function syncMenuIcon() {
    const icon = toggle.querySelector("i");
    if (!icon) return;
    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    syncMenuIcon();
});

document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        syncMenuIcon();
    }
});

// Close menu when a nav link is clicked
navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        navLinks.classList.remove("active");
        syncMenuIcon();
    }
});

// ================= ACTIVE NAV LINK (OPTIONAL) =================
// Highlights current section in navbar

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ================= PROJECTS SWIPER =================

if (typeof Swiper !== "undefined") {
    new Swiper(".projects-swiper", {
        loop: true,
        grabCursor: true,
        speed: 700,
        spaceBetween: 30,
        slidesPerView: 1,
        centeredSlides: false,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: ".projects-swiper .swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".projects-swiper .swiper-button-next",
            prevEl: ".projects-swiper .swiper-button-prev",
        },
        keyboard: { enabled: true },
        breakpoints: {
            640:  { slidesPerView: 1, spaceBetween: 24 },
            900:  { slidesPerView: 2, spaceBetween: 28 },
            1200: { slidesPerView: 3, spaceBetween: 32 },
        },
    });
}


// ================= EMAILJS CONTACT FORM =================

(function () {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("contact-form")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        emailjs.sendForm(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            this
        ).then(function () {

            alert("Message Sent Successfully!");
            document.getElementById("contact-form").reset();

        }, function (error) {

            alert("Failed to send message. Please try again.");
        });

    });
