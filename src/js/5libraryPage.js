import itemsLibraryTemplate from '../templates/itemLibraryTemplate.hbs';
import { activeDetailsPage } from './3navigation';
const libraryListRef = document.querySelector('.js-films-list');
const queueBtnRef = document.querySelector('.js-btnQueue');
const watchedBtnRef = document.querySelector('.js-btnWatched');

const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  renderFilms = [
    {
      poster_path: data.imgPath,
      title: data.filmTitle,
      id: data.movieId,
      evaluation: data.voteAverage,
    },
  ];
  libraryListRef.innerHTML(itemsLibraryTemplate(renderFilms));
  // libraryListRef.addEventListener('click', event =>
  //   event.target(activeDetailsPage(movieId, true)),
  // );
};

const drawQueueFilmList = () => {
  let queueLibraryArr;
  queueBtnRef.classList.add('btn__active');
  watchedBtnRef.classList.remove('btn__active');
  const localStorageData = localStorage.getItem("filmsQueue");
  console.log(localStorageData);
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have to queue movies to watch. Add them.</li>';
  } else {
    queueLibraryArr = localStorageData.map(data =>
      createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage),
    );
    libraryListRef.innerHTML = '';
    libraryListRef.append(...queueLibraryArr);
  }
};

const drawWatchedFilmList = () => {
  let watchedLibraryArr;
  watchedBtnRef.classList.add('btn__active');
  queueBtnRef.classList.remove('btn__active');
  const localStorageData = localStorage.getItem('filmsWatched');
  console.dir(localStorageData);
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have watched movies. Add them.</li>';
  } else {
    watchedLibraryArr = localStorageData.map(data =>
      createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage),
    );
    libraryListRef.innerHTML = '';
    libraryListRef.append(...watchedLibraryArr);
  }
};

// libraryListRef.addEventListener('click', event =>
//   event.target(activeDetailsPage(movieId, true)),
// );

export { createLibraryCardFunc, drawQueueFilmList, drawWatchedFilmList };
