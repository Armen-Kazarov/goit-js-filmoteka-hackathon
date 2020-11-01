import {fetchPopularMoviesList} from './1initialHomePage.js';
import {showDetails} from './4filmDetailsPage';
import {createLibraryCardFunc, createLibraryBtnElements, drawQueueFilmList, drawWatchedFilmList} from './5libraryPage.js';

let selectFilm;

const exChange = document.querySelector('.js-films-list');

const mainRef = document.querySelector('.main');

const formaRef = document.querySelector('.search-film');

const libraryBtnRef = document.querySelector('.library__btn__wrapper');

const home = document.querySelector('.home-button');
home.addEventListener('click', activeHomePage);

const hederName = document.querySelector('.logo');
hederName.addEventListener('click', activeHomePage);

function activeHomePage() {
  exChange.innerHTML = '';
  libraryBtnRef.classList.add('js-display__none');
  formaRef.classList.remove('js-display__none');
  fetchPopularMoviesList();
  //.addEventListener('click', кнопки пагинации);
  //.addEventListener('click', кнопки пагинации);
}

const library = document.querySelector('.library-button');
library.addEventListener('click', activeLibraryPage);

<<<<<<< HEAD
function activeLibraryPage () {n
  exChange.innerHTML = '';
  createLibraryCardFunc();
  createLibraryBtnElements();
=======
function activeLibraryPage() {
  exChange.innerHTML = '';
  formaRef.classList.add('js-display__none');
  libraryBtnRef.classList.remove('js-display__none');
>>>>>>> ccbfd2ef36327255a2bd6f5bbeaca382a07ee9dd
  drawQueueFilmList();
  const buttonQueue = document.querySelector('.js-btnQueue');
  const buttonWatched = document.querySelector('.js-btnWatched');
  buttonQueue.setAttribute('active', true);
<<<<<<< HEAD
  // buttonQueue.addEventListener('click', )
  // buttonWatched.addEventListener('click', )
};
=======
  buttonQueue.addEventListener('click');
  buttonWatched.addEventListener('click');
}
>>>>>>> ccbfd2ef36327255a2bd6f5bbeaca382a07ee9dd

function activeDetailsPage(movieId) {
  exChange.classList.add('hideAllLi');
  showDetails(selectFilm);
  mainRef.insertAdjacentHTML('beforeend', showDetails);
  const detailsQueue = document.querySelector('.details__queue');
  const detailsWatched = document.querySelector('.details__watched');
<<<<<<< HEAD
  // detailsQueue.addEventListener('click', )
  // detailsWatched.addEventListener('click', )
};

const selectFilms =
(function () {
=======
  detailsQueue.addEventListener('click');
  detailsWatched.addEventListener('click');
}

const selectFilms = (function () {
>>>>>>> ccbfd2ef36327255a2bd6f5bbeaca382a07ee9dd
  const trackScroll = () => {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back_to_top-show');
    }
  };

  const backToTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  };

  const goTopBtn = document.querySelector('.back_to_top');
  goTopBtn.addEventListener('click', backToTop);
  window.addEventListener('scroll', trackScroll);
})();

<<<<<<< HEAD
export default {
  selectFilm
}
=======
export {
  activeDetailsPage
}
>>>>>>> ccbfd2ef36327255a2bd6f5bbeaca382a07ee9dd
