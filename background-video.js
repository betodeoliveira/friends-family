// Set to the class of your embed
let backgroundVid = $(".is-embed-video");

backgroundVid.each(function () {
    $("video", this).get(0).pause();
});

function playVideo() {
    // console.log("Play Video");
    let myVideo = $(backgroundVid.get(0)).find('video');
    myVideo.get(0).play();
    myVideo.prop('muted', true);
    $(".home-hero_background-video").css("opacity", "1");
}