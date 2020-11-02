import {filmsListRef, renderFilms, genres, pageNumberObj, apiKey, createCardFunc, fetchPopularMoviesList, fetchGenres} from './1initialHomePage.js';
import {showDetails} from './4filmDetailsPage';
import {createLibraryCardFunc, createLibraryBtnElements, drawQueueFilmList, drawWatchedFilmList} from './5libraryPage.js';

// let selectFilm;

let moveId = null;
const searchRef = document.querySelector('.search-wrapper');
const exChange = document.querySelector('.js-films-list');
const mainRef = document.querySelector('.main');

const formaRef = document.querySelector('.search-film');

const libraryBtnRef = document.querySelector('.library__btn__wrapper');
const libraryBtnItemRef = document.querySelector('.js-btnQueue');
const home = document.querySelector('.home-button');
home.addEventListener('click', activeHomePage);

const hederName = document.querySelector('.logo');
const paginationHidenRef = document.querySelector('.pagination');

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
function activeDetailsPage(event) {
  event.preventDefault();
  exChange.innerHTML = '';
  // if (event.target.nodeName !== "LI") {
  //   return;
  // };

  // let selectFilm;
  let movieId = event.target.getAttribute('id');
  console.log(movieId);

  const selectFilm = () => {
    const urlForSelectFilm = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    fetch(urlForSelectFilm)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return data

      })
      .catch(error => console.log(error));
    };
 // selectFilm()
  //showDetails(selectFilm);
}

// const detailsQueue = document.querySelector('.film-item');
// const detailsWatched = document.querySelector('.details__watched');

// function activeDetailsPage(movieId, bool) {

  // exChange.classList.add('hideAllLi');
  // mainRef.insertAdjacentHTML('beforeend', showDetails);

  // const detailsQueue = document.querySelector('.details__queue');
  // const detailsWatched = document.querySelector('.details__watched');
  // const detailsQueue = document.querySelector('.film-item');
  // const detailsWatched = document.querySelector('.details__watched');

  // detailsQueue.addEventListener('click', fetchGenres());
  // detailsWatched.addEventListener('click', showDetails(selectFilm));
// };


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
  activeDetailsPage,
}
