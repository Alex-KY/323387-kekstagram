'use strict';

(function () {

  var messageBox = document.querySelector('.upload-message-container');

  window.output = {
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
        }, 3000);
      }, 4000);
    }
  };

})();
