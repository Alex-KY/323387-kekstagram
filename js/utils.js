'use strict';

(function () {

  var messageBox = document.querySelector('.upload-message-container');
  var timerID;
  var TIME_DEBOUNCE = 500;
  var TIME_MESSAGE_VISIBLE = 4000;
  var TIME_MESSAGE_BOX_ANIMATION = 3000;

  window.utils = {
    error: function (message) {
      messageBox.parentNode.style.transition = 'all 3s ease-out';
      messageBox.parentNode.classList.remove('hidden');
      messageBox.textContent = message + '. Попробуйте зайти позже или перезагрузить страницу';
      setTimeout(function () {
        messageBox.parentNode.style.transform = 'scale(3)';
        messageBox.parentNode.style.opacity = 0;
        setTimeout(function () {
          messageBox.parentNode.classList.add('hidden');
          messageBox.parentNode.style.transform = 'scale(1)';
          messageBox.parentNode.style.opacity = 1;
          messageBox.textContent = '';
        }, TIME_MESSAGE_BOX_ANIMATION);
      }, TIME_MESSAGE_VISIBLE);
    },
    debounce: function (action) {
      window.clearTimeout(timerID);
      timerID = window.setTimeout(action, TIME_DEBOUNCE);
    }
  };

})();
