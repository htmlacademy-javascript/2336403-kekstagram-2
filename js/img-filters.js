import { renderThumbs } from './render-thumbs.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

//imgFilters.classList.remove('img-filters--inactive');

let localData;

// const FILTER = {
//   default: 'filter-default',
//   random: 'filter-random',
//   discussed: 'filter-discussed',
// };

const filteredData = {
  'filter-default': () => localData,
  'filter-random': () => [...localData].sort(()=> Math.random() - 0.5).slice(0, 10),
  'filter-discussed': () => [...localData].sort((b, a) => a.comments.length - b.comments.length),
};


const makeButtonActive = (element) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
  renderThumbs(filteredData[element.id](localData));
  window.console.log(filteredData[element.id](localData));
};

const initFilter = (thumbs) => {
  localData = thumbs;
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      makeButtonActive(evt.target);
    }
  });
};


export { initFilter };





























// const Filters = {
//   DEFAULT: 'filter-default',
//   RANDOM: 'filter-random',
//   DISCUSSED: 'filter-discussed'
// };

//let localData;

// const filteredData = {
//   [Filters.DEFAULT]: () => localData,
//   [Filters.RANDOM]: () => [...localData].sort(()=> Math.random() - 0.5).slice(0, 10),
//   [Filters.DISCUSSED]: () => [...localData].sort((b, a) => a.comments.length - b.comments.length),
// };

// const makeButtonActive = (element) => {
//   document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
//   element.classList.add('img-filters__button--active');
// };

// const sortFilter = (evt) => {
//   if (evt.target.classList.contains('img-filters__button')) {
//     renderMini(filteredData[evt.target.id]());
//   }
// } ;

// imgFiltersForm.addEventListener('click', debounce(sortFilter, DELAY_TIMER));
// imgFiltersForm.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('img-filters__button')) {
//     makeButtonActive(evt.target);
//   }
// });

// const activateFilters = (pictures) => {
//   filters.classList.remove('img-filters--inactive');
//   localData = [...pictures];
// };
