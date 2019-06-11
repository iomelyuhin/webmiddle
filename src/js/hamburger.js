(function () {
  var hamburger = document.querySelector('.hamburger');
  var hamburgerMenu = document.querySelector('.header__nav-list');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('is-active');
    hamburgerMenu.classList.toggle('active');
    document.body.classList.toggle('locked');
  });
  hamburgerMenu.addEventListener('click', function (event) {
    event.preventDefault();
    let target = event.target;
    if (target.classList.contains('header__nav-link')) {
      hamburgerMenu.classList.remove('active');
      hamburger.classList.toggle('is-active');
      document.body.classList.toggle('locked');
    }
  })


})();