export function openModal(modalId) {
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
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
export function initializeModals() {
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
