$(document).ready(function () {
    let initialFontSize = "12vw";
    let shrinkFontSize = "2vw";

    let matchMedia = gsap.matchMedia();
    // Desktop
    matchMedia.add("(min-width: 992px)", () => {
        shrinkFontSize = "2vw";
    });

    // Tablet and below
    matchMedia.add("(max-width: 991px)", () => {
        shrinkFontSize = initialFontSize;
        let currentFontSize = $(".navbar_menu-link").css("font-size");
        if (initialFontSize != currentFontSize) {
            // Font Size
            gsap.to(".navbar_menu-link", {
                fontSize: initialFontSize,
                duration: 0.5,
                ease: "power1.out"
            });
        }
    });

    // Sets the navbar background color
    $(".navbar_background-color").css("background-color", $(".navbar_component").css("background-color"));

    // Prevents the current link to be cliekd
    $(".navbar_menu-link.w--current").on("click", function (e) {
        e.preventDefault();
    });

    // Creates the scroll trigger
    ScrollTrigger.create({
        trigger: $(".navbar_trigger"),
        start: "top top",
        end: "top top",
        markers: false,
        onEnter: () => {
            // Background
            gsap.to(".navbar_background-color", {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            });
            // Font Size
            gsap.to(".navbar_menu-link", {
                fontSize: shrinkFontSize,
                duration: 0.5,
                ease: "power1.out"
            });
        },
        onEnterBack: () => {
            // Background
            gsap.to(".navbar_background-color", {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            });
            // Font Size
            gsap.to(".navbar_menu-link", {
                fontSize: initialFontSize,
                duration: 0.5,
                ease: "power1.out"
            });
        }
    });

    // When a link is cliked play the transition
    $(".navbar_menu-link:not(.w--current").on("click", function (e) {
        // Background
        gsap.to(".navbar_background-color", {
            opacity: 0,
            duration: 0,
            ease: "power1.out"
        });

        // New link opacity
        gsap.to($(this), {
            opacity: 0.5,
            duration: 0.5,
            ease: "power1.out"
        });

        // Current link opacity
        gsap.to(".navbar_menu-link.w--current", {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        });

        // Font Size
        gsap.to(".navbar_menu-link", {
            fontSize: initialFontSize,
            duration: 0.5,
            ease: "power1.out"
        });
        $(".navbar_menu-link").css("font-size", initialFontSize);
    });
});