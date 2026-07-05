document.addEventListener('DOMContentLoaded', () => {
    // 1. Wirtz Image Gallery Switcher
    const bannerImg = document.getElementById('wirtz-banner-img');
    const galleryOptions = document.querySelectorAll('.gallery-option');

    if (bannerImg && galleryOptions.length > 0) {
        galleryOptions.forEach(option => {
            option.addEventListener('click', () => {
                if (option.classList.contains('active')) return;

                // Toggle active class on option cards
                const currentActive = document.querySelector('.gallery-option.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                option.classList.add('active');

                // Get new source and execute smooth fade transition
                const newSrc = option.getAttribute('data-src');
                bannerImg.style.opacity = '0';

                setTimeout(() => {
                    bannerImg.src = newSrc;
                    bannerImg.style.opacity = window.innerWidth > 991 ? '0.7' : '0.35';
                }, 300); // Matches the CSS 0.3s transition duration
            });
        });
    }

    // 2. Dark Mode Scroll Transition Observer
    const sportsSection = document.getElementById('sports-wear-section');
    if (sportsSection && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '-80px 0px -80px 0px', // trigger offset
            threshold: 0.1 // triggers when 10% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                }
            });
        }, observerOptions);

        observer.observe(sportsSection);
    }
});

// Helper function to create error box dynamically when needed without throwing ReferenceError on page load
const makeErrBox = (error) => `
<div style="
    background-color: #111827;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    color: #fffdfcff;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25) !important;
">
    <h2>Error ${error ? error.name : 'Unknown'}</h2>
    <p>${error ? error.message : 'An error occurred'}</p>
</div>
`;

const sale = `
<div style="
    background-color: #111827;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    color: #fffdfcff;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25) !important;
">
    <h2>SALE !</h2>
    <p>SALE: Liverpool 26/27 kit</p>
    <a href="#buy-liverpool" class="btn btn-primary">50% OFF</a>
</div>
`;

// Insert the sale box safely without rebuilding the DOM, preserving existing event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', sale);
});