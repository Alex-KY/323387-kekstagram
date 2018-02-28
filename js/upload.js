'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
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

  var uploadPreviewImg = document.querySelector('.upload-form-preview img');

  // Уменьшаем изображение по клику на "-"
  var resizeDec = document.querySelector('.upload-resize-controls-button-dec');
  resizeDec.addEventListener('click', function () {
    if (value >= 50) {
      value -= 25;
      resizeValue.setAttribute('value', value + '%');
      uploadPreviewImg.style.transform = 'scale(' + value / 100 + ')';
    }
  });

  // Уменьшаем изображение по клику на "+"
  var resizeInc = document.querySelector('.upload-resize-controls-button-inc');
  resizeInc.addEventListener('click', function () {
    if (value <= 75) {
      value += 25;
      resizeValue.setAttribute('value', value + '%');
      uploadPreviewImg.style.transform = 'scale(' + value / 100 + ')';
    }
  });

  // Убираем все чекеды
  var removeCheck = function () {
    inputArray.forEach(function (item) {
      item.removeAttribute('checked');
    });
    // Или можно точечно бахнуть чекед:
    // g.querySelector('input[checked]').removeAttribute('checked');
  };

  // Добавляем на каждую превьюшку эффектов событие - применить эффект
  effectLabels.forEach(function (item, index) {
    item.setAttribute('tabindex', 0);

    item.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
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
    window.popups.openPopup(uploadOverlay);
    document.addEventListener('keydown', window.popups.onPopupEscPress);
  });

  uploadClose.addEventListener('click', function () {
    window.popups.closePopup();
    document.removeEventListener('keydown', window.popups.onPopupEscPress);
  });

  var uploadSetStyle = function () {
    var style = uploadPreviewImg.style;
    // Применяем нужные эффекты в нужном количестве
    var effect = uploadControls.querySelector('input[checked]').getAttribute('value');
    switch (effect) {
      case 'chrome':
        style.filter = 'grayscale(' + window.slider.effectLevel / 100 + ')';
        break;

      case 'sepia':
        style.filter = 'sepia(' + window.slider.effectLevel / 100 + ')';
        break;

      case 'marvin':
        style.filter = 'invert(' + window.slider.effectLevel + '%)';
        break;

      case 'phobos':
        style.filter = 'blur(' + window.slider.effectLevel * 3 / 100 + 'px)';
        break;

      case 'heat':
        style.filter = 'brightness(' + window.slider.effectLevel * 3 / 100 + ')';
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

  window.upload = {
    uploadStyleChange: function (index) {
      if (index || index === 0) {
        removeCheck();
        // добавляем checked для нужного чекбокса
        inputArray[index].setAttribute('checked', '');
        // "Обнуляем" значения до стоковых
        window.slider.effectLevel = 100;
        effectPin.style.left = 100 + '%';
        effectVal.style.width = 100 + '%';
      }
      // открываем скролл эффектов
      effectBar.style.display = 'block';
      uploadSetStyle();
    }
  };
  var form = document.querySelector('#upload-select-image');
  var uploadFile = document.querySelector('.upload-image .upload-file');
  form.addEventListener('submit', function (evt) {
    window.backend.uploadForm(URL, new FormData(form), function (response) {
      uploadFile.style.display = 'none';
      window.console.warn(response);
    });
    evt.preventDefault();
    window.popups.closePopup();
    document.removeEventListener('keydown', window.popups.onPopupEscPress);
  });
})();
