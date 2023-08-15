$(document).ready(function () {
    //#region [ Item Hover ]
    let matchMedia = gsap.matchMedia();
    let reloadPage = false; // This is important because each time it reaches the desktop breakpint new timelines and varibales will be created
    
    // Desktop Match Media
    matchMedia.add("(min-width: 992px)", () => {
        if(reloadPage) {
            window.location.reload();
        }
        $(".directors-thumb_collection").css("display", "block");
        let thumbPlayers = Plyr.setup((".plyr_thumb"), {
            controls: [],
            blankVideo: "https://cdn.plyr.io/static/blank.mp4",
            resetOnEnd: true
        });

        $(".director_item-wrapper").each(function (index) {
            let directorButton = $(this).find(".director_item-button");
            let directorSlug = $(directorButton).attr("director-slug");
            let thumbWrapper = $(".directors-thumb_list").find("[director-slug='" + directorSlug + "']");
            let thumbPlayer = $(thumbPlayers[index])[0];
            thumbPlayer.stop();

            let thumbTimeline = gsap.timeline({
                paused: true,
                onReverseComplete: hideThumbWrapper
            });

            thumbTimeline.from(thumbWrapper, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            });

            // Shows animated thumb on hover
            $(directorButton).on("mouseenter", function () {
                $(thumbWrapper).css("display", "flex");
                thumbTimeline.play();
                thumbPlayer.volume = 0;
                thumbPlayer.muted = true;
                var promise = thumbPlayer.play();
                if (promise !== undefined) {
                    promise.catch(error => {
                        console.log("Auto-play was prevented");
                    }).then(() => {
                        console.log("Auto-play started");
                    });
                }
            });

            $(directorButton).on("mouseleave", function () {
                thumbTimeline.reverse();
                thumbPlayer.pause();
            });

            function hideThumbWrapper() {
                $(thumbWrapper).css("display", "none");
                thumbPlayer.stop();
            }
        });

        // Tablet and below Match Media
        matchMedia.add("(max-width: 991px)", () => {
            $(".directors-thumb_collection").css("display", "none");
            $(".directors-thumb_collection").css("opacity", "0");
            reloadPage = true;
        });
    });
    //#endregion

    //#region [ Item Click ]
    let directorPageLink;
    let directorPageBackgroundColor;
    let directorPageNavbarLinksColor;
    let directorTitleMove;
    // What happens when a director name is clicked
    $(".director_item-button").on("click", function (e) {
        // Set the current content as first
        $(".content-wrapper").addClass("first");
        // Prevents the link to load the page
        e.preventDefault();
        // Sets the title that will Flip to the selected position
        directorTitleMove = $(this).find(".director_item-title-move").addClass("selected");
        // Sets the variables
        directorPageLink = $(this).attr("href");
        directorPageBackgroundColor = $(this).attr("page-background-color");
        directorPageNavbarLinksColor = $(this).attr("navbar-links-color");

        // Grabs the content of the next page
        $.ajax({
            url: directorPageLink,
            success: function (response) {
                let element = $(response).find(".content-wrapper").addClass("second");
                $(".main-wrapper").append(element);
            },
            complete: function () {
                playDirectorFlip();
                playDirectorLeave();
                setTimeout(() => {
                    gotToDirectorPage();
                }, 600);
            }
        });
    });

    function playDirectorFlip() {
        let directorMoveTitleState = Flip.getState(directorTitleMove);
        $(directorTitleMove).appendTo($(".directors-template_name-wrapper"));
        Flip.from(directorMoveTitleState, {
            duration: 0.5,
            scale: false,
            ease: "power1.out"
        });
    }

    function playDirectorLeave() {
        $("html").addClass("animating");
        // Creates the timeline
        directorLeaveTimeline = gsap.timeline({
            paused: false
        });

        // The content shouldn't be clickable
        $(".content-wrapper.first").css("pointer-events", "none");

        // Hides content first
        directorLeaveTimeline.to(".content-wrapper.first", {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out"
        });

        // Hides the thumb wrapper
        directorLeaveTimeline.to(".directors-thumb_item-wrapper", {
            opacity: 0,
            duration: 0.3,
            ease: "power1.out"
        }, 0);

        // Changes the background color
        directorLeaveTimeline.to(".page-background-color", {
            backgroundColor: directorPageBackgroundColor,
            duration: 0.3,
            ease: "power1.out"
        }, 0);

        // Changes the navbar link colors
        directorLeaveTimeline.to(".navbar_menu-link", {
            color: directorPageNavbarLinksColor,
            duration: 0.5,
            ease: "power1.out"
        }, 0);

        $(".directors-template_name").css("opacity", "0");
        $(".director-works_collection").css("opacity", "0");
        $(".director-works_collection").css("pointer-events", "none");

        // Animates the next page content
        directorLeaveTimeline.fromTo(".content-wrapper.second", {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out"
        }, 0);
    }

    function gotToDirectorPage() {
        window.location = directorPageLink;
    }
    //#endregion
});