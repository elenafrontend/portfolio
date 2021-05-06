"use strict";

let header = document.querySelector(".header");
let burgerBtn = document.querySelector(".burger");
let navLinks = document.querySelectorAll(".nav__link");
let anchors = document.querySelectorAll('[href^="#"]');

// -----------  header appearance  -----------
window.onscroll = function () {
  if (window.pageYOffset > 100) {
    header.classList.add("header--active");
  } else {
    header.classList.remove("header--active");
  }
};

// -----------  active scroll menu item  -----------

window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;

  if (window.innerWidth > 991) {
    let sections = document.querySelectorAll(".section");

    for (let i = 0; i < sections.length; i++) {
      let sectionPosition = sections[i].offsetTop;

      if (sectionPosition - header.clientHeight < scrollDistance) {
        for (let navLink of navLinks) {
          navLink.classList.remove("nav__link--active");
        }

        let navItems = document.querySelectorAll(".nav__item");

        navItems[i].querySelector("a").classList.add("nav__link--active");
      }
    }
  }
});

//-----------  scroll to section  -----------

// для каждой ссылки-якоря добавляем обработчик
for (let anchor of anchors) {
  anchor.addEventListener("click", function (evt) {
    // убираем переход по ссылке
    evt.preventDefault();

    // прокручиваем к секции по id
    let sectionID = anchor.getAttribute("href");
    document.querySelector(sectionID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//-----------  burger-menu  -----------

burgerBtn.addEventListener("click", function () {
  header.classList.toggle("header--active-nav");
  burgerBtn.classList.toggle("burger--active");

  // ширина скролла
  let body = document.body;
  let paddingOffset = window.innerWidth - body.offsetWidth + "px";

  // блокируем/возобновляем скролл страницы
  if (burgerBtn.classList.contains("burger--active")) {
    document.body.style.overflow = "hidden";
    // убираем скачок страницы - компенсируем скролл
    body.style.paddingRight = paddingOffset;
    header.style.paddingRight = paddingOffset;
  } else {
    document.body.style.overflow = "";
    // убираем компенсацию скролла
    body.style.paddingRight = "0px";
    header.style.paddingRight = "0px";
  }
});

// функция закрытия меню бургер
let resetNav = function () {
  if (burgerBtn.classList.contains("burger--active")) {
    burgerBtn.classList.remove("burger--active");
    header.classList.remove("header--active-nav");
    document.body.style.overflow = "";
  }
};

// закрываем бургер при клике на ссылку в меню
for (let navLink of navLinks) {
  navLink.addEventListener("click", function (evt) {
    // убираем переход по ссылке
    evt.preventDefault();

    // если открыто меню-бургер, закрываем его
    resetNav();
  });
}

// закрываем бургер меню при ресайзе окна
window.addEventListener("resize", resetNav);

//-----------  typing text  -----------
// https://mattboldt.com/demos/typed-js/

var typed = new Typed(".typed", {
  strings: ["Lena", "Gumerova Elena"],
  typeSpeed: 90,
  startDelay: 1000,
  backSpeed: 60,

  onComplete: (self) => {
    self.cursor.remove();
  },
});

//-----------  3D cards  -----------
// https://micku7zu.github.io/vanilla-tilt.js/

VanillaTilt.init(document.querySelectorAll(".portfolio__card"), {
  max: 20,
  speed: 600,
  reverse: true,
});
