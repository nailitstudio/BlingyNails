// Navbar JavaScript


const nav = document.querySelector(".nav"),
navOpenBtn = document.querySelector(".navOpenBtn"),
navCloseBtn = document.querySelector(".navCloseBtn");


navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("uil-times", "uil-search");
});


navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});




// Animation

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".content-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach(el => observer.observe(el));
});



// What our Customers say about us
// const tTrack = document.querySelector('.testimonial-track');
// const tCards = document.querySelectorAll('.testimonial-card');
// const tPrevBtn = document.querySelector('.testimonial-nav.prev');
// const tNextBtn = document.querySelector('.testimonial-nav.next');
// const tDotsContainer = document.querySelector('.testimonial-dots');
// const tProgressBar = document.querySelector('.scroll-progress');

// let tCurrentIndex = 0;
// let tIsDragging = false;
// let tStartPos = 0;
// let tCurrentTranslate = 0;
// let tPrevTranslate = 0;

// const tTotalSlides = tCards.length;

// // Create dots
// function tCreateDots() {
//     tDotsContainer.innerHTML = '';
//     for (let i = 0; i < tTotalSlides; i++) {
//         const dot = document.createElement('span');
//         dot.classList.add('testimonial-dot');
//         if (i === 0) dot.classList.add('active');
//         dot.addEventListener('click', () => tGoToSlide(i));
//         tDotsContainer.appendChild(dot);
//     }
// }

// tCreateDots();

// function tUpdateCarousel() {
//     const cardWidth = tCards[0].offsetWidth;
//     const gap = 40;
//     const offset = -(tCurrentIndex * (cardWidth + gap));
//     tTrack.style.transform = `translateX(${offset}px)`;
    
//     // Update dots
//     const dots = document.querySelectorAll('.testimonial-dot');
//     dots.forEach((dot, index) => {
//         dot.classList.toggle('active', index === tCurrentIndex);
//     });

//     // Update button states
//     tPrevBtn.disabled = tCurrentIndex === 0;
//     tNextBtn.disabled = tCurrentIndex === tTotalSlides - 1;

//     // Update progress bar
//     const progress = ((tCurrentIndex + 1) / tTotalSlides) * 100;
//     tProgressBar.style.width = progress + '%';
// }

// function tGoToSlide(index) {
//     tCurrentIndex = Math.max(0, Math.min(index, tTotalSlides - 1));
//     tUpdateCarousel();
// }

// tPrevBtn.addEventListener('click', () => {
//     if (tCurrentIndex > 0) {
//         tCurrentIndex--;
//         tUpdateCarousel();
//     }
// });

// tNextBtn.addEventListener('click', () => {
//     if (tCurrentIndex < tTotalSlides - 1) {
//         tCurrentIndex++;
//         tUpdateCarousel();
//     }
// });

// // Keyboard navigation
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowLeft') tPrevBtn.click();
//     else if (e.key === 'ArrowRight') tNextBtn.click();
// });

// // Touch/Drag support
// tTrack.addEventListener('mousedown', tDragStart);
// tTrack.addEventListener('touchstart', tDragStart);
// tTrack.addEventListener('mouseup', tDragEnd);
// tTrack.addEventListener('touchend', tDragEnd);
// tTrack.addEventListener('mousemove', tDragMove);
// tTrack.addEventListener('touchmove', tDragMove);
// tTrack.addEventListener('mouseleave', tDragEnd);

// function tDragStart(e) {
//     tIsDragging = true;
//     tStartPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
//     tTrack.style.cursor = 'grabbing';
// }

// function tDragMove(e) {
//     if (!tIsDragging) return;
//     e.preventDefault();
//     const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
//     const diff = currentPosition - tStartPos;
    
//     if (Math.abs(diff) > 50) {
//         if (diff > 0 && tCurrentIndex > 0) {
//             tCurrentIndex--;
//             tUpdateCarousel();
//             tIsDragging = false;
//         } else if (diff < 0 && tCurrentIndex < tTotalSlides - 1) {
//             tCurrentIndex++;
//             tUpdateCarousel();
//             tIsDragging = false;
//         }
//     }
// }

// function tDragEnd() {
//     tIsDragging = false;
//     tTrack.style.cursor = 'grab';
// }

// // Initialize
// tUpdateCarousel();
// tTrack.style.cursor = 'grab';

// // Auto-play
// let tAutoplayInterval;
// function tStartAutoplay() {
//     tAutoplayInterval = setInterval(() => {
//         if (tCurrentIndex < tTotalSlides - 1) {
//             tCurrentIndex++;
//         } else {
//             tCurrentIndex = 0;
//         }
//         tUpdateCarousel();
//     }, 4000);
// }

