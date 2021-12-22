import SortView from '../view/sort-view';
import FilmCardView from '../view/film-card-view';
import FilmPopupView from '../view/film-popup-view';
import {COMMENTS_ARRAY} from '../mock/structures';
import FilmsSectionView from '../view/films-section-view';
import FilmListView from '../view/film-list-view';
import FilmsListContainer from '../view/films-list-container';
import ShowMoreButtonView from '../view/more-button-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmTopView from '../view/film-top-view';
import {remove, render, RenderPosition} from '../utils/render';
import {FILM_CARD_COUNT} from '../main';

const siteBodyElement = document.querySelector('body');

export default class MovieListPresenter {
  #container = null;

  #sortComponent = new SortView();
  #filmComponent = new FilmsSectionView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmsListContainer();


  #films = [];

  constructor(container) {
    this.#container = container;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#container, this.#sortComponent, RenderPosition.BEFOREEND);
    render(this.#container, this.#filmComponent, RenderPosition.BEFOREEND);
    render(this.#filmComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderFilm = (films) => {
    const filmCardComponent = new FilmCardView(films);
    const popupComponent = new FilmPopupView(films, COMMENTS_ARRAY);

    const openPopup = () => {
      render(siteBodyElement, popupComponent, RenderPosition.BEFOREEND);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        remove(popupComponent);
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

    render(this.#filmContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  };

  #renderFilmList = (container, films) => {
    render(container, this.#filmComponent, RenderPosition.BEFOREEND);

    const filmListComponent = new FilmListView(films);
    render(this.#filmComponent, filmListComponent, RenderPosition.BEFOREEND);
    render(filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(films.length, FILM_CARD_COUNT); i++) {
      this.#renderFilm(this.#filmContainerComponent, films[i]);
    }
  }

  #renderLoadMoreButton = () => {
    if (this.#films.length > FILM_CARD_COUNT) {
      let renderedFilmCount = FILM_CARD_COUNT;
      const showMoreButtonComponent = new ShowMoreButtonView();
      render(this.#filmListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

      showMoreButtonComponent.setClickHandlerMoreBtn(() => {
        this.#films
          .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT)
          .forEach((film) => this.#renderFilm(film));

        renderedFilmCount += FILM_CARD_COUNT;

        if (renderedFilmCount >= this.#films.length) {
          showMoreButtonComponent.remove();
          showMoreButtonComponent.removeElement();
        }
      });
    }
  }

  #renderExtra = () => {
    const filmsListExtraTopComponent = new FilmsListExtraView('Top rated');
    render(this.#filmComponent, filmsListExtraTopComponent, RenderPosition.BEFOREEND);
    const filmTopRateComponent = new FilmTopView();
    render(filmsListExtraTopComponent, filmTopRateComponent, RenderPosition.BEFOREEND);

    const filmsListExtraCommentedComponent = new FilmsListExtraView('Most commented');
    render(this.#filmComponent, filmsListExtraCommentedComponent, RenderPosition.BEFOREEND);
    const filmMostCommentedComponent = new FilmTopView();
    render(filmsListExtraCommentedComponent, filmMostCommentedComponent, RenderPosition.BEFOREEND);

    for (const film of this.#films.slice(0, 2)) {
      this.#renderFilm(filmTopRateComponent, film);
      this.#renderFilm(filmMostCommentedComponent, film);
    }
  }
}
