const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picContainer = document.querySelector('.pictures');

const clearThumbnail = () => {
  picContainer.querySelectorAll('.picture').forEach((element) => element.remove());
};


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

const renderThumbs = (thumbsSet) => {
  clearThumbnail();
  thumbsSet.forEach((thumb) => {
    fragment.appendChild(createThumbnail(thumb));
  });
  picContainer.appendChild(fragment);
};


export { renderThumbs };


