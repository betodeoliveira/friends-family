$(".full-screen-player_component").each(function (index) {
    let playerShow = $(this).find("[full-screen-player]");
    let playerBackground = $(this).find(".full-screen-player_background");
    let playerAspect = $(this).find(".div-aspect-16x9.is-player");
    let playerTitle = $(this).find(".director-work_player-title");
    let playerClose = $(this).find(".full-screen-player_close");
    let playerVideo = new Plyr($(this).find(".plyr_video")[0], {
        controls: ["play", "progress", "current-time", "mute", "fullscreen"],
        volume: 1,
        resetOnEnd: true
    });
    let playerTimeline = gsap.timeline({
        paused: true,
    });

    playerTimeline.from(playerBackground, {
        opacity: 0,
        duration: 0.5
    });

    playerTimeline.fromTo(playerAspect, {
        y: "10rem",
        opacity: 0
    }, {
        y: "0rem",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, 0);

    playerTimeline.fromTo(playerTitle, {
        y: "10rem",
        opacity: 0
    }, {
        y: "0rem",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, 0.25);

    playerTimeline.fromTo($(playerClose), {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 0.5
    }, 0.25);

    // Sets what happens when the player button is clicked
    $(playerShow).on("click", function () {
        console.log("Open player");
        let currentNavbarFontSize = $(".navbar_menu-link").css("font-size");
        if (initialNavbarFontSize != currentNavbarFontSize) {
            $(".full-screen-player_wrapper").css("padding-top", "8vw");
        }
        else {
            $(".full-screen-player_wrapper").css("padding-top", "14vw");
        }
        $(this).css("display", "flex");
        playerTimeline.play();
        setTimeout(() => {
            playerVideo.play();
        }, 500);
    });

    // Sets what happens when the close button is clicked
    $(playerClose).on("click", function () {
        console.log("Close player");
        playerTimeline.reverse();
        playerVideo.pause();
        setTimeout(() => {
            playerVideo.stop();
            $(this).css("display", "none");
        }, 1000);
    });
});