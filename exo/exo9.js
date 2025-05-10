document.addEventListener('DOMContentLoaded', function () {
            const splide = new Splide('.splide', {
                type: 'loop', // Loop through slides
                perPage: 1, // Show one slide at a time
                autoplay: true, // Enable autoplay
                interval: 3000, // 3 seconds per slide
                pauseOnHover: false, // Pause autoplay on hover
                pagination: false, // Enable pagination dots
                arrows: false, // Enable navigation arrows
            });

            const progressBar = document.querySelector('.my-slider-progress-bar');
            splide.on('mounted move', function () {
                const end = splide.Components.Controller.getEnd() + 1;
                const current = splide.index + 1;
                const percentage = (current / end) * 100;
                progressBar.style.width = `${percentage}%`;
            });

            splide.mount();
        });