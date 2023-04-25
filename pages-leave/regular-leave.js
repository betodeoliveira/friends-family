let nextPageLink;
let nextPageBackgroundColor;
let nextPageNavbarLinksColor;
let regularLeaveTimeline;

// What happens when a link from the navbar is clicked
$(".navbar_menu-link:not(.w--current)").on("click", function (e) {
    // Prevents the link to load the page
    e.preventDefault();
    // Sets the variables
    nextPageLink = $(this).attr("href");
    nextPageBackgroundColor = $(this).attr("page-background-color");
    nextPageNavbarLinksColor = $(this).attr("navbar-links-color");
    playLeave();
});

function playLeave() {
    regularLeaveTimeline = gsap.timeline({
        paused: false,
        onComplete: gotToNextPage
    });

    // The content shouldn't be clickable
    $(".content-wrapper").css("pointer-events", "none");

    // Hides the current content
    regularLeaveTimeline.to(".content-wrapper", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out"
    });

    // Changes the background color
    regularLeaveTimeline.to(".page-background-color", {
        backgroundColor: nextPageBackgroundColor,
        duration: 0.3,
        ease: "power1.out"
    }, 0);

    // Changes the navbar link colors
    regularLeaveTimeline.to(".navbar_menu-link", {
        color: nextPageNavbarLinksColor,
        duration: 0.5,
        ease: "power1.out"
    }, 0);
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