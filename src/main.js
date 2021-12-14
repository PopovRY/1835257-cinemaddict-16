import Profile from './view/user-rank-view.js';
import FilmCard from './view/film-card-view.js';
import ShowMoreButton from './view/more-button-view.js';
import FilmsListExtra from './view/films-extra-view.js';
import Popup from './view/film-popup-view.js';
import {COMMENTS_ARRAY, generateFilm} from './mock/structures.js';
import {createFilter} from './filter.js';
import {RenderPosition, render} from './render.js';
import Sort from './view/sort-view.js';
import FooterFilmsCount from './view/films-count-view.js';
import FilmList from './view/film-list-view.js';
import Navigation from './view/main-navigation-menu-view';
import MenuView from './view/menu-view.js';
import Stats from './view/stats-menu-button-view';
import Film from './view/films-section-view';
import FilmListContainer from './view/films-list-container';
import FilmTop from './view/film-top-view';

const FILM_CARD_COUNT = 5;
const FILM_COUNT = 20;

const films = Array.from({length: FILM_COUNT}, generateFilm);
const filter = createFilter(films);


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('footer');


//Вставил профиль
render(siteHeaderElement,new Profile().element,RenderPosition.BEFOREEND);

//Вставил меню
const menuComponent = new Navigation();
render(siteMainElement, menuComponent.element,RenderPosition.BEFOREEND);
render(menuComponent.element, new MenuView(filter).element, RenderPosition.BEFOREEND);
render(menuComponent.element, new Stats().element, RenderPosition.BEFOREEND);

//Вставил сортировку
render(siteMainElement, new Sort().element, RenderPosition.BEFOREEND);

//Место для карточек
render(siteMainElement, new FilmList().element, RenderPosition.BEFOREEND);

//Количество фильмов
render(siteFooterElement, new FooterFilmsCount(films.length).element, RenderPosition.BEFOREEND);

//Вставил карточки

const renderFilm = (filmsListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const popupComponent = new Popup(film, COMMENTS_ARRAY);

  const replaceCardToPopup = () => {
    render(siteBodyElement, popupComponent.element, RenderPosition.BEFOREEND);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      siteBodyElement.removeChild(popupComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click',() => {
    replaceCardToPopup();
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    siteBodyElement.removeChild(popupComponent.element);
    siteBodyElement.classList.remove('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });
console.log(filmsListElement);
  render(filmsListElement.element, filmCardComponent.element, RenderPosition.BEFOREEND);
};

const renderFilmList = (container, array) => {
  const filmComponent = new Film();
  render(container, filmComponent.element, RenderPosition.BEFOREEND);

  const filmListComponent = new FilmList();
  render(filmComponent.element, filmListComponent.element, RenderPosition.BEFOREEND);
  const filmContainerComponent = new FilmListContainer();
  render(filmListComponent.element, filmContainerComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(array.length, FILM_CARD_COUNT); i++) {
    renderFilm(filmContainerComponent, array[i]);
  }
  if (array.length > FILM_CARD_COUNT) {

    let renderedFilmCount = FILM_CARD_COUNT;
    const showMoreButtonComponent = new ShowMoreButton();
    render(filmListComponent.element, showMoreButtonComponent.element, RenderPosition.BEFOREEND);

    showMoreButtonComponent.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      array
        .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT)
        .forEach((film) => renderFilm(filmContainerComponent.element, film));

      renderedFilmCount += FILM_CARD_COUNT;

      if (renderedFilmCount >= array.length) {
        showMoreButtonComponent.remove();
      }
    });
  }
};

renderFilmList(siteMainElement, films);


