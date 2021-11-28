import {createUserRankTemplate} from './view/user-rank-view.js';
import {createMenuTemplate} from './view/menu-view.js';
import {createFilmCardListTemplate} from './view/film-card-view.js';
import {createShowMoreButtonTemplate} from './view/more-button-view.js';
import {createFilmsSectionTemplate} from './view/films-section-view.js';
import {createPopupTemplate} from './view/film-popup-view.js';

const FILM_CARD_COUNT = 5;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');


const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//Вставил профиль
renderTemplate(siteHeaderElement,createUserRankTemplate(),RenderPosition.BEFOREEND);

//Вставил меню
renderTemplate(siteMainElement,createMenuTemplate(),RenderPosition.BEFOREEND);

//Вставил категории

renderTemplate(siteMainElement,createFilmsSectionTemplate(),RenderPosition.BEFOREEND);


//Вставил карточки

const filmsListContainer = siteMainElement.querySelector('.films-list__container');
for (let i=0; i< FILM_CARD_COUNT; i++) {
  renderTemplate(filmsListContainer,createFilmCardListTemplate(),RenderPosition.BEFOREEND);
}

//Вставил кнопку
renderTemplate(siteMainElement,createShowMoreButtonTemplate(),RenderPosition.BEFOREEND);

//Карточки в категории
const sectionFilms = siteMainElement.querySelector('.films');
const sectionTopRated = sectionFilms.querySelector('.films-list--extra:nth-child(2) .films-list__container');
const sectionMostCommented = sectionFilms.querySelector('.films-list--extra:last-child .films-list__container');


renderTemplate(sectionTopRated, createFilmCardListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sectionTopRated, createFilmCardListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sectionMostCommented, createFilmCardListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sectionMostCommented, createFilmCardListTemplate(), RenderPosition.BEFOREEND);

//Вставил попап

renderTemplate(siteMainElement,createPopupTemplate(),RenderPosition.BEFOREEND);
