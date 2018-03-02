'use strict';

(function () {

  // Инициирование наполнения шаблона из полученных данных с сервера
  var filters = document.querySelector('.filters');
  var saveNetData = function (data) {
    window.pictures.data = data;
    filters.classList.remove('filters-inactive');
  };

  var onError = function (message) {
    window.output.error(message);
  };

  window.pictures = {
    data: []
  };

  window.backend.loadPictures(saveNetData, onError);
})();
