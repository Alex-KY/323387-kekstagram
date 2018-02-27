'use strict';


(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var pictureArray = document.querySelectorAll('.picture');

  var indexPicture;

  // Заполнение оверлея данными картинки из массива
  var fillPictureOverlay = function (index) {
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', window.pictures[index].url);
    galleryOverlay.querySelector('.likes-count').textContent = window.pictures[index].likes;
    galleryOverlay.querySelector('.comments-count').textContent = window.pictures[index].comments.length;
  };

  var addEventsOnPictures = function (evt, item, index) {
    item.setAttribute('onclick', evt.preventDefault());
    indexPicture = index;
    window.popups.openPopup(galleryOverlay);
    fillPictureOverlay(index);
    document.addEventListener('keydown', window.gallery.pressLeftRightArrow);
    document.addEventListener('keydown', window.popups.onPopupEscPress);
  };

  // Добавляем на каждую превьюшку событие - открытие оверлея
  var initAddEvents = function () {
    pictureArray = document.querySelectorAll('.picture');
    pictureArray.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        addEventsOnPictures(evt, item, index);
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          addEventsOnPictures(evt, item, index);
        }

      });

    });
  };

  galleryOverlayClose.addEventListener('click', function () {
    window.popups.closePopup();
    document.removeEventListener('keydown', window.popups.onPopupEscPress);
  });
  window.gallery = {
    pressLeftRightArrow: function (evt) {
      if (evt.keyCode === 37) {
        if (indexPicture > 0) {
          fillPictureOverlay(--indexPicture);
        } else {
          indexPicture = pictureArray.length - 1;
          fillPictureOverlay(indexPicture);
        }
      }
      if (evt.keyCode === 39) {
        if (indexPicture < window.pictures.length - 1) {
          fillPictureOverlay(++indexPicture);
        } else {
          indexPicture = 0;
          fillPictureOverlay(indexPicture);
        }
      }
    },
    initEventsOnPictures: function () {
      initAddEvents();
    }
  };
})();
