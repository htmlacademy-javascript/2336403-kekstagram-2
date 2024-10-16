import { renderThumbs } from './render-thumbs.js';
import { debounce } from './utils.js';

const MAX_RANDOM_QUANTITY = 10; //Количество случайных миниатюр

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

let localData;

const filteredData = {
  'filter-default': () => localData,
  'filter-random': () => [...localData].sort(()=> Math.random() - 0.5).slice(0, MAX_RANDOM_QUANTITY),
  'filter-discussed': () => [...localData].sort((b, a) => a.comments.length - b.comments.length),
};

const activatesButton = (element) => {
  imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
  debounce(renderThumbs(filteredData[element.id](localData)), 500);
};

const initFilter = (thumbs) => {
  localData = thumbs;
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('img-filters__button')) {
      activatesButton(evt.target);
    }
  });
};

export { initFilter };
