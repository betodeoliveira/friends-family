$(".director_item-wrapper").each(function (index) {

    let directorButton = $(this).find(".director_item-button");
    let directorSlug = $(this).find(".director_slug").attr("director-slug");
    let thumbSlug;
    let thumbWrapper;
    let thumbPlayer;

    $(directorButton).each(function (index) {
        // console.log("slug to find: " + directorSlug);
        thumbSlug = $(".collection-list").find("[director-slug='" + directorSlug +"']");
        // console.log("element with slug: " + $(thumbSlug).attr("director-slug"));
        thumbWrapper = $(thumbSlug).parents(".div-temp-wrapper");
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