let regularIntroAnimTl = gsap.timeline({
    paused: true
});

regularIntroAnimTl.from($(".director_item-button"),
{
    y: "50vh",
    opacity: 0,
    duration: .5,
    ease: "power1.out"
});

window.addEventListener("DOMContentLoaded", (event) => {
    directorItemButtonTl.play();
});