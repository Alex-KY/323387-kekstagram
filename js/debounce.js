'use strict';

(function () {
  var timerID;

  window.debounce = function (action) {
    window.clearTimeout(timerID);
    timerID = window.setTimeout(action, 500);
  };
})();
