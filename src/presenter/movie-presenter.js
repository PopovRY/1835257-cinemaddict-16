import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
import {COMMENTS_ARRAY} from '../mock/structures';
import {remove, render, RenderPosition} from '../utils/render';
import FilmsListContainer from '../view/films-list-container';
import {onEscKeyDown} from '../utils/utils';


export default class MoviePresenter {
  #popupContainer = null;
  #film = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #comments = COMMENTS_ARRAY;
  #filmContainer = null;

  constructor(filmContainer) {
    this.#filmContainer = filmContainer;
  }

  init = (film) => {
    this.#film = film;

    this.#filmCardComponent = new FilmCardView(film);
    this.#popupComponent = new FilmPopupView(film, this.#comments);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#popupComponent.setPopupClickHandler(this.#handlePopupClick);

    render(this.#filmContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);

  }

  #openPopup = () => {
    render( this.#filmContainer, this.#popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', (evt) => {
      onEscKeyDown(evt, this.#popupComponent,  this.#filmContainer);
    });
  };

  #closePopup = () => {
    remove(this.#popupComponent);
    document.removeEventListener('keydown', (evt) => {
      onEscKeyDown(evt, this.#popupComponent,  this.#filmContainer);
    });
  };

  #handleFilmCardClick = () => {
    this.#openPopup();
  }

  #handlePopupClick = () => {
    this.#closePopup();
  }


}


