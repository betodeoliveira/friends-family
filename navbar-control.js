// Sets the navbar background color
$(".navbar_background-color").css("background-color", $(".navbar_component").css("background-color"));

// GSAP timeline variables
let shrinkFontSize = "2vw";

// Creates the shrink timeline
let navbarShrinkTl = gsap.timeline({
    paused: true
});

// Animates the font size
navbarShrinkTl.to(".navbar_menu-link", {
    fontSize: shrinkFontSize,
    duration: 0.5,
    ease: "power2.out",
});

// Animates the background color
navbarShrinkTl.to(".navbar_background-color", {
    opacity: 1,
    duration: 0.125,
    ease: "power2.out",
}, 0);

// Creates the scroll trigger
ScrollTrigger.create({
    trigger: $(".navbar_trigger"),
    start: "top top",
    end: "top top",
    markers: false,
    onEnter: () => {
        navbarShrinkTl.play();
    },
    onEnterBack: () => {
        navbarShrinkTl.reverse();
    }
});

// When a link is clicked grow back the navbar
$(".navbar_menu-link:not(.w--current").on("click", function (e) {
    $(".navbar_background-color").css("opacity", "0");
    navbarShrinkTl.reverse();
});