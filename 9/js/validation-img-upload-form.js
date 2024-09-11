import { numDecline } from './utils.js';

//Константы для валидатора//

const MAX_HASHTAG_LENGTH = 20; //максимальная длина одного хештэга
const MAX_HASHTAG_QUANTITY = 5; //Максимальное количество хэштегов
const MAX_DESCRIPTION_LENGTH = 140; //Максимальная длина комментария

let hashtagErrorMessage = '';
let descriptionErrorMessage = '';

const hashtagError = () => hashtagErrorMessage;
const descriptionError = () => descriptionErrorMessage;

const isHashtagsValid = (inputStr) => {
  inputStr = inputStr.toLowerCase().trim();
  hashtagErrorMessage = '';
  if (!inputStr) {
    return true;
  }

  const hashtagsArray = inputStr.split(/\s+/);

  //хеш-тег не может состоять только из одной решётки;
  //максимальная длина одного хэштега 20 символов, включая решётку;
  //хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  //хэштеги разделяются пробелами;
  //один и тот же хэштег не может быть использован дважды;
  //нельзя указать больше пяти хэштегов;
  //Хэштег должен начинаться с символа # (решётка) и содержать только буквы и числа

  const requirements = [
    {
      check: hashtagsArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки'
    },
    {
      check: hashtagsArray.some((item) => item.length > MAX_HASHTAG_LENGTH),
      error: `Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
    },
    {
      check: hashtagsArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
    {
      check: hashtagsArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: hashtagsArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Один и тот же хэштег не может быть использован дважды;',
    },
    {
      check: hashtagsArray.length > MAX_HASHTAG_QUANTITY,
      error: `Нельзя указать больше ${MAX_HASHTAG_QUANTITY} ${numDecline(
        MAX_HASHTAG_LENGTH, 'хештега', 'хештегов', 'хештегов')}`,
    },
    {
      check: hashtagsArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return requirements.every((requirement) => {
    const isNotCompleted = requirement.check;
    if (isNotCompleted) {
      hashtagErrorMessage = requirement.error;
    }
    return !isNotCompleted;
  });
};

const isDescriptionValid = (inputStr) => {

  descriptionErrorMessage = '';

  if (!inputStr) {
    return true;
  }

  if (inputStr.length > MAX_DESCRIPTION_LENGTH) {
    descriptionErrorMessage = `Максимальная длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`;
    return false;
  }
};

export { hashtagError, isHashtagsValid, descriptionError, isDescriptionValid };
