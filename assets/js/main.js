//*========== KEEP URL ==========*//
window.addEventListener('hashchange', function(e) {
  history.replaceState('', document.title, e.oldURL);
});
//*========== END ==========*//


//*========== LENIS SMOOTH SCROLL ==========*//
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//*========== END ==========*//


//*========== LOADING SCREEN ==========*//
function animateBlock() {
  const tl = gsap.timeline({
    onComplete: function() {
      document.querySelector(".blocks").style.display = "none";
      document.querySelector("body").style.overflow = 'auto';

      gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.7,
      });

      gsap.to('.hero-img', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.inOut',
      });
    }
  });

  tl.to(".block-left", {
    left: "-51%",
    duration: 1.2,
    ease: "power3.inOut",
    delay: 1,
  })
  .to(".block-right", {
    right: "-51%",
    duration: 1.2,
    ease: "power3.inOut",
  }, "-=1.2");
}

function animateBlockLeftRight() {
  const loadingScreen = document.querySelector('.blocks');
  const loadingProgress = loadingScreen.querySelector('.loading-progress');
  const loadingTextLeft = document.querySelector('.loading-text-left');
  const loadingTextRight = document.querySelector('.loading-text-right');

  const total = 100;
  let loaded = 70;

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
      gsap.to(loadingProgress, { clipPath: 'inset(0 0 100% 0)', delay: 0.3 });
      gsap.to(loadingTextLeft, { y: 0, duration: 0.7, ease: "power1.inOut", delay: 1.1 });
      gsap.to(loadingTextRight, { y: 0, duration: 0.7, ease: "power1.inOut", delay: 1.1, onComplete: animateBlock });

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

function updateCursorPos(e) {
  const x = e.clientX;
  const y = e.clientY;
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
}

document.addEventListener('mousemove', e => {
  requestAnimationFrame(() => {
    updateCursorPos(e);
  });
});

function addActiveClass() {
  circle.classList.add('active');
}

function removeActiveClass() {
  circle.classList.remove('active');
}

linksAndButtons.forEach(elem => {
  elem.addEventListener('mouseenter', addActiveClass);
  elem.addEventListener('mouseleave', removeActiveClass);
});
//*========== END ==========*//


//*========== NAVIGATION ==========*//
const menu = document.getElementById('navbarItems');
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const navbarLink = document.querySelectorAll('.navbar-link');
let emailTL;

function open_menu() {
  menu.style.display = 'flex';

  const tl = gsap.timeline();
  tl.set(document.body, { overflow: "hidden" })
  tl.fromTo(
    menu,
    { top: '-100%' },
    {
      top: '0',
      duration: 0.5,
      ease: 'expo.in',
    }
  ).fromTo(
    navbarLink,
    { y: '100%', opacity: 1 },
    {
      y: '0',
      opacity: 1,
      duration: 0.7,
      delay: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.3'
  ).add(() => {
    runEmailAnimation();
  }, '-=0.2'
  ).fromTo(
    closeMenu,
    { scale: 0 },
    {
      duration: 0.3,
      scale: 1,
    }
  );

  // REVERSE
  closeMenu.addEventListener('click', () => {
    closeMenuAnimation();
  });

  navbarLink.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenuAnimation();
    });
  });
}

function runEmailAnimation() {
  const emailElement = document.querySelector('.navbar-credit');

  gsap.to(emailElement, { opacity: 1, duration: 0 });

  const splitText = new SplitType(emailElement);
  const charElements = emailElement.querySelectorAll('.navbar-credit .char');

  emailTL = gsap.timeline({ paused: true });
  emailTL.fromTo(charElements, { y: "100%" }, { y: 0, stagger: 0.05, delay: 0, duration: 0.1 });

  emailTL.play();
}

function closeMenuAnimation() {
  const reverseTl = gsap.timeline();
  reverseTl.set(document.body, { overflow: "hidden" });
  // reverseTl.to(navbarLink, { opacity: 1, y: '100%', duration: 0.7, ease: 'power2.in' });
  emailTL.reverse();
  reverseTl.to(closeMenu, { scale: 0 });
  reverseTl.to(menu, {
    top: '-100%',
    duration: 1,
    ease: 'power4.in',
  });
  reverseTl.to(navbarLink, {
      opacity: 1,
      y: '100%',
      duration: 0.5,
      ease: 'power1.in'
    }, '<'
  );
  reverseTl.set(document.body, { overflow: "auto" });
  reverseTl.set(menu, { display: 'none' });
  reverseTl.set(".navbar-credit", { opacity: 0 });
}

