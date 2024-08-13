//Генератор уникального ID
const idGen = () => Number((String(Date.now() / Math.random())).replaceAll('.', ''));

//Генератор целого случайного числа из заданного диапазона
const rndmIntgrGen = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export {idGen, rndmIntgrGen};
