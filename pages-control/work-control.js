$(document).ready(function () {
    //#region [ Item Scroll ]
    const viewportWidth = (coef) => window.innerWidth * (coef / 100);

    // Hides the work item when it reaches the top of the screen
    $(".works_item-title-component").each(function (index) {
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
    let matchMedia = gsap.matchMedia();
    let reloadPage = false; // This is important because each time it reaches the desktop breakpint new timelines and varibales will be created

    // Desktop Match Media
    matchMedia.add("(min-width: 992px)", () => {
        if(reloadPage) {
            window.location.reload();
        }
        let thumbPlayers = Plyr.setup((".plyr_thumb"), {
            controls: [],
            blankVideo: "https://cdn.plyr.io/static/blank.mp4",
            resetOnEnd: true
        });

        $(".works_item-wrapper").each(function (index) {
            let workItemTitleWrapper = $(this).find(".works_item-title-component");
            let thumbComponent = $(this).find(".works_item-thumb-component");
            let thumbPlayer = $(thumbPlayers[index])[0];
            thumbPlayer.stop();
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
                    thumbTimeline.play();
                    thumbPlayer.volume = 0;
                    thumbPlayer.muted = true;
                    var promise = thumbPlayer.play();
                    if (promise !== undefined) {
                        promise.catch(error => {
                            // console.log("Auto-play was prevented");
                        }).then(() => {
                            // console.log("Auto-play started");
                        });
                    }
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
    });

    // Tablet and below Match Media
    matchMedia.add("(max-width: 991px)", () => {
        $(".works_item-thumb-component").css("display", "none");
        $(".works_item-thumb-component").css("opacity", "0");
        reloadPage = true;     
    });
    //#endregion
});