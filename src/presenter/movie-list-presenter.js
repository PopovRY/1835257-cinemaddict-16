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
import HeadingFilmList from '../view/heading-film-list-view';

const siteBodyElement = document.querySelector('body');

export default class MovieListPresenter {
  #container = null;

  #sortComponent = new SortView();
  #filmComponent = new FilmsSectionView();
  #filmListComponent = new FilmListView();
  #filmContainerComponent = new FilmsListContainer();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsListExtraTopComponent = new FilmsListExtraView('Top rated');
  #filmsListExtraCommentedComponent = new FilmsListExtraView('Most commented');
  #filmTopRateComponent = new FilmTopView();
  #filmMostCommentedComponent = new FilmTopView();


  #films = [];
  #renderedFilmCount = FILM_CARD_COUNT;

  constructor(container) {
    this.#container = container;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#container, this.#sortComponent, RenderPosition.BEFOREEND);
    render(this.#container, this.#filmComponent, RenderPosition.BEFOREEND);
    render(this.#filmComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);
    this.#renderFilmList(this.#films);
    this.#renderShowMoreButton();
    this.#renderHeadingFilmList();
    this.#renderExtra();
  }


  #renderFilm = (film) => {
    const filmCardComponent = new FilmCardView(film);
    const popupComponent = new FilmPopupView(film, COMMENTS_ARRAY);

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

  #renderHeadingFilmList= () => {
    const headingFilmListComponent = new HeadingFilmList(this.#films);
    render(this.#filmListComponent, headingFilmListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmList = (films) => {
    for (let i = 0; i < Math.min(films.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(films[i]);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);

    this.#showMoreButtonComponent.setClickHandlerMoreBtn(this.#handleShowMoreButtonClick);
  }

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_CARD_COUNT);
    this.#renderedFilmCount += FILM_CARD_COUNT;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.removeElement();
    }

  }

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film, this.#filmContainerComponent));
  }

  #renderFilmsLogic = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_CARD_COUNT));
    if (this.#films.length > FILM_CARD_COUNT) {
      this.#renderShowMoreButton();
    }
  }


  #renderExtra = () => {
    render(this.#filmComponent, this.#filmsListExtraTopComponent, RenderPosition.BEFOREEND);
    render(this.#filmsListExtraTopComponent, this.#filmTopRateComponent, RenderPosition.BEFOREEND);

    render(this.#filmComponent, this.#filmsListExtraCommentedComponent, RenderPosition.BEFOREEND);
    render(this.#filmsListExtraCommentedComponent, this.#filmMostCommentedComponent, RenderPosition.BEFOREEND);

    for (const film of this.#films.slice(0, 2)) {
      this.#renderFilm(this.#filmTopRateComponent, film); //для отрисовки экстра вынести функцию рендер в отдельный компонент и добавить контейнер в параметр
      this.#renderFilm(this.#filmMostCommentedComponent, film);
    }
  }
}

