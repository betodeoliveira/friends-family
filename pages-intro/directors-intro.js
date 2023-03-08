let directorsIntroTimeline = gsap.timeline({
    paused: false,
    onComplete: enablePageEvents
});

// Disables page events at first
$(".content-wrapper").css("pointer-events", "none");
$(".content-wrapper").css("opacity", "1");

// Configurates the timeline
directorsIntroTimeline.from($(".director_item-wrapper"), {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
    stagger: { amount: 1, from: "random" }
});

function enablePageEvents() {
    $(".content-wrapper").css("pointer-events", "auto");
}