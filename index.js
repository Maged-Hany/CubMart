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
});
