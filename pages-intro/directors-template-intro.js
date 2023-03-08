let directorsTemplateIntroTimeline = gsap.timeline({
    paused: false,
    onComplete: enablePageEvents
});

// Disables page events at first
$(".content-wrapper").css("pointer-events", "none");

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
}