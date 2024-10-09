const ESC_CODE = 27;

//Генератор уникального ID
const idGen = () => Number((String(Date.now() / Math.random())).replaceAll('.', ''));

//Генератор целого случайного числа из заданного диапазона
const rndmIntgrGen = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscKey = (evt) => ['Escape', 'Esc'].includes(evt.key) || evt.code === ESC_CODE;

//Функция склонения числительных
const numDecline = (num, nominative, genetiveSingular, genetivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genetiveSingular;
  }
  return num % 10 === 1 ? nominative : genetivePlural;
};

export { idGen, rndmIntgrGen, isEscKey, numDecline };
