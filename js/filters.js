'use strict';

(function () {
  var filters = document.querySelector('.filters');
  var filterButtons = filters.querySelectorAll('label');
  var filterInputs = filters.querySelectorAll('input');


  // Получаем популярные фотки, по убыванию
  var getPopularFotos = function (first, second) {
    if (first.likes < second.likes) {
      return 1;
    } else if (first.likes > second.likes) {
      return -1;
    }
    return 0;
  };

  // Получаем обсуждаемые фотки, по убыванию
  var getDiscussFotos = function (first, second) {
    if (first.comments.length < second.comments.length) {
      return 1;
    } else if (first.comments.length > second.comments.length) {
      return -1;
    }
    return 0;
  };

  // Получаем случайные фотки
  var getRandomFotos = function () {
    return 0.5 - Math.random();
  };
  var setFilter = function (evt) {
    filterInputs.forEach(function (item) {
      item.removeAttribute('checked');
    });
    var checked = evt.target.getAttribute('for');
    filters.querySelector('#' + checked).setAttribute('checked', '');
    var newPictures = window.pictures.data;
    switch (checked) {
      case 'filter-popular':
        newPictures.sort(getPopularFotos);
        window.pictures.fillPicturesOnPage(newPictures);
        break;

      case 'filter-discussed':
        newPictures.sort(getDiscussFotos);
        window.pictures.fillPicturesOnPage(newPictures);
        break;

      case 'filter-random':
        newPictures.sort(getRandomFotos);
        window.pictures.fillPicturesOnPage(newPictures);
        break;

      case 'filter-recommend':
        window.pictures.fillPicturesOnPage(window.pictures.oldData);
        break;
    }
  };

  filterButtons.forEach(function (item) {
    item.setAttribute('tabindex', 0);
    item.addEventListener('click', function (evt) {
      window.debounce(function () {
        setFilter(evt);
      });
    });
  });
})();
