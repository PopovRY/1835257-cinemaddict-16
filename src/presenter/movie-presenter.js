import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
import {COMMENTS_ARRAY} from '../mock/structures';
import {remove, render, RenderPosition} from '../utils/render';
import FilmsListContainer from '../view/films-list-container';


export default class MoviePresenter {
  #popupContainer = null;
  #film = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #comments = COMMENTS_ARRAY;
  #filmContainerComponent = new FilmsListContainer();





  #films = [];



  constructor(container) {
    this.#popupContainer = container;
  }

  init = (film) => {
    this.#films = film;

    this.#filmCardComponent = new FilmCardView(film);
    this.#popupComponent = new FilmPopupView(film, this.#comments);

    render(this.#filmContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);

  }



  #openPopup = () => {
    render(this.#popupContainer, this.#popupComponent, RenderPosition.BEFOREEND);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(this.#popupComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.setFilmCardClickHandler(() => {
  openPopup();
  siteBodyElement.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
});

popupComponent.setPopupClickHandler(() => {
  remove(popupComponent);
  siteBodyElement.classList.remove('hide-overflow');
  document.removeEventListener('keydown', onEscKeyDown);
});


}
