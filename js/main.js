
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
  if (target.classList.contains('header__nav-link')){
    hamburgerMenu.classList.remove('active');
    hamburger.classList.toggle('is-active');

  } 
})

//slider product
var productList = document.querySelector('.prod__list');
var arrowPrev = document.querySelector('.prod__prev');
var arrowNext = document.querySelector('.prod__next');

arrowNext.addEventListener('click', function (event) {
  event.preventDefault();
  productList.style.right = '100%';
});
arrowPrev.addEventListener('click', function (event) {
  event.preventDefault();
  productList.style.right = '0';
});

//crew
var crewItemArr = document.querySelectorAll('.crew__item');

for (let i = 0; i < crewItemArr.length; i++) {
  const crewItem = crewItemArr[i];
  
  crewItem.addEventListener('click', function (event) {
    let target = event.target;
    if (target.classList.contains('crew__item-tittle') || target.classList.contains('crew__img')) {
      crewItem.classList.toggle('active');
    };
  });
};

//menu
var menuItems = document.querySelectorAll('.menu__item');

for (let i = 0; i < menuItems.length; i++) {
  const menuItem = menuItems[i];
  menuItem.addEventListener('click', function (event) {
    let target = event.target;
    if (menuItem.classList.contains('active')) {
      menuItem.classList.toggle('active');
      
    } else{
      if (target.classList.contains('menu__item-tittle')) {
        menuItem.classList.toggle('active');
        
      }

    }
  })
  
}

