//#region [ Item Scroll ]
const viewportWidth = (coef) => window.innerWidth * (coef / 100);

// Hides the work item when it reaches the top of the screen
$(".works_item-button").each(function (index) {
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
$(".works_item-wrapper").each(function (index) {
    let workItemButton = $(this).find(".works_item-button");
    let thumbComponent = $(this).find(".works_item-thumb-component");
    let thumbPlayer = new Plyr($(this).find(".plyr_thumb")[0], {
        controls: [],
        resetOnEnd: true
    });

    let thumbTimeline = gsap.timeline({
        paused: true,
        onReverseComplete: hideThumbComponent
    });

    thumbTimeline.from(thumbComponent, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out"
    })

    // Shows animated thumb on hover
    $(workItemButton).on("mouseenter", function () {
        if ($(thumbComponent).css("display") == "none") {
            $(thumbComponent).css("display", "block");
            workItemThumbPlayer.volume = 0;
            workItemThumbPlayer.muted = true;
            workItemThumbPlayer.play();
            thumbTimeline.play();
        };
    });

    // Hides animated thumb on leave
    $(workItemButton).on("mouseleave", function () {
        thumbTimeline.reverse();
        workItemThumbPlayer.pause();
    });
});

function hideThumbComponent() {
    $(thumbComponent).css("display", "none");
    workItemThumbPlayer.stop();
}
//#endregion