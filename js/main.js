import { initializeModals, closeModal } from './components/modal.js';
import { fetchImages } from './components/imageService.js';
import { createCarousel, initializeCarousel } from './components/carousel.js';
document.addEventListener('DOMContentLoaded', () => {
    initializeModals();
    fetchImages();
    const carouselElement = document.querySelector('.carousel');
    const totalItems = document.querySelectorAll('.carousel-item').length;
    const carousel = createCarousel(carouselElement, totalItems);
    initializeCarousel(carousel);
});
const downloadButton = document.getElementById('downloadButton');
downloadButton?.addEventListener('click', () => {
    window.location.href = 'https://initiate.alphacoders.com/download/images5/1334448/png';
});
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.closest('.modal')?.id;
        if (modalId) {
            closeModal(modalId);
        }
    });
});
