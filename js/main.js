
//hamburger menu
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
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
  feedItems[currentSlide].classList.remove('active');
  feedAvatars[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % feedItems.length;
  feedItems[currentSlide].classList.add('active');
  feedAvatars[currentSlide].classList.add('active');
}

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
      currentSlide = i;
    }

  });
}
//Overlay create
//const openButton = document.querySelector(".openOverlay");
const template = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(template);

//openButton.addEventListener("click", function() {
//  overlay.open();
//  overlay.setContent("Спасибо, данные сохранены");
//});

function createOverlay(template) {
  let fragment = document.createElement('div');

  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector(".modal");
  const contentElement = fragment.querySelector(".modal__text");
  const closeElement = fragment.querySelector(".close__btn");

  fragment = null;

  overlayElement.addEventListener("click", e => {
    e.preventDefault();
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });
  closeElement.addEventListener("click", e => {
    e.preventDefault();
    document.body.removeChild(overlayElement);
    document.body.classList.remove('locked');

  });

  return {
    open() {
      document.body.appendChild(overlayElement);
      document.body.classList.add('locked');
    },
    close() {
      closeElement.click();
    },
    setContent(content) {
      contentElement.innerHTML = content;
    }
  };
}



//form data
const myForm = document.querySelector('#myForm');
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', function (e) {
  e.preventDefault();

  let formData = new FormData();

  formData.append("name", myForm.elements.name.value);
  formData.append("phone", myForm.elements.phone.value);
  formData.append("comment", myForm.elements.comment.value);
  formData.append("to", "i.omelyuhin@gmail.com");

  let url = "https://webdev-api.loftschool.com/sendmail";

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("POST", url);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(formData);

  xhr.addEventListener('load', function () {
    console.log(xhr);

    if (xhr.status >= 400) {
      overlay.open();
      overlay.setContent('Что-то пошло не так');

    } else {
      overlay.open();
      overlay.setContent(xhr.response.message);
    }

  });
});


