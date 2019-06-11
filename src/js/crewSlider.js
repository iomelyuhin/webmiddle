(function () {
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



})();