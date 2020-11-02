import {filmsListRef, renderFilms, genres, pageNumberObj, apiKey, createCardFunc, fetchPopularMoviesList, fetchGenres} from './1initialHomePage.js';
import {showDetails} from './4filmDetailsPage';
import {createLibraryCardFunc, createLibraryBtnElements, drawQueueFilmList, drawWatchedFilmList} from './5libraryPage.js';
import filmCard from '../templates/detailsPage.hbs'

let moveId = null;
const searchRef = document.querySelector('.search-wrapper')
const exChange = document.querySelector('.js-films-list');

const mainRef = document.querySelector('.main');

const formaRef = document.querySelector('.search-film');

const libraryBtnRef = document.querySelector('.library__btn__wrapper');
const libraryBtnItemRef = document.querySelector('.js-btnQueue');
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

function activeLibraryPage() {
  exChange.innerHTML = '';
  formaRef.classList.add('js-display__none');
  libraryBtnRef.classList.remove('js-display__none');
  drawQueueFilmList();
  libraryBtnItemRef.classList.add('btn__active');
  const buttonQueue = document.querySelector('.js-btnQueue');
  const buttonWatched = document.querySelector('.js-btnWatched');
  buttonQueue.setAttribute('active', true);
  // buttonQueue.addEventListener('click');
  // buttonWatched.addEventListener('click');
}

// exChange.addEventListener('click', activeDetailsPage);
filmsListRef.addEventListener('click', activeDetailsPage);
// filmsListRef.addEventListener('click', activeDetailsPage);



function createCardFilmFunc (poster_path, original_title, release_date, vote_average,vote_count, popularity, genres, overview) {
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
function activeDetailsPage(event) {
  exChange.innerHTML = '';
  searchRef.classList.add('js-display__none');
  if (event.target.nodeName !== "LI") {
    return;
  };

  let movieId = event.target.getAttribute('id');
  console.log(movieId);
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
          data.overview
        );
    });
  };
  selectedFilm();
  const detailsQueue = document.querySelector('.details__queue');
  const detailsWatched = document.querySelector('.details__watched');
  detailsQueue.addEventListener('click', fetchGenres());
  detailsWatched.addEventListener('click', showDetails(selectFilm));
};

// exChange.classList.add('hideAllLi');
// mainRef.insertAdjacentHTML('beforeend', showDetails);

// function activeDetailsPage(movieId, bool) {

  // mainRef.insertAdjacentHTML('beforeend', showDetails);

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

export {
  activeDetailsPage
}