// function tStopAutoplay() {
//     clearInterval(tAutoplayInterval);
// }

// tStartAutoplay();

// const tSection = document.querySelector('.testimonial-section');
// tSection.addEventListener('mouseenter', tStopAutoplay);
// tSection.addEventListener('mouseleave', tStartAutoplay);

// // Resize handler
// window.addEventListener('resize', () => {
//     tUpdateCarousel();
// });






// What our Customers say about us

const tTrack = document.querySelector('.testimonial-track');
const tCardsOriginal = document.querySelectorAll('.testimonial-card');
const tPrevBtn = document.querySelector('.testimonial-nav.prev');
const tNextBtn = document.querySelector('.testimonial-nav.next');
const tDotsContainer = document.querySelector('.testimonial-dots');
const tProgressBar = document.querySelector('.scroll-progress');

let tCurrentIndex = 0;
let tIsDragging = false;
let tStartPos = 0;
let tIsTransitioning = false;
let tCardsPerView = 1;

const tTotalSlides = tCardsOriginal.length;

// Calculate cards per view based on screen size
function tCalculateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
}

// Setup infinite loop with clones
function tSetupInfiniteLoop() {
    tCardsPerView = tCalculateCardsPerView();
    
    // Remove existing clones if any
    document.querySelectorAll('.testimonial-card.clone').forEach(el => el.remove());
    
    // Clone enough cards to fill the view on both sides
    const cloneCount = Math.max(tCardsPerView, 3); // At least 3 clones for smooth loop
    
    // Clone last cards and prepend
    for (let i = tTotalSlides - cloneCount; i < tTotalSlides; i++) {
        const clone = tCardsOriginal[i].cloneNode(true);
        clone.classList.add('clone');
        tTrack.insertBefore(clone, tTrack.firstChild);
    }
    
    // Clone first cards and append
    for (let i = 0; i < cloneCount; i++) {
        const clone = tCardsOriginal[i].cloneNode(true);
        clone.classList.add('clone');
        tTrack.appendChild(clone);
    }
    
    // Start at the first real card (after prepended clones)
    tCurrentIndex = cloneCount;
    tUpdateCarousel(false);
}

tSetupInfiniteLoop();

// Create dots based on actual slides
function tCreateDots() {
    tDotsContainer.innerHTML = '';
    for (let i = 0; i < tTotalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (!tIsTransitioning) {
                const cloneCount = Math.max(tCardsPerView, 3);
                tIsTransitioning = true;
                tCurrentIndex = i + cloneCount;
                tUpdateCarousel();
            }
        });
        tDotsContainer.appendChild(dot);
    }
}

tCreateDots();

function tUpdateCarousel(transition = true) {
    const allCards = document.querySelectorAll('.testimonial-track .testimonial-card');
    if (allCards.length === 0) return;
    
    const cardWidth = allCards[0].offsetWidth;
    const gap = 40;
    const offset = -(tCurrentIndex * (cardWidth + gap));
    
    if (transition) {
        tTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
    } else {
        tTrack.style.transition = 'none';
    }
    
    tTrack.style.transform = `translateX(${offset}px)`;
    
    // Calculate real index (accounting for clones)
    const cloneCount = Math.max(tCardsPerView, 3);
    let realIndex = tCurrentIndex - cloneCount;
    
    // Normalize realIndex to be within bounds
    while (realIndex < 0) realIndex += tTotalSlides;
    while (realIndex >= tTotalSlides) realIndex -= tTotalSlides;
    
    // Update dots
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === realIndex);
    });

    // Always enable buttons for infinite loop
    tPrevBtn.disabled = false;
    tNextBtn.disabled = false;

    // Update progress bar
    const progress = ((realIndex + 1) / tTotalSlides) * 100;
    tProgressBar.style.width = progress + '%';
}

// Handle infinite loop transitions with better timing
let tTransitionEndTimer;
tTrack.addEventListener('transitionend', (e) => {
    // Only handle transform transitions
    if (e.propertyName !== 'transform') return;
    
    handleLoopReset();
});

function handleLoopReset() {
    const cloneCount = Math.max(tCardsPerView, 3);
    const allCards = document.querySelectorAll('.testimonial-track .testimonial-card');
    const totalWithClones = allCards.length;
    
    let needsReset = false;
    let newIndex = tCurrentIndex;
    
    // If we're past the last real card (in the appended clones)
    if (tCurrentIndex >= tTotalSlides + cloneCount) {
        newIndex = cloneCount + (tCurrentIndex - (tTotalSlides + cloneCount));
        needsReset = true;
    }
    
    // If we're before the first real card (in the prepended clones)
    if (tCurrentIndex < cloneCount) {
        newIndex = tTotalSlides + tCurrentIndex;
        needsReset = true;
    }
    
    if (needsReset) {
        tCurrentIndex = newIndex;
        tUpdateCarousel(false);
        
        // Force reflow to ensure the position change is applied
        void tTrack.offsetWidth;
    }
    
    // Small delay before allowing next transition
    setTimeout(() => {
        tIsTransitioning = false;
    }, 50);
}

