document.addEventListener("DOMContentLoaded", function () {

    // Navbar Variables
    const bigFontSize = "8.9vw"; // Make sure to validate on webflow
    const smallFontSize = "2vw";
    let currentSmallFontSize = smallFontSize;
    let navbarIsSmall = false;
    let matchMedia = gsap.matchMedia();

    // Prevents the current link to be cliekd
    $("[page-transition-link]:is(.w--current)").on("click", function (e) {
        e.preventDefault();
    });

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

    // Navigation
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

    // Transition Variables
    let nextPageLink;
    let nextPageBackgroundColor;
    let nextPageNavbarLinksColor;
    let regularTransitionTimeline;

    // When page transition link is clicked
    $("[page-transition-link]:not(.w--current").on("click", function (e) {
        // Prevents the link to load the page
        e.preventDefault();
        // Sets the variables
        nextPageLink = $(this).attr("href");
        nextPageBackgroundColor = $(this).attr("page-background-color");
        nextPageNavbarLinksColor = $(this).attr("navbar-links-color");
        setNavbarBackgroundOpacity(0);
        // New link opacity
        setCustomElementOpacity($(this), 0.5);
        // Current link opacity
        setCustomElementOpacity($(".navbar_menu-link.w--current"), 1);
        setNavbarFontSize(bigFontSize);
        playLeave();
    });

    function playLeave() {
        regularTransitionTimeline = gsap.timeline({
            paused: false,
            onComplete: gotToNextPage
        });

        // The content shouldn't be clickable
        $(".content-wrapper").css("pointer-events", "none");

        // Hides the current content
        regularTransitionTimeline.to(".content-wrapper", {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out"
        });

        // Changes the background color
        regularTransitionTimeline.to(".page-background-color", {
            backgroundColor: nextPageBackgroundColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);

        // Changes the navbar link colors
        regularTransitionTimeline.to(".navbar_menu-link", {
            color: nextPageNavbarLinksColor,
            duration: 0.5,
            ease: "power1.out"
        }, 0);

        // Background noise
        if (nextPageBackgroundColor == "#ffffff") {
            regularTransitionTimeline.to(".page-noise_over-blue", {
                opacity: 0.3,
                duration: 0.5,
                ease: "power1.out"
            }, 0);
        }
        else {
            regularTransitionTimeline.to(".page-noise_over-white", {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            }, 0);
        }

        // Footer
        regularTransitionTimeline.to(".footer_background", {
            backgroundColor: nextPageBackgroundColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);
        regularTransitionTimeline.to(".footer_layout", {
            borderTopColor: nextPageNavbarLinksColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);
        regularTransitionTimeline.to(".footer_component, .footer_brand-link, .footer_link", {
            color: nextPageNavbarLinksColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);
        regularTransitionTimeline.to(".footer_eye-wrapper", {
            borderColor: nextPageNavbarLinksColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);
        regularTransitionTimeline.to(".footer_eye-pupil", {
            backgroundColor: nextPageNavbarLinksColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);
    }

    function setNavbarFontSize(fontSize) {
        gsap.to(".navbar_menu-link", {
            fontSize: fontSize,
            duration: 0.5,
            ease: "power1.out"
        });
    }

    function setNavbarBackgroundOpacity(opacity) {
        gsap.to(".navbar_background", {
            opacity: opacity,
            duration: 0,
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

    function gotToNextPage() {
        window.location = nextPageLink;
    }

    // Realods the page on back
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
});