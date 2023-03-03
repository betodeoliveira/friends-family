let directorItemButtonTl = gsap.timeline({
    paused: true
});

directorItemButtonTl.to($(".director_item-button"),
{
    opacity: 1,
    duration: .5,
    ease: "power1.out",
    stagger: { amount: 1, from: "random" }
});

window.addEventListener("DOMContentLoaded", (event) => {
	$(".content-wrapper").css("opacity", "1");
    directorItemButtonTl.play();
});