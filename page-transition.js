// On Page Load
$(".content-wrapper").addClass("first");
let menuLinkElement;
let nextPageLink;
let navbarLinksColor;
let transitionType;

$(".navbar_menu-link:not(.w--current").on("click", function (e) {
    // Prevents the link to load the page
    e.preventDefault();
    // Sets the variables
    menuLinkElement = $(this);
    nextPageLink = $(this).attr("href");
    navbarLinksColor = $(this).attr("navbar-links-color");
    transitionType = $(this).attr("transition-type");
    if($(this).attr("override-background-color")) {
        $(document.body).css("background-color", $(this).attr("override-background-color"));
    }
    // Grab the content of the next page
    $.ajax({
        url: nextPageLink,
        success: function (response) {
            let element = $(response).find(".content-wrapper").addClass("second");
            $(".main-wrapper").append(element);
        },
        complete: function () {
            pageTransition();
        }
    });
});

function pageTransition() {
    $("html").addClass("animating");
    // GSAP
    let pageTransitionTl = gsap.timeline({
        paused: false,
        onComplete: updatePage
    });
    // Plays a different animation deppending on the transition type attribute
    if (transitionType == "slide-from-bottom") {
        $(".content-wrapper.second").css("z-index", "3");
        pageTransitionTl.from(".content-wrapper.second", {
            y: "110vh",
            delay: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });
        pageTransitionTl.to(
            ".content-wrapper.first",
            {
                opacity: 0,
                scale: 0.7,
                duration: 0.3,
                ease: "power1.out"
            }, 0
        );
    }
    // Fade
    else {
        pageTransitionTl.to(".content-wrapper.first", {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out"
        });
        pageTransitionTl.fromTo(".content-wrapper.second", {
            opacity: 0
        },
            {
                opacity: 1,
                duration: 0.5,
                ease: "power1.out"
            }, 0);
    }
    // Adds the current effect to the cliked link
    pageTransitionTl.to(menuLinkElement, {
        opacity: 0.5,
        duration: 0.5,
        ease: "power1.out"
    }, 0);
    // Removes the current event from the actual link
    pageTransitionTl.to($(".navbar_menu-link.w--current"), {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out"
    }, 0);
    // Changes the navbar link colors
    pageTransitionTl.to(".navbar_menu-link", {
        color: navbarLinksColor,
        duration: 0.5,
        ease: "power1.out"
    }, 0);
}

function updatePage() {
    window.location = nextPageLink;
}

// Realods the page on back
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};