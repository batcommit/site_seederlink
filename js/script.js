// =========================================================
// ANIMAÇÕES AO SCROLL
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        ".fade-in, .slide-left, .slide-right, .zoom-in, .bar"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            } else {

                entry.target.classList.remove("visible");
            }

        });

    }, {
        threshold: 0.15
    });

    elementos.forEach(el => observer.observe(el));

});


// =========================================================
// NAVBAR BACKGROUND AO SCROLL
// =========================================================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if(window.scrollY > 50){

        nav.classList.add("nav-scroll");

    } else {

        nav.classList.remove("nav-scroll");
    }

});