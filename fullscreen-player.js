let playerInitialNavbarFontSize = $(".navbar_menu-link").css("font-size");

$(".fullscreen-player_component").each(function (index) {
    let playerComponent = $(this);
    let playerShow = $(this).parents("[fullscreen-player-show]");
    let playerBackground = $(this).find(".fullscreen-player_background");
    let playerAspect = $(this).find(".div-aspect-16x9.is-player");
    let playerTitle = $(this).find(".fullscreen-player_title");
    let playerClose = $(this).find(".fullscreen-player_close");
    let playerVideo = new Plyr($(this).find(".plyr_video"), {
        controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
        resetOnEnd: false
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
    $(playerShow).click(function () {
        if($(playerComponent).css("display") == "none") {
            let currentNavbarFontSize = $(".navbar_menu-link").css("font-size");
            if (playerInitialNavbarFontSize != currentNavbarFontSize) {
                $(".fullscreen-player_wrapper").css("padding-top", "8vw");
            }
            else {
                $(".fullscreen-player_wrapper").css("padding-top", "14vw");
            }
            $(playerComponent).css("display", "flex");
            playerTimeline.play();
            setTimeout(() => {
                playerVideo.muted = false;
                playerVideo.volume = 1;
                playerVideo.play();
            }, 500);
        }
    })

    // Sets what happens when the close button is clicked
    $(playerClose).click(function (e) {
        // Prevent the click from going to other elements and triggering the open again
        e.stopPropagation();
        playerTimeline.reverse();
        playerVideo.pause();
        setTimeout(() => {
            playerVideo.stop();
            $(playerComponent).css("display", "none");
        }, 1000);
    })
});