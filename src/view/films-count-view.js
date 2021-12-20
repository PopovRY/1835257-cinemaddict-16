import AbstractView from './abstract-view';

const createFooterFilmsCount = (filmsCount) => (
  `<section class="footer__statistics">
  <p>${filmsCount} movies inside</p>
</section>`
);

export default class FilmsCountView extends AbstractView{
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template(){
    return createFooterFilmsCount(this.#films);
  }
}
