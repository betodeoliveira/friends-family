document.addEventListener("DOMContentLoaded", function () {
    let aboutComponent = $(".contact-bio_component");
    let aboutBackground = $(".contact-bio_background");
    let aboutLeftWrapper = $(".contact-bio_left-wrapper");
    let aboutRightWrapper = $(".contact-bio_content-wrapper");
    let aboutClose = $(".contact-bio_close");

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

    $(".principal-bio").click(function () {
        $("[contact-bio-rich-text]").html($(this).find(".text-rich-text").html());
        if ($(aboutComponent).css("display") == "none") {
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
});