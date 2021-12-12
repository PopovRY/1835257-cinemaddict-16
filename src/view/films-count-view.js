import {createElement} from '../render';

const createFooterFilmsCount = (filmsCount) => (
  `<section class="footer__statistics">
  <p>${filmsCount} movies inside</p>
</section>`
);

export default class FooterFilmsCount {
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
    return createFooterFilmsCount(this.#films);
  }

  removeElement() {
    this.#element = null;
  }
}
