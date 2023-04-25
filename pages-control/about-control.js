document.addEventListener("DOMContentLoaded", function () {
    // Adapt the transform origin of the first row
    for (let i = 0; i < 14; i++) {
        // Get the high resolution image
        let highImage = $(".about-gallery_item").eq(i).find(".about-gallery_high-res-image");
        // Adapt based on the image position on the page
        if(i == 0){
            $(highImage).css("transform-origin", "0% 0%");
        }
        else if(i == 13) {
            $(highImage).css("transform-origin", "100% 0%");
        }
        else {
            $(highImage).css("transform-origin", "50% 0%");
        }
    }
    // Adapt the transform origin of the last row
    for (let i = 294 - 14; i < 294; i++) {
        // Get the high resolution image
        let highImage = $(".about-gallery_item").eq(i).find(".about-gallery_high-res-image");
        // Adapt based on the image position on the page
        if (i == 280) {
            $(highImage).css("transform-origin", "0% 100%");
        }
        else if (i == 293) {
            $(highImage).css("transform-origin", "100% 100%");
        }
        else {
            $(highImage).css("transform-origin", "50% 100%");
        }
    }
    // Adapt the transform origin of the first column
    for (let i = 14; i < 294 - 14; i += 14) {
        // Get the high resolution image
        let highImage = $(".about-gallery_item").eq(i).find(".about-gallery_high-res-image");
        // Adapt based on the image position on the page
        if(i == 279){
            $(highImage).css("transform-origin", "0% 100%");
        }
        else {
            $(highImage).css("transform-origin", "0% 50%");
        }
    }
    // Adapt the transform origin of the last column
    for (let i = 27; i < 294 - 14; i += 14) {
        // Get the high resolution image
        let highImage = $(".about-gallery_item").eq(i).find(".about-gallery_high-res-image");
        if(i == 293) {
            $(highImage).css("transform-origin", "100% 0%");
        }
        else {
            $(highImage).css("transform-origin", "100% 50%");
        }
    }

    $(".about-gallery_item").each(function (i) {
        // Get the high resolution image
        let highImage = $(this).find(".about-gallery_high-res-image");
        $(this).on("mouseenter", function () {
            $(highImage).css("z-index", "2");
            gsap.set(highImage, { opacity: 1, duration: 0 });
            gsap.to(highImage, { scale: 3, duration: 0.5, ease: "power4.out" });
        });

        // Hides animated thumb on leave
        $(this).on("mouseleave", function () {
            $(highImage).css("z-index", "1");
            gsap.to(highImage, {
                scale: 1, duration: 0.5, ease: "power1.out",
                onComplete: () => {
                    if (!gsap.isTweening(highImage)) {
                        gsap.set(highImage, { opacity: 0, duration: 0 });
                    }
                }
            });
        });
    });
});