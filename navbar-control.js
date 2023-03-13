// Sets the navbar background color
$(".navbar_background-color").css("background-color", $(".navbar_component").css("background-color"));

// Prevents the current link to be cliekd
$(".navbar_menu-link.w--current").on("click", function (e) {
    e.preventDefault();
});

// GSAP timeline variables
let initialFontSize = $(".navbar_menu-link").css("font-size");
let shrinkFontSize = "2vw";


// Creates the shrink timeline
let navbarShrinkTimeline = gsap.timeline({
    paused: true
});

// Creates the background timeline
let navbarBackgroundTimeline = gsap.timeline({
    paused: true
});

// Creates the transition timeline
navbarTransitionTimeline = gsap.timeline({
    paused: true
});

// Configurates the shrink timeline
navbarShrinkTimeline.to(".navbar_menu-link", {
    fontSize: shrinkFontSize,
    duration: 0.5,
    ease: "power1.out"
});

// Configurates the background timeline
navbarBackgroundTimeline.to(".navbar_background-color", {
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
}, 0);

// Creates the scroll trigger


function checkBreakpoint(x) {
    if (x.matches) {
        // desktop code here
        console.log("Is Desktop");
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

        // When a link is cliked play the transition
        $(".navbar_menu-link:not(.w--current").on("click", function (e) {
            // Configurates the transition timeline
            navbarTransitionTimeline.to(".navbar_background-color", {
                opacity: 0,
                duration: 0,
                ease: "power1.out"
            });
            navbarTransitionTimeline.to($(this), {
                opacity: 0.5,
                duration: 0.5,
                ease: "power1.out"
            }, 0);

            // Removes the current state effect from the current link
            navbarTransitionTimeline.to(".navbar_menu-link.w--current", {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            }, 0);

            // Play the timelines
            navbarTransitionTimeline.play();
            navbarShrinkTimeline.reverse();
        });
    } else {
        // tablet & below code here
        console.log("Is Tablet");
        ScrollTrigger.create({
            trigger: $(".navbar_trigger"),
            start: "top top",
            end: "top top",
            markers: false,
            onEnter: () => {
                // navbarShrinkTimeline.play();
                navbarBackgroundTimeline.play();
            },
            onEnterBack: () => {
                // navbarShrinkTimeline.reverse();
                navbarBackgroundTimeline.reverse();
            }
        });

        // When a link is cliked play the transition
        $(".navbar_menu-link:not(.w--current").on("click", function (e) {
            // Configurates the transition timeline
            navbarTransitionTimeline.to(".navbar_background-color", {
                opacity: 0,
                duration: 0,
                ease: "power1.out"
            });
            navbarTransitionTimeline.to($(this), {
                opacity: 0.5,
                duration: 0.5,
                ease: "power1.out"
            }, 0);

            // Removes the current state effect from the current link
            navbarTransitionTimeline.to(".navbar_menu-link.w--current", {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            }, 0);

            // Play the timelines
            navbarTransitionTimeline.play();
            // navbarShrinkTimeline.reverse();
        });
    }
}
const matchMediaDesktop = window.matchMedia("(min-width: 992px)");
checkBreakpoint(matchMediaDesktop);
matchMediaDesktop.addListener(checkBreakpoint);