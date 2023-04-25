$(document).ready(function () {
    let matchMedia = gsap.matchMedia();

    let introTimeline = gsap.timeline({
        paused: false,
        onComplete: enablePageEvents
    });

    // Disables page events at first
    $(".content-wrapper").css("pointer-events", "none");
    $(".content-wrapper").css("opacity", "1");

    // Desktop Match Media
    matchMedia.add("(min-width: 992px)", () => {
        setIntroTimeline("random");
    });

    // Tablet and below Match Media
    matchMedia.add("(max-width: 991px)", () => {
        setIntroTimeline("start");
    });

    function setIntroTimeline(staggerFrom) {
        // Kills the old timeline
        introTimeline.progress(0).kill();
        introTimeline.from($(".director_item-wrapper"), {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
            stagger: { amount: 1, from: staggerFrom }
        });
    }

    function enablePageEvents() {
        $(".content-wrapper").css("pointer-events", "auto");
    }
});