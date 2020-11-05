import detailsFilms from '../templates/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import { activeDetailsPage } from './3navigation';
import { selectedFilm } from './3navigation';

let selectedFilms;

function dataFromLibrary(data) {
  selectedFilms = data;

  return selectedFilms;
}

const refs = {
  detailsPage: document.querySelector('#root-details-page'),
};

const findMoveInArray = array => {
  const findMovie = array.find(movie => movie.id === selectedFilms.id);
  if (findMovie) return findMovie.id;
};

const monitorButtonStatusText = () => {
  const buttonQueue = document.querySelector('.details__button-queue');
  const buttonWatched = document.querySelector('.details__button-watched');

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
    findMoveInArray(filmsQueueInLocalStorage) === selectedFilms.id
  ) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  }

  if (
    filmsWatchedInLocalStorage &&
    filmsWatchedInLocalStorage.length &&
    findMoveInArray(filmsWatchedInLocalStorage) === selectedFilms.id
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
    toQueueArray = toQueueArray.filter(el => el.id !== selectedFilms.id);
  } else {
    toQueueArray.push(selectedFilms);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
  monitorButtonStatusText();
};

const toggleToWatched = () => {
  console.log(selectedFilms);
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
    toWatchedArray = toWatchedArray.filter(el => el.id !== selectedFilms.id);
  } else {
    toWatchedArray.push(selectedFilms);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
  monitorButtonStatusText();
};

export {
  toggleToQueue,
  toggleToWatched,
  monitorButtonStatusText,
  dataFromLibrary,
};
/////////////
