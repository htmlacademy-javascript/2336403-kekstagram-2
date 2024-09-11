import { isEscKey } from './utils.js';
import { hashtagError, isHashtagsValid, descriptionError, isDescriptionValid } from './validation-img-upload-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = imgUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');


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

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
});

pristine.addValidator(textHashtags, isHashtagsValid, hashtagError);
pristine.addValidator(textDescription, isDescriptionValid, descriptionError);

export { setImgUploadHandler };

