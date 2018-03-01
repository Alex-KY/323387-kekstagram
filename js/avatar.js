'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.effect-image-preview');
  var uploadPreviews = document.querySelectorAll('.upload-effect-preview');


  var setPreviews = function () {
    uploadPreviews.forEach(function (item) {
      item.style.backgroundImage = 'url(' + preview.src + ')';
    });
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        setPreviews();
      });

      reader.readAsDataURL(file);
    }
  });
})();
