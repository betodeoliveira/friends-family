let regularIntroAnimTl = gsap.timeline({
    paused: true
});

regularIntroAnimTl.fromTo($(".content-wrapper"), {
    y: "50vh",
    opacity: 0
}, {
    y: "0vh",
    opacity: 1,
    duration: 0.5,
    ease: "power1.out"
});

window.addEventListener("DOMContentLoaded", (event) => {
    regularIntroAnimTl.play();
});