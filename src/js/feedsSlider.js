(function () {
  var feedItems = document.querySelectorAll('.feed__item');
  var feedAvatars = document.querySelectorAll('.feed__ava-item');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide, 3000);

  function nextSlide() {
    feedItems[currentSlide].classList.remove('active');
    feedAvatars[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % feedItems.length;
    feedItems[currentSlide].classList.add('active');
    feedAvatars[currentSlide].classList.add('active');
  }

  for (let i = 0; i < feedAvatars.length; i++) {
    const feedAvatar = feedAvatars[i];
    const feedItem = feedItems[i];

    feedAvatar.addEventListener('click', function (e) {
      e.preventDefault();
      if (feedAvatar.classList.contains('active') && feedItem.classList.contains('active')) {
        feedAvatar.classList.remove('active');
        feedItem.classList.remove('active');
      } else {
        for (let i = 0; i < feedAvatars.length; i++) {
          const feedAvatar = feedAvatars[i];
          const feedItem = feedItems[i];

          feedAvatar.classList.remove('active');
          feedItem.classList.remove('active');
        };
      }
      let target = e.target;
      if (target.classList.contains('feed__ava-item') ||
        target.classList.contains('feed__ava-link') ||
        target.classList.contains('feed__ava-img')) {
        feedAvatar.classList.add('active');
        feedItem.classList.add('active');
        currentSlide = i;
      }

    });
  }



})();