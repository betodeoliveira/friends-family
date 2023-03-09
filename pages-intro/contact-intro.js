$(".content-wrapper").css("opacity", "1");

$("[animate-scroll-in]").each(function (index) {
    let contactIntroTimeline = gsap.timeline({
        paused: true
    });

    // Configurates the timeline
    contactIntroTimeline.fromTo($(this).find(".contact_content"), {
        y: "25vh",
        opacity: 0
    }, {
        y: "0vh",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });

    // Creates the scroll trigger
    ScrollTrigger.create({
        trigger: $(this),
        start: "top bottom-=20%",
        end: "top bottom",
        markers: false,
        onEnter: () => {
            contactIntroTimeline.play();
        }
    });
});