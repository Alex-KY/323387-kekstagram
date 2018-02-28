'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.backend = {
    load: function (form, method, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      if (method === 'get') {
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

        xhr.open('GET', URL + '/data');

      } else {

        xhr.addEventListener('load', function () {
          onSuccess(xhr.response);
        });

        xhr.open('POST', URL);

      }
      xhr.send(form);
    }
  };

})();
