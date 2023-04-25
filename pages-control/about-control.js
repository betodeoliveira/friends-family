document.addEventListener("DOMContentLoaded", function () {
    // First row
    for (let index = 0; index < 14; index++) {
        if(index == 0){
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "0% 0%");
        }
        else if(index == 13) {
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "100% 0%");
        }
        else {
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "50% 0%");
        }
    }

    for (let index = 14; index < 294; index += 14) {
        if(index == 279){
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "0% 100%");
        }
        else {
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "0% 50%");
        }
    }

    for (let index = 27; index < 294; index += 14) {
        if(index == 293) {
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "100% 0%");
        }
        else {
            $(".div-aspect-1x1").eq(index).find(".image-2").css("transform-origin", "100% 50%");
        }
    }

    $(".div-aspect-1x1").each(function (index) {
        $(this).on("mouseenter", function () {
            $(this).find(".image-2").css("z-index", "2");
            gsap.set($(this).find(".image-2"), {opacity: 1, duration: 0});
            gsap.to($(this).find(".image-2"), {scale: 3, duration: 0.5, ease: "power4.out"});
        });

        // Hides animated thumb on leave
        $(this).on("mouseleave", function () {
            $(this).find(".image-2").css("z-index", "1");
            gsap.to($(this).find(".image-2"), {scale: 1, duration: 0.5, ease: "power1.out"});
            setTimeout(() => {
                if(!gsap.isTweening($(this).find(".image-2"))) {
                    gsap.set($(this).find(".image-2"), {opacity: 0, duration: 0});
                }
            }, 500);
        });
    });
});