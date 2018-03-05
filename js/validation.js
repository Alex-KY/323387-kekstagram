'use strict';

(function () {
  var ENTER = 13;
  var LENGTH_MAX_DESCRIPTION = 140;
  var LENGTH_MAX_HASHTAG = 20;
  var LENGTH_MAX_ARR_HASHTAGS = 5;

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

    for (var i = 0; i < hashtagsArray.length && hashtagsArray.length <= 5; i++) {
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
      if (hashtagsArray[i].length > LENGTH_MAX_HASHTAG) {
        message = 'Максимальная длина одного хэш-тега ' + LENGTH_MAX_HASHTAG + ' символов';
        break;
      }
    }

    if (hashtagsArray.length > LENGTH_MAX_ARR_HASHTAGS) {
      message = 'Хэш-тегов не должно быть больше ' + LENGTH_MAX_ARR_HASHTAGS;
    }

    window.validation.setError(message, uploadHashtag);

  });

  uploadHashtag.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      evt.preventDefault();
    } else {
      window.validation.setError('', uploadHashtag);
    }
  });

  uploadDescription.addEventListener('change', function () {
    var message = '';
    if (uploadDescription.value.length > LENGTH_MAX_DESCRIPTION) {
      message = 'Длина комментария не может составлять больше ' + LENGTH_MAX_DESCRIPTION + ' символов';
    }
    window.validation.setError(message, uploadDescription);

  });

  uploadDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      evt.preventDefault();
    } else {
      window.validation.setError('', uploadDescription);
    }
  });

  window.validation = {
    setError: function (message, element) {
      if (message) {
        element.setCustomValidity('[ Ошибка ] ' + message);
        element.style.outline = '2px solid red';
      } else {
        element.setCustomValidity('');
        element.style.outline = 'none';
      }
    }
  };
})();
