'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var load = function (url, form, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    window.backend.xhr = xhr;

    if (method === 'GET') {
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s
    } else {
      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

    }
    xhr.open(method, url);
    xhr.send(form);
  };

  window.backend = {
    loadPictures: function (onSuccess, onError) {
      return load(URL + '/data', '', 'GET', onSuccess, onError);
    },
    uploadPictures: function (form, onSuccess) {
      return load(URL, form, 'POST', onSuccess);
    },
    xhr: ''
  };

})();
