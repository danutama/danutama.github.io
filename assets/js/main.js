//*========== KEEP URL ==========*//
$(window).on('hashchange', function (e) {
  history.replaceState('', document.title, e.originalEvent.oldURL);
});
//*========== END ==========*//


//*========== LOADING SCREEN ==========*//
function animateBlock() { 
  const tl = gsap.timeline({
    onComplete: function() {
      gsap.to('.hero-name', {
        opacity: 1,
        y: 0,
        duration: .8,
        ease: 'bounce',
      });
    }
  });

  tl.to(".block-left", {
    left: "-55%",
    duration: 2,
    ease: "power3.inOut",
    delay: 1,
  })
  .to(".block-right", {
    right: "-55%",
    duration: 2,
    ease: "power3.inOut",
  }, "-=2");
}

function animateBlockLeftRight() {
  gsap.to('.loading-text-left', { y: 0, opacity: 1, duration: 1, ease: "expo.in", delay: .5, onComplete: animateBlock });
  gsap.to('.loading-text-right', { y: 0, opacity: 1, duration: 1, ease: "expo.in", delay: .5, onComplete: animateBlock });
}

$(window).on('load', function() {
  animateBlockLeftRight();
});
//*========== END ==========*//


//*========== LOADING SCREEN - ANIMATION TEXT ==========*//
// const textElement = document.getElementById('animated-text');

// textElement.classList.remove('hidden');

// const text = textElement.textContent;

// textElement.textContent = '';

// const letters = text.split('');

// gsap.to('.loading-logo', { y: 0, opacity: 1, duration: 0.7, ease: "expo.in", onComplete: animateLetters });

// function animateLetters() {
//   letters.forEach((letter, index) => {
//     const span = document.createElement('p');
//     span.textContent = letter;
//     span.classList.add('animated-letter');

//     const delay = index * 0.1;

//     gsap.from(span, {
//       duration: 0.3,
//       opacity: 0,
//       y: 20,
//       ease: 'power4.out',
//       delay: 0.5 + delay
//     });

//     textElement.appendChild(span);
//   });
// }
//*========== END ==========*//


//*========== CIRCLE TEXT AND IMAGE LOGO ==========*//
const textCircle = document.querySelector('.circle-text p');
textCircle.innerHTML = textCircle.innerText.split("").map(
  (char, i) =>
    `<span style="transform:rotate(${i * 15}deg)">${char}</span>`
).join("")
//*========== END ==========*//


//*========== NAVBAR TOGGLE WITH GSAP ANIMATION ==========*//
const navbarItems = document.querySelector('.navbar-items');
const hamburger = document.querySelector('.hamburger');
const mediaQuery = window.matchMedia('(max-width: 500px)');

let t1;

const initTimelineAnimation = () => {
  t1 = gsap.timeline({ paused: true });
  t1.fromTo(".navbar-items", { top: "-1000%" }, { top: "0", duration: 1, ease: "expo.inOut" });
  t1.fromTo(".navbar-link", { y: "50%", opacity: 0 }, { y: "0", opacity: 1, duration: 0.3, stagger: 0.2, ease: "Expo.easeInOut" });
  t1.fromTo(".navbar-link-credit", { y: "50%" }, { y: "0", opacity: 1, duration: 0.3, stagger: 0.2, ease: "Expo.easeInOut" });
};

// Function to handle navbar link visibility and animation
const handleNavbarLink = () => {
  if (mediaQuery.matches) {
    gsap.set(".navbar-link", { y: "50%", opacity: 0 });
    gsap.set(".navbar-link-credit", { y: "50%", opacity: 0 });
  } else {
    gsap.set(".navbar-link", { y: "0", opacity: 1 });
    gsap.set(".navbar-link-credit", { y: "0", opacity: 1 });
  }
};

// Function to handle menu open/close animation
const handleMenuAnimation = () => {
  navbarItems.classList.toggle('active');

  if (navbarItems.classList.contains('active')) {
    t1.play().timeScale(1);
  } else {
    t1.timeScale(2);
    t1.reverse();
  }
};

// Initialize the timeline animation
initTimelineAnimation();

// Check navbar link visibility and animation on page load
handleNavbarLink();

hamburger.addEventListener('change', handleMenuAnimation);

window.addEventListener('resize', () => {
  if (!navbarItems.classList.contains('active')) {
    initTimelineAnimation();
    handleNavbarLink();
  }
});

// HIDE AND SHOW NAVBAR WHEN SCROLLING
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
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jakarta' };
    const formattedDate = jakartaDateTime.toLocaleString('en-US', options);
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
