//*========== KEEP URL ==========*//
$(window).on('hashchange', function (e) {
  history.replaceState('', document.title, e.originalEvent.oldURL);
});
//*========== END ==========*//

//*========== LOADING SCREEN ==========*//
$(window).on('load', function () {
  setTimeout(function () {
    $('.loading-screen').fadeOut(200);
  }, 2000); // delay selama 3 detik
});
//*========== END ==========*//

//*========== NAVBAR TOGGLE ==========*//
const navbarItems = document.querySelector('.navbar-items');
const hamburger = document.querySelector('.hamburger');
const mediaQuery = window.matchMedia('(max-width: 500px)');

let t1 = gsap.timeline({ paused: true });
// t1.to(".navbar-items", { opacity: 1, duration: 1, top: 0 });
t1.fromTo(".navbar-items", { top: "-1000%" }, { top: "0", duration: .8, ease: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" });

if (mediaQuery.matches) {
  t1.fromTo(".navbar-link", { y: "50%"}, { y: "0", opacity: 1, duration: 0.3, stagger: 0.2, ease: "Expo.easeInOut" });
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
function updateTime() {
  var date = new Date();
  var months = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "June", "July",
      "Aug", "Sept", "Oct",
      "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (hours < 10) {
      hours = "0" + hours;
  }

  if (minutes < 10) {
      minutes = "0" + minutes;
  }

  if (seconds < 10) {
      seconds = "0" + seconds;
  }

  document.getElementById("time").innerHTML =
    "Local time: " + day + " " + months[monthIndex] + ", " + hours + ":" + minutes + ":" + seconds + " WIB";
}

setInterval(function() {
  updateTime();
}, 1000);
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
