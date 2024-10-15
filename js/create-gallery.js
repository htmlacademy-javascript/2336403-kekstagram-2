import { picContainer, renderThumbs } from './render-thumbs.js';
import { showBigPicture } from './show-big-picture.js';

const createGallery = (thumbsSet) => {
  renderThumbs(thumbsSet);
  picContainer.addEventListener('click', (evt) => {
    const currentPic = evt.target.closest('.picture');
    if (!currentPic) {
      return;
    }
    showBigPicture(currentPic.dataset.pictureId, thumbsSet);
  });
};

export { createGallery };
