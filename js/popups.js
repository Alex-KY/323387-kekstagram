'use strict';

window.ESC = 27;
window.ENTER = 13;
window.LEFT_ARROW = 37;
window.RIGHT_ARROW = 39;

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadHashtag = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');
  var pic = document.querySelector('.pictures');

  var body = document.querySelector('body');
  // Открытое в данный момент окно
  var popup;

  // Удаляем перемещение по элементам заднего фона
  var tabinexSwitch = function () {
    var footerLinks = document.querySelector('footer').querySelectorAll('a');
    var flag = pic.querySelector('a').getAttribute('tabindex');
    if (flag !== -1) {
      pic.querySelectorAll('a').forEach(function (item) {
        item.setAttribute('tabindex', -1);
      });
      footerLinks.forEach(function (item) {
        item.setAttribute('tabindex', -1);
      });
    } else {
      pic.querySelectorAll('a').forEach(function (item) {
        item.setAttribute('tabindex', 0);
      });
      footerLinks.forEach(function (item) {
        item.setAttribute('tabindex', 0);
      });
    }
  };

  // Если закрываем окно, то какое и что обнуляем
  var close = function () {

    if (popup === uploadOverlay) {
      window.upload.uploadStyleChange(0);
      document.querySelector('#upload-file').value = '';
    } else {
      document.removeEventListener('keydown', window.gallery.pressLeftRightArrow);
    }

  };

  // Открыть окно
  window.popups = {
    openPopup: function (winUp) {
      popup = winUp;
      popup.classList.remove('hidden');
      body.style.overflow = 'hidden';
      tabinexSwitch();
    },

    // Закрыть окно
    closePopup: function () {
      popup.classList.add('hidden');
      body.style.overflow = 'auto';
      close();
    },

    // Нажатие ESC в открытом окне
    onPopupEscPress: function (evt) {
      if (evt.keyCode === window.ESC && evt.target !== uploadHashtag && evt.target !== uploadDescription) {
        window.popups.closePopup();
      }
    }
  };
})();