let regularIntroAnimTl = gsap.timeline({
    paused: true
});

regularIntroAnimTl.from($(".content-wrapper"),
{
    y: "50vh",
    opacity: 0,
    duration: .5,
    ease: "power1.out"
});

window.addEventListener("DOMContentLoaded", (event) => {
    regularIntroAnimTl.play();
});