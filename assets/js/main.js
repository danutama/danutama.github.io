//*========== KEEP URL ==========*//
$(window).on('hashchange', function (e) {
  history.replaceState('', document.title, e.originalEvent.oldURL);
});
//*========== END ==========*//

//*========== LOADING SCREEN ==========*//
// $(window).on('load', function () {
//   setTimeout(function () {
//     $('.loading-screen').fadeOut(200);
//   }, 3000); // 3
// });

$(window).on('load', function() {
  setTimeout(function() {
    $('.loading-screen').fadeOut(200, function() {
      gsap.to('.hero-name', {
        opacity: 1,
        y: 0,
        duration: .8,
        ease: 'bounce',
      });
    });
  }, 3000);
});
//*========== END ==========*//

//*========== LOADING SCREEN - ANIMATION TEXT ==========*//
const textElement = document.getElementById('animated-text');

textElement.classList.remove('hidden');

const text = textElement.textContent;

textElement.textContent = '';

const letters = text.split('');

letters.forEach((letter, index) => {
  const span = document.createElement('p');
  span.textContent = letter;
  span.classList.add('animated-letter');

  const delay = index * 0.1;

  gsap.from(span, {
    duration: 0.3,
    opacity: 0,
    y: 20,
    ease: 'power4.out',
    delay: 0.2 + delay
  });

  textElement.appendChild(span);
});
//*========== END ==========*//

//*========== NAVBAR TOGGLE ==========*//
const navbarItems = document.querySelector('.navbar-items');
const hamburger = document.querySelector('.hamburger');
const mediaQuery = window.matchMedia('(max-width: 500px)');

let t1 = gsap.timeline({ paused: true });
// t1.to(".navbar-items", { opacity: 1, duration: 1, top: 0 });
t1.fromTo(".navbar-items", { top: "-1000%" }, { top: "0", duration: 1, ease: "bounce" });

if (mediaQuery.matches) {
  t1.fromTo(".navbar-link", { y: "50%"}, { y: "0", opacity: 1, duration: 0.3, stagger: 0.1, ease: "Expo.easeInOut" });
  t1.fromTo(".navbar-link-credit", { y: "50%"}, { y: "0", opacity: 1, duration: 0.3, stagger: 0.2, ease: "Expo.easeInOut" });
}

hamburger.addEventListener('change', () => {
  navbarItems.classList.toggle('active');
  t1.restart().timeScale(1);
});


// SCROLL HIDE AND SHOW
const navbar = document.getElementById('nav')
const navbar_Items = document.querySelector('.navbar-items');
let previousScrollPosition = window.pageYOffset;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.pageYOffset;

  if (!navbar_Items.classList.contains('active')) {
    if (currentScrollPosition > previousScrollPosition) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
  }

  previousScrollPosition = currentScrollPosition;
});
//*========== END ==========*//

/*========== SCROLL ACTIVE SECTIONS ==========*/
function scrollActive() {
  var sections = document.querySelectorAll('section');

  sections.forEach(function (section) {
    if (section.getBoundingClientRect().top <= 50) {
      var id = section.getAttribute('id');
      var navLinks = document.querySelectorAll('.navbar-link');

      navLinks.forEach(function (link) {
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

//*========== GSAP SCROLL ANIMATION ==========*//
gsap.registerPlugin(ScrollTrigger)

const gsapTextElements = document.querySelectorAll('.gsap-text')

gsapTextElements.forEach((element, index) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.2,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 80%',
        scrub: true,
        repeat: -2,
        onRepeat: reverseAnimation
      }
    }
  )
})

function reverseAnimation (animation) {
  animation.reverse()
}
//*========== END ==========*//

//*========== LOCAL TIME ==========*//
async function getJakartaDateTime() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    const data = await response.json();
    const jakartaDateTime = new Date(data.datetime);
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = jakartaDateTime.toLocaleDateString('en-US', options);
    document.getElementById('time').textContent = `Local time, Jakarta / ${formattedDate}`;
  } catch (error) {
    console.error('Error:', error);
  }
}

setInterval(getJakartaDateTime, 1000);

window.addEventListener('load', getJakartaDateTime);
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
const themeToggle = document.querySelector('.switch input');
const darkThemeClass = 'dark-theme';

const toggleDarkTheme = () => {
  document.body.classList.toggle(darkThemeClass);
  if (document.body.classList.contains(darkThemeClass)) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
};

const selectedTheme = localStorage.getItem('theme');
if (selectedTheme === 'dark') {
  document.body.classList.add(darkThemeClass);
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', toggleDarkTheme);
//*========== END ==========*//
