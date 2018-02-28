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
  var setFilter = function () {
    filterInputs.forEach(function (item) {
      item.removeAttribute('checked');
    });
    var checked = window.filter.target.getAttribute('for');
    filters.querySelector('#' + checked).setAttribute('checked', '');
    var a = window.pictures.map(function (picture) {
      return picture;
    });
    switch (checked) {
      case 'filter-popular':
        a.sort(getPopularFotos);
        window.fillPicturesOnPage(a);
        break;

      case 'filter-discussed':
        a.sort(getDiscussFotos);
        window.fillPicturesOnPage(a);
        break;

      case 'filter-random':
        a.sort(getRandomFotos);
        window.fillPicturesOnPage(a);
        break;

      case 'filter-recommend':
        window.fillPicturesOnPage(a);
        break;
    }
  };

  filterButtons.forEach(function (item) {
    item.setAttribute('tabindex', 0);
    item.addEventListener('click', function (evt) {
      window.debounce(setFilter);
      window.filter = evt;
    });
  });
})();
