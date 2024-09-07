import { thumbs } from './render-thumbs.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureSocial = bigPictureSection.querySelector('.big-picture__social');
const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const socialCommentShowCount = socialCommentCount.querySelector('.social__comment-show-count');
const socialCommentsLoader = bigPictureSocial.querySelector('.social__comments-loader');
const socialCommentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const socialComments = bigPictureSocial.querySelector('.social__comments'); //Список социальных комментариев

const NUMBER_OF_COMMENTS_IN_BLOCK = 5; //Количество комментариев за одну загрузку

//Процедура заполнения социальными комментариями из подготовленных данных
const insertSocialComments = (commentsSet) => {
  const totalCommentsCount = socialCommentTotalCount.textContent;
  let visibleCommentsCount = socialCommentShowCount.textContent;

  const insertBlockComments = (start, stop) => {
    socialCommentsLoader.classList.remove('hidden');
    for (let i = start; i < stop; i++) {
      const li = document.createElement('li');
      li.classList.add('social__comment');
      const imgHTML = `<img class="social__picture" src="${commentsSet[i].avatar}" alt="${commentsSet[i].name}" width="35" height="35">`;
      const pHTML = `<p class="social__text">${commentsSet[i].message}</p>`;
      li.insertAdjacentHTML('beforeend', imgHTML);
      li.insertAdjacentHTML('beforeend', pHTML);
      socialComments.append(li);
      visibleCommentsCount++;
    }
    socialCommentShowCount.textContent = visibleCommentsCount;
  };

  if (totalCommentsCount - visibleCommentsCount > NUMBER_OF_COMMENTS_IN_BLOCK) {
    insertBlockComments(+visibleCommentsCount, +visibleCommentsCount + NUMBER_OF_COMMENTS_IN_BLOCK);
  } else {
    insertBlockComments(+visibleCommentsCount, +totalCommentsCount);
    socialCommentsLoader.classList.add('hidden');
  }
};


const showBigPicture = (currentPicId) => {
  const thumb = thumbs[currentPicId];
  bigPictureImg.src = thumb.url;
  socialCaption.textContent = thumb.dscrp;

  //Количество лайков
  bigPictureLikesCount.textContent = thumb.likes;

  document.body.classList.add('modal-open');

  //Общее количество комментариев к фотографии
  socialCommentTotalCount.textContent = String(thumb.comments.length);

  //Обнуляет счетчик показанных комментариев
  socialCommentShowCount.textContent = '0';

  //Заполняет социальные комментарии под фотографией
  socialComments.innerHTML = '';
  insertSocialComments(thumb.comments);

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

  const onBigPictureKeyEscDown = (evt) => {
    evt.preventDefault();
    socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
    closeBigPicture();
  };

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick, {once: true});
  document.addEventListener('keydown', onBigPictureKeyEscDown, {once: true});
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);

  bigPictureSection.classList.remove('hidden');
};

export { showBigPicture };