openMenu.addEventListener('click', open_menu);
//*========== END ==========*//


//*========== CIRCLE TEXT AND IMAGE LOGO ==========*//
const textCircle = document.querySelector('.circle-text p');
textCircle.innerHTML = textCircle.innerText
  .split("")
  .map((char, i) => `<span style="transform:rotate(${i * 15}deg)">${char}</span>`)
  .join("");
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


//*========== ABOUT IMAGE ==========*//
const aboutImageWrapper = document.querySelector('.about-image-wrapper:first-child');
const aboutImage = aboutImageWrapper.querySelector('.about-image');

gsap.from(
  aboutImage,
  {
    clipPath: 'inset(100% 0 0 0)', 
    duration: 1, 
    ease: 'power2.inOut', 
    scrollTrigger: {
      trigger: aboutImageWrapper,
      start: 'top 50%',
      once: true,
    },
  }
);
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


//*========== ABOUT-ACCORDION IMAGE ==========*//
const accordionImages = document.querySelectorAll('.accordion-img');

accordionImages.forEach((accordionImage) => {
  gsap.from(accordionImage, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.7,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: accordionImage,
      start: 'top 80%',
      once: true,
    },
  });
});
//*========== END ==========*//


//*========== LOCAL TIME ==========*//
function getJakartaDate() {
  const jakartaTimeZone = 'Asia/Jakarta';
  const jakartaDateTime = new Date().toLocaleString('en-US', { timeZone: jakartaTimeZone });
  const options = { month: 'long', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(new Date(jakartaDateTime));
  document.getElementById('time').innerHTML = `Availability &#8212; ${formattedDate}`;
}

window.addEventListener('load', getJakartaDate);
//*========== END ==========*//


//*========== DATE FOR ABOUT SECTION ==========*//
const dateElement = document.getElementById('aboutDate');
const options = { month: 'short', day: 'numeric' };
const today = new Date();

const dateText = today.toLocaleDateString('en-US', options);
const modifiedDateText = `(${dateText})`;
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


/*========== DARK LIGHT MODE ==========*/
const themeToggleButton = document.querySelector('.theme-toggle-button');
const darkThemeClass = 'dark-theme';

function toggleDarkTheme() {
  document.body.classList.toggle(darkThemeClass);
  if (document.body.classList.contains(darkThemeClass)) {
    localStorage.setItem('theme', 'dark');
    themeToggleButton.textContent = 'Light';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleButton.textContent = 'Dark';
  }
}

const selectedTheme = localStorage.getItem('theme');
if (selectedTheme === 'dark') {
  document.body.classList.add(darkThemeClass);
  themeToggleButton.textContent = 'Light';
}

themeToggleButton.addEventListener('click', toggleDarkTheme);
//*========== END ==========*//


//*========== PROJECTS SECTION ==========*//
const projects = gsap.utils.toArray('.project-box');
projects.forEach(project => {
  const speed = parseFloat(project.getAttribute('data-speed'));
  gsap.to(project, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: project,
      start: 'top bottom',
      scrub: true,
    }
  })
});
//*========== END ==========*//


//*========== MODAL CREDITS ==========*//
const modal = document.getElementById('modalInfo');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalText = document.querySelector('.modal-gsap-text');

function openModal() {
  gsap.set(document.body, {overflow: "hidden"})
  modal.style.display = 'flex';
  gsap.fromTo(modal, { y: "100%" }, {
    y: "0",
    duration: 1,
    ease: "power3.inOut",
    borderTopRightRadius: "0",
    borderTopLeftRadius: "0",
    onComplete: () => {
      const tl = gsap.timeline();
      tl.fromTo(modalText, { y: "100%", opacity: 1 }, { y: "0", opacity: 1, duration: .7, stagger: 0.2, ease: "power3.inOut" })
        .fromTo('.modal-info-title', { y: "102%", opacity: 1 }, { y: "0", opacity: 1, duration: .7, stagger: 0.2, ease: "power3.inOut" }, '-=0.7')
        .fromTo('.modal-content span', { x: "-100%", opacity: 0 }, { x: "0", opacity: 1, duration: .7, stagger: 0.2, ease: "power2.inOut" }, '-=0.4');

      // REVERSE
      closeModalBtn.addEventListener('click', () => {
        const reverseTl = gsap.timeline();
        reverseTl.to('.modal-content span', { opacity: 0, x: "-100%", duration: .7, stagger: 0.1, ease: "power2.inOut" })
          .to('.modal-info-title', { opacity: 1, y: "102%", duration: .7, stagger: 0.2, ease: "power3.inOut" }, '-=0.5')
          .to(modalText, { opacity: 1, y: "100%", duration: .7, stagger: 0.2, ease: "power3.inOut" }, '-=0.7')
          .to(modal, {
            y: "100%",
            duration: 1,
            ease: 'power3.inOut',
            borderTopRightRadius: "50%",
            borderTopLeftRadius: "50%",
          })
          .set(document.body, {overflow: "auto"})
          .set(modal, {display: 'none'});
      });
    }
  });
}

