import filmsListTpl from '../templates/films-list-tpl.hbs';

const filmsListRef = document.querySelector('.js-films-list');

let renderFilms;
let genres;
let pageNumber = 1;
const apiKey = 'fa9fa54083c479003851c965e04509d5';

const createCardFunc = (imgPath, filmTitle, movieId) => {
  renderFilms = [
    {
      backdrop_path: imgPath,
      title: filmTitle,
      id: movieId,
    },
  ];
  filmsListRef.insertAdjacentHTML('beforeend', filmsListTpl(renderFilms));
};

filmsListRef.addEventListener('click', activeDetailsPage(movieId, false));

const fetchPopularMoviesList = (page = 1) => {
  const urlForPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=${page}`;
  fetch(urlForPopularMovies)
    .then(res => res.json())
    .then(data => {
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

fetchPopularMoviesList();

fetchGenres();
