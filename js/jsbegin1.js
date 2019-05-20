console.log('');
console.log('Types of data #1');

var name = 'Ilya';
console.log(name);
name = 'Liza1';
console.log(name);

console.log('');
console.log('Operator IF');

if (name == 'Liza') {
  console.log(name);
} else {
  console.log('You are not Liza!')
}

console.log('');
console.log('Operator FOR');

for (var i = 0; i < 10; i++) {

  console.log(i);
}

console.log('');
console.log('FUNCTION');

function sum(p1, p2, p3) {
  var result = p1 + p2 + p3;
  return result;
}

var fn = sum(10, 20, 30);
console.log(fn);

///////////массивы
console.log('');
console.log('Massive #1');

var hi = [
  'Привет',
  'Loftschool!'
];
hi.push('Я изучаю');
hi.push('JavaScript');

console.log(hi.length);

for (var i = 0; i < hi.length; i++) {
  console.log(hi[i]);
};

///////massive #2
console.log('');
console.log('Massive #2');
var num = [
  12, 321, 323, 32, 64, 232, 754, 23, 12
];

for (i = 0; i < num.length; i++) {
  if (num[i] > 100) {
    console.log(num[i]);
  };
};
////////////////////////////////////////////////
console.log('');
console.log('Massive #3');

var form = {
  name : 'Ilya',
  lastName : 'Omelyukhin',
  age : 29
};

console.log(form.name);
console.log(form.lastName);
console.log(form.age);

form.city = 'Kirov';
console.log(form.city);
/////////////////////////////////////////
console.log('');
console.log('Massive #4');

function hello(human) {
  var man = 'Привет, меня зовут ' + human.name + ' '  + human.lastName + ' и мне ' + human.age + ' лет';
  return man;
};

var human = form;

console.log(hello(human));