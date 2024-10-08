import { isEscKey } from './utils';

const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.body;
const errorLoadDataTemplate = document.querySelector('#data-error').content;

const successMessage = body.querySelector('#success')
  .content.querySelector('.success');
const errorMessage = body.querySelector('#error')
  .content.querySelector('.error');

const templates = {
  success: successMessage,
  error: errorMessage
};

const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
};

const showAllert = (template = 'success') => {
  const messageClone = templates[template].cloneNode(true);
  body.appendChild(messageClone);
  const button = document.querySelector(`.${template}__button`);
  messageClone.addEventListener('click', (evt) => {
    if (evt.target === button || evt.target.classList.contains(template)) {
      closeMessage();
    }
  });
  body.addEventListener('keydown', (evt) => {
    window.console.log(evt);
    if (isEscKey(evt)) {
      window.console.log(evt);
      closeMessage();
    }
  }, {once: true});
};


const showErrorMessage = (message) => {
  const errorArea = errorLoadDataTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');
  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { showErrorMessage, showAllert };
