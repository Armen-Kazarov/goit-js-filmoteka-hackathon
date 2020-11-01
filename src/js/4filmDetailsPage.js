import detailsFilms from '../templates/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import { selectedFilm } from './3navigation.js';

const refs = {
  detailsPage: document.querySelector('#root-details-page'),
};

let selectedFilm = null;

const findMoveInArray = array => {
  const findMovie = array.find(movie => movie.id === selectedFilm.id);
  if (findMovie) return findMovie.id;
};

const monitorButtonStatusText = () => {
  const buttonWatched = document.querySelector('.details__button-watched');
  const buttonQueue = document.querySelector('.details__button-queue');

  buttonWatched.addEventListener('click', toggleToWatched);
  buttonQueue.addEventListener('click', toggleToQueue);

  const filmsQueueInLocalStorage = JSON.parse(
    localStorage.getItem('filmsQueue'),
  );
  const filmsWatchedInLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  );

  if (
    filmsQueueInLocalStorage &&
    filmsQueueInLocalStorage.length &&
    findMoveInArray(filmsQueueInLocalStorage) === selectedFilm.id
  ) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  }

  if (
    filmsWatchedInLocalStorage &&
    filmsWatchedInLocalStorage.length &&
    findMoveInArray(filmsWatchedInLocalStorage) === selectedFilm.id
  ) {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;
  } else {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
  }
};

const toggleToQueue = () => {
  let toQueueArray = [];
  const moviesToQueueFromLocalStorage = JSON.parse(
    localStorage.getItem('filmsQueue'),
  );

  if (moviesToQueueFromLocalStorage)
    toQueueArray.push(...moviesToQueueFromLocalStorage);

  if (
    moviesToQueueFromLocalStorage &&
    moviesToQueueFromLocalStorage.length &&
    findMoveInArray(moviesToQueueFromLocalStorage)
  ) {
    toQueueArray = toQueueArray.filter(el => el.id !== selectedFilm.id);
  } else {
    toQueueArray.push(selecedtFilm);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
  monitorButtonStatusText();
};

const toggleToWatched = () => {
  let toWatchedArray = [];
  const moviesToWatchedFromLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  );

  if (moviesToWatchedFromLocalStorage)
    toWatchedArray.push(...moviesToWatchedFromLocalStorage);

  if (
    moviesToWatchedFromLocalStorage &&
    moviesToWatchedFromLocalStorage.length &&
    findMoveInArray(moviesToWatchedFromLocalStorage)
  ) {
    toWatchedArray = toWatchedArray.filter(el => el.id !== selectedFilm.id);
  } else {
    toWatchedArray.push(selectedFilm);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
  monitorButtonStatusText();
};

const showDetails = selectFilm => {
  typeof selectFilm.release_date === 'undefined' ||
  selectFilm.release_date === ''
    ? (selectFilm.release_date = 'unknown')
    : (selectFilm.release_date = selectFilm.release_date.slice(0, 4));

  if (typeof selectFilm.poster_path === 'object') {
    selectFilm.poster_path = `./images/temp.png`;
  } else {
    selectFilm.poster_path = `https://image.tmdb.org/t/p/original${selectFilm.poster_path}`;
  }
  selectedFilm = selectFilm;
  refs.detailsPage.innerHTML = detailsFilms(selectFilm);
  monitorButtonStatusText();
};

export { showDetails, toggleToQueue, toggleToWatched };
