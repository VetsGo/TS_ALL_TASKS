function openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        window.onclick = (event) => {
            if (event.target === modal) {
                closeModal(modalId);
            }
        };
    }
}

function closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function initializeModals() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');

    portfolioLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href')?.substring(1);

            if (targetId) {
                openModal(targetId);
            }
        });
    });
}

async function fetchImages() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=3');
        const images = await response.json();
        const fetchedImagesRow = document.getElementById('fetchedImagesRow');

        if (fetchedImagesRow) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row d-flex justify-content-center';

            images.forEach((image: { id: number; url: string; title: string }) => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col-md-4 col-xs-4';
                colDiv.innerHTML = `
                    <a href="#imageModal${image.id + 6}" class="portfolio-link" data-id="${image.id}" data-toggle="modal">
                        <img src="${image.url}" class="img-responsive" style="max-width: 300px; height: auto;" alt="${image.title}">
                    </a>
                `;
                rowDiv.appendChild(colDiv);
                
                const link = colDiv.querySelector('.portfolio-link') as HTMLAnchorElement;
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const modalId = link.getAttribute('href')?.substring(1);
                    if (modalId) {
                        openModal(modalId);
                        const modalImage = document.getElementById(`modalImage${image.id}`) as HTMLImageElement;
                        if (modalImage) {
                            modalImage.src = image.url;
                        }
                    }
                });
            });

            fetchedImagesRow.appendChild(rowDiv);
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeModals();
    fetchImages();
});

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const modalId = button.closest('.modal')?.id;
        if (modalId) {
            closeModal(modalId);
        }
    });
});

document.getElementById('downloadButton')?.addEventListener('click', () => {
    window.location.href = 'https://initiate.alphacoders.com/download/images5/1334448/png';
});

let currentIndex = 0;

const carousel = document.querySelector('.carousel') as HTMLElement;
const totalItems = document.querySelectorAll('.carousel-item').length;
const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalItems - 1;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();

