import {NAMES_SET, DSCRP_SET} from './data.js';

const MIN_LIKES = 15; //Минимальное количество лайков
const MAX_LIKES = 200; //Максимальное количество лайков

const MIN_COMMENTS_NUM = 0; //Минимальное количество комментариев
const MAX_COMMENTS_NUM = 29; //Максимальное количество комментариев

const NAMES_QUANTITY = NAMES_SET.length; //Количество имен

const MIN_AVA_NUMBER = 1; //Ноачальный номер аватарки
const MAX_AVA_NUMBER = 6; //конечный номер аватарки

const MIN_MSG_NUMBER = 1; //Начальный номер сообщения в массиве
const MAX_MSG_NUMBER = 6; //Конечный номер сообщения в массиве

const PHOTO_DSCR_QUANTITY = DSCRP_SET.length; //Количество готовых подписей к фотографиям

const PHOTO_QUANTITY = 25; //Количество фотографий с описанием

export {MIN_LIKES, MAX_LIKES, MIN_COMMENTS_NUM, MAX_COMMENTS_NUM, NAMES_QUANTITY, MIN_AVA_NUMBER, MAX_AVA_NUMBER, MIN_MSG_NUMBER, MAX_MSG_NUMBER, PHOTO_DSCR_QUANTITY, PHOTO_QUANTITY};
