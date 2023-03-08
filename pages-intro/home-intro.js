// ATTENTION!
// This code is just a base.
// The code that is running is inside home-hero_background-video-code element

var Webflow = Webflow || [];
Webflow.push(function () {
    let headingFadeInFrom = "start";
    let headingFadeInTime = 1.6;
    let backgroundVideoFadeInTime = 1.0;
    let navbarFadeInTime = 1.0;

    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    });

    $("[letters-fade-in]").each(function (index) {
        let tl = gsap.timeline({ paused: false, onComplete: () => playVideo() });
        tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, delay: 0.2, ease: "power1.out", stagger: { from: headingFadeInFrom, amount: headingFadeInTime } });
    });

    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });

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
        gsap.to($(".home-hero_background-video"), { opacity: 1, duration: backgroundVideoFadeInTime });
        gsap.to($(".navbar_menu-layout"), { opacity: 1, duration: navbarFadeInTime });
    }
});