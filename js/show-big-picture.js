import { thumbs } from './render-thumbs.js';

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
const bigPictureCancel = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureSocial = bigPictureSection.querySelector('.big-picture__social');
const socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
const socialCommentsLoader = bigPictureSocial.querySelector('.social__comments-loader');
const socialCommentTotalCount = bigPictureSocial.querySelector('.social__comment-total-count');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const socialComments = bigPictureSocial.querySelector('.social__comments'); //Список социальных комментариев

//Процедура заполнения социальными комментариями из подготовленных данных
const insertSocialComments = (commentsSet) => {
  for (let i = 0; i < commentsSet.length; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    const imgHTML = `<img class="social__picture" src="${commentsSet[i].avatar}" alt="${commentsSet[i].name}" width="35" height="35">`;
    const pHTML = `<p class="social__text">${commentsSet[i].message}</p>`;
    li.insertAdjacentHTML('beforeend', imgHTML);
    li.insertAdjacentHTML('beforeend', pHTML);
    socialComments.append(li);
  }
};

const showBigPicture = (currentPicId) => {
  const thumb = thumbs[currentPicId];
  bigPictureImg.src = thumb.url;
  socialCaption.textContent = thumb.dscrp;

  //Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
  bigPictureLikesCount.textContent = thumb.likes;

  document.body.classList.add('modal-open');

  //Общее количество комментариев к фотографии comments подставьте как текстовое содержание
  //элемента .social__comment-total-count.
  socialCommentTotalCount.textContent = thumb.comments.length;

  //После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев
  //.comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
  socialCommentCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');

  //Заполняет социальные комментарии под фотографией
  socialComments.innerHTML = '';
  insertSocialComments(thumb.comments);

  const closeBigPicture = () => {
    bigPictureSection.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const onBigPictureCancelClick = (evt) => {
    evt.preventDefault();
    closeBigPicture();
  };

  const onBigPictureKeyEscDown = (evt) => {
    evt.preventDefault();
    closeBigPicture();
  };

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick, {once: true});
  document.addEventListener('keydown', onBigPictureKeyEscDown, {once: true});

  bigPictureSection.classList.remove('hidden');
};

export { showBigPicture };
