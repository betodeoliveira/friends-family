//#region [ Item Hover ]
$(".director_item-wrapper").each(function (index) {

    let directorButton = $(this).find(".director_item-button");
    let directorSlug = $(this).find(".director_item-slug").attr("director-slug");
    let thumbSlug;
    let thumbWrapper;
    let thumbPlayer;

    $(directorButton).each(function (index) {
        // console.log("slug to find: " + directorSlug);
        thumbSlug = $(".directors-thumb_list").find("[director-slug='" + directorSlug + "']");
        // console.log("element with slug: " + $(thumbSlug).attr("director-slug"));
        thumbWrapper = $(thumbSlug).parents(".directors-thumb_item-wrapper");
        thumbPlayer = new Plyr($(thumbWrapper).find(".plyr_thumb")[0], {
            controls: [],
            volume: 0,
            resetOnEnd: true
        });
    });

    // Shows animated thumb on hover
    $(directorButton).on("mouseenter", function () {
        $(thumbWrapper).css("opacity", "1");
        thumbPlayer.play();
    });

    $(directorButton).on("mouseleave", function () {
        $(thumbWrapper).css("opacity", "0");
        thumbPlayer.stop();
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

    //
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