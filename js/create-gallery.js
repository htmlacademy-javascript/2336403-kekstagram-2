import { picContainer, renderThumbs } from './render-thumbs.js';
import { showBigPicture} from './show-big-picture';

const createGallery = () => {
  renderThumbs();
  picContainer.addEventListener('click', (evt) => {
    const currentPic = evt.target.closest('.picture');
    if (!currentPic) {
      return;
    }
    showBigPicture(currentPic.dataset.pictureId - 1);
  });
};

export { createGallery };
