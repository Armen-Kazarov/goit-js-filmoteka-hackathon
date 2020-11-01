// import filmsSearchTpl from '../templates/film-searchl.hbs';
// import filmsListTpl from '../templates/films-list-tpl.hbs';
import {
  //   mainSectionRef,
  //   filmsListRef,
  //   renderFilms,
  //   genres,
  pageNumberObj,
  apiKey,
  createCardFunc,
  fetchPopularMoviesList,
  //   fetchGenres,
} from './1initialHomePage.js';
//const apiKey = 'fa9fa54083c479003851c965e04509d5';
let inputValue = '';
//let pageNumber = 1;
let totalPages = 0;

const searchFormRef = document.querySelector('.search-film');
const searchInputRef = document.querySelector('.search-film__input');
const btnPrevPageRef = document.querySelector('.btn-prev');
const btnNextPageRef = document.querySelector('.btn-next');
const currentPageRef = document.querySelector('.current-page');
const paginationRef = document.querySelector('.pagination');
const filmListRef = document.querySelector('.js-films-list');
const formPageInputRef = document.querySelector('.page-input');

// const searchWrapperRef = document.querySelector('.search-wrapper');
// let markup = filmsSearchTpl();
// console.log(markup);
// searchWrapperRef.insertAdjacentHTML('beforeend', markup);
const serviceData = data => {
  paginationRef.classList.remove('is-hidden');
  data.page === 1
    ? btnPrevPageRef.classList.add('is-hidden')
    : btnPrevPageRef.classList.remove('is-hidden');
  data.page === data.total_pages
    ? btnNextPageRef.classList.add('is-hidden')
    : btnNextPageRef.classList.remove('is-hidden');
};

function createFilmList(data) {
  filmListRef.innerHTML = '';
  data.results.forEach(element => {
    let poster = element.backdrop_path;
    createCardFunc(poster, element.title, element.id);
  });
  serviceData(data);
}

function fetchPopularMoviesListWithServices(pageNumber) {
  filmListRef.innerHTML = '';
  fetchPopularMoviesList(pageNumber).then(data => {
    serviceData(data);
  });
}

function battonToggle() {
  if (inputValue) {
    fetchFilms().then(data => {
      createFilmList(data);
      // serviceData(data);
      // renderMarkup(data);
    });
  } else {
    fetchPopularMoviesListWithServices(pageNumberObj.pageNumber);
  }
}
////////////////////////

// console.dir(fetchPopularMoviesList(2));

function fetchFilms() {
  const url = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&page=${pageNumberObj.pageNumber}&api_key=${apiKey}`;
  // console.log(url);
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      totalPages = data.total_pages;
      currentPageRef.setAttribute('placeholder', pageNumberObj.pageNumber);
      return data;
    })
    .catch('Произошла ошибка');
}

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  inputValue = searchInputRef.value;
  pageNumberObj.pageNumber = 1;
  filmListRef.innerHTML = '';
  if (inputValue) {
    fetchFilms().then(data => {
      if (data.total_pages > 1) {
        createFilmList(data);
      } else {
        let markup = `<h2 class='no-results'>По вашеме запросу ничего не найдено!</h2>`;
        filmListRef.insertAdjacentHTML('beforeend', markup);
        paginationRef.classList.add('is-hidden');
      }
    });
  } else {
    pageNumberObj.pageNumber = 1;
    fetchPopularMoviesListWithServices(pageNumberObj.pageNumber);
  }
});

btnNextPageRef.addEventListener('click', () => {
  pageNumberObj.pageNumber += 1;
  battonToggle();
});

btnPrevPageRef.addEventListener('click', () => {
  pageNumberObj.pageNumber -= 1;
  battonToggle();
});

/////////////////////////////////////////////////////////

formPageInputRef.addEventListener('submit', event => {
  event.preventDefault();
  const inputPageNumber = Math.abs(parseInt(currentPageRef.value));
  inputPageNumber <= totalPages
    ? (pageNumberObj.pageNumber = inputPageNumber)
    : (pageNumberObj.pageNumber = totalPages);
  currentPageRef.value = '';
  battonToggle();
});

// export { serviceData };
