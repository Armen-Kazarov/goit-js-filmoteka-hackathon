import itemsLibraryTemplate from '../templates/itemLibraryTemplate.hbs';

function createDOMElements() {
  const mainRef = document.querySelector('.main');

  const myLibrary = document.createElement('section');
  myLibrary.classList = 'library';

  const btnWrapper = document.createElement('div');
  btnWrapper.classList = 'library__btn__wrapper';

  const btnBox = document.createElement('div');
  btnBox.id = 'myLibraryButtons';
  btnBox.classList = 'library__btn__box';

  const btnWatched = document.createElement('button');
  btnWatched.type = 'button';
  btnWatched.dataset.target = 'watched';
  btnWatched.classList = 'library__btn__item';
  btnWatched.textContent = 'Watched';

  const btnQueue = document.createElement('button');
  btnQueue.type = 'button';
  btnQueue.dataset.target = 'queue';
  btnQueue.classList = 'library__btn__item';
  btnQueue.textContent = 'Queue';

  const libraryList = document.createElement('ul');
  libraryList.classList = 'library__list flex-container container';

  btnBox.append(btnWatched, btnQueue);
  btnWrapper.append(btnBox);
  myLibrary.append(btnWrapper, libraryList);

  mainRef.classList.toggle('container', false);
  mainRef.append(myLibrary);
}

createDOMElements();

const libraryListRef = document.querySelector('.library__list');

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
  let itemLibraryArr;
  const localStorageData = JSON.parse(localStorage.getItem('filmsQueue'));
  if (localStorageData.length !== 0 && localStorageData !== null) {
    itemLibraryArr = localStorageData.map(createLibraryCardFunc);
    libraryListRef.innerHTML = ""
    libraryListRef.append(...itemLibraryArr)
  } else {}
};
