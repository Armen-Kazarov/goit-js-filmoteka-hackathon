'use strict';
import filmsListTpl from '../templates/films-list-tpl.hbs';
import { activeDetailsPage } from './3navigation';
const filmsListRef = document.querySelector('.js-films-list');

filmsListRef.classList.add('films-list');
filmsListRef.classList.add('flex-container');

let renderFilms = [];
let genres;
const pageNumberObj = {
  pageNumber: 1,
};
const apiKey = 'fa9fa54083c479003851c965e04509d5';

function createCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  renderFilms = [
    {
      backdrop_path: imgPath,
      title: filmTitle,
      id: movieId,
      vote_average: voteAverage,
    },
  ];
  console.log('wer');
  filmsListRef.insertAdjacentHTML('beforeend', filmsListTpl(renderFilms));
}

const fetchPopularMoviesList = (page = 1) => {
  const urlForPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=${page}`;
  return fetch(urlForPopularMovies) ////////////////////Artem
    .then(res => res.json())
    .then(data => {
      data.results.forEach(element => {
        const date1 = new Date(`${element.release_date} 00:00:00`);
        createCardFunc(
          element.backdrop_path,
          `${element.title} (${date1.getFullYear()})`,
          element.id,
          element.vote_average,
        );
      });
      currentPageRef.setAttribute('placeholder', pageNamberObj.pageNumber); /////////Artem
      return data; //////////////////Artem
    })
    .catch(error => console.log(error));
};

const fetchGenres = () => {
  const urlForGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US&results=20`;
  fetch(urlForGenres)
    .then(res => res.json())
    .then(data => {
      genres = data.genres;
    })
    .catch(error => console.log(error));
};
// fetchPopularMoviesList();

fetchPopularMoviesList(pageNumberObj.pageNumber);

fetchGenres();

// filmsListRef.addEventListener('click', activeDetailsPage(movieId, false));
export {
  filmsListRef,
  renderFilms,
  genres,
  pageNumberObj,
  apiKey,
  createCardFunc,
  fetchPopularMoviesList,
  fetchGenres,
};