import itemsLibraryTemplate from '../templates/itemLibraryTemplate.hbs';
import { activeDetailsPage } from './3navigation';
const libraryListRef = document.querySelector('.js-films-list');
const queueBtnRef= document.querySelector(".js-btnQueue")
const watchedBtnRef= document.querySelector(".js-btnWatched")
const createLibraryCardFunc = (data) => {
  renderFilms = [
    {
      poster_path: data.imgPath,
      title: data.filmTitle,
      id: data.movieId,
      evaluation: data.voteAverage,
    },
  ];
  libraryListRef.innerHTML(itemsLibraryTemplate(renderFilms));
};

const drawQueueFilmList = () => {
  let queueLibraryArr;
  const localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have to queue movies to watch. Add them.</li>';
  } else {
    queueLibraryArr = localStorageData.map(data => createLibraryCardFunc(data));
    libraryListRef.innerHTML = '';
    libraryListRef.append(...queueLibraryArr);
  }
};

const drawWatchedFilmList = () => {
  let watchedLibraryArr;
  const localStorageData = JSON.parse(localStorage.getItem('filmsWatched'));
  if (localStorageData === null || localStorageData.length === null) {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have watched movies. Add them.</li>';
  } else {
    watchedLibraryArr = localStorageData.map(data =>
      createLibraryCardFunc(data),
    );
    libraryListRef.innerHTML = '';
    libraryListRef.append(...watchedLibraryArr);
  }
};

libraryListRef.addEventListener('click', event =>
  event.target(activeDetailsPage(movieId, true)),
);

export { createLibraryCardFunc, drawQueueFilmList, drawWatchedFilmList };
