// On Page Load
$(".content-wrapper").addClass("first");
let menuLinkElement;
let nextPageLink;

$(".navbar_menu-link:not(.w--current").on("click", function (e) {
    // Prevents the link to load the page
    e.preventDefault();
    menuLinkElement = $(this);
    nextPageLink = $(this).attr("href");
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
    pageTransitionTl.to(menuLinkElement, {
        opacity: 0.5,
        duration: 0.5,
        ease: "power1.out"
    }, 0);

    if ($(".content-wrapper.second").find(".section_contact-about")) {
        pageTransitionTl.to(".page-background", {
            backgroundColor: "#FFFFFF",
            duration: 0.5,
            ease: "power1.out"
        }, 0);
        pageTransitionTl.to(".navbar_menu-link", {
            color: "#2400ff",
            duration: 0.5,
            ease: "power1.out"
        }, 0);
    }
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