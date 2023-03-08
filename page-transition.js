// On Page Load
$(".content-wrapper").addClass("first");
let menuLinkElement;
let nextPageLink;
let pageBackgroundColor;
let navbarLinksColor;
let contentAnimType;

$(".navbar_menu-link:not(.w--current").on("click", function (e) {
    // Prevents the link to load the page
    e.preventDefault();
    // Sets the variables
    menuLinkElement = $(this);
    nextPageLink = $(this).attr("href");
    pageBackgroundColor = $(this).attr("page-background-color");
    navbarLinksColor = $(this).attr("navbar-links-color");
    contentAnimType = $(this).attr("content-anim-type");
    loadNextPageContent();
});

$(".director_item-button").on("click", function (e) {
    // Prevents the link to load the page
    e.preventDefault();
    nextPageLink = $(this).attr("href");
    pageBackgroundColor = $(this).attr("page-background-color");
    navbarLinksColor = $(this).attr("navbar-links-color");
    contentAnimType = $(this).attr("content-anim-type");
    loadNextPageContent();
});

function loadNextPageContent() {
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
}

function pageTransition() {
    $("html").addClass("animating");
    // Creates the timeline
    let pageTransitionTl = gsap.timeline({
        paused: false,
        onComplete: updatePage
    });
    // The current content shouldn't be clickable
    $(".content-wrapper.first").css("pointer-events", "none");
    // Animates the next page content based on the anim type
    $(".content-wrapper.second").css("z-index", "3");
    // Regular transition
    if (contentAnimType == "regular") {
        pageTransitionTl.from(".content-wrapper.second", {
            y: "50vh",
            opacity: 0,
            delay: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }
    // Directors transition
    else {
        pageTransitionTl.from($(".director_item-wrapper"), {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
            stagger: { amount: 1, from: "random" }
        });
    }
    // Animates the current page content
    pageTransitionTl.to(".content-wrapper.first",
        {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out"
        }, 0);
    // Start changing the background color
    pageTransitionTl.to(".page-background-color", {
        backgroundColor: pageBackgroundColor,
        duration: 0.5,
        ease: "power1.out"
    }, 0);
    if (menuLinkElement) {
        // Adds the current effect to the cliked link
        pageTransitionTl.to(menuLinkElement, {
            opacity: 0.5,
            duration: 0.5,
            ease: "power1.out"
        }, 0);
        // Removes the current state from the actual link
        pageTransitionTl.to($(".navbar_menu-link.w--current"), {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        }, 0);
    }
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