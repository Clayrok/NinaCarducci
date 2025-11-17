const slideDelay = 3000;
let slideTimeout = null;

document.addEventListener("DOMContentLoaded", function (e) {
    initCarousel();
});

function initCarousel() {
    initIndicators();
    initEvents();
    startSlideTimeout();
}

function startSlideTimeout() {
    if (slideTimeout) clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => {
        slideNext();
    }, slideDelay);
}

function initEvents() {
    document.querySelectorAll("[class^=carousel-control]").forEach(el => {
        el.addEventListener("click", function (e) {
            const classList = e.target.classList;
            if (classList.contains("carousel-control-prev")) {
                slidePrev();
            }
            else if (classList.contains("carousel-control-next")) {
                slideNext();
            }

            startSlideTimeout();
        });
    });
}

function initIndicators() {
    const indicatorsContainer = document.querySelector(".carousel-indicators");
    const carouselContainer = document.querySelectorAll(".carousel-inner .carousel-item");

    carouselContainer.forEach((el, index) => {
        const newIndicator = document.createElement("button");
        newIndicator.classList.add("pointer");
        newIndicator.ariaLabel = `Slide ${(index + 1)}`;
        
        if (el.classList.contains("active")) {
            newIndicator.classList.add("active");
            newIndicator.ariaCurrent = true;
        }

        newIndicator.addEventListener("click", function (e) {
            goToSlide(index);
        });

        indicatorsContainer.appendChild(newIndicator);
    });
}

function setSelectedIndicator(index) {
    const indicators = document.querySelectorAll(".carousel-indicators button");
    indicators.forEach(el => {
        el.classList.remove("active")
        el.ariaCurrent = false;
    });
    indicators[index].classList.add("active");
    indicators[index].ariaCurrent = true;
}

function slidePrev() {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const activeCarouselItem = document.querySelector(".carousel-item.active");

    if (!activeCarouselItem) return;

    const currentIndex = Array.from(carouselItems).indexOf(activeCarouselItem);
    const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;

    goToSlide(prevIndex);
}

function slideNext() {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const activeCarouselItem = document.querySelector(".carousel-item.active");

    if (!activeCarouselItem) return;

    const currentIndex = Array.from(carouselItems).indexOf(activeCarouselItem);
    const nextIndex = (currentIndex + 1) % carouselItems.length;

    goToSlide(nextIndex);
}

function goToSlide(index) {
    const carouselContainer = document.querySelector(".carousel-inner");
    const carouselItems = document.querySelectorAll(".carousel-item");

    if (!carouselContainer || carouselItems.length === 0 || index < 0 || index >= carouselItems.length) {
        return;
    }

    const activeCarouselItem = document.querySelector(".carousel-item.active");
    if (activeCarouselItem) {
        activeCarouselItem.classList.remove("active");
    }

    const targetCarouselItem = carouselItems[index];
    targetCarouselItem.classList.add("active");

    const newScrollLeft = index * targetCarouselItem.clientWidth;
    carouselContainer.scrollTo({ left: newScrollLeft });

    setSelectedIndicator(index);

    startSlideTimeout();
}