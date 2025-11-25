fetch('./assets/json/gallery.json')
    .then(response => response.json())
    .then(data => {
        initGallery(data);
    });

function initGallery(data) {
    let categoryNames = ["Tous"];

    const gallery = document.querySelector(".gallery");
    data.forEach(categoryData => {
        categoryNames.push(categoryData.category);

        categoryData.images.forEach((image, index) => {
            const img = document.createElement("img");
            img.src = image.thumb_src;
            img.alt = image.alt || `Photographie ${(index + 1)}`;
            img.dataset.category = categoryData.category;
            img.dataset.full_size_src = image.full_size_src;
            img.loading = "lazy";
            img.addEventListener("click", onImageClicked);

            gallery.appendChild(img);
        });
    });

    initCategories(categoryNames);
    initImageViewer();
}

function initCategories(categories) {
    const catContainer = document.querySelector("#categories");

    categories.forEach((categoryName, index) => {
        const button = document.createElement("button");
        button.dataset.category = categoryName;
        button.innerText = categoryName;

        if (index == 0) button.classList.add("active");

        button.addEventListener("click", e => {
            applyFilter(categoryName);
        });

        catContainer.appendChild(button);
    });
}

function initImageViewer() {
    const imageViewer = document.querySelector("#image-viewer");
    imageViewer.addEventListener("click", e => {
        if (e.target == imageViewer) {
            imageViewer.classList.add("hidden");
            imageViewer.querySelector("img:not(button>img)").src = "#";
        }
    });

    imageViewer.addEventListener("click", e => {
        if (e.target instanceof HTMLButtonElement) {
            const btnClassList = e.target.classList;
            if (btnClassList.contains("previous")) {
                showPreviousImage();
            }
            else if (btnClassList.contains("next")) {
                showNextImage();
            }
        }
    });
}

function onImageClicked(e) {
    const imageViewer = document.querySelector("#image-viewer");
    imageViewer.querySelector("img:not(button>img)").src = e.target.dataset.full_size_src;
    imageViewer.classList.remove("hidden");
}

function getOpenedImageIndex() {
    let openedImageIndex = -1;

    let galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    galleryImages = galleryImages.filter(el => !el.classList.contains("hidden"));

    const openedImage = document.querySelector("#image-viewer>img");

    galleryImages.forEach((img, index) => {
        const openedImgTruncateSrc = openedImage.src;
        const galleryImgTruncateSrc = img.dataset.full_size_src.replace("./", "");
        if (openedImgTruncateSrc.includes(galleryImgTruncateSrc)) {
            openedImageIndex = index;
        }
    });

    return openedImageIndex;
}

function showPreviousImage() {
    let galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    galleryImages = galleryImages.filter(el => !el.classList.contains("hidden"));

    let imageIndex = getOpenedImageIndex();
    imageIndex = imageIndex - 1 >= 0 ? imageIndex - 1 : galleryImages.length - 1;

    galleryImages[imageIndex].click();
}

function showNextImage() {
    let galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    galleryImages = galleryImages.filter(el => !el.classList.contains("hidden"));

    let imageIndex = getOpenedImageIndex();
    imageIndex = imageIndex + 1 < galleryImages.length ? imageIndex + 1 : 0;

    galleryImages[imageIndex].click();
}

function applyFilter(filter) {
    let categoryButtons = document.querySelectorAll("#categories button");
    categoryButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.category == filter) btn.classList.add("active");
    });

    let galleryImages = document.querySelectorAll(".gallery img");
    galleryImages.forEach(img => {
        img.classList.remove("hidden");
        if (filter != "Tous" && img.dataset.category != filter) img.classList.add("hidden");
    });
}