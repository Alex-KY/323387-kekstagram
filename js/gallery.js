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

  var indexPicture;
  var addEventsOnPictures = function (evt, item, index) {
    item.setAttribute('onclick', evt.preventDefault());
    indexPicture = index;
    window.popups.openPopup(galleryOverlay);
    fillPictureOverlay(index);
    document.addEventListener('keydown', pressLeftRightArrow);
    document.addEventListener('keydown', window.popups.onPopupEscPress);
  };

  var pictureArray = document.querySelectorAll('.picture');
  // Добавляем на каждую превьюшку событие - открытие оверлея
  var initEventsOnPictures = function () {
    pictureArray = document.querySelectorAll('.picture');
    pictureArray.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        addEventsOnPictures(evt, item, index);
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER) {
          addEventsOnPictures(evt, item, index);
        }
      });
    });
  };

  // Добавляем событие на запрос, для заполнения инициирования наполнения галереи
  window.backend.xhr.addEventListener('load', function () {
    window.gallery.fillPicturesOnPage(window.backend.xhr.response);
  });

  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  galleryOverlayClose.addEventListener('click', function () {
    window.popups.closePopup();
    document.removeEventListener('keydown', window.popups.onPopupEscPress);
  });

  var pic = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  // Добавляем отрисованный шаблон на страницу в заданный элемент DOM-а
  var addTemplateOnPage = function () {
    pic.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    pic.appendChild(fragment);
  };

  var pressLeftRightArrow = function (evt) {
    if (evt.keyCode === LEFT_ARROW) {
      if (indexPicture > 0) {
        fillPictureOverlay(--indexPicture);
      } else {
        indexPicture = pictureArray.length - 1;
        fillPictureOverlay(indexPicture);
      }
    }
    if (evt.keyCode === RIGHT_ARROW) {
      if (indexPicture < pictures.length - 1) {
        fillPictureOverlay(++indexPicture);
      } else {
        indexPicture = 0;
        fillPictureOverlay(indexPicture);
      }
    }
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
    }
  };

})();
