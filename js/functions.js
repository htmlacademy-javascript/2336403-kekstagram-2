function checkStringLenght(str, strLength) {
  str = str.replaceAll(' ', '');
  window.console.log('Входящая строка без пробелов: ', str);
  window.console.log('Длина входящей строки без пробелов', str.length);
  window.console.log('Длина строки для сравнения ', strLength);
  return (str.length <= strLength);
}

function isPalindrom(str) {
  str = str.replaceAll(' ', '');
  str = str.toUpperCase();
  window.console.log('Нормализованная входящая строка: ', str);
  let strToComp = '';
  for (let i = str.length - 1; i >= 0; i--) {
    strToComp = strToComp + str[i];
  }
  window.console.log('Строка для сравнения ', strToComp);
  return (str === strToComp);
}

function extrNumb(str) {
  window.console.log('Входящая строка: ', str);
  let numb = '';
  for (let i = 0; i <= str.length - 1; i++) {
    if (/^\d+$/.test(str[i])) {
      numb = numb + str[i];
    }
  }
  return (Number.isNaN(numb)) ? NaN : Number(numb);
}

window.console.log('Строка меньше или равна указанной длине: ', checkStringLenght('Тестовая', 7));
window.console.log('Строка является палиндромом: ', isPalindrom('торорот'));
window.console.log('Извлеченное число: ', extrNumb('1 кефир, 0.5 батона'));
