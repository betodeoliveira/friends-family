$(".work_item-thumb-embed").each(function (index) {
    $("video", this).get(0).pause();
});

$(".work_item-wrapper").each(function (index) {

    let workItemThumbComponent = $(this).find(".work_item-thumb-component");
    let workItemButton = $(this).find(".work_item-button");
    let workItemPlayerComponent = $(this).find(".work_item-player-component");
    let workItemPlayerClose = $(this).find(".work_item-player-close");
    let workItemThumbPlayer = new Plyr($(this).find(".plyr_thumb")[0], {
        controls: [],
        volume: 0,
        resetOnEnd: true
    });
    let workItemPlayer = new Plyr($(this).find(".plyr_video")[0], {
        controls: ["play", "progress", "current-time", "mute", "fullscreen"],
        resetOnEnd: true
    });

    // Creates the timeline animation
    let playerTimeLine = gsap.timeline({
        paused: true,
    });

    playerTimeLine.from($(this).find(".work_item-player-background"), {
        opacity: 0,
        duration: 0.5
});

    playerTimeLine.fromTo($(this).find(".div-aspect-16x9"), {
        y: "10rem",
        opacity: 0
    }, {
        y: "0rem",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, 0);

    playerTimeLine.fromTo($(this).find(".work_item-player-title"), {
        y: "10rem",
        opacity: 0
    }, {
        y: "0rem",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, 0.25);

    playerTimeLine.fromTo($(workItemPlayerClose), {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 0.5
    }, 0.25);

    // Shows animated thumb on hover
    $(workItemButton).on("mouseenter", function () {
        // console.log("hovering item");
        $(workItemThumbComponent).css("opacity", "1");
        workItemThumbPlayer.play();
        // $(workItemThumbComponent).find('video').get(0).play();
    });

    // Hides animated thumb on leave
    $(workItemButton).on(".work_item-button").on("mouseleave", function () {
        // console.log("hovering out item");
        $(workItemThumbComponent).css("opacity", "0");
        workItemThumbPlayer.stop();
        // $(workItemThumbComponent).find('video').get(0).pause();
        // Reset video timeline to beginning
        // $(workItemThumbComponent).find('video').get(0).currentTime = 0;
    });

    // Sets what happen when the work item is clicked
    $(workItemButton).on("click", function () {
        // console.log("Open player");
        $(workItemPlayerComponent).css("display", "flex");
        playerTimeLine.play();
        setTimeout(() => {
            workItemPlayer.play();
        }, 500);
    });

    // Sets what happen when the player close button clicked
    $(workItemPlayerClose).on("click", function () {
        // console.log("Close player");
        playerTimeLine.reverse();
        setTimeout(() => {
            workItemPlayer.stop();
            $(workItemPlayerComponent).css("display", "none");
        }, 1000);
    });
});