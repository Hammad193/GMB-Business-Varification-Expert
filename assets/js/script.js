// ============================================================
// HEADER - MOBILE MENU TOGGLE
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        
        // ===== TOGGLE MENU ON CLICK =====
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu
            mainMenu.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mainMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // ===== CLOSE MENU ON LINK CLICK =====
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            });
        });
        
        // ===== CLOSE MENU ON OUTSIDE CLICK =====
        document.addEventListener('click', function(e) {
            const header = document.querySelector('header');
            if (mainMenu.classList.contains('active') && !header.contains(e.target)) {
                mainMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // ===== CLOSE MENU ON ESCAPE KEY =====
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // ===== CLOSE MENU ON RESIZE TO DESKTOP =====
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
    }
    
    console.log('✅ Header menu loaded!');
});

document.addEventListener('DOMContentLoaded', function() {
    
    var menuToggle = document.getElementById('menuToggle');
    var mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu
            mainMenu.classList.toggle('active');
            
            // Change icon
            var icon = this.querySelector('i');
            if (mainMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
    }
    
    console.log('✅ Mobile menu loaded!');
});

// =============================================================================






// ==============================================================================
// ============================================================
// FAQ TOGGLE - WORKING
// ============================================================

function toggleFaq(element) {
    // Get parent FAQ item
    var faqItem = element.closest('.faq-item');
    
    // Check if already active
    var isActive = faqItem.classList.contains('active');
    
    // Get all FAQ items
    var allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close all other FAQ items
    for (var i = 0; i < allFaqItems.length; i++) {
        var item = allFaqItems[i];
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            var toggle = item.querySelector('.faq-toggle');
            if (toggle) toggle.textContent = '+';
        }
    }
    
    // Toggle current FAQ
    if (isActive) {
        faqItem.classList.remove('active');
        var toggle = element.querySelector('.faq-toggle');
        if (toggle) toggle.textContent = '+';
    } else {
        faqItem.classList.add('active');
        var toggle = element.querySelector('.faq-toggle');
        if (toggle) toggle.textContent = '−';
    }
}

// ============================================================
// KEYBOARD ACCESSIBILITY
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    var faqQuestions = document.querySelectorAll('.faq-question');
    
    for (var i = 0; i < faqQuestions.length; i++) {
        var question = faqQuestions[i];
        
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    console.log('✅ FAQ section loaded! 15 questions');
    
});





/// ---------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('ctCarouselTrack');
    const prevBtn = document.getElementById('ctPrevBtn');
    const nextBtn = document.getElementById('ctNextBtn');
    const dotsContainer = document.getElementById('ctCarouselDots');
    
    const cards = Array.from(track.children);
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView(); // Dynamic
    let autoPlayInterval;
    let isTransitioning = false;
    
    // Screen ke hisaab se kitne cards dikhne hain
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // CSS gap aur padding calculate karna
    function getGap() {
        return window.innerWidth <= 768 ? 20 : 30;
    }
    
    // Exact translation calculate karna (CSS widths ke hisaab se)
    function updateCarousel() {
        if (isTransitioning || cards.length === 0) return;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = getGap();
        
        // Agar cardWidth 0 ya invalid hai, toh calculation rok do
        if (!cardWidth || cardWidth <= 0) return;

        // Maximum index jahan tak slide kar sakte hain
        const maxIndex = totalCards - cardsPerView;
        
        // Agar currentIndex limit se bahar chala jaye, toh usse set karo
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const translateX = -(currentIndex * (cardWidth + gap));
        
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(${translateX}px)`;
        
        updateDots();
    }
    
    // Dots banana
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalCards / cardsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('ct-dot');
            if (i === Math.floor(currentIndex / cardsPerView)) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                currentIndex = i * cardsPerView;
                updateCarousel();
                resetAutoPlay();
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Dots update karna
    function updateDots() {
        const dots = dotsContainer.children;
        const activeDotIndex = Math.floor(currentIndex / cardsPerView);
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }
    
    // Go to slide (smooth transition ke liye)
    function goToSlide(index) {
        if (isTransitioning) return;
        
        const maxIndex = totalCards - cardsPerView;
        
        // Circular logic
        if (index < 0) index = maxIndex;
        if (index > maxIndex) index = 0;
        
        isTransitioning = true;
        currentIndex = index;
        updateCarousel();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // CSS transition time
    }
    
    // Next aur Prev
    function nextSlide() {
        const maxIndex = totalCards - cardsPerView;
        if (currentIndex >= maxIndex) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + cardsPerView);
        }
        resetAutoPlay();
    }
    
    function prevSlide() {
        if (currentIndex <= 0) {
            goToSlide(totalCards - cardsPerView);
        } else {
            goToSlide(currentIndex - cardsPerView);
        }
        resetAutoPlay();
    }
    
    // Auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Resize hone par sab kuch reset karo
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                createDots();
                updateCarousel();
            } else {
                updateCarousel();
            }
        }, 300);
    });
    
    // Hover par auto-play pause
    const carouselWrapper = document.querySelector('.ct-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Touch support
    let touchStartX = 0;
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselWrapper.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }, { passive: true });
    
    // Initialize
    createDots();
    setTimeout(() => {
        updateCarousel();
    }, 100);
    startAutoPlay();
    
    console.log('✅ Fixed Dynamic Carousel loaded!');
});



// -----------------------------------------------------------------





//-------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    
    // Saare FAQ items select karein
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', function() {
            
            // Agar ye item already active hai, toh isko band kar dein (toggle off)
            const isActive = item.classList.contains('active');
            
            // Pehle saare items ko close kar dein (sirf ek hi khula rahe)
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });
            
            // Agar ye pehle active nahi tha, toh ab isko active kar dein
            if (!isActive) {
                item.classList.add('active');
            }
            
        });
        
    });
    
    console.log('✅ FAQ Accordion loaded!');
});


document.addEventListener('DOMContentLoaded', function() {
    
    // Saare FAQ items select karein
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', function() {
            
            // Check karein ke ye item already active hai ya nahi
            const isActive = item.classList.contains('active');
            
            // Pehle saare items ko band (close) kar dein
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });
            
            // Agar ye pehle active nahi tha, toh ab isko open kar dein
            if (!isActive) {
                item.classList.add('active');
            }
            
        });
        
    });
    
    console.log('✅ FAQ Accordion loaded!');
});


/// ==============================================================
// ============================================================ //
// WHY CHOOSE US - COUNTER ANIMATION                            //
// ============================================================ //

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Counter Animation for Numbers =====
    var counters = document.querySelectorAll('.why-choose-stat-number, .why-choose-stats-number');
    
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = parseFloat(entry.target.dataset.count);
                var isDecimal = target % 1 !== 0;
                var current = 0;
                var duration = 2000;
                var steps = 60;
                var stepValue = target / steps;
                
                var timer = setInterval(function() {
                    current += stepValue;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    if (isDecimal) {
                        entry.target.textContent = current.toFixed(1);
                    } else {
                        entry.target.textContent = Math.round(current);
                    }
                }, 30);
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
    
    // ===== Hover Animation for Cards =====
    var cards = document.querySelectorAll('.why-choose-card');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            var icon = this.querySelector('.why-choose-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            var icon = this.querySelector('.why-choose-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    console.log('✅ Why Choose Us section loaded!');
});