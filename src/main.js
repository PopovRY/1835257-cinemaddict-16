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

//Вставил карточки

const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmList = siteMainElement.querySelector('.films-list');

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const popupComponent = new Popup(film, COMMENTS_ARRAY);

  const replaceCardToPopup = () => {
    filmListElement.replaceChild(popupComponent.element, filmCardComponent.element);
  };

  const replacePopupToCard = () => {
    filmListElement.replaceChild(filmCardComponent.element, popupComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replacePopupToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click',() => {
    replaceCardToPopup();
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.element.querySelector('.film-details__close-btn').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replacePopupToCard();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(filmListElement, filmCardComponent.element,RenderPosition.BEFOREEND);
};
for (let i=0; i<  Math.min(films.length, FILM_CARD_COUNT); i++) {
  renderFilm(filmsListContainer,films[i]);
}
if (films.length > FILM_CARD_COUNT) {

  let renderedFilmCount = FILM_CARD_COUNT;
  render(filmList, new ShowMoreButton().element, RenderPosition.BEFOREEND);

  const showMoreButton = filmList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT)
      .forEach((film) => renderFilm(filmsListContainer.element, film));

    renderedFilmCount += FILM_CARD_COUNT;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
//счетчик фильмов
render(siteFooterElement, new FooterFilmsCount(films.length).element, RenderPosition.BEFOREEND);

//Вставил попап
render(siteBodyElement, new Popup(films[0], COMMENTS_ARRAY), RenderPosition.BEFOREEND);

//Карточки в категории

const sectionFilms = siteMainElement.querySelector('.films');
render(sectionFilms, new FilmsListExtra().element, RenderPosition.BEFOREEND);

const sectionExtraTopRated = sectionFilms.querySelector('#top_rated_container');
const sectionExtraMostCommented = sectionFilms.querySelector('#most_comm_container');

for (const film of films.slice(0, 2)) {
  render(sectionExtraTopRated, new FilmCard(film), RenderPosition.BEFOREEND);
  render(sectionExtraMostCommented, new FilmCard(film), RenderPosition.BEFOREEND);
}
