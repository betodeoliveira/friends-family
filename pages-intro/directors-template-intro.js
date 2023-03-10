let directorsTemplateIntroTimeline = gsap.timeline({
    paused: false,
    onComplete: enablePageEvents
});

// Disables page events at first
$(".content-wrapper").css("pointer-events", "none");
$(".content-wrapper").css("opacity", "1");

// Configurates the timeline
directorsTemplateIntroTimeline.fromTo(".director-works_collection", {
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
    // GSAP add some styles that must be removed to the thumb player and video player work as expected
    $(".director-works_collection").removeAttr("style");
}