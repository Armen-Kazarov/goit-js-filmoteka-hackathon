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

  mainRef.append(myLibrary);
}

//createDOMElements()
