import {createElement} from '../render.js';

const createFilmListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmsListContainer {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmListContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
