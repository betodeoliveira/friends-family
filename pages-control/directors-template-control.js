// Waits webflow anf then adds the w--current class to the directors navbar link
var Webflow = Webflow || [];
Webflow.push(function () {
    $("#nav-link-directors").addClass("w--current");
    $("#nav-link-directors").css("pointer-events", "none");
});

$(".director-work_wrapper").each(function (index) {
    let directorWorkButton = $(this).find(".director-work_button");
    let titleWrapper = $(this).find(".director-work_title-wrapper");
    let mainTitle = $(this).find(".director-work_main-title");
    let secondTitle = $(this).find(".director-work_second-title");
    let thumbWrapper = $(this).find(".director-work_thumb-wrapper");
    let thumbPlayer = new Plyr($(thumbWrapper).find(".plyr_thumb")[0], {
        controls: [],
        resetOnEnd: true
    });

    let directorWorkTimeline = gsap.timeline({
        paused: true
    });

    directorWorkTimeline.to(thumbWrapper, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out"
    });

    directorWorkTimeline.from(mainTitle, {
        y: "4rem",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    directorWorkTimeline.from(secondTitle, {
        y: "4rem",
        opacity: 0,
        delay: 0.125,
        duration: 0.5,
        ease: "power2.out"
    }, "<");

    $(directorWorkButton).on("mouseenter", function () {
        $(titleWrapper).css("display", "flex");
        thumbPlayer.valume = 0;
        thumbPlayer.muted = true;
        thumbPlayer.play();
        directorWorkTimeline.play();
    });

    $(directorWorkButton).on("mouseleave", function () {
        directorWorkTimeline.reverse();
        setTimeout(() => {
            $(titleWrapper).css("display", "none");
            thumbPlayer.stop();
        }, 800);
    });
});

//#region [ About ]
let aboutInitialNavbarFontSize = $(".navbar_menu-link").css("font-size");
let aboutComponent = $(".director-about_component");
let aboutBackground = $(".director-about_background");
let aboutLeftWrapper = $(".director-about_left-wrapper");
let aboutRightWrapper = $(".director-about_right-wrapper");
let aboutClose = $(".director-about_close");

let aboutTimeline = gsap.timeline({
    paused: true,
    onReverseComplete: hideAboutComponent
});

aboutTimeline.fromTo(aboutBackground, {
    opacity: 0,
}, {
    opacity: 1,
    duration: 0.3
});

aboutTimeline.fromTo(aboutLeftWrapper, {
    opacity: 0,
    y: "4rem"
}, {
    opacity: 1,
    y: "0rem",
    duration: 0.5
});

aboutTimeline.fromTo(aboutRightWrapper, {
    opacity: 0,
    y: "4rem"
}, {
    opacity: 1,
    y: "0rem",
    duration: 0.5
}, "<0.25");

aboutTimeline.fromTo(aboutClose, {
    opacity: 0
}, {
    opacity: 1,
    duration: 0.5
}, "<0.25");

$(".director-about-button").click(function () {
    if ($(aboutComponent).css("display") == "none") {
        let currentNavbarFontSize = $(".navbar_menu-link").css("font-size");
        if (aboutInitialNavbarFontSize != currentNavbarFontSize) {
            $(aboutComponent).css("padding-top", "8vw");
        }
        else {
            $(aboutComponent).css("padding-top", "14vw");
        }
        $(aboutComponent).css("display", "flex");
        aboutTimeline.play();
    }
});

$(aboutClose).click(function (e) {
    // Prevent the click from going to other elements and triggering the open again
    e.stopPropagation();
    aboutTimeline.reverse();
});

function hideAboutComponent() {
    $(aboutComponent).css("display", "none");
}
//#endregion