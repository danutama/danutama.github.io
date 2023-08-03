//*========== KEEP URL ==========*//
$(window).on('hashchange', function (e) {
  history.replaceState('', document.title, e.originalEvent.oldURL);
});
//*========== END ==========*//


//*========== LOADING SCREEN ==========*//
function animateBlock() {
  const tl = gsap.timeline({
    onComplete: function() {
      document.querySelector(".blocks").style.display = "none";

      gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1,
      });

      gsap.to('.hero-img', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
      });
    }
  });

  tl.to(".block-left", {
    left: "-51%",
    duration: 2,
    ease: "power3.inOut",
    delay: 1,
  })
  .to(".block-right", {
    right: "-51%",
    duration: 2,
    ease: "power3.inOut",
  }, "-=2");
}

function animateBlockLeftRight() {
  const loadingScreen = document.querySelector('.blocks');
  const loadingProgress = loadingScreen.querySelector('.loading-progress');
  const loadingTextLeft = document.querySelector('.loading-text-left');
  const loadingTextRight = document.querySelector('.loading-text-right');

  const total = 100;
  let loaded = 50;

  function updateProgress(percentage) {
    loadingProgress.textContent = `${percentage}%`;
  }

  function completeLoading() {
    animateBlock();
    loadingScreen.style.display = 'none';
  }

  function updateLoading() {
    loaded++;
    const percentage = Math.min(Math.round((loaded / total) * 100), 100);
    updateProgress(percentage);

    if (percentage === 100) {
      gsap.to(loadingTextLeft, { y: 0, opacity: 1, duration: 1, ease: "expo.in" });
      gsap.to(loadingTextRight, { y: 0, opacity: 1, duration: 1, ease: "expo.in", onComplete: animateBlock });

      clearInterval(loadingInterval);
    }
  }

  const loadingInterval = setInterval(updateLoading, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  animateBlockLeftRight();
});
//*========== END ==========*//


//*========== CURSOR ==========*//
const circle = document.querySelector('.circle-cursor');
const linksAndButtons = document.querySelectorAll('a, button');

document.addEventListener('mousemove', e => {
  const x = e.clientX
  const y = e.clientY

  circle.style.left = x + 'px'
  circle.style.top = y + 'px'
})

function addActiveClass() {
  circle.classList.add('active');
}

function removeActiveClass() {
  circle.classList.remove('active');
}

linksAndButtons.forEach(elem => {
  elem.addEventListener('mouseover', addActiveClass);
  elem.addEventListener('mouseout', removeActiveClass);
});
//*========== END ==========*//


//*========== CIRCLE TEXT AND IMAGE LOGO ==========*//
const textCircle = document.querySelector('.circle-text p');
textCircle.innerHTML = textCircle.innerText.split("").map(
  (char, i) =>
    `<span style="transform:rotate(${i * 15}deg)">${char}</span>`
).join("")
//*========== END ==========*//


/*========== SCROLL ACTIVE SECTIONS ==========*/
function scrollActive() {
  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 50) {
      const id = section.getAttribute('id');
      const navLinks = document.querySelectorAll('.navbar-link');

      navLinks.forEach((link) => {
        link.classList.remove('active');

        if (link.getAttribute('href').slice(1) === id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', scrollActive);
//*========== END ==========*//


//*========== AOS (SCROLL ANIMATION) ==========*//
AOS.init({
  offset: 0,
  once: true,
});
//*========== END ==========*//


//*========== ABOUT-ACCORDION ==========*//
document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", function () {
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("accordion-active");
        }
      });

      item.classList.toggle("accordion-active");
    });
  });
});
//*========== END ==========*//


//*========== LOCAL TIME ==========*//
function getJakartaDate() {
  const jakartaTimeZone = 'Asia/Jakarta';
  const jakartaDateTime = new Date(new Date().toLocaleString('en-US', { timeZone: jakartaTimeZone }));
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(jakartaDateTime);
  document.getElementById('time').innerHTML = `Availability &#8212; ${formattedDate}`;
}

window.addEventListener('load', getJakartaDate);
//*========== END ==========*//


//*========== DATE FOR ABOUT SECTION ==========*//
const dateElement = document.getElementById('aboutDate');
const options = { month: 'short', day: 'numeric' };
const today = new Date();

const dateText = today.toLocaleDateString('en-US', options);
const modifiedDateText = `[${dateText}]`;
dateElement.innerHTML = modifiedDateText;
//*========== END ==========*//


