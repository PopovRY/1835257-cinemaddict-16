import UserProfileView from './view/user-profile-view.js';
import FilmCardView from './view/film-card-view.js';
import ShowMoreButtonView from './view/more-button-view.js';
import FilmsListExtraView from './view/films-list-extra-view.js';
import FilmPopupView from './view/film-popup-view.js';
import {COMMENTS_ARRAY, generateFilm} from './mock/structures.js';
import {createFilter} from './filter.js';
import {RenderPosition, render} from './render.js';
import SortView from './view/sort-view.js';
import FilmsCountView from './view/films-count-view.js';
import FilmListView from './view/film-list-view.js';
import MainNavigationMenuView from './view/main-navigation-menu-view';
import MainNavigationItemView from './view/main-navigation-item-view.js';
import StatsMenuButtonView from './view/stats-menu-button-view';
import FilmsSectionView from './view/films-section-view';
import FilmsListContainer from './view/films-list-container';
import FilmTopView from './view/film-top-view';

const FILM_CARD_COUNT = 5;
const FILM_COUNT = 20;

const films = Array.from({length: FILM_COUNT}, generateFilm);
const filter = createFilter(films);


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('footer');


//Вставил профиль
render(siteHeaderElement,new UserProfileView().element,RenderPosition.BEFOREEND);

//Вставил меню
const menuComponent = new MainNavigationMenuView();
render(siteMainElement, menuComponent.element,RenderPosition.BEFOREEND);
render(menuComponent.element, new MainNavigationItemView(filter).element, RenderPosition.BEFOREEND);
render(menuComponent.element, new StatsMenuButtonView().element, RenderPosition.BEFOREEND);

//Вставил сортировку
render(siteMainElement, new SortView().element, RenderPosition.BEFOREEND);

//Количество фильмов
render(siteFooterElement, new FilmsCountView(films.length).element, RenderPosition.BEFOREEND);

//Вставил карточки

const renderFilm = (filmsListElement, arr) => {
  const filmCardComponent = new FilmCardView(arr);
  const popupComponent = new FilmPopupView(arr, COMMENTS_ARRAY);

  const openPopup = () => {
    render(siteBodyElement, popupComponent.element, RenderPosition.BEFOREEND);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      siteBodyElement.removeChild(popupComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.setFilmCardClickHandler(() => {
    openPopup();
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.setPopupClickHandler(() => {
    siteBodyElement.removeChild(popupComponent.element);
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmsListElement, filmCardComponent.element, RenderPosition.BEFOREEND);
};

const renderFilmList = (container, arr) => {
  const filmComponent = new FilmsSectionView();
  render(container, filmComponent.element, RenderPosition.BEFOREEND);

  const filmListComponent = new FilmListView(arr);
  render(filmComponent.element, filmListComponent.element, RenderPosition.BEFOREEND);
  const filmContainerComponent = new FilmsListContainer();
  render(filmListComponent.element, filmContainerComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(arr.length, FILM_CARD_COUNT); i++) {
    renderFilm(filmContainerComponent.element, arr[i]);
  }
  if (arr.length > FILM_CARD_COUNT) {
    let renderedFilmCount = FILM_CARD_COUNT;
    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmListComponent.element, showMoreButtonComponent.element, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandlerMoreBtn(() => {
      arr
        .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT)
        .forEach((film) => renderFilm(filmContainerComponent.element, film));

      renderedFilmCount += FILM_CARD_COUNT;

      if (renderedFilmCount >= arr.length) {
        showMoreButtonComponent.element.remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  const filmsListExtraTopComponent = new FilmsListExtraView('Top rated');
  render(filmComponent.element, filmsListExtraTopComponent.element, RenderPosition.BEFOREEND);
  const filmTopRateComponent = new FilmTopView();
  render(filmsListExtraTopComponent.element, filmTopRateComponent.element, RenderPosition.BEFOREEND);

  const filmsListExtraCommentedComponent = new FilmsListExtraView('Most commented');
  render(filmComponent.element, filmsListExtraCommentedComponent.element, RenderPosition.BEFOREEND);
  const filmMostCommentedComponent = new FilmTopView();
  render(filmsListExtraCommentedComponent.element, filmMostCommentedComponent.element, RenderPosition.BEFOREEND);

  for (const film of films.slice(0, 2)) {
    renderFilm(filmTopRateComponent.element, film);
    renderFilm(filmMostCommentedComponent.element, film);
  }
};

renderFilmList(siteMainElement, films);


