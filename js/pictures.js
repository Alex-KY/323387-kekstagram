'use strict';

var PICTURE_COUNT = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var ESC = 27;
var ENTER = 13;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var pictures = [];
var template = document.querySelector('#picture-template');
var pic = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

// Функция получения случайного количества лайков
var getLikes = function () {
  return (Math.floor(Math.random() * (201 - 15)) + 15);
};

// Функция получения случайных комментариев
var getRandomComment = function () {
  return COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
};

// Функция получения массива комментариев от 1 до 2 штук
var getComments = function () {
  var comments = [];
  for (var i = 0; i < (Math.floor(Math.random() * 2) + 1); i++) {
    comments.push(getRandomComment());
  }
  return comments;
};

// Заполнение оверлея данными картинки из массива
var fillPictureOverlay = function (index) {
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', pictures[index].url);
  galleryOverlay.querySelector('.likes-count').textContent = pictures[index].likes;
  galleryOverlay.querySelector('.comments-count').textContent = pictures[index].comments.length;
};

// Убираем все чекеды
var removeCheck = function () {
  inputArray.forEach(function (item) {
    item.removeAttribute('checked');
  });
  // Или можно точечно бахнуть чекед:
  // g.querySelector('input[checked]').removeAttribute('checked');
};

// В этом месте начинается основной код программы
for (var i = 0; i < PICTURE_COUNT; i++) {

  pictures.push({});

  pictures[i].url = 'photos/' + (i + 1) + '.jpg';
  pictures[i].likes = getLikes();
  pictures[i].comments = getComments();

}

// Заполнение элемента шаблона
pictures.forEach(function (item) {
  var element = template.content.cloneNode(true);
  element.querySelector('img').setAttribute('src', item.url);
  element.querySelector('.picture-likes').textContent = item.likes;
  element.querySelector('.picture-comments').textContent = item.comments.length;

  fragment.appendChild(element);
});

// Добавляем отрисованный шаблон на страницу в заданный элемент DOM-а
pic.appendChild(fragment);

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

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var uploadOverlay = document.querySelector('.upload-overlay');
var pictureArray = document.querySelectorAll('.picture');
var effectPin = document.querySelector('.upload-effect-level-pin');
var effectVal = document.querySelector('.upload-effect-level-val');
var uploadControls = document.querySelector('.upload-effect-controls');
var effectLabels = uploadControls.querySelectorAll('.upload-effect-label');
var inputArray = uploadControls.querySelectorAll('input[type = "radio"]');
var effectBar = uploadControls.querySelector('.upload-effect-level');

// Открытое в данный момент окно
var popup;
var indexPicture;

// Открыть окно
var openPopup = function (winUp) {
  popup = winUp;
  popup.classList.remove('hidden');
};
// Закрыть окно
var closePopup = function () {
  popup.classList.add('hidden');
};

// Нажатие ESC в открытом окне
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC && evt.target !== uploadHashtag && evt.target !== uploadDescription) {
    closePopup();
    if (popup === uploadOverlay) {
      uploadStyleChange('none', 0);
      document.querySelector('#upload-file').value = '';
    } else {
      document.removeEventListener('keydown', pressLeftRightArrow);
    }
  }
};

var uploadStyleChange = function (a, index) {
  // удаляем все атрибуты checked с чекбоксов
  removeCheck();
  // добавляем checked для нужного чекбокса
  inputArray[index].setAttribute('checked', '');
  var style = uploadPreviewImg.style;
  // открываем скролл эффектов
  effectBar.style.display = 'block';
  // Применяем нужные эффекты в нужном количестве
  switch (a) {
    case 'chrome':
      style.filter = 'grayscale(' + effectLevel / 100 + ')';
      break;

    case 'sepia':
      style.filter = 'sepia(' + effectLevel / 100 + ')';
      break;

    case 'marvin':
      style.filter = 'invert(' + effectLevel + ')';
      break;

    case 'phobos':
      style.filter = 'blur(' + effectLevel * 3 / 100 + 'px)';
      break;

    case 'heat':
      style.filter = 'brightness(' + effectLevel * 3 / 100 + ')';
      break;

    case 'none':
      effectBar.style.display = 'none';
      uploadPreviewImg.style.filter = 'none';
  }
};

var pressLeftRightArrow = function (evt) {
  if (evt.keyCode === LEFT_ARROW) {
    if (indexPicture > 0) {
      fillPictureOverlay(--indexPicture);
    }
  }
  if (evt.keyCode === RIGHT_ARROW) {
    if (indexPicture < pictures.length - 1) {
      fillPictureOverlay(++indexPicture);
    }
  }
};

var addEventsOnPictures = function (evt, item, index) {
  item.setAttribute('onclick', evt.preventDefault());
  indexPicture = index;
  openPopup(galleryOverlay);
  fillPictureOverlay(index);
  document.addEventListener('keydown', pressLeftRightArrow);
  document.addEventListener('keydown', onPopupEscPress);
};

// По умолчанию скрываем скролл для эффектов
effectBar.style.display = 'none';
// Выставляем значение скролла эффектов на 100%
var effectLevel = 100;
effectPin.style.left = effectLevel + '%';
effectVal.style.width = effectLevel + '%';


// Добавляем на каждую превьюшку событие - открытие оверлея
pictureArray.forEach(function (item, index) {
  item.addEventListener('click', function (evt) {
    addEventsOnPictures(evt, item, index);
  });
  item.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      addEventsOnPictures(evt, item, index);
    }

  });

});

// Добавляем на каждую превьюшку эффектов событие - применить эффект
effectLabels.forEach(function (item, index) {
  var a = inputArray[index].getAttribute('value');
  item.setAttribute('tabindex', 0);

  item.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      uploadStyleChange(a, index);
    }
  });

  item.addEventListener('click', function () {
    uploadStyleChange(a, index);
  });

});

galleryOverlayClose.addEventListener('click', function () {
  closePopup();
  document.removeEventListener('keydown', onPopupEscPress);
});

// Открытие и закрытие окна upload
var uploadOpen = document.querySelector('#upload-file');
var uploadClose = uploadOverlay.querySelector('.upload-form-cancel');

// Окна ввода с клавиатуры
var uploadHashtag = uploadOverlay.querySelector('.upload-form-hashtags');
var uploadDescription = uploadOverlay.querySelector('.upload-form-description');

uploadOpen.addEventListener('change', function () {
  openPopup(uploadOverlay);
  document.addEventListener('keydown', onPopupEscPress);
});

uploadClose.addEventListener('click', function () {
  closePopup();
  document.removeEventListener('keydown', onPopupEscPress);
});

effectPin.addEventListener('mouseup', function () {
  var a = effectPin.style.left;
  effectLevel = a.slice(0, a.length - 1); // показывает значение без %
});
