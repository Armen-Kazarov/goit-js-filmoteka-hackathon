import {
//   mainSectionRef,
//   filmsListRef,
//   renderFilms,
//   genres,
     pageNumberObj,
     apiKey,
//   createCardFunc,
//   fetchPopularMoviesList,
//   fetchGenres,
} from './1initialHomePage.js'
//const apiKey = 'fa9fa54083c479003851c965e04509d5';
let inputValue = '';

const searchFormRef = document.querySelector('.search-film');
const searchInputRef = document.querySelector('.search-film__input');
const btnPrevPageRef = document.querySelector('.btn-prev');
const btnNextPageRef = document.querySelector('.btn-next');
// const currentPageRef = document.querySelector('.current-page');
const paginationRef = document.querySelector('.pagination');
// const filmsListRef = document.querySelector('.js-films-list');
const formPageInputRef = document.querySelector('.page-input');
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
    let poster = element.backdrop_path;
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
    fetchPopularMoviesListWithServices(pageNumberObj.pageNumber);
  }
}

function fetchFilms() {
  const url = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&page=${pageNumberObj.pageNumber}&api_key=${apiKey}`;
  console.log(url);
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
        let markup = `<h2 class='no-results'>По вашему запросу ничего не найдено!</h2>`;
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
  fetchFilms().then(data => {
    serviceData(data);
    // renderMarkup(data);
  });
});

btnPrevPageRef.addEventListener('click', () => {
  pageNumberObj.pageNumber -= 1;
  fetchFilms().then(data => {
    serviceData(data);
    // renderMarkup(data);
  });
});

/////////////////////////////////////////////////////////

formPageInputRef.addEventListener('submit', event => {
  event.preventDefault();
  const inputPageNumber = Math.abs(parseInt(currentPageRef.value));
  inputPageNumber <= totalPages
    ? (pageNumberObj.pageNumber = inputPageNumber)
    : (pageNumberObj.pageNumber = totalPages);
  currentPageRef.value = '';

  currentPageRef.value = '';
  plaginationNavigation();
});

paginationRef.addEventListener('click', event => {
  const { target } = event;
  if (target.id === 'btn-prev') {
    pageNumberObj.pageNumber -= 1;
    plaginationNavigation();
  }
  
  if (target.id === 'btn-next') {
    pageNumberObj.pageNumber += 1;
    plaginationNavigation();
  }
});