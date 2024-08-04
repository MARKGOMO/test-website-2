var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    on: {
        slideChange: function () {
        if (swiper.isEnd) {
            swiper.slideTo(0); // Manually go back to the first slide when reaching the end
        }
        },
    },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
      },
  breakpoints: {
    640: {
    slidesPerView: 2,
    spaceBetween: 20,
    },
    768: {
    slidesPerView: 4,
    spaceBetween: 40,
    },
    1024: {
    slidesPerView: 5,
    spaceBetween: 50,
    },
},	
});