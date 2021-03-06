'use strict';

(function () {
  var ENTER = 13;
  var RESIZE_MIN = 25;
  var RESIZE_MAX = 100;
  var RESIZE_STEP = 25;
  var SLIDER_MAX = 100;
  var EFFECT_MAX_PHOBOS = 3;
  var EFFECT_MAX_HEAT = 3;
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadControls = document.querySelector('.upload-effect-controls');
  var effectLabels = uploadControls.querySelectorAll('.upload-effect-label');
  var inputArray = uploadControls.querySelectorAll('input[type = "radio"]');
  var effectBar = uploadControls.querySelector('.upload-effect-level');
  var effectLine = uploadControls.querySelector('.upload-effect-level-line');
  var effectPin = uploadControls.querySelector('.upload-effect-level-pin');
  var effectVal = uploadControls.querySelector('.upload-effect-level-val');

  var resizeValue = document.querySelector('.upload-resize-controls-value');
  resizeValue.setAttribute('value', '100%');
  var value = resizeValue.getAttribute('value');
  value = +value.slice(0, value.length - 1);

  // Уменьшаем изображение по клику на "-"
  var resizeDec = document.querySelector('.upload-resize-controls-button-dec');
  resizeDec.addEventListener('click', function () {
    if (value > RESIZE_MIN) {
      value -= RESIZE_STEP;
      window.upload.resizePreviewImg(value);
    }
  });

  // Уменьшаем изображение по клику на "+"
  var resizeInc = document.querySelector('.upload-resize-controls-button-inc');
  resizeInc.addEventListener('click', function () {
    if (value < RESIZE_MAX) {
      value += RESIZE_STEP;
      window.upload.resizePreviewImg(value);
    }
  });

  // Убираем все чекеды
  var removeCheck = function () {
    inputArray.forEach(function (item) {
      item.removeAttribute('checked');
    });
  };

  // Добавляем на каждую превьюшку эффектов событие - применить эффект
  effectLabels.forEach(function (item, index) {
    item.setAttribute('tabindex', 0);

    item.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        window.upload.uploadStyleChange(index);
      }
    });

    item.addEventListener('click', function () {
      window.upload.uploadStyleChange(index);
    });

  });

  // Открытие и закрытие окна upload
  var uploadOpen = document.querySelector('#upload-file');
  var uploadClose = uploadOverlay.querySelector('.upload-form-cancel');

  uploadOpen.addEventListener('change', function () {
    window.popups.open(uploadOverlay);
    document.addEventListener('keydown', window.popups.onEscPress);
  });

  uploadClose.addEventListener('click', function () {
    window.popups.close();
    document.removeEventListener('keydown', window.popups.onEscPress);
  });

  var uploadSetStyle = function () {
    var style = uploadPreviewImg.style;
    // Применяем нужные эффекты в нужном количестве
    var effect = uploadControls.querySelector('input[checked]').getAttribute('value');
    switch (effect) {
      case 'chrome':
        style.filter = 'grayscale(' + window.slider.effectLevel / SLIDER_MAX + ')';
        break;

      case 'sepia':
        style.filter = 'sepia(' + window.slider.effectLevel / SLIDER_MAX + ')';
        break;

      case 'marvin':
        style.filter = 'invert(' + window.slider.effectLevel + '%)';
        break;

      case 'phobos':
        style.filter = 'blur(' + window.slider.effectLevel * EFFECT_MAX_PHOBOS / SLIDER_MAX + 'px)';
        break;

      case 'heat':
        style.filter = 'brightness(' + window.slider.effectLevel * EFFECT_MAX_HEAT / SLIDER_MAX + ')';
        break;

      default:
        effectBar.style.display = 'none';
        uploadPreviewImg.style.filter = 'none';
    }
  };

  effectLine.addEventListener('mousedown', function () {
    var onMouseUp = function () {
      uploadSetStyle();
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mouseup', onMouseUp);
  });

  var uploadPreviewImg = document.querySelector('.upload-form-preview img');

  window.upload = {
    uploadStyleChange: function (index) {
      if (index || index === 0) {
        removeCheck();
        // добавляем checked для нужного чекбокса
        inputArray[index].setAttribute('checked', '');
        // "Обнуляем" значения до стоковых
        window.slider.effectLevel = SLIDER_MAX;
        effectPin.style.left = SLIDER_MAX + '%';
        effectVal.style.width = SLIDER_MAX + '%';
      }
      // открываем скролл эффектов
      effectBar.style.display = 'block';
      uploadSetStyle();
    },
    resizePreviewImg: function (newValue) {
      resizeValue.setAttribute('value', newValue + '%');
      uploadPreviewImg.style.transform = 'scale(' + newValue / SLIDER_MAX + ')';
    }
  };

  var onError = function (message) {
    window.utils.error(message);
  };

  var form = document.querySelector('#upload-select-image');
  form.addEventListener('submit', function (evt) {
    window.backend.uploadPictures(new FormData(form), onError);
    evt.preventDefault();
    window.popups.close();
    document.removeEventListener('keydown', window.popups.onEscPress);
  });
})();
