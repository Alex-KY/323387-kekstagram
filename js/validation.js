'use strict';

(function () {
  // Проверка формы на валидность
  // Окна ввода с клавиатуры
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadHashtag = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');

  uploadHashtag.addEventListener('change', function () {
    var message = [];
    var hashtags = uploadHashtag.value;

    var hashtag = hashtags.split(' ');
    for (var i = 0; i < hashtag.length; i++) {
      if (hashtag[i].slice(0, 1) !== '#') {
        message.push('Хэш-теги должны начинаться с решётки');
        break;
      }
    }

    for (i = 0; i < hashtag.length; i++) {
      if (hashtag[i].slice(1, hashtag[i].length).indexOf('#') >= 0) {
        message.push('Хэш-теги должны разделяться пробелами');
        break;
      }
    }

    for (i = 0; i < hashtag.length; i++) {
      var count = 0;
      for (var k = 0; k < hashtag.length; k++) {
        if (hashtag[k].toLowerCase() === hashtag[i].toLowerCase()) {
          count++;
        }
      }
      if (count > 1) {
        message.push('Один и тот же хэш-тег не может быть использован дважды');
        break;
      }
    }

    if (hashtag.length > 5) {
      message.push('Хэш-тегов не должно быть больше 5');
    }

    var reg = /[#a-zA-Zа-яА-Я0-9]/;
    for (i = 0; i < hashtag.length; i++) {
      if (!reg.test(hashtag[i])) {
        message.push('Введены недопустимые символы');
        break;
      }
    }

    for (i = 0; i < hashtag.length; i++) {
      if (hashtag[i].length > 20) {
        message.push('Максимальная длина одного хэш-тега 20 символов');
        break;
      }
    }

    var getMessage = function () {
      var templateMessage = '';
      message.forEach(function (item, index) {
        templateMessage += '[Ошибка №' + (index + 1) + '] ' + item + '. ';
      });
      return templateMessage;
    };

    if (message.length > 0) {
      uploadHashtag.setCustomValidity(getMessage());
      uploadHashtag.style.outline = '2px solid red';
    } else {
      uploadHashtag.setCustomValidity('');
      uploadHashtag.style.outline = 'none';
    }

    window.console.warn(message);
  });

  uploadDescription.addEventListener('change', function () {
    if (uploadDescription.value.length > 140) {
      uploadDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      uploadDescription.style.outline = '2px solid red';
    } else {
      uploadDescription.setCustomValidity('');
      uploadDescription.style.outline = 'none';
    }

  });
})();