tPrevBtn.addEventListener('click', () => {
    if (tIsTransitioning) return;
    tIsTransitioning = true;
    tCurrentIndex--;
    tUpdateCarousel();
    
    // Fallback in case transitionend doesn't fire
    clearTimeout(tTransitionEndTimer);
    tTransitionEndTimer = setTimeout(() => {
        handleLoopReset();
    }, 600);
});

tNextBtn.addEventListener('click', () => {
    if (tIsTransitioning) return;
    tIsTransitioning = true;
    tCurrentIndex++;
    tUpdateCarousel();
    
    // Fallback in case transitionend doesn't fire
    clearTimeout(tTransitionEndTimer);
    tTransitionEndTimer = setTimeout(() => {
        handleLoopReset();
    }, 600);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') tPrevBtn.click();
    else if (e.key === 'ArrowRight') tNextBtn.click();
});

// Touch/Drag support
tTrack.addEventListener('mousedown', tDragStart);
tTrack.addEventListener('touchstart', tDragStart);
tTrack.addEventListener('mouseup', tDragEnd);
tTrack.addEventListener('touchend', tDragEnd);
tTrack.addEventListener('mousemove', tDragMove);
tTrack.addEventListener('touchmove', tDragMove);
tTrack.addEventListener('mouseleave', tDragEnd);

function tDragStart(e) {
    if (tIsTransitioning) return;
    tIsDragging = true;
    tStartPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    tTrack.style.cursor = 'grabbing';
}

function tDragMove(e) {
    if (!tIsDragging) return;
    e.preventDefault();
    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentPosition - tStartPos;
    
    if (Math.abs(diff) > 50) {
        tIsTransitioning = true;
        if (diff > 0) {
            tCurrentIndex--;
        } else {
            tCurrentIndex++;
        }
        tUpdateCarousel();
        tIsDragging = false;
        
        // Fallback for drag
        clearTimeout(tTransitionEndTimer);
        tTransitionEndTimer = setTimeout(() => {
            handleLoopReset();
        }, 600);
    }
}

function tDragEnd() {
    tIsDragging = false;
    tTrack.style.cursor = 'grab';
}

// Initialize
tTrack.style.cursor = 'grab';

// Auto-play with infinite loop
let tAutoplayInterval;
function tStartAutoplay() {
    tAutoplayInterval = setInterval(() => {
        if (!tIsTransitioning) {
            tNextBtn.click();
        }
    }, 4000);
}

function tStopAutoplay() {
    clearInterval(tAutoplayInterval);
}

tStartAutoplay();

const tSection = document.querySelector('.testimonial-section');
if (tSection) {
    tSection.addEventListener('mouseenter', tStopAutoplay);
    tSection.addEventListener('mouseleave', tStartAutoplay);
}

// Resize handler
let tResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(tResizeTimeout);
    tResizeTimeout = setTimeout(() => {
        const newCardsPerView = tCalculateCardsPerView();
        if (newCardsPerView !== tCardsPerView) {
            tCardsPerView = newCardsPerView;
            tIsTransitioning = false;
            tSetupInfiniteLoop();
            tCreateDots();
        } else {
            tUpdateCarousel(false);
        }
    }, 250);
});




// Our Work

const work_sample = document.querySelector('.work-sample');
const items = work_sample.querySelectorAll('.work-sample-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
let imagesPerView = 4;
let totalSlides = 0;

// Calculate images per view based on screen size
function calculateImagesPerView() {
    const width = window.innerWidth;
    if (width <= 368) return 1;
    if (width <= 768) return 2;
    if (width <= 910) return 3;
    return 4;
}

// Initialize
function init() {
    imagesPerView = calculateImagesPerView();
    totalSlides = Math.ceil(items.length / imagesPerView);
    createDots();
    updateCarousel();
}

// Create dots
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(work_sample).gap) || 0;
    const offset = -(currentIndex * imagesPerView * (itemWidth + gap));
    work_sample.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalSlides - 1;
}

function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Recalculate on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const newImagesPerView = calculateImagesPerView();
        if (newImagesPerView !== imagesPerView) {
            imagesPerView = newImagesPerView;
            currentIndex = 0;
            totalSlides = Math.ceil(items.length / imagesPerView);
            createDots();
        }
        updateCarousel();
    }, 250);
});

// Auto-play
let autoplayInterval;
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 4000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Pause on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);

// Initialize everything
init();
startAutoplay();

