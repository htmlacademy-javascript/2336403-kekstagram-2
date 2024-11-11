const ESC_CODE = 27;

const isEscKey = (evt) => ['Escape', 'Esc'].includes(evt.key) || evt.code === ESC_CODE;

//Функция склонения числительных
const declinesNumeral = (num, nominative, genetiveSingular, genetivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genetiveSingular;
  }
  return num % 10 === 1 ? nominative : genetivePlural;
};

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export { isEscKey, declinesNumeral, debounce };
