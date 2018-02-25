'use strict';

(function () {
  var uploadControls = document.querySelector('.upload-effect-controls');
  var effectBar = uploadControls.querySelector('.upload-effect-level');
  var effectLine = uploadControls.querySelector('.upload-effect-level-line');
  var effectPin = uploadControls.querySelector('.upload-effect-level-pin');
  var effectVal = uploadControls.querySelector('.upload-effect-level-val');

  // перетаскивание на слайдере эффектов
  effectPin.style.zIndex = 1;
  effectPin.style.cursor = 'pointer';

  // По умолчанию скрываем скролл для эффектов
  effectBar.style.display = 'none';
  // Выставляем значение скролла эффектов на 100%
  window.slider = {
    effectLevel: 100
  };
  effectPin.style.left = window.slider.effectLevel + '%';
  effectVal.style.width = window.slider.effectLevel + '%';

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var fixSlider = function () {

      if (window.slider.effectLevel < 0 || effectPin.offsetLeft < 0) {
        window.slider.effectLevel = 0;
        effectPin.style.left = 0;
        effectVal.style.width = 0;
      }
      if (window.slider.effectLevel > 100 || effectPin.offsetLeft > effectLine.offsetWidth) {
        window.slider.effectLevel = 100;
        effectPin.style.left = effectLine.offsetWidth + 'px';
        effectVal.style.width = effectLine.offsetWidth + 'px';
      }

    };

    var startMinPin = effectBar.offsetLeft + effectLine.offsetLeft;
    var startCoord = {
      x: (evt.clientX).toFixed(0)
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: (startCoord.x - moveEvt.clientX).toFixed(0)
      };

      var r = startCoord.x - startMinPin - shift.x;
      if (r > 0 && r < effectLine.offsetWidth - effectPin.offsetWidth) {
        var effectForce = window.slider.effectLevel * effectLine.offsetWidth / 100;

        if (effectPin.offsetLeft >= 0 && effectPin.offsetLeft <= effectLine.offsetWidth) {
          effectPin.style.left = effectForce - shift.x + 'px';
          effectVal.style.width = effectForce - shift.x + 'px';
        }
      }
    };

    var onMouseUp = function (moveEvt) {
      moveEvt.preventDefault();
      window.slider.effectLevel = (effectPin.style.left).slice(0, effectPin.style.left.length - 2) / effectLine.offsetWidth * 100;
      window.slider.effectLevel = +window.slider.effectLevel.toFixed(0);

      fixSlider();

      window.upload.uploadStyleChange();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
