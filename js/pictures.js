'use strict';

(function () {
  var PICTURE_COUNT = 25;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  window.pictures = [];
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

  // В этом месте начинается основной код программы
  for (var i = 0; i < PICTURE_COUNT; i++) {

    window.pictures.push({});

    window.pictures[i].url = 'photos/' + (i + 1) + '.jpg';
    window.pictures[i].likes = getLikes();
    window.pictures[i].comments = getComments();

  }

  // Заполнение элемента шаблона
  window.pictures.forEach(function (item) {
    var element = template.content.cloneNode(true);
    element.querySelector('img').setAttribute('src', item.url);
    element.querySelector('.picture-likes').textContent = item.likes;
    element.querySelector('.picture-comments').textContent = item.comments.length;

    fragment.appendChild(element);
  });

  // Добавляем отрисованный шаблон на страницу в заданный элемент DOM-а
  pic.appendChild(fragment);
})();
