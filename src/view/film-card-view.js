//Карточка фильма (в списке)

import {getCorrectWord, getDate} from '../utils.js';
import {createElement} from '../render';

const createFilmCardTemplate = (film) => {
  const {title, runtime, genres, description, poster} = film['filmInfo'];
  const rating = film['filmInfo']['totalRating'];
  const date = film['filmInfo']['release']['date'];
  const {watchlist} = film['userDetails'];
  const watchFilm = film['userDetails']['alreadyWatched'];
  const favorite = film['userDetails']['favorite'];

  const year = getDate(date, 'YYYY');

  const getTime = () => {
    const hours = Math.trunc(runtime/60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}м`;
  };

  const getDescription = () => {
    const correctText = description.length > 139 ? `${description.slice(0, 139)}...` : description;
    return correctText;
  };
  return `<article class="film-card">
  <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${getTime()}</span>
              <span class="film-card__genre">${genres.join(', ')}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${getDescription()}</p>
            <span class="film-card__comments">${film.comments.length} ${getCorrectWord(film.comments, 'comment')}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchFilm ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }


  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmCardTemplate(this.#film);
  }

  removeElement() {
    this.#element = null;
  }
}
