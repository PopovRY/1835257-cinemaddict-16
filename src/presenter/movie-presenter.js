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
  #filmContainerComponent = null;

  constructor(filmContainerComponent) {
    this.#filmContainerComponent = filmContainerComponent;
  }

  init = (film) => {
    this.#film = film;

    this.#filmCardComponent = new FilmCardView(film);
    this.#popupComponent = new FilmPopupView(film, this.#comments);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#popupComponent.setPopupClickHandler(this.#handlePopupClick);

    render(this.#filmContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);

  }

  #openPopup = () => {
    render( this.#popupContainer, this.#popupComponent, RenderPosition.BEFOREEND);
    this.#popupContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', (evt) => {
      onEscKeyDown(evt, this.#popupComponent,  this.#popupContainer);
    });
  };

  #closePopup = () => {
    remove(this.#popupComponent);
    this.#popupContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', (evt) => {
      onEscKeyDown(evt, this.#popupComponent,  this.#popupContainer);
    });
  };

  #handleFilmCardClick = () => {
    this.#openPopup();
  }

  #handlePopupClick = () => {
    this.#closePopup();
  }


}


