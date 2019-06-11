(function () {
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



})();