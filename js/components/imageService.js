import { openModal } from './modal.js';
export async function fetchImages() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=3');
        const images = await response.json();
        const fetchedImagesRow = document.getElementById('fetchedImagesRow');
        if (fetchedImagesRow) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row d-flex justify-content-center';
            images.forEach((image) => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col-md-4 col-xs-4';
                colDiv.innerHTML = `
                    <a href="#imageModal${image.id + 6}" class="portfolio-link" data-id="${image.id}">
                        <img src="${image.url}" class="img-responsive" style="max-width: 300px; height: auto;" alt="${image.title}">
                    </a>
                `;
                rowDiv.appendChild(colDiv);
                const link = colDiv.querySelector('.portfolio-link');
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const modalId = link.getAttribute('href')?.substring(1);
                    if (modalId) {
                        openModal(modalId);
                        const modalImage = document.getElementById(`modalImage${image.id}`);
                        if (modalImage) {
                            modalImage.src = image.url;
                        }
                    }
                });
            });
            fetchedImagesRow.appendChild(rowDiv);
        }
    }
    catch (error) {
        console.error('Error fetching images:', error);
    }
}
