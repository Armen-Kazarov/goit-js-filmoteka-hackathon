import itemsLibraryTemplate from '../templates/itemLibraryTemplate.hbs';

const libraryListRef = document.querySelector('.js-films-list');
const queueBtnRef = document.querySelector('.js-btnQueue');
const watchedBtnRef = document.querySelector('.js-btnWatched');

const createLibraryCardFunc = data => {
  libraryListRef.innerHTML = (itemsLibraryTemplate(data));

};

const drawQueueFilmList = () => {
  let queueLibraryArr;
  queueBtnRef.classList.add('btn__active');
  watchedBtnRef.classList.remove('btn__active');
  const localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have to queue movies to watch. Add them.</li>';
  } else {
    libraryListRef.innerHTML = '';
    createLibraryCardFunc(localStorageData);
  }
};

const drawWatchedFilmList = () => {
  let watchedLibraryArr;
  watchedBtnRef.classList.add('btn__active');
  queueBtnRef.classList.remove('btn__active');
  const localStorageData = JSON.parse(localStorage.getItem('filmsWatched'));
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have watched movies. Add them.</li>';
  } else {
    libraryListRef.innerHTML = '';
    createLibraryCardFunc(localStorageData);}
}; 

export { createLibraryCardFunc, drawQueueFilmList, drawWatchedFilmList }
