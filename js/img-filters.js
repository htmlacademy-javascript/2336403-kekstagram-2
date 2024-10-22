import { renderThumbs } from './render-thumbs.js';
import { debounce } from './utils.js';

const MAX_RANDOM_QUANTITY = 10; //Количество случайных миниатюр
const DEBOUNCE_TIMEOUT = 500; //Таймер для debounce

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

let localData;

const filteredData = {
  'filter-default': () => localData,
  'filter-random': () => [...localData].sort(()=> Math.random() - 0.5).slice(0, MAX_RANDOM_QUANTITY),
  'filter-discussed': () => [...localData].sort((b, a) => a.comments.length - b.comments.length),
};

const activatesFilter = (element) => {
  renderThumbs(filteredData[element.id](localData));
};

const onFilterButtonClick = (evt) => {
  imgFilters
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const initFilter = (thumbs) => {
  localData = thumbs;
  imgFilters.classList.remove('img-filters--inactive');

  const debauncedHandler = debounce((evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('img-filters__button')) {
      activatesFilter(evt.target);
    }
  }, DEBOUNCE_TIMEOUT);

  imgFiltersForm.addEventListener('click', debauncedHandler);
  imgFiltersForm.addEventListener('click', onFilterButtonClick);
};

export { initFilter };
