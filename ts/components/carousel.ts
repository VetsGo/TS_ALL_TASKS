import { Carousel } from '../types/carouselTypes';

export function createCarousel(carouselElement: HTMLElement, totalItems: number): Carousel {
    return {
        element: carouselElement,
        totalItems,
        currentIndex: 0,
    };
}

export function updateCarousel(carousel: Carousel): void {
    const offset = -carousel.currentIndex * 100;
    carousel.element.style.transform = `translateX(${offset}%)`;

    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

    prevBtn.disabled = carousel.currentIndex === 0;
    nextBtn.disabled = carousel.currentIndex === carousel.totalItems - 1;
}

export function initializeCarousel(carousel: Carousel): void {
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

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