import {
  filmsListRef,
  renderFilms,
  genres,
  pageNumberObj,
  apiKey,
  createCardFunc,
  fetchPopularMoviesList,
  fetchGenres,
} from './1initialHomePage.js';
import { toggleToQueue, toggleToWatched } from './4filmDetailsPage';
import {
  createLibraryCardFunc,
  createLibraryBtnElements,
  drawQueueFilmList,
  drawWatchedFilmList,
} from './5libraryPage.js';
import filmCard from '../templates/detailsPage.hbs';

let moveId = null;

const searchRef = document.querySelector('.search-wrapper');
const exChange = document.querySelector('.js-films-list');
const mainRef = document.querySelector('.main');
const formaRef = document.querySelector('.search-film');
const library = document.querySelector('.library-button');
const libraryBtnRef = document.querySelector('.library__btn__wrapper');
const libraryBtnItemRef = document.querySelector('.js-btnQueue');
const home = document.querySelector('.home-button');
const hederName = document.querySelector('.logo');
const paginationHidenRef = document.querySelector('.pagination');

const activeHomePage = () => {
  exChange.innerHTML = '';
  paginationHidenRef.classList.remove('js-display__none');
  libraryBtnRef.classList.add('js-display__none');
  formaRef.classList.remove('js-display__none');
  fetchPopularMoviesList();
  //.addEventListener('click', кнопки пагинации);
  //.addEventListener('click', кнопки пагинации);
};
home.addEventListener('click', activeHomePage);
hederName.addEventListener('click', activeHomePage);

const activeLibraryPage = () => {
  exChange.innerHTML = '';
  formaRef.classList.add('js-display__none');
  libraryBtnRef.classList.remove('js-display__none');
  paginationHidenRef.classList.add('js-display__none');
  drawQueueFilmList();
  const buttonQueue = document.querySelector('.js-btnQueue');
  const buttonWatched = document.querySelector('.js-btnWatched');
  buttonQueue.setAttribute('active', true);
  buttonQueue.addEventListener('click', drawQueueFilmList);
  buttonWatched.addEventListener('click', drawWatchedFilmList);
};
library.addEventListener('click', activeLibraryPage);

const createCardFilmFunc = (
  poster_path,
  original_title,
  release_date,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
) => {
  const renderFilm = [
    {
      poster_path: poster_path,
      original_title: original_title,
      release_date: release_date,
      vote_average: vote_average,
      vote_count: vote_count,
      popularity: popularity,
      genres: genres,
      overview: overview,
    },
  ];
  filmsListRef.insertAdjacentHTML('beforeend', filmCard(renderFilm));
};

const activeDetailsPage = event => {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  exChange.innerHTML = '';
  formaRef.classList.add('js-display__none');
  paginationHidenRef.classList.add('js-display__none');
  let movieId = event.target.getAttribute('id');

  const selectedFilm = () => {
    const urlForSelectFilm = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    fetch(urlForSelectFilm)
      .then(res => res.json())
      .then(data => {
        createCardFilmFunc(
          data.poster_path,
          data.original_title,
          data.release_date,
          data.vote_average,
          data.vote_count,
          data.popularity,
          data.genres,
          data.overview,
        );
      });
  };
  selectedFilm();

  const detailsQueue = document.querySelector('.details__queue');
  const detailsWatched = document.querySelector('.details__watched');
  detailsQueue.addEventListener('click', toggleToQueue(selectFilm));
  detailsWatched.addEventListener('click', toggleToWatched(selectFilm));
};
filmsListRef.addEventListener('click', activeDetailsPage);

// const detailsQueue = document.querySelector('.film-item');
// const detailsWatched = document.querySelector('.details__watched');

const selectFilms = (function () {
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

export { activeDetailsPage };
