//#region [ Item Scroll ]
const viewportWidth = (coef) => window.innerWidth * (coef / 100);

// Hides the work item when it reaches the top of the screen
$(".works_item-title-wrapper").each(function (index) {
    ScrollTrigger.create({
        trigger: $(this),
        start: () => 'top ' + Math.min(viewportWidth(10)) + ' top',
        end: () => 'top ' + Math.min(viewportWidth(10)) + ' top',
        // markers: true,
        onEnter: () => {
            gsap.to($(this), { x: "-4rem", ease: "power2.out", duration: 0.5 });
            gsap.to($(this), { opacity: 0, duration: 0.25 });
            gsap.set((this), { pointerEvents: "none" });
        },
        onEnterBack: () => {
            gsap.to($(this), { x: "0rem", ease: "power2.out", duration: 0.5 });
            gsap.to($(this), { opacity: 1, duration: 0.5 });
            gsap.set((this), { pointerEvents: "auto" });
        }
    });
});
//#endregion

//#region [ Item Hover ]
let thumbPlayers = Plyr.setup((".plyr_thumb"), {
    controls: [],
    resetOnEnd: true
});

$(".works_item-wrapper").each(function (index) {
    let workItemTitleWrapper = $(this).find(".works_item-title-wrapper");
    let thumbComponent = $(this).find(".works_item-thumb-component");
    let thumbPlayer = $(thumbPlayers[index])[0];

    let thumbTimeline = gsap.timeline({
        paused: true,
        onReverseComplete: hideThumbComponent
    });

    thumbTimeline.from(thumbComponent, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out"
    });

    // The hover most be done here because if we do on the works_item-wrapper the mouse leave will just play when the mouse leaves the screen
    $(workItemTitleWrapper).on("mouseenter", function () {
        if ($(thumbComponent).css("display") == "none") {
            $(thumbComponent).css("display", "block");
            thumbPlayer.volume = 0;
            thumbPlayer.muted = true;
            thumbPlayer.play();
            thumbTimeline.play();
        };
    });

    // Hides animated thumb on leave
    $(workItemTitleWrapper).on("mouseleave", function () {
        thumbTimeline.reverse();
        thumbPlayer.pause();
    });

    function hideThumbComponent() {
        $(thumbComponent).css("display", "none");
        thumbPlayer.stop();
    }
});
//#endregion