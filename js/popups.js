'use strict';

(function () {
  var ESC = 27;
  var RESIZE_MAX = 100;
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadHashtag = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');
  var uploadResizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var pic = document.querySelector('.pictures');

  var body = document.querySelector('body');
  // Открытое в данный момент окно
  var popup;

  // Удаляем перемещение по элементам заднего фона
  var tabinexSwitch = function () {
    var footerLinks = document.querySelector('footer').querySelectorAll('a');
    var filterLabels = document.querySelector('.filters').querySelectorAll('label');
    var flag = +pic.querySelector('a').getAttribute('tabindex');
    var tabIndex = (flag !== -1) ? -1 : 0;
    pic.querySelectorAll('a').forEach(function (item) {
      item.setAttribute('tabindex', tabIndex);
    });
    footerLinks.forEach(function (item) {
      item.setAttribute('tabindex', tabIndex);
    });
    filterLabels.forEach(function (item) {
      item.setAttribute('tabindex', tabIndex);
    });
  };

  // Если закрываем окно, то какое и что обнуляем
  var close = function () {

    if (popup === uploadOverlay) {
      window.upload.uploadStyleChange(0);
      document.querySelector('#upload-file').value = '';
      uploadHashtag.value = '';
      uploadDescription.value = '';
      uploadResizeValue.setAttribute('value', '100%');
      window.upload.resizePreviewImg(RESIZE_MAX);
      window.validation.setError('', uploadHashtag);
      window.validation.setError('', uploadDescription);
    } else {
      document.removeEventListener('keydown', window.gallery.onPressLeftRightArrow);
    }
    document.removeEventListener('keydown', window.popups.onEscPress);

  };

  window.popups = {

    // Открыть окно
    open: function (winUp) {
      popup = winUp;
      popup.classList.remove('hidden');
      body.style.overflow = 'hidden';
      tabinexSwitch();
    },

    // Закрыть окно
    close: function () {
      popup.classList.add('hidden');
      body.style.overflow = 'auto';
      close();
      tabinexSwitch();
    },

    // Нажатие ESC в открытом окне
    onEscPress: function (evt) {
      if (evt.keyCode === ESC && evt.target !== uploadHashtag && evt.target !== uploadDescription) {
        window.popups.close();
      }
    }
  };

})();
