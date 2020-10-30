import filmsListTpl from '../templates/films-list-tpl.hbs';

const filmsListRef = document.querySelector('.js-films-list');

let renderFilms;
let genres;
let pageNumber = 1;
const apiKey = 'fa9fa54083c479003851c965e04509d5';
const urlForGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

const createCardFunc = (imgPath, filmTitle, movieId) => {
  const arrayFilm = [
    {
      backdrop_path: imgPath,
      title: filmTitle,
      id: movieId,
    },
  ];
  filmsListRef.insertAdjacentHTML('beforeend', filmsListTpl(arrayFilm));
};

const fetchPopularMoviesList = (page = 1) => {
  const urlForPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  fetch(urlForPopularMovies)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(element => {
        createCardFunc(element.poster_path, element.title, element.id);
      });
    })
    .catch(error => console.log(error));
};

fetchPopularMoviesList();

const fetchGenres = () => {
  const urlForGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US&results=20`;
  fetch(urlForGenres)
    .then(res => res.json())
    .then(data => {
      genres = data.genres;
    })
    .catch(error => console.log(error));
};
