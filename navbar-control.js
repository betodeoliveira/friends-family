$(document).ready(function () {
    const bigFontSize = "8.9vw"; // Make sure to validate on webflow
    const smallFontSize = "2vw";
    let currentSmallFontSize = smallFontSize;
    let navbarIsSmall = false;
    let matchMedia = gsap.matchMedia();

    // Desktop Match Media
    matchMedia.add("(min-width: 992px)", () => {
        currentSmallFontSize = smallFontSize;
        if (navbarIsSmall) {
            setNavbarFontSize(currentSmallFontSize);
        }
        else {
            setNavbarFontSize(bigFontSize);
        }
    });

    // Tablet and below Match Media
    matchMedia.add("(max-width: 991px)", () => {
        currentSmallFontSize = bigFontSize;
        setNavbarFontSize(bigFontSize);
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
            setNavbarBackgroundOpacity(1);
            setNavbarFontSize(currentSmallFontSize);
        },
        onEnterBack: () => {
            navbarIsSmall = false;
            setNavbarBackgroundOpacity(0);
            setNavbarFontSize(bigFontSize);
        }
    });

    // When a link is cliked play the transition
    $(".navbar_menu-link:not(.w--current").on("click", function (e) {
        setNavbarBackgroundOpacity(0);
        // New link opacity
        setCustomElementOpacity($(this), 0.5);
        // Current link opacity
        setCustomElementOpacity($(".navbar_menu-link.w--current"), 1);
        setNavbarFontSize(bigFontSize);
    });

    function setNavbarFontSize(fontSize) {
        gsap.to(".navbar_menu-link", {
            fontSize: fontSize,
            duration: 0.5,
            ease: "power1.out"
        });
    }

    function setNavbarBackgroundOpacity(opacity) {
        gsap.to(".navbar_background-color", {
            opacity: opacity,
            duration: 0.5,
            ease: "power1.out"
        });
    }

    function setCustomElementOpacity(element, opacity) {
        gsap.to(element, {
            opacity: opacity,
            duration: 0.5,
            ease: "power1.out"
        });
    }
});