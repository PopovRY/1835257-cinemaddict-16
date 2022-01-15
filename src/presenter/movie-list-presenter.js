import SortView from '../view/sort-view';
import FilmsSectionView from '../view/films-section-view';
import FilmListView from '../view/film-list-view';
import FilmsListContainer from '../view/films-list-container';
import ShowMoreButtonView from '../view/more-button-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmTopView from '../view/film-top-view';
import {remove, render, RenderPosition} from '../utils/render';
import {FILM_CARD_COUNT} from '../main';
import HeadingFilmList from '../view/heading-film-list-view';
import MoviePresenter from './movie-presenter';
import {sortByDate, sortByRating, updateItem} from '../utils/utils';
import {SortType} from '../utils/const';


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
  #moviePresenter = new Map();
  #currentSortType = SortType.DEFAULT;


  #films = [];
  #sourcedFilms = [];
  #renderedFilmCount = FILM_CARD_COUNT;

  constructor(container) {
    this.#container = container;
  }

  init = (films) => {
    this.#films = [...films];
    this.#sourcedFilms = [...films];

    render(this.#container, this.#sortComponent, RenderPosition.BEFOREEND);
    render(this.#container, this.#filmComponent, RenderPosition.BEFOREEND);
    render(this.#filmComponent, this.#filmListComponent, RenderPosition.BEFOREEND);
    render(this.#filmListComponent, this.#filmContainerComponent, RenderPosition.BEFOREEND);
    this.#renderFilmList(this.#films);
    this.#renderShowMoreButton();
    this.#renderHeadingFilmList();
  }

  #clickSort = () => {
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  }

  #renderFilm = (film) => {
    const moviePresenter = new MoviePresenter(this.#filmContainerComponent, this.#handleFilmChange);
    moviePresenter.init(film);
    this.#moviePresenter.set(film.id, moviePresenter);
  };

  #renderHeadingFilmList= () => {
    const headingFilmListComponent = new HeadingFilmList(this.#films);
    render(this.#filmListComponent, headingFilmListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmList = () => {
    this.#clickSort();
    this.#renderHeadingFilmList();
    this.#renderFilmsLogic();
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

  #clearFilmList = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderedFilmCount = FILM_CARD_COUNT;
    remove(this.#showMoreButtonComponent);
  }

  #renderFilmsLogic = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_CARD_COUNT));
    if (this.#films.length > FILM_CARD_COUNT) {
      this.#renderShowMoreButton();
    }
  }

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#moviePresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.BY_DATE:
        this.#films.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this.#films.sort(sortByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
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

