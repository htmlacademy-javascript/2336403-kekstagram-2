//Функция создания объекта "комментарий"
import {MSGS_SET, NAMES_SET, DSCRP_SET} from './data.js';
import {idGen, rndmIntgrGen} from './utils.js';
import {MIN_LIKES, MAX_LIKES, MIN_COMMENTS_NUM, MAX_COMMENTS_NUM, NAMES_QUANTITY, MIN_AVA_NUMBER, MAX_AVA_NUMBER, MIN_MSG_NUMBER, MAX_MSG_NUMBER, PHOTO_DSCR_QUANTITY} from './create-array-photo-items-config.js';

function сreateComment() {
  const avatarGen = () => `img/avatar-${rndmIntgrGen(MIN_AVA_NUMBER, MAX_AVA_NUMBER)}.svg`;
  return {
    id: idGen(),
    avatar: avatarGen(),
    message: `${MSGS_SET[rndmIntgrGen(MIN_MSG_NUMBER, MAX_MSG_NUMBER)]} ${MSGS_SET[rndmIntgrGen(0,1) * rndmIntgrGen(MIN_MSG_NUMBER, MAX_MSG_NUMBER)]}`,
    name: NAMES_SET[rndmIntgrGen(0, NAMES_QUANTITY - 1)]
  };
}

//функция создания объекта "описание фотографии"
function сreatePhotoDscrp(num) {
  const commentsSet = [];
  if (rndmIntgrGen(0,1) === 1) {
    for (let i = 0; i <= rndmIntgrGen(MIN_COMMENTS_NUM, MAX_COMMENTS_NUM); i++) {
      commentsSet.push(сreateComment());
    }
  }
  return {
    id: num,
    url: `photos/${num}.jpg`,
    dscrp: DSCRP_SET[rndmIntgrGen(1, PHOTO_DSCR_QUANTITY)],
    likes: rndmIntgrGen(MIN_LIKES, MAX_LIKES),
    comments: commentsSet
  };
}

function createArrayPhotoItems(photoQuantity) {
  const photoDscrp = [];
  for (let i = 1; i <= photoQuantity; i++) {
    photoDscrp.push(сreatePhotoDscrp(i));
  }
  return photoDscrp;
}

export {createArrayPhotoItems};
