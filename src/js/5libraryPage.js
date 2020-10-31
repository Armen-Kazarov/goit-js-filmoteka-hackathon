import itemsLibraryTemplate from '../templates/itemLibraryTemplate.hbs';

const createLibraryElements = () => {
  const btnWrapperRef = document.querySelector('.search-wrapper');

  const serchFormRef = document.querySelector('.search-film');
  serchFormRef.classList('none');

  const btnBox = document.createElement('div');
  btnBox.classList = 'library__btn__box';

  const btnWatched = document.createElement('button');
  btnWatched.type = 'button';
  btnWatched.dataset.target = 'watched';
  btnWatched.classList = 'library__btn__box__item js-btnWatched';
  btnWatched.textContent = 'Watched';

  const btnQueue = document.createElement('button');
  btnQueue.type = 'button';
  btnQueue.dataset.target = 'queue';
  btnQueue.classList = 'library__btn__box__item js-btnQueue';
  btnQueue.textContent = 'Queue';

  btnBox.append(btnWatched, btnQueue);

  btnWrapperRef.append(btnBox);
};
createLibraryElements;

const libraryListRef = document.querySelector('.main-content');
const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  renderFilms = [
    {
      poster_path: imgPath,
      title: filmTitle,
      id: movieId,
      evaluation: voteAverage,
    },
  ];
  libraryListRef
    .innerHTML(itemsLibraryTemplate(renderFilms))
    .addEventListener('click', event =>
      event.target(activeDetailsPage(movieId, true)),
    );
};

const drawQueueFilmList = () => {
  let queueLibraryArr;
  const localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData.length !== 0 && localStorageData !== null) {
    queueLibraryArr = localStorageData.map(data => createLibraryCardFunc(data));
    libraryListRef.innerHTML = '';
    libraryListRef.append(...queueLibraryArr);
  } else {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have to queue movies to watch. Add them.</li>';
  }
};

const drawWatchedFilmList = () => {
  let watchedLibraryArr;
  const localStorageData = JSON.parse(localStorage.getItem('filmsWatched'));
  if (localStorageData.length !== 0 && localStorageData !== null) {
    watchedLibraryArr = localStorageData.map(data =>
      createLibraryCardFunc(data),
    );
    libraryListRef.innerHTML = '';
    libraryListRef.append(...watchedLibraryArr);
  } else {
    libraryListRef.innerHTML =
      '<li class="content__warning__message">You do not have watched movies. Add them.</li>';
  }
};
