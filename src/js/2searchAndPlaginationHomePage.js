import {
  currentPageRef,
  filmsListRef,
  //   renderFilms,
  pageNamberObj,
  apiKey,
  createCardFunc,
  fetchPopularMoviesList,
} from './1initialHomePage.js';
let inputValue = '';
let totalPages = 0;

const searchFormRef = document.querySelector('.search-film');
const searchInputRef = document.querySelector('.search-film__input');
const btnPrevPageRef = document.querySelector('.btn-prev');
const btnNextPageRef = document.querySelector('.btn-next');
// const currentPageRef = document.querySelector('.current-page');
const paginationRef = document.querySelector('.pagination');
// const filmsListRef = document.querySelector('.js-films-list');
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
  filmsListRef.innerHTML = '';
  data.results.forEach(element => {
    let poster = element.backdrop_path; /////////////???
    createCardFunc(poster, element.title, element.id);
  });
  serviceData(data);
}

function fetchPopularMoviesListWithServices(pageNumber) {
  filmsListRef.innerHTML = '';
  fetchPopularMoviesList(pageNumber).then(data => {
    serviceData(data);
  });
}

function plaginationNavigation() {
  if (inputValue) {
    fetchFilms().then(data => {
      createFilmList(data);
    });
  } else {
    fetchPopularMoviesListWithServices(pageNamberObj.pageNumber);
  }
}
////////////////////////

function fetchFilms() {
  const url = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&page=${pageNamberObj.pageNumber}&api_key=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      totalPages = data.total_pages;
      currentPageRef.setAttribute('placeholder', pageNamberObj.pageNumber);
      return data;
    })
    .catch('Произошла ошибка');
}

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  inputValue = searchInputRef.value;
  pageNamberObj.pageNumber = 1;
  filmsListRef.innerHTML = '';
  if (inputValue) {
    fetchFilms().then(data => {
      if (data.total_pages > 1) {
        createFilmList(data);
      } else {
        let markup = `<h2 class='no-results'>По вашеме запросу ничего не найдено!</h2>`;
        filmsListRef.insertAdjacentHTML('beforeend', markup);
        paginationRef.classList.add('is-hidden');
      }
    });
  } else {
    pageNamberObj.pageNumber = 1;
    fetchPopularMoviesListWithServices(pageNamberObj.pageNumber);
  }
});

/////////////////////////////////////////////////////////

formPageInputRef.addEventListener('submit', event => {
  event.preventDefault();
  const inputPageNumber = Math.abs(parseInt(currentPageRef.value));
  inputPageNumber <= totalPages
    ? (pageNamberObj.pageNumber = inputPageNumber)
    : (pageNamberObj.pageNumber = totalPages);
  currentPageRef.value = '';
  plaginationNavigation();
});

paginationRef.addEventListener('click', event => {
  const { target } = event;
  if (target.id === 'btn-prev') {
    pageNamberObj.pageNumber -= 1;
  }
  if (target.id === 'btn-next') {
    pageNamberObj.pageNumber += 1;
  }
  plaginationNavigation();
});
// export { serviceData };
