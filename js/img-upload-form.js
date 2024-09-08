import { isEscKey } from './utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelBtn = imgUploadForm.querySelector('.img-upload__cancel');


const closeUploadFormKeydown = (evt) => {
  if (isEscKey(evt)) {
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

export { setImgUploadHandler };
