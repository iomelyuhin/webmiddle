(function () {
  //Overlay create
  //const openButton = document.querySelector(".openOverlay");
  const template = document.querySelector("#overlayTemplate").innerHTML;
  const overlay = createOverlay(template);

  //openButton.addEventListener("click", function() {
  //  overlay.open();
  //  overlay.setContent("Спасибо, данные сохранены");
  //});

  function createOverlay(template) {
    let fragment = document.createElement('div');

    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector(".modal");
    const contentElement = fragment.querySelector(".modal__text");
    const closeElement = fragment.querySelector(".close__btn");

    fragment = null;

    overlayElement.addEventListener("click", e => {
      e.preventDefault();
      if (e.target === overlayElement) {
        closeElement.click();
      }
    });
    closeElement.addEventListener("click", e => {
      e.preventDefault();
      document.body.removeChild(overlayElement);
      document.body.classList.remove('locked');

    });

    return {
      open() {
        document.body.appendChild(overlayElement);
        document.body.classList.add('locked');
      },
      close() {
        closeElement.click();
      },
      setContent(content) {
        contentElement.innerHTML = content;
      }
    };
  }



  //form data
  const myForm = document.querySelector('#myForm');
  const sendButton = document.querySelector('#sendButton');

  sendButton.addEventListener('click', function (e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("name", myForm.elements.name.value);
    formData.append("phone", myForm.elements.phone.value);
    formData.append("comment", myForm.elements.comment.value);
    formData.append("to", "i.omelyuhin@gmail.com");

    let url = "https://webdev-api.loftschool.com/sendmail";

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(formData);

    xhr.addEventListener('load', function () {
      console.log(xhr);

      if (xhr.status >= 400) {
        overlay.open();
        overlay.setContent('Что-то пошло не так');

      } else {
        overlay.open();
        overlay.setContent(xhr.response.message);
      }

    });
  });



})();