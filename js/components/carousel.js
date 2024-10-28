export function createCarousel(carouselElement, totalItems) {
    return {
        element: carouselElement,
        totalItems,
        currentIndex: 0,
    };
}
export function updateCarousel(carousel) {
    const offset = -carousel.currentIndex * 100;
    carousel.element.style.transform = `translateX(${offset}%)`;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = carousel.currentIndex === 0;
    nextBtn.disabled = carousel.currentIndex === carousel.totalItems - 1;
}
export function initializeCarousel(carousel) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.addEventListener('click', () => {
        if (carousel.currentIndex > 0) {
            carousel.currentIndex--;
            updateCarousel(carousel);
        }
    });
    nextBtn.addEventListener('click', () => {
        if (carousel.currentIndex < carousel.totalItems - 1) {
            carousel.currentIndex++;
            updateCarousel(carousel);
        }
    });
    updateCarousel(carousel);
}
