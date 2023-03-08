let nextPageLink;
let nextPageBackgroundColor;
let nextPageNavbarLinksColor;

// What happens when a link from the navbar is clicked
$(".navbar_menu-link:not(.w--current").on("click", function (e) {
    // Prevents the link to load the page
    e.preventDefault();
    // Sets the variables
    nextPageLink = $(this).attr("href");
    nextPageBackgroundColor = $(this).attr("page-background-color");
    nextPageNavbarLinksColor = $(this).attr("navbar-links-color");
    playLeave();
});

function playLeave() {
    let pageLeaveTimeline = gsap.timeline({
        paused: false,
        onComplete: gotToNextPage
    });

    // The content shouldn't be clickable
    $(".content-wrapper").css("pointer-events", "none");

    // Hides the current content
    pageLeaveTimeline.to(".content-wrapper", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out"
    });

    // Changes the background color
    pageLeaveTimeline.to(".page-background-color", {
        backgroundColor: nextPageBackgroundColor,
        duration: 0.3,
        ease: "power1.out"
    }, 0);

    // Changes the navbar link colors
    pageLeaveTimeline.to(".navbar_menu-link", {
        color: nextPageNavbarLinksColor,
        duration: 0.5,
        ease: "power1.out"
    }, 0);
}

function gotToNextPage() {
    window.location = nextPageLink;
}