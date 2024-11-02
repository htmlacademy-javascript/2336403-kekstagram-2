import { isEscKey } from './utils.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureSocial = bigPictureSection.querySelector('.big-picture__social');
const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const socialCommentShownCount = socialCommentCount.querySelector('.social__comment-shown-count');
const socialCommentsLoader = bigPictureSocial.querySelector('.social__comments-loader');
const socialCommentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const socialComments = bigPictureSocial.querySelector('.social__comments'); //Список социальных комментариев

const NUMBER_OF_COMMENTS_IN_BLOCK = 5; //Количество комментариев за одну загрузку

//Процедура заполнения социальными комментариями из подготовленных данных
const insertSocialComments = (commentsSet) => {
  const totalCommentsCount = socialCommentTotalCount.textContent;
  let visibleCommentsCount = socialCommentShownCount.textContent;

  const insertBlockComments = (start, stop) => {
    socialCommentsLoader.classList.remove('hidden');
    socialCommentShownCount.textContent = visibleCommentsCount;
    for (let i = start; i < stop; i++) {
      const li = document.createElement('li');
      li.classList.add('social__comment');
      const liHTML = `<img class="social__picture" src="${commentsSet[i].avatar}" alt="${commentsSet[i].name}" width="35" height="35">
                             <p class="social__text">${commentsSet[i].message}</p>`;
      li.insertAdjacentHTML('beforeend', liHTML);
      socialComments.append(li);
      visibleCommentsCount++;
    }
    socialCommentShownCount.textContent = visibleCommentsCount;
  };

  if (totalCommentsCount - visibleCommentsCount > NUMBER_OF_COMMENTS_IN_BLOCK) {
    insertBlockComments(+visibleCommentsCount, +visibleCommentsCount + NUMBER_OF_COMMENTS_IN_BLOCK);
  } else {
    insertBlockComments(+visibleCommentsCount, +totalCommentsCount);
    socialCommentsLoader.classList.add('hidden');
  }
};

const showBigPicture = (currentPicId, thumbs) => {
  const thumb = thumbs[currentPicId];
  bigPictureImg.src = thumb.url;
  socialCaption.textContent = thumb.description;
  bigPictureLikesCount.textContent = thumb.likes;
  socialComments.innerHTML = '';
  socialCommentTotalCount.textContent = thumb.comments.length;
  socialCommentShownCount.textContent = '0';
  insertSocialComments(thumb.comments);
  document.body.classList.add('modal-open');

  const onSocialCommentsLoaderClick = (evt) => {
    evt.preventDefault();
    insertSocialComments(thumb.comments);
  };

  const closeBigPicture = () => {
    bigPictureSection.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const onBigPictureCancelClick = (evt) => {
    evt.preventDefault();
    socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
    closeBigPicture();
  };

  const onDocumentKeyDown = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
      closeBigPicture();
    }
  };

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick, {once: true});
  document.addEventListener('keydown', onDocumentKeyDown);
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);

  bigPictureSection.classList.remove('hidden');
};

export { showBigPicture };