//*========== SWIPER JS ==========*//
let newSwiper = new Swiper('.about-slider-container', {
  grabCursor: true,
  loop: false,
  centeredSlides: false,
  slidesPerView: 'auto',
  spaceBetween: 20,
  breakpoints: {
    500: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    800: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  pagination: {
    el: '.new-swiper-pagination',
    type: "fraction",
    clickable: false,
  },
});
//*========== END ==========*//


//*========== SCROLL TOP BTN ==========*//
function scrollToTop() {
  if (typeof window.scrollTo === 'function') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(0, 0);
  }
}
//*========== END ==========*//


/*========== DARK LIGHT MODE ==========*/
const themeToggleButton = document.querySelector('.theme-toggle-button');
const darkThemeClass = 'dark-theme';

const toggleDarkTheme = () => {
  document.body.classList.toggle(darkThemeClass);
  if (document.body.classList.contains(darkThemeClass)) {
    localStorage.setItem('theme', 'dark');
    themeToggleButton.textContent = '[dark]';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleButton.textContent = '[light]';
  }
};

const selectedTheme = localStorage.getItem('theme');
if (selectedTheme === 'dark') {
  document.body.classList.add(darkThemeClass);
  themeToggleButton.textContent = '[dark]';
}

themeToggleButton.addEventListener('click', toggleDarkTheme);
//*========== END ==========*//


//*========== MIXITUP JS ==========*//
$(document).ready(function () {
  var mixer = mixitup('.project-wrapper', {
    animation: {
      duration: 0,
    },
    load: {
      filter: '.laravel',
    },
  });

  function updateDataCount() {
    const buttons = document.querySelectorAll('.project-menu button');
    const wrapper = document.querySelector('.project-wrapper');
    
    buttons.forEach(button => {
      const filter = button.getAttribute('data-filter');
      const itemCount = wrapper.querySelectorAll(filter).length;
      const dataCountTag = button.querySelector('.data-count');
      dataCountTag.textContent = ` [${itemCount}]`;
    });
  }

  updateDataCount();
});
//*========== END ==========*//


//*========== MODAL CREDITS ==========*//
const modal = document.getElementById('modalInfo');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalText = document.querySelector('.modal-gsap-text');

function openModal() {
  gsap.fromTo(modal, { bottom: "-150%" }, {
    bottom: "0",
    duration: 1,
    ease: "expo.out",
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    onComplete: () => {
      const tl = gsap.timeline();
      tl.fromTo(modalText, { y: "-50%", opacity: 0 }, { y: "0", opacity: 1, duration: .7, stagger: 0.2, ease: "Expo.easeInOut" })
        .fromTo('.modal-info-title', { y: "-50%", opacity: 0 }, { y: "0", opacity: 1, duration: .7, stagger: 0.2, ease: "Expo.easeInOut" })
        .fromTo('.modal-content span', { y: "-50%", opacity: 0 }, { y: "0", opacity: 1, duration: .7, stagger: 0.2, ease: "Expo.easeInOut" });

      // RESERVE
      closeModalBtn.addEventListener('click', () => {
        const reverseTl = gsap.timeline();
        reverseTl.to('.modal-content span', { opacity: 0, y: "-50%", duration: .7, stagger: 0.2, ease: "Expo.easeInOut" })
          .to('.modal-info-title', { opacity: 0, y: "-50%", duration: .7, stagger: 0.2, ease: "Expo.easeInOut" }, '-=0.5')
          .to(modalText, { opacity: 0, y: "-50%", duration: .7, stagger: 0.2, ease: "Expo.easeInOut" }, '-=0.5')
          .to(modal, {
            bottom: "-150%",
            duration: 1,
            ease: 'expo.in',
            borderTopRightRadius: "50%",
            borderTopLeftRadius: "50%",
          }, '-=0.5');
      });
    }
  });
}

openModalBtn.addEventListener('click', openModal);
//*========== END ==========*//


//*========== PARALLAX TEXT ON SCROLL ==========*//
let text1 = document.querySelector('.hero-subtitle-top');
let text2 = document.querySelector('.hero-subtitle-bottom');
let text3 = document.querySelector('.circle-text-wrapper');
let text4 = document.querySelector('.about-shadow-text');
window.onscroll = () => {
  let scrollY = window.scrollY;
  let pos1 = (0 - scrollY) * 0.5;
  let pos2 = (scrollY - 0) * 0.5;
  let pos3 = (0 - scrollY) * 0.5;
  let pos4 = (0 - scrollY) * 0.5;
  text1.style.transform = `translateX(${pos1}px)`;
  text2.style.transform = `translateX(${pos2}px)`;
  text3.style.transform = `translateY(${pos3}px)`;
  text4.style.transform = `translateY(${pos4}px)`;
};
//*========== END ==========*//