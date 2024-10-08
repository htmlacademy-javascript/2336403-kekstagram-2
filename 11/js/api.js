import { showErrorMessage, showAllert } from './show-messages.js';
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = async () => {
  let response;
  try {
    response = await fetch(`${BASE_URL}${Route.GET_DATA}`);
    if (!response.ok) {
      throw new Error(`${ErrorText.GET_DATA} — ${response.status}`);
    }
  } catch (err) {
    showErrorMessage(err);
    window.console.error(err);
    return [];
  }
  return await response.json();
};

const sendData = async (body) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}${Route.SEND_DATA}`,{method: 'POST', body});
    if (!response.ok) {
      throw new Error(`${ErrorText.SEND_DATA} — ${response.status}`);
    }
    showAllert('success');
  } catch (err) {
    showAllert('error');
    throw new Error(err);
  }
};

export { getData, sendData };
