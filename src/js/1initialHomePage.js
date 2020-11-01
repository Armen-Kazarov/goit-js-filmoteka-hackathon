'use strict';
import filmsListTpl from '../templates/films-list-tpl.hbs';
import { activeDetailsPage } from './3navigation';
const filmsListRef = document.querySelector('.js-films-list');

filmsListRef.classList.add('films-list');
filmsListRef.classList.add('flex-container');

let renderFilms = [];
let genres;
const pageNumberObj = {
  pageNumber: 2,
};
const apiKey = 'fa9fa54083c479003851c965e04509d5';

function createCardFunc(imgPath, filmTitle, movieId) {
  renderFilms = [
    {
      backdrop_path: imgPath,
      title: filmTitle,
      id: movieId,
    },
  ];
  filmsListRef.insertAdjacentHTML('beforeend', filmsListTpl(renderFilms));
  filmsListRef.addEventListener('click', event => { if (event.target.nodeName === "LI")
  {
    event.target(activeDetailsPage(console.log(movieId), true))
  }}
   
  );
}

const fetchPopularMoviesList = (page = 1) => {
  const urlForPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=${page}`;
  fetch(urlForPopularMovies)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.results.forEach(element => {
        const date1 = new Date(`${element.release_date} 00:00:00`);
        createCardFunc(
          element.backdrop_path,
          `${element.title} (${date1.getFullYear()})`,
          element.id,
        );
      });
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
