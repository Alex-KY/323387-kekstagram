'use strict';

(function () {

  var template = document.querySelector('#picture-template');
  var pic = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.filters');

  // Заполнение элемента шаблона посредством скачивания данных с сервера
  var saveNetData = function (data) {
    window.pictures.data = data;
    window.pictures.fillPicturesOnPage(data);
    filters.classList.remove('filters-inactive');
    window.gallery.initEventsOnPictures();
  };

  var onError = function (message) {
    window.console.error(message);
  };

  // Добавляем отрисованный шаблон на страницу в заданный элемент DOM-а
  var addTemplateOnPage = function () {
    pic.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    pic.appendChild(fragment);
  };

  window.pictures = {
    data: window.pictures.data,
    oldData: window.pictures.data.map(function (picture) {
      return picture;
    }),
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
      addTemplateOnPage();
      window.gallery.initEventsOnPictures();
    }
  };

  window.backend.load('', 'get', saveNetData, onError);
})();
