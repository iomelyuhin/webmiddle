
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

//generate dots

  var generateDots = function () {
    $('.section').each(function (index) {
      var dot = $('<li>', {
        attr: {
          class: 'onepage__item',
          'data-scroll-to' : index
        },
        html: '<a href="#" class="onepage__link"></a>'
      });
      $('.onepage__list').append(dot);
    });
  };
  generateDots();
  $('.onepage__item:first-child').addClass('active');

//onePageScroll
var sections = $('.section');
var display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const switchActiveClassInSideMenu = menuItemIndex => {
  $(".onepage__item")
    .eq(menuItemIndex)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

var performTransition = sectionEq => {
  if (inscroll) return;

  const sectionEqNum = parseInt(sectionEq);

  if (!!sectionEqNum === false)
    console.error("не верное значение для аргуемента sectionEq");

  inscroll = true;
  
  var position = `${sectionEq * -100}%`

  sections
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');

  display.css({
    transform: `translateY(${position})`
  });

  setTimeout(() => {
    inscroll = false;
    switchActiveClassInSideMenu(sectionEq);
  }, 500 + 300);
};

var scrollToSection = direction => {
  var activeSection = sections.filter('.active');
  var nextSection = activeSection.next();
  var prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  };
  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  };

};

$('.wrapper').on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection("next");
  };

  if (deltaY < 0) {
    scrollToSection("prev");

  };
});

$('.wrapper').on('touchmove', e => {
  e.preventDefault();
});

$(document).on("keydown", e => {
  switch (e.keyCode) {
    case 38:
      scrollToSection("prev");
      break;
    case 40:
      scrollToSection("next");
      break;
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  const target = $(e.currentTarget).attr("data-scroll-to");
  
  performTransition(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function(event, direction) {
      const nextOrPrev = direction === "up" ? "next" : "prev";
      scrollToSection(nextOrPrev);
    }
  });
};

//Slider product jQuery
$(function () {

  var moveSlide = function (container, slideNum) {
    var
      items = container.find('.prod__item'),
      activeSlide = items.filter('.active'),
      regItem = items.eq(slideNum),
      regIndex = regItem.index(),
      list = container.find('.prod__list'),
      duration = 500;

    if (regItem.length) {
      list.animate({
        'left': -regIndex * 100 + '%'
      }, duration, function () {
        activeSlide.removeClass('active');
        regItem.addClass('active');
      });
    }
  }

  $('.prod__controls').on('click', function (e) {
    e.preventDefault();
    var $this = $(this),
      container = $this.closest('.container--prod'),
      items = $('.prod__item', container),
      activeItem = items.filter('.active'),
      existedItem, edgeItem, regItem;


    if ($this.hasClass('controls--next')) {
      existedItem = activeItem.next();
      edgeItem = items.first();
    }

    if ($this.hasClass('controls--prev')) {
      existedItem = activeItem.prev();
      edgeItem = items.last();
    }

    regItem = existedItem.length ? existedItem.index() : edgeItem.index()

    moveSlide(container, regItem);

  });




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

//Feeds slider jquery 
$(function () {



});


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

//Videoplayer

let video;
let durationControl; 
let soundControl;
let intervalId;

//

// документ полностью загружен
$(document).ready(function(){

    video = document.getElementById("player"); 

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf);
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");    
    durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('onmousemove',setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval); 
    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;
    

    //обрабатываем окончание видео
    video.addEventListener('ended', function () {
        $(".video__player-img").toggleClass("video__player-img--active");
        video.currentTime = 0;
        $('.duration__img').removeClass('active');
    });
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");  
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1000/60);
        $('.duration__img').addClass('active');
    }else{
        // останавливаем видео
        video.pause();  
        clearInterval(intervalId);
        $('.duration__img').removeClass('active');
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){
    if (video.paused){
        video.play();
        $(".video__player-img").addClass("video__player-img--active");
        $('.duration__img').addClass('active');
    }else{
        video.pause();  
        $(".video__player-img").removeClass("video__player-img--active");
        $('.duration__img').removeClass('active');
    }
    video.currentTime = durationControl.value;  
    intervalId = setInterval(updateDuration,1000/60);
}


/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
}


/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
        $('.sound').removeClass('active');
    }else{
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
       soundLevel = video.volume;
       video.volume = 0;
       soundControl.value = 0;
       $('.sound').addClass('active');

    }    
}

/*
    Управление звуком видео
*/
function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
   video.volume 0 .... 1 
   soundControl 0 .... 10
        */
       
   
    video.volume = soundControl.value/10; 
    if(video.volume == 0) {
        $('.sound').addClass('active');
    } else {
        $('.sound').removeClass('active');
    }
    console.log('значение volume у видео '+video.volume);
    console.log('значение value у micLevel '+soundControl.value);
    /**У ползунка изначально задано минимальное значение 0 и максимальное 10 чтоб дать нам 10 положений
     * регулировки
     */
}


