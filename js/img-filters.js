import { renderThumbs } from './render-thumbs.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

let localData;

const filteredData = {
  'filter-default': () => localData,
  'filter-random': () => [...localData].sort(()=> Math.random() - 0.5).slice(0, 10),
  'filter-discussed': () => [...localData].sort((b, a) => a.comments.length - b.comments.length),
};


const makeButtonActive = (element) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
  renderThumbs(filteredData[element.id](localData));
};

const initFilter = (thumbs) => {
  localData = thumbs;
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('img-filters__button')) {
      makeButtonActive(evt.target);
    }
  });
};

export { initFilter };
