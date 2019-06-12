(function () {
  let video;
  let durationControl;
  let soundControl;
  let intervalId;

  //

  // документ полностью загружен
  $(document).ready(function () {

    video = document.getElementById("player");

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
      playButtons[i].addEventListener('click', playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click', soundOf);

    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('onmousemove', setVideoDuration);
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
  function playStop() {
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused) {
      // запускаем видео
      video.play();
      intervalId = setInterval(updateDuration, 1000 / 60);
      $('.duration__img').addClass('active');
    } else {
      // останавливаем видео
      video.pause();
      clearInterval(intervalId);
      $('.duration__img').removeClass('active');
    }
  }

  function stopInterval() {
    video.pause();
    clearInterval(intervalId);
  }

  /*
      Реализует возможность перемотки нашего видео
  */
  function setVideoDuration() {
    if (video.paused) {
      video.play();
      $(".video__player-img").addClass("video__player-img--active");
      $('.duration__img').addClass('active');
    } else {
      video.pause();
      $(".video__player-img").removeClass("video__player-img--active");
      $('.duration__img').removeClass('active');
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000 / 60);
  }


  /*
    Функция для обновления позиции ползунка продолжительности видео.   
  */
  function updateDuration() {
    durationControl.value = video.currentTime;
  }


  /*
      Управление звуком
  */
 var soundLevel;
  function soundOf() {
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */

    if (video.volume === 0) {
      video.volume = soundLevel;
      soundControl.value = soundLevel * 10;
      $('.sound').removeClass('active');
    } else {
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
  function changeSoundVolume() {
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
   video.volume 0 .... 1 
   soundControl 0 .... 10
        */


    video.volume = soundControl.value / 10;
    if (video.volume == 0) {
      $('.sound').addClass('active');
    } else {
      $('.sound').removeClass('active');
    }
    console.log('значение volume у видео ' + video.volume);
    console.log('значение value у micLevel ' + soundControl.value);
    /**У ползунка изначально задано минимальное значение 0 и максимальное 10 чтоб дать нам 10 положений
     * регулировки
     */
  }



})();