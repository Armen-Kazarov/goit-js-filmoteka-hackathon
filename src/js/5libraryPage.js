import itemsLibraryTemplate from '../templates/itemLibraryTemplate.hbs';
// import { apiKey } from '../js/1initialHomePage';
const libraryListRef = document.querySelector('.js-films-list');
const queueBtnRef = document.querySelector('.js-btnQueue');
const watchedBtnRef = document.querySelector('.js-btnWatched');

const filmsFromLibrary = movieId => {
  const urlForLibraryFilm = `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa9fa54083c479003851c965e04509d5`;
  fetch(urlForLibraryFilm)
    .then(res => res.json())
    .then(data => {createLibraryCardFunc(data)})
   
};
const createLibraryCardFunc = data => {
const arr = [data]
  libraryListRef.insertAdjacentHTML("beforeend", itemsLibraryTemplate(arr));
};

const drawQueueFilmList = () => {
  queueBtnRef.classList.add('btn__active');
  watchedBtnRef.classList.remove('btn__active');
  const localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have to queue movies to watch. Add them.</li>';
  } else {
    libraryListRef.innerHTML = '';
    localStorageData.map(id => filmsFromLibrary(id));
  }
};

const drawWatchedFilmList = () => {
  watchedBtnRef.classList.add('btn__active');
  queueBtnRef.classList.remove('btn__active');
  const localStorageData = JSON.parse(localStorage.getItem('filmsWatched'));
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have watched movies. Add them.</li>';
  } else {
    libraryListRef.innerHTML = '';
    localStorageData.map(id => filmsFromLibrary(id));
  }
};

export { createLibraryCardFunc, drawQueueFilmList, drawWatchedFilmList };
