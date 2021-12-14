import {createElement} from '../render';

const createFilmListTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);

export default class FilmList {
  #element = null;
  #films = null;

  constructor(films) {
    this.#films = films;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmListTemplate(this.#films);
  }

  removeElement() {
    this.#element = null;
  }
}
