document.addEventListener("DOMContentLoaded", function () {
    let workIntroTimeline = gsap.timeline({
        paused: false,
        onComplete: enablePageEvents
    });

    // Disables page events at first
    $(".content-wrapper").css("pointer-events", "none");
    $(".content-wrapper").addClass("second");

    // Configurates the timeline
    workIntroTimeline.fromTo(".content-wrapper", {
        y: "50vh",
        opacity: 0
    }, {
        y: "0vh",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });

    function enablePageEvents() {
        $(".content-wrapper").css("pointer-events", "auto");
        $(".content-wrapper").removeClass("second");
        // GSAP add some styles that must be removed to the thumb and video player work as expected
        $(".content-wrapper").removeAttr("style");
        // After removing style the opcity must be 1
        $(".content-wrapper").css("opacity", "1");
    }
});