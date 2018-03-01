'use strict';

(function () {
  // Проверка формы на валидность
  // Окна ввода с клавиатуры
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadHashtag = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');

  uploadHashtag.addEventListener('change', function () {
    var message;
    var hashtags = uploadHashtag.value;

    var hashtagsArray = hashtags.split(' ');

    var lowCaseHashtagsArray = hashtagsArray.map(function (hashtag) {
      return hashtag.toLowerCase();
    });

    for (var i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i].slice(0, 1) !== '#') {
        message = 'Хэш-теги должны начинаться с решётки';
        break;
      }
      if (i > 0) {
        var downSteps = lowCaseHashtagsArray.lastIndexOf(lowCaseHashtagsArray[i], i - 1);
        var upSteps = lowCaseHashtagsArray.indexOf(lowCaseHashtagsArray[i], i + 1);
        if (downSteps > -1 || upSteps > -1) {
          message = 'Один и тот же хэш-тег не может быть использован дважды';
          break;
        }
      }
      if (hashtagsArray[i].slice(1, hashtagsArray[i].length).indexOf('#') >= 0) {
        message = 'Хэш-теги должны разделяться пробелами';
        break;
      }
      var reg = /[^#А-Яа-яA-Za-z0-9]/;
      if (reg.test(hashtagsArray[i])) {
        message = 'Введены недопустимые символы';
        break;
      }
      if (hashtagsArray[i].length > 20) {
        message = 'Максимальная длина одного хэш-тега 20 символов';
        break;
      }
    }

    if (hashtagsArray.length > 5) {
      message = 'Хэш-тегов не должно быть больше 5';
    }

    if (message) {
      uploadHashtag.setCustomValidity('[ Ошибка ] ' + message);
      uploadHashtag.style.outline = '2px solid red';
    } else {
      uploadHashtag.setCustomValidity('');
      uploadHashtag.style.outline = 'none';
    }

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
