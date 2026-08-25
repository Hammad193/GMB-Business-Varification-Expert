// ============================================================
// SCRIPT.JS - COMPLETE FIXED VERSION
// ============================================================

// ============================================================
// 1. MOBILE MENU TOGGLE (FIXED)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('header .menu');
    
    if (menuToggle && menu) {
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu
            menu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on link click
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', function(e) {
            const header = document.querySelector('header');
            if (menu.classList.contains('active') && !header.contains(e.target)) {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && menu.classList.contains('active')) {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
                document.body.style.overflow = '';
            }
        });
    }
    
    console.log('✅ Header menu loaded!');
});


// ============================================================
// 2. ACTIVE NAV LINK
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header .menu a').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});


// ============================================================
// 3. FAQ ACCORDION (FIXED - Single Version)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(button) {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(function(other) {
                other.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    console.log('✅ FAQ accordion loaded!');
});


// ============================================================
// 4. SMOOTH SCROLL
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


// ============================================================
// 5. HEADER SCROLL EFFECT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.04)';
        }
    });
});


// ============================================================
// 6. SCROLL REVEAL
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.why-card, .stat-card, .industry-card, .process-card, .testimonial-card, .mistake-card, .search-box, .city-card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


// ============================================================
// 7. CONTACT FORM
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.submit-btn');
            const original = btn.textContent;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(function() {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                btn.style.background = '#10B981';
                setTimeout(function() {
                    btn.textContent = original;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }
});


// ============================================================
// 8. TESTIMONIALS CAROUSEL (COMPLETE FIX)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!cards.length) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    let cardsPerView = getCardsPerView();
    let autoPlayInterval;
    let isTransitioning = false;
    
    // Get cards per view
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Calculate card width
    function getCardWidth() {
        const carousel = document.querySelector('.testimonial-carousel');
        const containerWidth = carousel ? carousel.offsetWidth - 100 : 1200;
        const gap = 30;
        return (containerWidth - (cardsPerView - 1) * gap) / cardsPerView + gap;
    }
    
    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalCards / cardsPerView);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index) * cardsPerView;
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update carousel
    function updateCarousel() {
        if (isTransitioning) return;
        
        const cardWidth = getCardWidth();
        let offset = currentIndex * cardWidth;
        const maxOffset = (totalCards - cardsPerView) * cardWidth;
        
        if (offset > maxOffset) {
            offset = maxOffset;
            currentIndex = totalCards - cardsPerView;
        }
        if (offset < 0) {
            offset = 0;
            currentIndex = 0;
        }
        
        track.style.transform = 'translateX(-' + offset + 'px)';
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            const activeDotIndex = Math.floor(currentIndex / cardsPerView);
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
    }
    
    // Go to slide
    function goToSlide(index) {
        if (isTransitioning) return;
        
        const maxIndex = totalCards - cardsPerView;
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        
        isTransitioning = true;
        currentIndex = index;
        updateCarousel();
        
        setTimeout(function() {
            isTransitioning = false;
        }, 500);
    }
    
    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        const maxIndex = totalCards - cardsPerView;
        if (currentIndex >= maxIndex) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + cardsPerView);
        }
        resetAutoPlay();
    }
    
    // Prev slide
    function prevSlide() {
        if (isTransitioning) return;
        if (currentIndex <= 0) {
            const maxIndex = totalCards - cardsPerView;
            goToSlide(maxIndex);
        } else {
            goToSlide(currentIndex - cardsPerView);
        }
        resetAutoPlay();
    }
    
    // Auto play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                createDots();
                goToSlide(0);
            }
            updateCarousel();
        }, 300);
    });
    
    // Hover pause
    const carousel = document.getElementById('testimonialCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });
        carousel.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
    }
    
    // Init
    createDots();
    setTimeout(function() {
        updateCarousel();
    }, 200);
    startAutoPlay();
    
    console.log('✅ Testimonials carousel loaded! Total cards: ' + totalCards);
});


// ============================================================
// 9. SECTION: HOW IT WORKS (hw-)
// ============================================================

(function() {
    'use strict';
    
    const hwCards = document.querySelectorAll('.hw-step-card');
    
    if (hwCards.length) {
        const hwObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        hwCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.1) + 's';
            hwObserver.observe(card);
        });
    }
    
    console.log('✅ hw- (How It Works) loaded!');
})();


// ============================================================
// 10. SECTION: COMMON PROBLEMS (cp-)
// ============================================================

(function() {
    'use strict';
    
    const cpCards = document.querySelectorAll('.cp-problem-card');
    
    if (cpCards.length) {
        const cpObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                }
            });
        }, { threshold: 0.1 });
        
        cpCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(25px)';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.08) + 's';
            cpObserver.observe(card);
        });
    }
    
    console.log('✅ cp- (Common Problems) loaded!');
})();


// ============================================================
// 11. SECTION: WHY GMB MATTERS (gm-)
// ============================================================

