(function() {
    const currentUser = sessionStorage.getItem('helltaker_current_user');
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    const userDisplay = document.getElementById('currentUserDisplay');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (userDisplay) {
        userDisplay.textContent = currentUser;
    }
    
    if (welcomeMessage) {
        welcomeMessage.textContent = 'Рады видеть вас, ' + currentUser + '!';
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('helltaker_current_user');
            window.location.href = 'index.html';
        });
    }
})();

(function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', (function(index) {
                return function() {
                    goToSlide(index);
                };
            })(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        updateDots();
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        for (let i = 0; i < dots.length; i++) {
            if (i === currentSlide) {
                dots[i].classList.add('active');
            } else {
                dots[i].classList.remove('active');
            }
        }
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    createDots();
    startAutoSlide();
})();