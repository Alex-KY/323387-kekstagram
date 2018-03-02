'use strict';

(function () {
  var LEFT_ARROW = 37;
  var RIGHT_ARROW = 39;
  var effectContainer = document.querySelector('.upload-effect__container');
  var uploadControls = document.querySelector('.upload-effect-controls');
  var effectBar = uploadControls.querySelector('.upload-effect-level');
  var effectLine = uploadControls.querySelector('.upload-effect-level-line');
  var effectPin = uploadControls.querySelector('.upload-effect-level-pin');
  var effectVal = uploadControls.querySelector('.upload-effect-level-val');
  var effectValue = uploadControls.querySelector('.upload-effect-level-value');
  var effect = 100;

  // перетаскивание на слайдере эффектов
  effectPin.style.zIndex = 1;
  effectPin.style.cursor = 'pointer';

  // По умолчанию скрываем скролл для эффектов
  effectBar.style.display = 'none';
  effectBar.setAttribute('tabindex', 0);
  effectLine.style.cursor = 'pointer';
  effectPin.style.left = effect + '%';
  effectVal.style.width = effect + '%';

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: (evt.clientX).toFixed(0)
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: (startCoord.x - moveEvt.clientX).toFixed(0)
      };

      var effectForce = window.slider.effectLevel * effectLine.offsetWidth / 100;

      if (effectForce - shift.x < 0) {
        effectPin.style.left = 0;
        effectVal.style.width = 0;
      } else if (effectForce - shift.x > effectLine.offsetWidth) {
        effectPin.style.left = effectLine.offsetWidth + 'px';
        effectVal.style.width = effectLine.offsetWidth + 'px';
      } else {
        effectPin.style.left = effectForce - shift.x + 'px';
        effectVal.style.width = effectForce - shift.x + 'px';
      }

    };

    var onMouseUp = function (moveEvt) {
      moveEvt.preventDefault();
      window.slider.effectLevel = (effectPin.style.left).slice(0, effectPin.style.left.length - 2) / effectLine.offsetWidth * 100;
      window.slider.effectLevel = +window.slider.effectLevel.toFixed(0);
      effectValue.setAttribute('value', window.slider.effectLevel);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectLine.addEventListener('mouseover', function () {
    effectLine.style.height = effectVal.offsetHeight * 2 + 'px';
  });

  effectLine.addEventListener('mouseout', function () {
    effectLine.style.height = effectVal.offsetHeight / 2 + 'px';
  });

  var onPressLeftRightArrow = function (evt) {
    if (evt.keyCode === LEFT_ARROW) {
      window.slider.effectLevel = window.slider.effectLevel > 0 ? (--window.slider.effectLevel) : 0;
    }
    if (evt.keyCode === RIGHT_ARROW) {
      window.slider.effectLevel = window.slider.effectLevel < 100 ? (++window.slider.effectLevel) : 100;
    }
    var a = window.slider.effectLevel * effectLine.offsetWidth / 100;
    effectPin.style.left = a + 'px';
    effectVal.style.width = a + 'px';
    effectValue.setAttribute('value', window.slider.effectLevel);
    window.upload.uploadStyleChange();
  };

  effectBar.addEventListener('keydown', onPressLeftRightArrow);
  effectLine.addEventListener('click', function (evt) {
    var a = evt.clientX - effectContainer.offsetLeft - (effectContainer.offsetWidth - effectLine.offsetWidth) / 2;
    if (a <= 0) {
      a = 0;
    } else if (a >= effectLine.offsetWidth) {
      a = effectLine.offsetWidth;
    }
    window.slider.effectLevel = +(a / effectLine.offsetWidth * 100).toFixed(0);
    effectPin.style.left = a + 'px';
    effectVal.style.width = a + 'px';
    effectValue.setAttribute('value', window.slider.effectLevel);
    window.upload.uploadStyleChange();
  });

  // Выставляем значение скролла эффектов на 100%
  window.slider = {
    effectLevel: 100
  };
})();
