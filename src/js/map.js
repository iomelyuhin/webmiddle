(function () {
  ymaps.ready(init); // инициализируем карту

  const placemarks = [ //создаём массив с объектами для карты
    {
      latitude: 55.74295457,
      longitude: 37.58050800,
      hintContent: 'Ружейный переулок, д.3',
      balloonContent: 'Ружейный переулок, д.3'
    },
    {
      latitude: 55.75884113,
      longitude: 37.58385854,
      hintContent: 'Кудринская площадь',
      balloonContent: 'Кудринская площадь'
    },
    {
      latitude: 55.75802524,
      longitude: 37.61579158,
      hintContent: 'Театральный пр-д., д.1',
      balloonContent: 'Театральный пр-д., д.1'
    },
    {
      latitude: 55.74961757,
      longitude: 37.60622650,
      hintContent: 'ул. Знаменка, д.11',
      balloonContent: 'ул. Знаменка, д.11'
    }
  ],

  geoObjects = [];

  function init() { //создаем функцию карт
    const map = new ymaps.Map('map', {
      center: [55.75138009, 37.58385543], //координаты центра карты
      zoom: 14, //коэффицент масштабирования
      controls: ['zoomControl'], //подключаем нужные элементы управления
      behaviors: [ //поведение по умолчанию, если пустой, то ничего не работает 
        'drag' //перетаскивание по кнопке мыши
      ]
    });

    for (let i = 0; i < placemarks.length; i++) { //перебираем массив, подставляя переменные
      geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], { //создаем флаг, координаты центра
        hintContent: placemarks[i].hintContent, //создаём хинт
        balloonContent: placemarks[i].balloonContent //создаём балун
      },
        {
          iconLayout: "default#image", //будем редактировать стандарную иконку
          iconImageHref: "img/icon/flag.png", //путь к иконке
          iconImageSize: [46, 57], //ширина, высота иконки
          iconImageOffset: [-23, -57] //смещение наполовину влево и на 100% вверх
          //iconImageClipRect: [[450,28], [470,38]] //для спрайта задаём координаты левого верхнего и правого нижнего углов.
        }
      );

    }
    
    const clusterer = new ymaps.Clusterer({ //кластеризация близлежащих меток 
      
    });
    
    map.geoObjects.add(clusterer); //добавляем кластер
    //map.geoObjects.add(placemark); //добавляем флаг на карту
    clusterer.add(geoObjects);

  }



})();
