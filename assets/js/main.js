/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.add('active');
    } else {
      document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.remove('active');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND NAVBAR =====*/
function scrollHeader() {
  const header = document.getElementById('navbar');
  // When the scroll is greater than 10 viewport height, add the scroll-header class to the navbar tag
  if (this.scrollY >= 10) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SHOW MODAL =====*/
const showModal = (openButton, modalContent, body) => {
  const openBtn = document.getElementById(openButton),
    modalContainer = document.getElementById(modalContent),
    body_Container = document.getElementById(body);

  if (openBtn && modalContainer) {
    openBtn.addEventListener('click', () => {
      modalContainer.classList.add('show-modal'), body_Container.classList.add('show-modal');
    });
  }
};
showModal('contact', 'modal-container', 'body');

/*===== CLOSE MODAL =====*/
const closeBtn = document.querySelectorAll('.close-modal');

function closeModal() {
  const modalContainer = document.getElementById('modal-container'),
    body_Container = document.getElementById('body');
  modalContainer.classList.remove('show-modal'), body_Container.classList.remove('show-modal');
}
closeBtn.forEach((c) => c.addEventListener('click', closeModal));

/*========== DARK LIGHT THEME ==========*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'bxs-sun' : 'bxs-sun');

// We validate if the user previously choose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'bxs-sun' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

// === Portfolio Category === //
let portfolioMenuList = document.querySelector('.portfolio-card');

let portfolioCategory = document.querySelector('.portfolio-category');

let categories = portfolioCategory.querySelectorAll('button');

Array.from(categories).forEach((item, index) => {
  item.onclick = (e) => {
    let currCat = portfolioCategory.querySelector('button.active');
    currCat.classList.remove('active');
    e.target.classList.add('active');
    portfolioMenuList.classList = 'portfolio-card ' + e.target.getAttribute('data-portfolio-type');
  };
});

// === Initialize Swiper Sponsor === //
let swiper = new Swiper('.sponsor__container', {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: '3',
  spaceBetween: 130,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
});

// === ACCORDION === //
let li = document.querySelectorAll('.faq-text li');
for (var i = 0; i < li.length; i++) {
  li[i].addEventListener('click', (e) => {
    let clickedLi;
    if (e.target.classList.contains('question-arrow')) {
      clickedLi = e.target.parentElement;
    } else {
      clickedLi = e.target.parentElement.parentElement;
    }
    clickedLi.classList.toggle('showAnswer');
  });
}