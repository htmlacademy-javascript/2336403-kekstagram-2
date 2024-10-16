import { isEscKey } from './utils.js';
import { hashtagError, isHashtagsValid, descriptionError, isDescriptionValid } from './validation-img-upload-form.js';
import { restartScale, resetScale } from './scale-img-upload-form.js';
import { restartFilterEffect, resetFilterEffect } from './effects-img-upload-form.js';
import { sendData } from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');//imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = imgUploadForm.querySelector('.img-upload__cancel');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
});

const closeUploadFormKeydown = (evt) => {
  if ((isEscKey(evt)) && !(textHashtags === document.activeElement || textDescription === document.activeElement)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onSubmitUserForm = async (event) => {
  try {
    event.preventDefault();
    imgUploadSubmit.disabled = true;
    await sendData(new FormData(imgUploadForm));
    closeUploadForm();
  } catch(error) {
    window.console.error(error);
  } finally {
    imgUploadSubmit.disabled = false;
  }
};

function closeUploadForm() {
  pristine.reset();
  resetScale();
  resetFilterEffect();
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadSubmit.removeEventListener('click', onSubmitUserForm);
  document.removeEventListener('keydown', closeUploadFormKeydown);
}

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancelBtn.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', closeUploadFormKeydown);
  imgUploadSubmit.addEventListener('click', onSubmitUserForm);
  restartScale();
  restartFilterEffect();
};

const setImgUploadHandler = () => {
  imgUploadInput.addEventListener('change', openUploadForm);
};

pristine.addValidator(textHashtags, isHashtagsValid, hashtagError);
pristine.addValidator(textDescription, isDescriptionValid, descriptionError);

export { setImgUploadHandler };

