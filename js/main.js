var menu_btn = document.querySelectorAll('.menu__item');
var menu_btn_active = document.querySelector('.menu__item .active');
var menu_ttl = document.querySelector('.menu__tittle');

menu_btn[0].addEventListener('click', function () {
  menu_btn[0].classList.add('active');
  menu_btn[1].classList.remove('active');
  menu_btn[2].classList.remove('active');
});
menu_btn[1].addEventListener('click', function () {
  menu_btn[1].classList.add('active');
  menu_btn[0].classList.remove('active');
  menu_btn[2].classList.remove('active');
});
menu_btn[2].addEventListener('click', function () {
  menu_btn[2].classList.add('active');
  menu_btn[1].classList.remove('active');
  menu_btn[0].classList.remove('active');
});