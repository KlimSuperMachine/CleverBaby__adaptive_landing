"use strict"

// ВИДЕО
let video = {};
video.wrapper = document.querySelector('.process__video-player');
video.poster = video.wrapper.querySelector('img');
video.video = document.querySelector('#video');
video.button = document.querySelector('#video-button');

function initVideo(el) {
   function startVideo(evt) {
      el.wrapper.classList.add('process__video-player--start-js');
      if (el.poster.parentNode) {
         el.poster.parentNode.removeChild(el.poster);
      }
      el.video.play();
   }

   function pauseVideo() {
      el.wrapper.classList.remove('process__video-player--start-js');
   }

   el.video.addEventListener('pause', pauseVideo);

   el.video.addEventListener('play', startVideo);

   el.button.addEventListener('click', startVideo);
}

initVideo(video);

// МЕНЮ БУРГЕР

const burgerButton = document.querySelector('.burger');
const burgerMenu = document.querySelector('.main-header__right');
const telNum = document.querySelector('.main-contacts');


burgerButton.addEventListener("click", function (e) {
   if (burgerButton) {
      document.body.classList.toggle('lock');
      burgerButton.classList.toggle('active');
      burgerMenu.classList.toggle('active');
      telNum.classList.toggle('active');
   }
});

// СКРОЛЛ ПРИ КЛИКЕ НА НАВИГАЦИЮ

const menuLinks = document.querySelectorAll('.nav-link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

         if (burgerButton.classList.contains('active')) {
            document.body.classList.remove('lock');
            burgerButton.classList.remove('active');
            burgerMenu.classList.remove('active');
            telNum.classList.remove('active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault()
      }
   }
}

// СПОЙЛЕР АККОРДИОН

document.querySelectorAll('.group').forEach((item) => {
   item.addEventListener('click', () => {
      if (item.classList.contains('_active')) {
         item.classList.remove('_active');
      } else {
         document
            .querySelectorAll('._active')
            .forEach((child) => child.classList.remove('_active'));

         item.classList.add('_active')
      }
   });
});


// СЛАЙДЕР SWIPER
new Swiper('.teachers__slider', {
   //стрелки
   navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev'
   },
   //курсор перетаскивания
   grabCursor: true,
   //адаптив
   breakpoints: {
      320: {
         //количество слайдов для показа
         slidesPerView: 1,
         //количество пролистываемых слайдов
         slidesPerGroup: 1,
      },
      550: {
         slidesPerView: 2,
         slidesPerGroup: 2,
      },
      767: {
         slidesPerView: 3,
         slidesPerGroup: 3,
      },
      980: {
         slidesPerView: 4,
         slidesPerGroup: 4,
      },
   },
   //бесконечный слайдер
   loop: true,
   //скорость 
   speed: 800,

});

//КАРТА
let TABLE_MAX_WIDTH = 1199;
let MOBILE_MAX_WIDTH = 767;

let coordCenter = [55.722981240646604, 37.57841985425909];
let coordPlacemark = [55.723229508511444, 37.580726554011456];
let mapZoom = 17;

if (window.matchMedia('(max-width: ' + TABLE_MAX_WIDTH + 'px)').matches) {
   mapZoom = 16;

   if (window.matchMedia('(max-width: ' + MOBILE_MAX_WIDTH + 'px)').matches) {
      mapZoom = 15;
   }
}

function init() {
   let map = new ymaps.Map('map', {
      center: coordCenter,
      zoom: mapZoom,
      controls: ['smallMapDefaultSet']
   });

   let placemark = new ymaps.Placemark(coordPlacemark, {
      balloonContentHeader: 'Clever Baby',
      balloonContentBody: 'Образовательный центр',
      balloonContentFooter: 'Мы ждем вас',
   }, {});

   map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

   map.geoObjects.add(placemark);

   if (!window.matchMedia('(max-width: ' + MOBILE_MAX_WIDTH + 'px)').matches) {
      placemark.balloon.open();
   }
}

ymaps.ready(init);

