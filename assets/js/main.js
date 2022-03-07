/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    pageId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-list a[href*=' + pageId + ']').classList.add('active');
    } else {
      document.querySelector('.nav-list a[href*=' + pageId + ']').classList.remove('active');
    }
  });
}
window.addEventListener('scroll', scrollActive);

// /*===== CHANGE BACKGROUND NAVBAR =====*/
// function scrollHeader() {
//   const header = document.getElementById('navbar');
//   // When the scroll is greater than 10 viewport height, add the scroll-header class to the navbar tag
//   if (this.scrollY >= 10) header.classList.add('scroll-header');
//   else header.classList.remove('scroll-header');
// }
// window.addEventListener('scroll', scrollHeader);

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

// Remove contact modal when user clicking outside of it
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('show-modal')) {
    closeModal();
  }
});

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

// ========= PORTFOLIO CATEGORY ========== //
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

// ========== PORTFOLIO MODAL ========== //
const portoViews = document.querySelectorAll('.porto-modal');
const portoBtn = document.querySelectorAll('.porto-modal-btn');
const portoClose = document.querySelectorAll('.porto-modal-close');
const pageBody = document.getElementById('body');

let modal = function (modalClick) {
  portoViews[modalClick].classList.add('active-modal');
  pageBody.classList.add('active-modal');
};

portoBtn.forEach((pb, i) => {
  pb.addEventListener('click', () => {
    modal(i);
  });
});

portoClose.forEach((pc) => {
  pc.addEventListener('click', () => {
    portoViews.forEach((pv) => {
      pv.classList.remove('active-modal');
      pageBody.classList.remove('active-modal');
    });
  });
});

// Remove porto-modal when user clicking outside of it
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('active-modal')) {
    portoViews.forEach((pv) => {
      pv.classList.remove('active-modal');
      pageBody.classList.remove('active-modal');
    });
  }
});
// ====== END ====== //

// === INITIALIZE SWIPER CONTACT === //
let swiper = new Swiper('.contact-info', {
  grabCursor: true,
  loop: false,
  centeredSlides: false,
  slidesPerView: '1',
  spaceBetween: 20,
  // autoplay: {
  //   delay: 2000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {
    500: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    1000: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    Bullets: true,
    clickable: true,
  },
});

// // === ACCORDION NO ACTIVE === //
// let li = document.querySelectorAll('.faq-text li');
// for (var i = 0; i < li.length; i++) {
//   li[i].addEventListener('click', (e) => {
//     let clickedLi;
//     if (e.target.classList.contains('question-arrow')) {
//       clickedLi = e.target.parentElement;
//     } else {
//       clickedLi = e.target.parentElement.parentElement;
//     }
//     clickedLi.classList.toggle('showAnswer');
//   });
// }

// =============== ACCORDION FAQ =============== //
const accordionItems = document.querySelectorAll('.faq-text li');

accordionItems.forEach((item) => {
  const accordionHeader = item.querySelector('.question-arrow');

  accordionHeader.addEventListener('click', () => {
    const openItem = document.querySelector('.showAnswer');
    toggleItem(item);

    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector('.faq-text li p');
  if (item.classList.contains('showAnswer')) {
    accordionContent.removeAttribute('style');
    item.classList.remove('showAnswer');
  } else {
    item.classList.add('showAnswer');
  }
};
// ====== ACCORDION END ====== //

// ========== MULTIPLE READ-MORE BUTTON ========== //
$(document).ready(function () {
  $('.btn-read').click(function () {
    $(this).prev().toggle();
    $(this).siblings('.dots').toggle();
    if ($(this).text() == 'read more') {
      $(this).text('close');
    } else {
      $(this).text('read more');
    }
  });
});
// ====== END ====== //
