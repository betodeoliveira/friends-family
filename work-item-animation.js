const vw = (coef) => window.innerWidth * (coef/100);

$(".work_item-button").each(function (index) {
    ScrollTrigger.create({
        trigger: $(this),
        start: () => 'top ' + Math.min(vw(10)) + ' top',
        end: () => 'top ' + Math.min(vw(10)) + ' top',
        // markers: true,
        onEnter: () => {
        gsap.to($(this), {x: "-4rem", ease: "power2.out", duration: 0.5});
        gsap.to($(this), {opacity: 0, duration: 0.25});
        },
        onEnterBack: () => {
            gsap.to($(this), {x: "0rem", ease: "power2.out", duration: 0.5});
            gsap.to($(this), {opacity: 1, duration: 0.5});
        }
    });
});