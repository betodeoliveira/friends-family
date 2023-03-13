let playerInitialNavbarFontSize = $(".navbar_menu-link").css("font-size");
let navbarBackground = $(".navbar_background-color");

let fullscreenPlayers = Plyr.setup((".plyr_video"), {
    controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
    blankVideo: "https://cdn.plyr.io/static/blank.mp4",
    resetOnEnd: false
});

$(".fullscreen-player_component").each(function (index) {
    let playerComponent = $(this);
    let playerShow = $(this).parents("[fullscreen-player-show]");
    let playerBackground = $(this).find(".fullscreen-player_background");
    let playerAspect = $(this).find(".div-aspect-16x9.is-player");
    let playerTitle = $(this).find(".fullscreen-player_title");
    let playerClose = $(this).find(".fullscreen-player_close");
    let playerVideo = $(fullscreenPlayers[index])[0];
    let playerTimeline = gsap.timeline({
        paused: true,
    });

    playerTimeline.to(navbarBackground, {
        opacity: 0,
        duration: 0.5
    });

    playerTimeline.from(playerBackground, {
        opacity: 0,
        duration: 0.5
    }, 0);

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
                $(".fullscreen-player_wrapper").css("padding-top", "12vw");
            }
            else {
                $(".fullscreen-player_wrapper").css("padding-top", "18vw");
            }
            $(playerComponent).css("display", "flex");
            playerTimeline.play();
            setTimeout(() => {
                playerVideo.muted = false;
                playerVideo.volume = 1;
                var promise = playerVideo.play();
                if (promise !== undefined) {
                    promise.catch(error => {
                        console.log("Auto-play was prevented");
                    }).then(() => {
                        console.log("Auto-play started");
                    });
                }
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