import Profile from './view/user-rank-view.js';
import FilmCard from './view/film-card-view.js';
import ShowMoreButton from './view/more-button-view.js';
import FilmsListExtra from './view/films-extra-view.js';
import Popup from './view/film-popup-view.js';
import {COMMENTS_ARRAY, generateFilm} from './mock/structures.js';
import {createFilter} from './filter.js';
import {RenderPosition, renderTemplate, renderElement} from './render.js';
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
renderElement(siteHeaderElement,new Profile().element,RenderPosition.BEFOREEND);

//Вставил меню
const menuComponent = new Navigation();
renderElement(siteMainElement, menuComponent.element,RenderPosition.BEFOREEND);
renderElement(menuComponent.element, new MenuView(filter).element, RenderPosition.BEFOREEND);
renderElement(menuComponent.element, new Stats().element, RenderPosition.BEFOREEND);

//Вставил фильтры
renderElement(siteMainElement, new Sort().element, RenderPosition.BEFOREEND);

//Место для карточек
renderElement(siteMainElement, new FilmList().element, RenderPosition.BEFOREEND);

//Вставил карточки

const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmList = siteMainElement.querySelector('.films-list');

for (let i=0; i<  Math.min(films.length, FILM_CARD_COUNT); i++) {
  renderElement(filmsListContainer,new FilmCard(films[i]).element, RenderPosition.BEFOREEND);
}
if (films.length > FILM_CARD_COUNT) {

  let renderedFilmCount = FILM_CARD_COUNT;
  renderElement(filmList, new ShowMoreButton().element, RenderPosition.BEFOREEND);

  const showMoreButton = filmList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_CARD_COUNT)
      .forEach((film) => renderTemplate(filmsListContainer, createFilmCardTemplate(film), RenderPosition.BEFOREEND));

    renderedFilmCount += FILM_CARD_COUNT;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
//счетчик фильмов
renderElement(siteFooterElement, new FooterFilmsCount(films.length).element, RenderPosition.BEFOREEND);

//Вставил попап
renderElement(siteBodyElement, new Popup(films[0], COMMENTS_ARRAY), RenderPosition.BEFOREEND);

//Карточки в категории

const sectionFilms = siteMainElement.querySelector('.films');
renderElement(sectionFilms, new FilmsListExtra().element, RenderPosition.BEFOREEND);

const sectionExtraTopRated = sectionFilms.querySelector('#top_rated_container');
const sectionExtraMostCommented = sectionFilms.querySelector('#most_comm_container');

for (const film of films.slice(0, 2)) {
  renderTemplate(sectionExtraTopRated, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
  renderTemplate(sectionExtraMostCommented, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
}
