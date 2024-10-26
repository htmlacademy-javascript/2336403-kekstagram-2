import { createGallery } from './create-gallery.js';
import { setImgUploadHandler, initPictureUpload } from './img-upload-form.js';
import { getData } from './api.js';
import { initFilter } from './img-filters.js';

const thumbs = await getData();
if (thumbs.length !== 0) {
  initFilter(thumbs);
  createGallery(thumbs);
  setImgUploadHandler();
  initPictureUpload();
}
