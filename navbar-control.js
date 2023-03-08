// Sets the navbar background color
$(".navbar_background-color").css("background-color", $(".navbar_component").css("background-color"));

// Prevent the current link to be cliekd
$(".navbar_menu-link.w--current").on("click", function (e) {
    e.preventDefault();
});

// GSAP timeline variables
let shrinkFontSize = "2vw";

// Creates the shrink timeline
let navbarShrinkTimeline = gsap.timeline({
    paused: true
});

// Animates the font size
navbarShrinkTimeline.to(".navbar_menu-link", {
    fontSize: shrinkFontSize,
    duration: 0.5,
    ease: "power2.out"
});

// Creates the background timeline
let navbarBackgroundTimeline = gsap.timeline({
    paused: true
});

// Animates the background color
navbarBackgroundTimeline.to(".navbar_background-color", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
}, 0);

// Creates the scroll trigger
ScrollTrigger.create({
    trigger: $(".navbar_trigger"),
    start: "top top",
    end: "top top",
    markers: false,
    onEnter: () => {
        navbarShrinkTimeline.play();
        navbarBackgroundTimeline.play();
    },
    onEnterBack: () => {
        navbarShrinkTimeline.reverse();
        navbarBackgroundTimeline.reverse();
    }
});

navbarTransitionTimeline = gsap.timeline({
    paused: true
});

// When a link is cliked play the transition
$(".navbar_menu-link:not(.w--current").on("click", function (e) {
    // Hides the background color
    navbarTransitionTimeline.to(".navbar_background-color", {
        opacity: 0,
        duration: 0,
        ease: "power1.out"
    });

    // Sets the current state effect to the cliked link
    navbarTransitionTimeline.to($(this), {
        opacity: 0.5,
        duration: 0.5,
        ease: "power1.out"
    }, 0);

    // If exists removes the current state effect from the current link
    if($(".navbar_menu-link.w--current").lenght >= 1) {
        navbarTransitionTimeline.to(".navbar_menu-link.w--current", {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        }, 0);
    }

    navbarTransitionTimeline.play();
    navbarShrinkTimeline.reverse();
});