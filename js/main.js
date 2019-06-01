
//hamburger menu
var hamburger = document.querySelector('.hamburger');
var hamburgerMenu = document.querySelector('.header__nav-list');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('is-active');
  hamburgerMenu.classList.toggle('active');
});
hamburgerMenu.addEventListener('click', function (event) {
  event.preventDefault();
  let target = event.target;
  if (target.classList.contains('header__nav-link')) {
    hamburgerMenu.classList.remove('active');
    hamburger.classList.toggle('is-active');

  }
})

//slider product
var list = document.querySelector('.prod__list');
var prev = document.querySelector('.prod__prev');
var next = document.querySelector('.prod__next');

var minNext = 0;
var maxNext = 100;
var step = 100;
var currentNext = 0;

list.style.right = currentNext;

next.addEventListener('click', function (e) {
  e.preventDefault();
  if (currentNext < maxNext) {
    currentNext += step;
    list.style.right = currentNext + "%";
  }
  else if (currentNext == maxNext) {
    currentNext = 0;
    list.style.right = currentNext + "%";
  }
});
prev.addEventListener('click', function (e) {
  e.preventDefault();
  if (currentNext > minNext) {
    currentNext -= step;
    list.style.right = currentNext + "%";
  }
  else if (currentNext == minNext) {
    currentNext = maxNext;
    list.style.right = currentNext + "%";
  }
});

//crew
var crewItemArr = document.querySelectorAll('.crew__item');

for (let i = 0; i < crewItemArr.length; i++) {
  const crewItem = crewItemArr[i];

  crewItem.addEventListener('click', function (event) {
    event.preventDefault();
    if (crewItem.classList.contains('active')) {
      crewItem.classList.remove('active');
    } else {
      for (let i = 0; i < crewItemArr.length; i++) {
        const crew = crewItemArr[i];
        crew.classList.remove('active');
      }

      let target = event.target;

      if (target.classList.contains('crew__item-tittle') || target.classList.contains('crew__img')) {
        crewItem.classList.toggle('active');
      };
    }

  });
};

//menu
var menuItemArr = document.querySelectorAll('.menu__item');

for (let i = 0; i < menuItemArr.length; i++) {
  const menuItem = menuItemArr[i];
  menuItem.addEventListener('click', function (event) {
    if (menuItem.classList.contains('active')) {
      menuItem.classList.remove('active');
    } else {
      for (let i = 0; i < menuItemArr.length; i++) {
        const menuItem = menuItemArr[i];
        menuItem.classList.remove('active');
      }

      let target = event.target;
      if (target.classList.contains('menu__link') ||
        target.classList.contains('menu__item-name') ||
        target.classList.contains('menu__item-tittle')) {

        menuItem.classList.add('active');
      };
    };
  });
};

//feeds slider

var feedItems = document.querySelectorAll('.feed__item');
var feedAvatars = document.querySelectorAll('.feed__ava-item');

for (let i = 0; i < feedAvatars.length; i++) {
  const feedAvatar = feedAvatars[i];
  const feedItem = feedItems[i];

  feedAvatar.addEventListener('click', function (e) {
    e.preventDefault();
    if (feedAvatar.classList.contains('active') && feedItem.classList.contains('active')) {
      feedAvatar.classList.remove('active');
      feedItem.classList.remove('active');
    } else {
      for (let i = 0; i < feedAvatars.length; i++) {
        const feedAvatar = feedAvatars[i];
        const feedItem = feedItems[i];

        feedAvatar.classList.remove('active');
        feedItem.classList.remove('active');
      };
    }
    let target = e.target;
    if (target.classList.contains('feed__ava-item') ||
      target.classList.contains('feed__ava-link') ||
      target.classList.contains('feed__ava-img')) {
      feedAvatar.classList.add('active');
      feedItem.classList.add('active');
    }

  });
}