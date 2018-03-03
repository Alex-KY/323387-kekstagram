'use strict';


(function () {
  var LEFT_ARROW = 37;
  var RIGHT_ARROW = 39;
  var ENTER = 13;


  var galleryOverlay = document.querySelector('.gallery-overlay');
  // Заполнение оверлея данными картинки из массива
  var pictures;
  var fillPictureOverlay = function (index) {
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', pictures[index].url);
    galleryOverlay.querySelector('.likes-count').textContent = pictures[index].likes;
    galleryOverlay.querySelector('.comments-count').textContent = pictures[index].comments.length;
  };

  // Функция получения случайного числа от n до m
  var getRandomNum = function (n, m) {
    return Math.random() * (m) + n;
  };

  var setAnimationOnPictures = function () {
    pictureArray.forEach(function (item) {
      item.style.transition = 'all ' + getRandomNum(0.8, 1.9) + 's ease-out';
      item.style.opacity = 1;
      item.style.transform = 'rotateY(0deg)';
    });
  };

  var indexPicture;
  var onPictureClicked = function (evt, item, index) {
    item.setAttribute('onclick', evt.preventDefault());
    indexPicture = index;
    window.popups.open(galleryOverlay);
    fillPictureOverlay(index);
    document.addEventListener('keydown', window.gallery.onPressLeftRightArrow);
    document.addEventListener('keydown', window.popups.onEscPress);
  };

  var pictureArray = document.querySelectorAll('.picture');
  // Добавляем на каждую превьюшку событие - открытие оверлея
  var initEventsOnPictures = function () {
    pictureArray = document.querySelectorAll('.picture');
    pictureArray.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        onPictureClicked(evt, item, index);
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER) {
          onPictureClicked(evt, item, index);
        }
      });
    });
    setTimeout(setAnimationOnPictures, 500);
  };

  // Добавляем событие на запрос, для заполнения инициирования наполнения галереи
  window.backend.xhr.addEventListener('load', function () {
    window.gallery.fillPicturesOnPage(window.backend.xhr.response);
  });

  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  galleryOverlayClose.addEventListener('click', function () {
    window.popups.close();
    document.removeEventListener('keydown', window.gallery.onPressLeftRightArrow);
    document.removeEventListener('keydown', window.popups.onEscPress);
  });

  var pic = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  // Добавляем отрисованный шаблон на страницу в заданный элемент DOM-а
  var addTemplateOnPage = function () {
    removeTemplateOnPage();
    pic.appendChild(fragment);
  };

  // Удаляем картинки со страницы
  var removeTemplateOnPage = function () {
    pic.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
  };

  var template = document.querySelector('#picture-template');
  window.gallery = {
    fillPicturesOnPage: function (data) {
      // Заполнение шаблона элементами
      fragment = document.createDocumentFragment();
      data.forEach(function (item) {
        var element = template.content.cloneNode(true);
        element.querySelector('img').setAttribute('src', item.url);
        element.querySelector('.picture-likes').textContent = item.likes;
        element.querySelector('.picture-comments').textContent = item.comments.length;
        fragment.appendChild(element);
      });
      pictures = data;
      addTemplateOnPage();
      initEventsOnPictures();
    },
    onPressLeftRightArrow: function (evt) {
      if (evt.keyCode === LEFT_ARROW) {
        indexPicture = indexPicture > 0 ? --indexPicture : pictureArray.length - 1;
        fillPictureOverlay(indexPicture);
      }
      if (evt.keyCode === RIGHT_ARROW) {
        indexPicture = indexPicture < pictures.length - 1 ? ++indexPicture : 0;
        fillPictureOverlay(indexPicture);
      }
    }
  };

})();
