const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.body;
const errorLoadDataTemplate = document.querySelector('#data-error').content;


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

export { showErrorMessage };
