import { isEscKey } from './utils.js';
import { sendHashtagError, isHashtagsValid, sendDescriptionError, isDescriptionValid } from './validation-img-upload-form.js';
import { restartScale, resetScale } from './scale-img-upload-form.js';
import { restartFilterEffect, resetFilterEffect } from './effects-img-upload-form.js';
import { sendData } from './api.js';
import { showAllert } from './show-messages.js';

const VALID_FILE_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
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
    if (!(sendHashtagError() === '' && sendDescriptionError() === '')) {
      return;
    }
    imgUploadSubmit.disabled = true;
    await sendData(new FormData(imgUploadForm));
    closeUploadForm();
  } catch(error) {
    showAllert('error');
    window.console.clear();
  } finally {
    imgUploadSubmit.disabled = false;
  }
};


const onInputFileChange = (evt) => {
  const file = evt.target.files[0];
  const fileType = file['type'];

  if (!VALID_FILE_TYPES.includes(fileType)) {
    closeUploadForm();
  }

  const picture = URL.createObjectURL(file);
  imgUploadPreview.src = picture;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${picture})`;
  });
};


function closeUploadForm() {
  pristine.reset();
  resetScale();
  resetFilterEffect();
  imgUploadForm.reset();
  imgUploadSubmit.removeEventListener('click', onSubmitUserForm);
  document.removeEventListener('keydown', closeUploadFormKeydown);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
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

const initPictureUpload = () => {
  imgUploadInput.addEventListener('change', onInputFileChange);
};

pristine.addValidator(textHashtags, isHashtagsValid, sendHashtagError);
pristine.addValidator(textDescription, isDescriptionValid, sendDescriptionError);

export { setImgUploadHandler, initPictureUpload };

