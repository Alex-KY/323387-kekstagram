'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS = 200;
  var TIMEOUT = 10000;

  var load = function (url, form, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    window.backend.xhr = xhr;

    xhr.addEventListener('load', function () {
      if (onSuccess) {
        if (xhr.status === SUCCESS) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
    });

    xhr.open(method, url);
    xhr.send(form);
  };

  window.backend = {
    loadPictures: function (onSuccess, onError) {
      return load(URL + '/data', '', 'GET', onSuccess, onError);
    },
    uploadPictures: function (form, onError) {
      return load(URL, form, 'POST', '', onError);
    },
    xhr: ''
  };

})();
