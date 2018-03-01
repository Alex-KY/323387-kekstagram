'use strict';

(function () {

  // Инициирование наполнения шаблона из полученных данных с сервера
  var filters = document.querySelector('.filters');
  var saveNetData = function (data) {
    window.pictures.data = data;
    filters.classList.remove('filters-inactive');
  };

  // Окно вывода ошибки
  var showMessageBox = function (message) {
    messageBox.parentNode.style.transition = 'all 3s ease-out';
    messageBox.parentNode.classList.remove('hidden');
    messageBox.textContent = message + '. Попробуйте зайти позже или перезагрузить страницу';
    setTimeout(function () {
      messageBox.parentNode.style.transform = 'scale(3)';
      messageBox.parentNode.style.opacity = 0;
      setTimeout(function () {
        messageBox.parentNode.classList.add('hidden');
        messageBox.parentNode.style.transform = 'scale(1)';
        messageBox.parentNode.style.opacity = 1;
        messageBox.textContent = '';
      }, 3000);
    }, 4000);
  };

  // При неудачной попытке запроса на сервер
  var messageBox = document.querySelector('.upload-message-container');
  var onError = function (message) {
    showMessageBox(message);
  };

  window.pictures = {
    data: []
  };

  window.backend.loadPictures(saveNetData, onError);
})();
