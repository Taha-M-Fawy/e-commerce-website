// ================= COUNTER UP =================
jQuery(document).ready(function ($) {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
});

// ================= SCROLL REVEAL =================
window.addEventListener('scroll', reveal);
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}

// ================= LOAD JSON DATA AND RENDER =================
fetch('../js/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        const usersDataDiv = document.getElementById('sliding');
        if (!usersDataDiv) {
            console.error("Div with id 'sliding' not found");
            return;
        }

        data.forEach(user => {
            usersDataDiv.innerHTML += `
                <div class="slide swiper-slide reveal">
                    <img src="${user.image}" alt="" class="image">
                    <p>${user.description}</p>
                    <i class="fa-solid fa-quote-right quote-icon"></i>
                    <div class="details">
                        <span class="name">${user.name}</span>
                        <span class="job">${user.job}</span>
                        <span class="icons">
                            <a href="${user.linkdin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="${user.githup}" target="_blank"><i class="fa-brands fa-github"></i></a>
                        </span>
                    </div>
                </div>
            `;
        });

        // Initialize Swiper after content is loaded
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            grabCursor: true,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