openModalBtn.addEventListener('click', openModal);
//*========== END ==========*//


//*========== HERO IMAGES PARALLAX ==========*//
const imgs = gsap.utils.toArray('.img-small');
imgs.forEach(img => {
  const speed = parseFloat(img.getAttribute('data-speed'));
  gsap.to(img, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      scrub: true,
    }
  })
});
//*========== END ==========*//


//*========== HERO LOGO ==========*//
// const screenWidth = window.innerWidth;

// if (screenWidth > 500) {
//   const heroWrapper = document.querySelector('.hero-wrapper');

//   gsap.to(heroWrapper, {
//     duration: 3,
//     clipPath: 'inset(0 0 100% 0)',
//     scrollTrigger: {
//       trigger: '.hero-name',
//       start: 'top 30%',
//       end: 'top 5%',
//       scrub: 2,
//       toggleActions: 'play none none none',
//     },
//   });
// }

function getLocalTimeJakarta() {
  return fetch('http://worldtimeapi.org/api/timezone/Asia/Jakarta')
    .then(response => response.json())
    .then(data => new Date(data.datetime))
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
      return new Date();
    });
}

function displayLocalTimeJakarta() {
  getLocalTimeJakarta()
    .then(localTimeJakarta => {
      let hours = localTimeJakarta.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = ('0' + (hours % 12 || 12)).slice(-2);
      const minutes = ('0' + localTimeJakarta.getMinutes()).slice(-2);

      const day = ('0' + localTimeJakarta.getDate()).slice(-2);
      const month = ('0' + (localTimeJakarta.getMonth() + 1)).slice(-2);
      const year = localTimeJakarta.getFullYear().toString().slice(-2);

      const hariName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(localTimeJakarta);

      document.getElementById('jam').textContent = hours + ':' + minutes + ' ' + ampm;
      document.getElementById('hari').textContent = hariName + ' ' + day + '/' + month + '/' + year;
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

displayLocalTimeJakarta();

setInterval(displayLocalTimeJakarta, 60000);
//*========== END ==========*//


//*========== SPLIT TEXT ==========*//
const texts = document.querySelectorAll('.stroke-text');

texts.forEach(text => {
  const splitText = new SplitType(text);
  const charElements = text.querySelectorAll('.char');

  const textTL = gsap.timeline({ paused: true });
  textTL.to(
    charElements,
    { y: 0, stagger: 0.05, delay: 0.2, duration: 0.1 }
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        textTL.play();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(text);
});
//*========== END ==========*//


//*========== TEXT CLIP-PATH ==========*//
const textClips = document.querySelectorAll('.text-clip');

textClips.forEach((textClip) => {
  gsap.from(
    textClip,
    { 
      clipPath: 'inset(0 100% 0 0)', 
      duration: 0.7, 
      ease: 'power2.inOut', 
      scrollTrigger: {
        trigger: textClip,
        start: 'top 70%',
        once: true,
      },
    }
  );
});
//*========== END ==========*//


//*========== TEXT REVEAL ON SCROLL ==========*//
const textAnimated = document.querySelectorAll(".text-animated");

textAnimated.forEach((char) => {
  const text = new SplitType(char, { types: 'words' });

  gsap.from(text.words, {
    scrollTrigger: {
      trigger: char,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
    opacity: 0.2,
    stagger: 0.1
  });
});

// textAnimated.forEach((textAnim) => {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: textAnim,
//       toggleActions: "play none none none",
//       onLeaveBack: (self) => self.disable(),
//     },
//   });

//   tl.from(textAnim, {
//     y: 50,
//     duration: 1,
//   });
// });
//*========== END ==========*//