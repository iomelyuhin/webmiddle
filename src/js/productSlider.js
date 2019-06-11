(function () {
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



})();