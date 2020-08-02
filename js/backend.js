'use scrict';
( function () {
  window.load = function () {
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
  console.log(xhr.response);
  });

  xhr.open('GET', 'https://javascript.pages.academy/code-and-magick/data');

  xhr.send();
  }

  var load = function (onLoad, onError) {

  };

  var save = function (data, onLoad, onError) {

  };

  var onLoad = function () {

  };

  var onError = function () {

  };

  window.backend = {
    load: load,
    save: save
  }

  })();
