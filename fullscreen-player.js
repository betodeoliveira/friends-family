// Observations:
// 1. Plyr doesn't go on landingscape when video is on fullscreen. So we are disabling it on mobile and using the native player;
// 2. Using native player means that we lose some controls from plyr that's why we have a function to pause the video. 
$(document).ready(function () {
    let playerInitialNavbarFontSize = $(".navbar_menu-link").css("font-size");
    let fullscreenPlayers = Plyr.setup((".plyr_video"), {
        controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
        blankVideo: "https://cdn.plyr.io/static/blank.mp4",
        // Disbales on mobile
        enabled: !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
        resetOnEnd: false
    });

    $("[fullscreen-player-show]").each(function (index) {
        let plyrFullscreenWrapper = $(".plyr-fullscreen_wrapper").eq(index);
        let playerClose = $(plyrFullscreenWrapper).find(".plyr-fullscreen_close");
        let playerVideo = $(fullscreenPlayers[index])[0];
        let playerTimeline = gsap.timeline({
            paused: true,
            onComplete: timelinePlayerPlay,
            onReverseComplete: timelinePlayerStop
        });
        createPlayerTimeline(plyrFullscreenWrapper);

        // Sets what happens when the player button is clicked
        $(this).click(function () {
            $(plyrFullscreenWrapper).css("display", "flex");
            let currentNavbarFontSize = $(".navbar_menu-link").css("font-size");
            if (playerInitialNavbarFontSize != currentNavbarFontSize) {
                $(".plyr-fullscreen_layout").css("padding-top", "12vw");
            }
            else {
                $(".plyr-fullscreen_layout").css("padding-top", "18vw");
            }

            playerTimeline.play();
        });

        // Sets what happens when the close button is clicked
        $(playerClose).click(function (e) {
            // // Prevent the click from going to other elements and triggering the open again
            // e.stopPropagation();
            // if (!playerVideo.paused) {
            //     pauseVideo();
            // }
            // playerTimeline.reverse();
        });

        function timelinePlayerPlay() {
            playerVideo.muted = false;
            playerVideo.volume = 1;
            let promise = playerVideo.play();
            if (promise !== undefined) {
                promise.catch(error => {
                    // console.log("Fullscreen player Auto-play was prevented");
                }).then(() => {
                    // console.log("Fullscreen player Auto-play started");
                });
            }
        }

        function timelinePlayerStop() {
            pauseVideo();
            playerVideo.restart();
            $(plyrFullscreenWrapper).css("display", "none");
        }

        // Pauses the video depending if it running on plyr or on native device player
        function pauseVideo() {
            if(playerVideo.isHTML5) {
                playerVideo.pause();
            }
            else {
                $(".plyr_video")[index].pause();
            }
        }

        function createPlayerTimeline(element) {
            // playerTimeline.to(".navbar_background-color", {
            //     opacity: 0,
            //     duration: 0.5
            // });

            // playerTimeline.from($(element).find(".plyr-fullscreen_background"), {
            //     opacity: 0,
            //     duration: 0.5
            // }, 0);

            // playerTimeline.fromTo($(element).find(".div-aspect-16x9.is-player"), {
            //     y: "10rem",
            //     opacity: 0
            // }, {
            //     y: "0rem",
            //     opacity: 1,
            //     duration: 0.5,
            //     ease: "power2.out"
            // }, 0);

            // playerTimeline.fromTo($(element).find(".plyr-fullscreen_title"), {
            //     y: "10rem",
            //     opacity: 0
            // }, {
            //     y: "0rem",
            //     opacity: 1,
            //     duration: 0.5,
            //     ease: "power2.out"
            // }, 0.25);

            // playerTimeline.fromTo($(playerClose), {
            //     opacity: 0,
            // }, {
            //     opacity: 1,
            //     duration: 0.5
            // }, 0.25);
        }
    });
});