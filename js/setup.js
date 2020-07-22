'use strict';
(function () {

  var NUMBER_PLAYERS = 4;
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)',
    'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  function getRandomValueFromArray(arr) {
    var randomId = Math.floor(Math.random() * arr.length);
    return arr[randomId];
  }

  function generateArrayCharacters(names, secondNames, coatsColor, eyesColor) {
    var data = [];
    for (var i = 0; i < NUMBER_PLAYERS; i += 1) {
      var currentCharacter = {};
      currentCharacter.name = getRandomValueFromArray(names) + ' ' + getRandomValueFromArray(secondNames);
      currentCharacter.coatColor = getRandomValueFromArray(coatsColor);
      currentCharacter.eyesColor = getRandomValueFromArray(eyesColor);
      data.push(currentCharacter);
    }
    return data;
  }

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }

  function renderWizards() {
    var wizards = generateArrayCharacters(FIRST_NAMES, SECOND_NAMES, COATS_COLOR, EYES_COLOR);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }

  renderWizards();

  // module4-task1
  var setup = document.querySelector('.setup');
  var setupIcon = document.querySelector('.setup-open-icon');
  var setupwizardCoat = document.querySelector('.wizard-coat');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupWizardCoatInput = document.querySelector('input[name="coat-color"]');
  var setupWizardEyesInput = document.querySelector('input[name="eyes-color"]');
  var setupWizardFireballInput = document.querySelector('input[name="fireball-color"]');
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  setupIcon.addEventListener('focus', function (evt) {
    if (evt.key === 'Enter') {
      window.dialog.openPopup();
    }
  });

  var userNameInput = document.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var renderRandomColor = function (element, input, color) {
    element.style.fill = color;
    input.value = color;
  };

  var renderRandomBackGroundColor = function (element, input, backgroundColor) {
    element.style.backgroundColor = backgroundColor;
    input.value = backgroundColor;
  };

  setupWizardEyes.addEventListener('click', function () {
    onChangeEyeColor();
  });

  var onChangeEyeColor = function () {
    var color = getRandomValueFromArray(EYES_COLOR);
    renderRandomColor(setupWizardEyes, setupWizardEyesInput, color);
  };

  setupWizardFireball.addEventListener('click', function () {
    onChangeFireballColor();
  });


  var onChangeFireballColor = function () {
    var color = getRandomValueFromArray(FIREBALL_COLORS);
    renderRandomBackGroundColor(setupWizardFireball, setupWizardFireballInput, color);
  };

  setupwizardCoat.addEventListener('click', function () {
    onChangeCoatColor();
  });

  var onChangeCoatColor = function () {
    var color = getRandomValueFromArray(COATS_COLOR);
    renderRandomColor(setupwizardCoat, setupWizardCoatInput, color);

    window.setup = {
      setup: setup
    };
  };
})();
