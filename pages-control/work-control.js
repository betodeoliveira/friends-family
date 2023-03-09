//#region [ Item Scroll ]
const viewportWidth = (coef) => window.innerWidth * (coef / 100);

// Hides the work item when it reaches the top of the screen
$(".work_item-button").each(function (index) {
    ScrollTrigger.create({
        trigger: $(this),
        start: () => 'top ' + Math.min(viewportWidth(10)) + ' top',
        end: () => 'top ' + Math.min(viewportWidth(10)) + ' top',
        // markers: true,
        onEnter: () => {
            gsap.to($(this), { x: "-4rem", ease: "power2.out", duration: 0.5 });
            gsap.to($(this), { opacity: 0, duration: 0.25 });
            gsap.set((this), {pointerEvents: "none"});
        },
        onEnterBack: () => {
            gsap.to($(this), { x: "0rem", ease: "power2.out", duration: 0.5 });
            gsap.to($(this), { opacity: 1, duration: 0.5 });
            gsap.set((this), {pointerEvents: "auto"});
        }
    });
});
//#endregion

//#region [ Item Hover ]
$(".work_item-wrapper").each(function (index) {
    let workItemThumbComponent = $(this).find(".work_item-thumb-component");
    let workItemThumbPlayer = new Plyr($(this).find(".plyr_thumb")[0], {
        controls: [],
        resetOnEnd: true
    });

    // Shows animated thumb on hover
    $(workItemButton).on("mouseenter", function () {
        // console.log("hovering item");
        $(workItemThumbComponent).css("opacity", "1");
        workItemThumbPlayer.volume = 0;
        workItemThumbPlayer.muted = true;
        workItemThumbPlayer.play();
    });

    // Hides animated thumb on leave
    $(workItemButton).on("mouseleave", function () {
        // console.log("hovering out item");
        $(workItemThumbComponent).css("opacity", "0");
        workItemThumbPlayer.stop();
    });
});
//#endregion