(function() {
    'use strict';
    
    const gmStats = document.querySelectorAll('.gm-stat-number');
    
    if (gmStats.length) {
        const gmCounterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    let current = 0;
                    const timer = setInterval(function() {
                        current += Math.ceil(target / 60);
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = current + '%';
                    }, 30);
                    gmCounterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        gmStats.forEach(function(stat) {
            gmCounterObserver.observe(stat);
        });
    }
    
    const gmBenefits = document.querySelectorAll('.gm-benefit-card');
    
    if (gmBenefits.length) {
        const gmBenefitObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        gmBenefits.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.1) + 's';
            gmBenefitObserver.observe(card);
        });
    }
    
    console.log('✅ gm- (Why GMB Matters) loaded!');
})();


// ============================================================
// 12. SECTION: HIRE CONSULTANT (hc-)
// ============================================================

(function() {
    'use strict';
    
    const hcBenefits = document.querySelectorAll('.hc-benefit-item');
    
    if (hcBenefits.length) {
        const hcObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 80);
                }
            });
        }, { threshold: 0.1 });
        
        hcBenefits.forEach(function(item, index) {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.06) + 's';
            hcObserver.observe(item);
        });
    }
    
    console.log('✅ hc- (Hire Consultant) loaded!');
})();


// ============================================================
// 13. SECTION: CHOOSE AGENCY (ag-)
// ============================================================

(function() {
    'use strict';
    
    const agCards = document.querySelectorAll('.ag-feature-card');
    
    if (agCards.length) {
        const agObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        agCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.08) + 's';
            agObserver.observe(card);
        });
    }
    
    console.log('✅ ag- (Choose Agency) loaded!');
})();


// ============================================================
// 14. SECTION: GOOGLE POLICIES (gp-)
// ============================================================

(function() {
    'use strict';
    
    const gpItems = document.querySelectorAll('.gp-why-item, .gp-look-item');
    
    if (gpItems.length) {
        const gpObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 60);
                }
            });
        }, { threshold: 0.1 });
        
        gpItems.forEach(function(item, index) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.05) + 's';
            gpObserver.observe(item);
        });
    }
    
    console.log('✅ gp- (Google Policies) loaded!');
})();


// ============================================================
// 15. SECTION: TESTIMONIALS (ct-)
// ============================================================

(function() {
    'use strict';
    
    const ctCards = document.querySelectorAll('.ct-testimonial-card');
    
    if (ctCards.length) {
        const ctObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        ctCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.1) + 's';
            ctObserver.observe(card);
        });
    }
    
    console.log('✅ ct- (Testimonials) loaded!');
})();


// ============================================================
// 16. SECTION: PRICING (pr-)
// ============================================================

(function() {
    'use strict';
    
    const prCards = document.querySelectorAll('.pr-pricing-card');
    
    if (prCards.length) {
        const prObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 120);
                }
            });
        }, { threshold: 0.1 });
        
        prCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.08) + 's';
            prObserver.observe(card);
        });
    }
    
    console.log('✅ pr- (Pricing) loaded!');
})();


// ============================================================
// 17. SECTION: INDUSTRIES (in-)
// ============================================================

(function() {
    'use strict';
    
    const inItems = document.querySelectorAll('.in-industry-item');
    
    if (inItems.length) {
        const inObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 40);
                }
            });
        }, { threshold: 0.1 });
        
        inItems.forEach(function(item, index) {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-15px)';
            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ' + (index * 0.03) + 's';
            inObserver.observe(item);
        });
    }
    
    console.log('✅ in- (Industries) loaded!');
})();


// ============================================================
// 18. SECTION: CTA (cta-)
// ============================================================

(function() {
    'use strict';
    
    const ctaElements = document.querySelectorAll('.cta-badge, .cta-title, .cta-description, .cta-features, .cta-buttons, .cta-trust');
    
    if (ctaElements.length) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        ctaElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            ctaObserver.observe(el);
        });
    }
    
    console.log('✅ cta- (CTA) loaded!');
})();


console.log('✅ All scripts loaded successfully!');

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

/*----------------------------------------------------*/










/*----------------------------------------------------*/





