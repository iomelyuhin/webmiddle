(function () {
  //generate dots

  var generateDots = function () {
    $('.section').each(function (index) {
      var dot = $('<li>', {
        attr: {
          class: 'onepage__item',
          'data-scroll-to': index
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
    }, 1000 + 300);
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
      swipe: function (event, direction) {
        const nextOrPrev = direction === "up" ? "next" : "prev";
        scrollToSection(nextOrPrev);
      }
    });
  };


})();