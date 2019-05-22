//Task 1

var newDiv = document.createElement('div');
newDiv.textContent = 'Текст в новом элементе';
document.body.appendChild(newDiv);

//Task 2
var newElem = document.createElement('div');
newElem.setAttribute('class', 'inner');
newElem.textContent = 'Этот элемент тоже создан при помощи DOM API';
newDiv.appendChild(newElem);

//Task 3
newElem.style.color = 'red';

//Task 4
newDiv.addEventListener('click', function(){
    console.log('Этот текст говорит о том, что я всё сделал правильно');
});

//Task 5
var link = document.createElement('a');
link.textContent = 'Ссылка на Loftschool';
document.body.appendChild(link);

var href = 'https://loftschool.com';
link.href = href;

link.addEventListener('click', function(event){
    console.log('Я кликнул на ссылку ' +  href);
    event.preventDefault();
});

//Task 6
var input = document.createElement('input');
var button = document.createElement('button');
var form = document.createElement('form');
document.body.appendChild(form);
form.id = 'myForm';
form.appendChild(input);
form.appendChild(button);

button.name = 'btn';
button.textContent = 'Нажми меня!';
input.name = 'input-name';

var form = document.querySelector('input');

button.addEventListener('click', function(event){
  event.preventDefault();
  var result = input.value;
  console.log(result);
});
