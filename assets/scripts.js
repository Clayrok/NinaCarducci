$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'lightbox',
        showTags: true,
        tagsPosition: 'top'
    });

    loadImages();
});

async function loadImages() {
    function loadImagePromise(imgEl) {
        return new Promise(resolve => {
            imgEl.onload = () => {
                imgEl.classList.remove("visually-hidden");
                resolve(imgEl);
            };

            imgEl.src = imgEl.dataset.src.replace(".jpg", "-preview.webp");
        });
    }

    let galleryImgs = $(".gallery .gallery-item").get();
    galleryImgs = galleryImgs.concat($(".slide-img").get());
    galleryImgs.forEach(async function (el) {
        await loadImagePromise(el);
    });
}