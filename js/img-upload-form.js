import { isEscKey } from './utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

//Константы для валидатора//

  //хеш-тег не может состоять только из одной решётки;
  //максимальная длина одного хэштега 20 символов, включая решётку;
  //хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  //хэштеги разделяются пробелами;
  //один и тот же хэштег не может быть использован дважды;
  //нельзя указать больше пяти хэштегов;
  //rules: 'Хэштег должен начинаеться с символа # (решётка) и содержать только буквы и числа'

let errorMessage = '';
const error = () => errorMessage;

//Конец констант для валидатора//

const closeUploadFormKeydown = (evt) => {
  if ((isEscKey(evt)) && !(textHashtags === document.activeElement || textDescription === document.activeElement)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

function closeUploadForm() {
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadCancelBtn.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', closeUploadFormKeydown);
}

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancelBtn.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', closeUploadFormKeydown);
};

const setImgUploadHandler = () => {
  imgUploadInput.addEventListener('change', openUploadForm);
};

//Блок валидации//


const isHashtagsValid = (inputStr) => {
  inputStr = inputStr.toLowerCase().trim();
  //errorMessage = '';
  if (!inputStr) {
    return true;
  }
  const hashtagsArray = inputStr.split(/\s+/);



  const requirements = [
    {
      check: hashtagsArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки'
    },
    {
      check: hashtagsArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
  ];

  window.console.log(errorMessage);

  return requirements.every((requirement) => {
    const isNotCompleted = requirement.check;
    if (isNotCompleted) {
      errorMessage = requirement.error;
    }
    return !isNotCompleted;
  });

};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
});

pristine.addValidator(textHashtags, isHashtagsValid, errorMessage);


//Конец блока валидации//


export { setImgUploadHandler };
