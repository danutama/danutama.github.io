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
const navbarToggler = document.getElementById('navbarToggler');
const navbarItems = document.querySelector('.navbar-items');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  navbarItems.classList.toggle('active');
});

navbarToggler.addEventListener('change', () => {
  navbarItems.classList.toggle('active');
  navbarToggler.classList.toggle('active');
});
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
    "Local time / " + day + " " + months[monthIndex] + " - " + hours + ":" + minutes + ":" + seconds + " WIB";
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
