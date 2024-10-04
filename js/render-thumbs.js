//import { createArrayPhotoItems, PHOTO_QUANTITY } from './data.js';
import { getData } from './api.js';

//const thumbs = createArrayPhotoItems(PHOTO_QUANTITY);
//const thumbs1 = JSON.parse(getData);
const thumbs = await getData();

const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picContainer = document.querySelector('.pictures');

//window.console.log(thumbs1[1]);

const createThumbnail = (arrEl) => {
  const thumbnail = template.cloneNode(true);
  const pictureImg = thumbnail.querySelector('.picture__img');
  thumbnail.querySelector('.picture__comments').textContent = arrEl.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = arrEl.likes;
  thumbnail.dataset.pictureId = arrEl.id;
  pictureImg.src = arrEl.url;
  pictureImg.alt = arrEl.description;
  return thumbnail;
};

const renderThumbs = () => {
  thumbs.forEach((thumb) => {
    fragment.appendChild(createThumbnail(thumb));
  });
  picContainer.appendChild(fragment);
};


export { renderThumbs, thumbs, picContainer };
