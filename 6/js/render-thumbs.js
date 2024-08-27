import { createArrayPhotoItems, PHOTO_QUANTITY } from './data.js';

const thumbs = createArrayPhotoItems(PHOTO_QUANTITY);

const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const container = document.querySelector('.pictures');

const createThumbnail = function (arrEl) {
  const thumbnail = template.cloneNode(true);
  const pictureImg = thumbnail.querySelector('.picture__img');
  const pictureComments = thumbnail.querySelector('.picture__comments');
  const pictureLikes = thumbnail.querySelector('.picture__likes');
  pictureImg.src = arrEl.url;
  pictureImg.alt = arrEl.description;
  pictureComments.textContent = arrEl.comments.length;
  pictureLikes.textContent = arrEl.likes;

  return thumbnail;
};

const renderThumbs = function () {
  thumbs.forEach((thumb) => {
    fragment.appendChild(createThumbnail(thumb));
  });
  container.appendChild(fragment);
};

export { renderThumbs };
