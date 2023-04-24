document.addEventListener("DOMContentLoaded", function () {
    //#region [ Item Scroll ]
    const viewportWidth = (coef) => window.innerWidth * (coef / 100);
    let scrollMatchMedia = gsap.matchMedia();
    let scrollRealoadPage = false;

    // Desktop Match Media
    scrollMatchMedia.add("(min-width: 992px)", () => {
        if(scrollRealoadPage) {
            window.location.reload();
        }
        setItemScroll(16);
        scrollRealoadPage = true;
    });

    // Tablet and below Match Media
    scrollMatchMedia.add("(max-width: 991px)", () => {
        if(scrollRealoadPage) {
            window.location.reload();
        }
        setItemScroll(30);
        scrollRealoadPage = true;
    });

    function setItemScroll(setItemScroll) {
        // Waits the intro to play
        setTimeout(() => {
            // Hides the work item when it reaches the top of the screen
            $(".works-list_wrapper").each(function (index) {
                let scrollTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: () => 'top ' + Math.min(viewportWidth(setItemScroll)),
                        end: () => 'bottom ' + Math.min(viewportWidth(setItemScroll)),
                        scrub: true,
                        // markers: true,
                    }
                });
                scrollTimeline.to($(this), {
                    opacity: 0,
                    ease: "none",
                }).set($(this), { pointerEvents: "none" });
            });
        }, 510);
    }
    //#endregion

    //#region [ Item Hover ]
    let matchMedia = gsap.matchMedia();
    let reloadPage = false; // This is important because each time it reaches the desktop breakpoint new timelines and varibales will be created

    // Desktop Match Media
    matchMedia.add("(min-width: 992px)", () => {
        if (reloadPage) {
            window.location.reload();
        }
        let plyrThumbConfig = Plyr.setup((".plyr_thumb"), {
            controls: [],
            blankVideo: "https://cdn.plyr.io/static/blank.mp4",
            resetOnEnd: true
        });

        $(".works-list_wrapper").each(function (index) {
            let workSlug = $(this).attr("work-slug");
            // Configurates the thumb plyr
            let plyrThumbWrapper = $(".work-plyr-thumb_wrapper").eq(index);
            let plyrThumbVideo = $(plyrThumbConfig[index])[0];
            // Make sure thumb player is not playing
            plyrThumbVideo.stop();
            // Creates the thumb gsap timeline
            let thumbTimeline = gsap.timeline({
                paused: true,
                onReverseComplete: hideThumbComponent
            });
            // Configurates the thumb gsap timeline
            thumbTimeline.from(plyrThumbWrapper, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            });

            // let workItemTitleWrapper = $(this).find(".works-list_title-wrapper");

            $(this).on("mouseenter", function () {
                if ($(plyrThumbWrapper).css("display") == "none") {
                    $(plyrThumbWrapper).css("display", "block");
                    thumbTimeline.play();
                    plyrThumbVideo.volume = 0;
                    plyrThumbVideo.muted = true;
                    var promise = plyrThumbVideo.play();
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
            $(this).on("mouseleave", function () {
                thumbTimeline.reverse();
                plyrThumbVideo.pause();
            });

            function hideThumbComponent() {
                $(plyrThumbWrapper).css("display", "none");
                plyrThumbVideo.stop();
            }
        });
    });

    // Tablet and below Match Media
    matchMedia.add("(max-width: 991px)", () => {
        $(".work-plyr-thumb_component").css("display", "none");
        reloadPage = true;
    });
    //#endregion
});