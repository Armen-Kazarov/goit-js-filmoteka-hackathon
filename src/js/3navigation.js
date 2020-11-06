import {
  filmsListRef,
  pageNumberObj,
  apiKey,
  fetchPopularMoviesList,
} from './1initialHomePage.js';
import { monitorButtonStatusText } from './4filmDetailsPage';
import { drawQueueFilmList, drawWatchedFilmList } from './5libraryPage.js';
import filmCard from '../templates/detailsPage.hbs';
import { serviceData } from './2searchAndPlaginationHomePage.js';

const selectFilm = {
  id: '',
};

const exChange = document.querySelector('.js-films-list');
const formaRef = document.querySelector('.search-film');
const library = document.querySelector('.library-button');
const libraryBtnRef = document.querySelector('.library__btn__wrapper');
const home = document.querySelector('.home-button');
const hederName = document.querySelector('.logo');
const paginationHidenRef = document.querySelector('.pagination');
const mainSectionref = document.querySelector('.main');

const activeHomePage = () => {
  pageNumberObj.pageNumber = 1;
  pageNumberObj.inputValue = '';
  exChange.innerHTML = '';
  paginationHidenRef.classList.remove('js-display__none');
  libraryBtnRef.classList.add('js-display__none');
  formaRef.classList.remove('js-display__none');
  fetchPopularMoviesList().then(data => serviceData(data));
};
home.addEventListener('click', activeHomePage);
hederName.addEventListener('click', activeHomePage);

const activeLibraryPage = () => {
  exChange.innerHTML = '';
  formaRef.classList.add('js-display__none');
  libraryBtnRef.classList.remove('js-display__none');
  paginationHidenRef.classList.add('js-display__none');
  const buttonQueue = document.querySelector('.js-btnQueue');
  const buttonWatched = document.querySelector('.js-btnWatched');
  buttonQueue.addEventListener('click', drawQueueFilmList);
  buttonWatched.addEventListener('click', drawWatchedFilmList);
  drawQueueFilmList();
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
  mainSectionref.insertAdjacentHTML('beforeend', filmCard(renderFilm));
  monitorButtonStatusText();
};

const selectedFilm = movieId => {
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

const activeDetailsPage = event => {
  if (event.target.classList.contains('film-item')) {
    formaRef.classList.add('js-display__none');
    paginationHidenRef.classList.add('js-display__none');
    exChange.classList.add('js-display__none');
    selectFilm.id = event.target.getAttribute('id');
    selectedFilm(selectFilm.id);
  }
};
filmsListRef.addEventListener('click', activeDetailsPage);
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

export {
  activeDetailsPage,
  selectFilm,
  formaRef,
  exChange,
  paginationHidenRef,
};
