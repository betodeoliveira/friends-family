$(document).ready(function () {
    let initialFontSize = "8.9vw"; // Make sure to validate on webflow
    let shrinkFontSize = "2vw";
    let navbarIsSmall = false;

    let matchMedia = gsap.matchMedia();

    // Desktop
    matchMedia.add("(min-width: 992px)", () => {
        shrinkFontSize = "2vw";
        if (navbarIsSmall) {
            setNavbarFontSize(shrinkFontSize);
        }
        else {
            setNavbarFontSize(initialFontSize);
        }
    });

    // Tablet and below
    matchMedia.add("(max-width: 991px)", () => {
        shrinkFontSize = initialFontSize;
        setNavbarFontSize(initialFontSize);
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
            navbarIsSmall = true;
            // Background
            gsap.to(".navbar_background-color", {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            });
            // Font Size
            setNavbarFontSize(shrinkFontSize);
        },
        onEnterBack: () => {
            navbarIsSmall = false;
            // Background
            gsap.to(".navbar_background-color", {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            });
            // Font Size
            setNavbarFontSize(initialFontSize);
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
        
        setNavbarFontSize(initialFontSize);
    });

    function setNavbarFontSize(fontSize) {
        gsap.to(".navbar_menu-link", {
            fontSize: fontSize,
            duration: 0.5,
            ease: "power1.out"
        });
    }
});