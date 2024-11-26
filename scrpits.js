document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.temple-container');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayEnabled = true; // สามารถเปลี่ยนเป็น false เพื่อปิด autoplay

    function updateSlide() {
        const slideWidth = container.clientWidth;
        container.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // อัพเดท dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % dots.length;
        updateSlide();
    }

    // เพิ่ม Event Listeners สำหรับ dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
            if (autoPlayEnabled) {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
        });
    });

    function startAutoPlay() {
        if (autoPlayEnabled) {
            autoPlayInterval = setInterval(nextSlide, 5000); // เปลี่ยนสไลด์ทุก 5 วินาที
        }
    }

    // เริ่ม AutoPlay
    startAutoPlay();

    // หยุด AutoPlay เมื่อ hover
    container.addEventListener('mouseenter', () => {
        if (autoPlayEnabled) {
            clearInterval(autoPlayInterval);
        }
    });

    // เริ่ม AutoPlay ใหม่เมื่อ mouse ออก
    container.addEventListener('mouseleave', () => {
        if (autoPlayEnabled) {
            startAutoPlay();
        }
    });
});