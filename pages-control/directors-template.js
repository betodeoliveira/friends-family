// Waits webflow anf then adds the w--current class to the directors navbar link
var Webflow = Webflow || [];
Webflow.push(function () {
    $("#nav-link-directors").addClass("w--current");
});

let playerTimeline;
let initialNavbarFontSize = $(".navbar_menu-link").css("font-size");

$(".director-work_wrapper").each(function (index)
{
    let directorWorkButton = $(this).find(".director-work_button");
    let titleWrapper = $(this).find(".director-work_title-wrapper");
    let mainTitle = $(this).find(".director-work_main-title");
    let secondTitle = $(this).find(".director-work_second-title");
    let thumbWrapper = $(this).find(".director-work_thumb-wrapper");
    let thumbPlayer = new Plyr($(thumbWrapper).find(".plyr_thumb")[0], {
        controls: [],
        volume: 0,
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

    $(directorWorkButton).on("mouseenter", function ()
    {
        $(titleWrapper).css("display", "flex");
        thumbPlayer.play();
        directorWorkTimeline.play();
    });

    $(directorWorkButton).on("mouseleave", function ()
    {
        directorWorkTimeline.reverse();
        setTimeout(() => {
            $(titleWrapper).css("display", "none");
            thumbPlayer.stop();
        }, 800);
    });
});