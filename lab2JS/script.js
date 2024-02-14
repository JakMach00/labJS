document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 0;

    function createDots() {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        const slider = document.querySelector('.slider');
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex === slides.length - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            goToSlide(slides.length - 1);
        } else {
            goToSlide(currentIndex - 1);
        }
    });

    createDots();
    goToSlide(0);
});
