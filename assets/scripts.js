document.addEventListener("DOMContentLoaded", function() {
    loadImages();
});

async function loadImages() {
    function loadImagePromise(imgEl) {
        return new Promise(resolve => {
            imgEl.onload = () => {
                imgEl.classList.remove("differed-img");
                resolve(imgEl);
            };

            imgEl.src = imgEl.dataset.src.replace(".jpg", "-preview.webp");
            imgEl.removeAttribute("data-src");
        });
    }

    let imgs = document.querySelectorAll(".differed-img");
    imgs.forEach(async function (el) {
        await loadImagePromise(el);
    });
}