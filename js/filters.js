'use strict';

(function () {
  var ENTER = 13;

  // Получаем популярные фотки, по убыванию
  var comparePopularGallery = function (first, second) {
    if (first.likes < second.likes) {
      return 1;
    } else if (first.likes > second.likes) {
      return -1;
    }
    return 0;
  };

  // Получаем обсуждаемые фотки, по убыванию
  var compareDiscussGallery = function (first, second) {
    if (first.comments.length < second.comments.length) {
      return 1;
    } else if (first.comments.length > second.comments.length) {
      return -1;
    }
    return 0;
  };

  // Получаем случайные фотки
  var compareRandomGallery = function () {
    return 0.5 - Math.random();
  };

  // Функция для установки статуса checked для инпутов
  var filters = document.querySelector('.filters');
  var filterInputs = filters.querySelectorAll('input');
  var setCheck = function (evt) {
    filterInputs.forEach(function (item) {
      item.removeAttribute('checked');
    });
    var checked = evt.target.getAttribute('for');
    filters.querySelector('#' + checked).setAttribute('checked', '');
  };

  // Функция для применения нужного фильтра
  var setFilter = function (evt) {
    var newPictures = window.pictures.data.map(function (picture) {
      return picture;
    });
    var checked = evt.target.getAttribute('for');
    switch (checked) {
      case 'filter-popular':
        newPictures.sort(comparePopularGallery);
        break;

      case 'filter-discussed':
        newPictures.sort(compareDiscussGallery);
        break;

      case 'filter-random':
        newPictures.sort(compareRandomGallery);
        break;

      default: // 'filter-recommend': применяется фильтр по порядку загрузки с сервера
        newPictures = window.pictures.data;
        break;
    }
    window.gallery.fillPicturesOnPage(newPictures);
  };

  // На каждый label в панели эффектов навешиваем событие
  var filterButtons = filters.querySelectorAll('label');
  filterButtons.forEach(function (item) {
    item.setAttribute('tabindex', 0);
    item.addEventListener('click', function (evt) {
      window.utils.debounce(function () {
        setCheck(evt);
        setFilter(evt);
      });
    });
    item.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        window.utils.debounce(function () {
          setCheck(evt);
          setFilter(evt);
        });
      }
    });
  });
  // Убираем мешающиеся наведения
  filterInputs.forEach(function (item) {
    item.setAttribute('tabindex', -1);
  });

})();
