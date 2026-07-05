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
<style>
@keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>
<div id="sale-toast" style="
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1050;
    max-width: 320px;
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 20px;
    color: #ffffff;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
    font-family: 'Inter', -apple-system, sans-serif;
    animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    transition: opacity 0.3s ease, transform 0.3s ease;
">
    <!-- Close button -->
    <button onclick="const t = document.getElementById('sale-toast'); t.style.opacity='0'; t.style.transform='translateY(15px)'; setTimeout(()=>t.remove(), 300)" style="
        position: absolute;
        top: 14px;
        right: 14px;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        padding: 4px;
        font-size: 14px;
        line-height: 1;
        transition: color 0.2s;
        outline: none;
    " onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='rgba(255, 255, 255, 0.5)'">
        ✕
    </button>

    <!-- Badge -->
    <span style="
        display: inline-block;
        background: #e11d48;
        color: #ffffff;
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        padding: 4px 10px;
        border-radius: 50rem;
        margin-bottom: 12px;
    ">Limited Offer</span>

    <!-- Content -->
    <h3 style="
        font-size: 15px;
        font-weight: 700;
        margin: 0 0 6px 0;
        letter-spacing: 0.5px;
        color: #ffffff;
        font-family: 'Inter', sans-serif;
    ">Exclusive Drop Sale!</h3>
    <p style="
        font-size: 13px;
        color: #9ca3af;
        margin: 0 0 16px 0;
        line-height: 1.5;
        font-family: 'Inter', sans-serif;
    ">Get <strong>50% OFF</strong> the new Liverpool 26/27 Home Kit. Limited stock remaining.</p>

    <!-- Action Button -->
    <a href="#sports-wear-section" onclick="document.getElementById('sale-toast').remove()" style="
        display: block;
        text-align: center;
        background: #ffffff;
        color: #111827;
        text-decoration: none;
        font-size: 12px;
        font-weight: 600;
        padding: 10px 16px;
        border-radius: 8px;
        letter-spacing: 0.5px;
        transition: background 0.2s;
        font-family: 'Inter', sans-serif;
    " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#ffffff'">
        Claim 50% Discount
    </a>
</div>
`;

// Insert the sale box safely without rebuilding the DOM, preserving existing event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', sale);
});