// ============================================================
// TESTIMONIALS CAROUSEL - PERFECT CIRCLE LOOP
// Aage: 1 → 2 → 3 → 4 → 5 → 6 → 1 → 2 → ...
// Peeche: 1 ← 6 ← 5 ← 4 ← 3 ← 2 ← 1 ← 6 ← ...
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    var track = document.getElementById('ctCarouselTrack');
    if (!track) return;
    
    var cards = track.querySelectorAll('.ct-testimonial-card');
    var prevBtn = document.getElementById('ctPrevBtn');
    var nextBtn = document.getElementById('ctNextBtn');
    var dotsContainer = document.getElementById('ctCarouselDots');
    
    if (!cards.length) return;
    
    var totalCards = cards.length;
    var cardsPerView = getCardsPerView();
    var currentIndex = 0;
    var autoPlayInterval;
    var isTransitioning = false;
    var cardWidth = 0;
    
    // ===== GET CARDS PER VIEW =====
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // ===== GET CARD WIDTH =====
    function getCardWidth() {
        var wrapper = document.querySelector('.ct-carousel-wrapper');
        if (!wrapper) return 350;
        var wrapperWidth = wrapper.offsetWidth - 100;
        var gap = 30;
        if (window.innerWidth <= 768) {
            return wrapperWidth + gap;
        }
        return (wrapperWidth - (cardsPerView - 1) * gap) / cardsPerView + gap;
    }
    
    // ===== GET MAX INDEX =====
    function getMaxIndex() {
        return totalCards - cardsPerView;
    }
    
    // ===== CREATE DOTS =====
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        var totalDots = Math.ceil(totalCards / cardsPerView);
        for (var i = 0; i < totalDots; i++) {
            var dot = document.createElement('button');
            dot.classList.add('ct-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', function() {
                var index = parseInt(this.dataset.index) * cardsPerView;
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // ===== UPDATE CAROUSEL =====
    function updateCarousel() {
        cardWidth = getCardWidth();
        var offset = currentIndex * cardWidth;
        var maxIndex = getMaxIndex();
        
        // ===== CIRCLE LOOP: Agar last se aage jaye =====
        if (currentIndex > maxIndex) {
            currentIndex = 0;
            offset = 0;
        }
        
        // ===== CIRCLE LOOP: Agar pehle se peeche jaye =====
        if (currentIndex < 0) {
            currentIndex = maxIndex;
            offset = currentIndex * cardWidth;
        }
        
        track.style.transform = 'translateX(-' + offset + 'px)';
        
        // Update dots
        if (dotsContainer) {
            var dots = dotsContainer.querySelectorAll('.ct-dot');
            var activeDotIndex = Math.floor(currentIndex / cardsPerView);
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
    }
    
    // ===== GO TO SLIDE =====
    function goToSlide(index) {
        if (isTransitioning) return;
        
        var maxIndex = getMaxIndex();
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        
        isTransitioning = true;
        currentIndex = index;
        updateCarousel();
        
        setTimeout(function() {
            isTransitioning = false;
        }, 500);
    }
    
    // ============================================================
    // NEXT SLIDE - AAGE CIRCLE LOOP
    // 1 → 2 → 3 → 4 → 5 → 6 → 1 → 2 → 3 → ...
    // ============================================================
    function nextSlide() {
        if (isTransitioning) return;
        
        var maxIndex = getMaxIndex();
        
        // Agar last slide par ho toh pehle slide par jaye
        if (currentIndex >= maxIndex) {
            currentIndex = 0;  // 6 → 1
        } else {
            currentIndex++;    // Aage badhao
        }
        
        updateCarousel();
        resetAutoPlay();
    }
    
    // ============================================================
    // PREV SLIDE - PEECHE CIRCLE LOOP
    // 1 ← 6 ← 5 ← 4 ← 3 ← 2 ← 1 ← 6 ← 5 ← ...
    // ============================================================
    function prevSlide() {
        if (isTransitioning) return;
        
        var maxIndex = getMaxIndex();
        
        // Agar pehle slide par ho toh last slide par jaye
        if (currentIndex <= 0) {
            currentIndex = maxIndex;  // 1 → 6
        } else {
            currentIndex--;           // Peeche jao
        }
        
        updateCarousel();
        resetAutoPlay();
    }
    
    // ===== AUTO PLAY - AAGE CIRCLE LOOP =====
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(function() {
            nextSlide();
        }, 4000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // ===== EVENT LISTENERS =====
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    // ===== KEYBOARD SUPPORT =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // ===== RESIZE =====
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            var newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                createDots();
                currentIndex = 0;
                updateCarousel();
            } else {
                updateCarousel();
            }
        }, 300);
    });
    
    // ===== HOVER PAUSE =====
    var carouselWrapper = document.querySelector('.ct-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });
        carouselWrapper.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
    }
    
    // ===== TOUCH SUPPORT =====
    var touchStartX = 0;
    var touchEndX = 0;
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();   // Left swipe → Next
                } else {
                    prevSlide();   // Right swipe → Prev
                }
            }
        }, { passive: true });
    }
    
    // ===== INIT =====
    createDots();
    setTimeout(function() {
        updateCarousel();
    }, 200);
    startAutoPlay();
    
    console.log('✅ Testimonials carousel loaded! Total cards: ' + totalCards);
    console.log('✅ Circle Loop (Aage): 1 → 2 → 3 → 4 → 5 → 6 → 1 → 2 → ...');
    console.log('✅ Circle Loop (Peeche): 1 ← 6 ← 5 ← 4 ← 3 ← 2 ← 1 ← 6 ← ...');
    console.log('✅ Auto Play: ON (4 seconds)');
});

document.addEventListener('DOMContentLoaded', function() {
    const serviceBoxes = document.querySelectorAll('.service-detail-box');
    
    serviceBoxes.forEach(function(box) {
        box.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
        });
    });
});