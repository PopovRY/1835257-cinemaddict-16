import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
import {COMMENTS_ARRAY} from '../mock/structures';
import {remove, render, RenderPosition} from '../utils/render';
import {onEscKeyDown, replace} from '../utils/utils';


export default class MoviePresenter {
  #film = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #comments = COMMENTS_ARRAY;
  #filmContainer = null;
  #changeData = null;

  constructor(filmContainer, changeData) {
    this.#filmContainer = filmContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#popupComponent = new FilmPopupView(film, this.#comments);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setHistoryClickHandler(this.#handleHistoryClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#popupComponent.setPopupClickHandler(this.#handlePopupClick);
    this.#popupComponent.setPopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setPopupHistoryClickHandler(this.#handleHistoryClick);
    this.#popupComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this.#filmContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmContainer.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#filmContainer.element.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }


  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
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

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film, 'userDetails': {...this.#film.userDetails,'watchlist' : !this.#film.userDetails.watchlist}});
  }

  #handleHistoryClick = () => {
    this.#changeData({...this.#film, 'userDetails': {...this.#film.userDetails,'alreadyWatched': !this.#film.userDetails.alreadyWatched}});
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, 'userDetails': {...this.#film.userDetails,'favorite': !this.#film.userDetails.favorite}});
  }


}


