// Waits webflow anf then adds the w--current class to the directors navbar link
var Webflow = Webflow || [];
Webflow.push(function () {
    $("#nav-link-directors").addClass("w--current");
    $("#nav-link-directors").css("pointer-events", "none");
});

let thumbPlayers = Plyr.setup((".plyr_thumb"), {
    controls: [],
    blankVideo: "https://cdn.plyr.io/static/blank.mp4",
    resetOnEnd: true
});

$(".director-work_wrapper").each(function (index) {
    let directorWorkButton = $(this).find(".director-work_button");
    let titleWrapper = $(this).find(".director-work_title-wrapper");
    let mainTitle = $(this).find(".director-work_main-title");
    let secondTitle = $(this).find(".director-work_second-title");
    let thumbWrapper = $(this).find(".director-work_thumb-wrapper");
    let thumbPlayer = $(thumbPlayers[index])[0];
    thumbPlayer.stop();

    let directorWorkTimeline = gsap.timeline({
        paused: true,
        onReverseComplete: hideThumbComponent
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
        directorWorkTimeline.play();
        thumbPlayer.valume = 0;
        thumbPlayer.muted = true;
        var promise = thumbPlayer.play();
        if (promise !== undefined) {
            promise.catch(error => {
                // console.log("Auto-play was prevented");
            }).then(() => {
                // console.log("Auto-play started");
            });
        }
    });

    $(directorWorkButton).on("mouseleave", function () {
        directorWorkTimeline.reverse();
    });

    $(directorWorkButton).on("click", function () {
        directorWorkTimeline.reverse();
    });

    function hideThumbComponent() {
        $(titleWrapper).css("display", "none");
        thumbPlayer.stop();
    }
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
        // let currentNavbarFontSize = $(".navbar_menu-link").css("font-size");
        // if (aboutInitialNavbarFontSize != currentNavbarFontSize) {
            // $(aboutComponent).css("padding-top", "8vw");
        // }
        // else {
            // $(aboutComponent).css("padding-top", "14vw");
        // }
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