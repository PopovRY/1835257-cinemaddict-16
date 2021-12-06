import {createUserRankTemplate} from './view/user-rank-view.js';
import {createMenuTemplate} from './view/menu-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createShowMoreButtonTemplate} from './view/more-button-view.js';
import {createFilmsExtraTemplate} from './view/films-extra-view.js';
import {createPopupTemplate} from './view/film-popup-view.js';
import {COMMENTS_ARRAY, generateFilm} from './mock/structures.js';
import {createFilter} from './filter.js';
import {RenderPosition, renderTemplate} from './render.js';
import {createSort} from './view/sort-view.js';
import {createFooterFilmsCount} from './view/films-count-view.js';
import {createFilmListTemplate} from './view/film-list-view.js';

const FILM_CARD_COUNT = 5;
const FILM_COUNT = 20;

const films = Array.from({length: FILM_COUNT}, generateFilm);
const filter = createFilter(films);


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('footer');


//Вставил профиль
renderTemplate(siteHeaderElement,createUserRankTemplate(),RenderPosition.BEFOREEND);

//Вставил меню
renderTemplate(siteMainElement,createMenuTemplate(filter),RenderPosition.BEFOREEND);

//Вставил фильтры
renderTemplate(siteMainElement, createSort(), RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

//Вставил карточки

const filmsListContainer = siteMainElement.querySelector('.films-list__container');
const filmList = siteMainElement.querySelector('.films-list');

for (let i=0; i<  Math.min(films.length, FILM_CARD_COUNT); i++) {
  renderTemplate(filmsListContainer,createFilmCardTemplate(films[i]), RenderPosition.BEFOREEND);
}
if (films.length > FILM_CARD_COUNT) {

  let renderedFilmCount = FILM_CARD_COUNT;
  renderTemplate(filmList, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

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
renderTemplate(siteFooterElement, createFooterFilmsCount(films.length), RenderPosition.BEFOREEND);

//Вставил попап
renderTemplate(siteBodyElement, createPopupTemplate(films[0], COMMENTS_ARRAY), RenderPosition.BEFOREEND);

//Карточки в категории

const sectionFilms = siteMainElement.querySelector('.films');
renderTemplate(sectionFilms, createFilmsExtraTemplate(), RenderPosition.BEFOREEND);

const sectionExtraTopRated = sectionFilms.querySelector('#top_rated_container');
const sectionExtraMostCommented = sectionFilms.querySelector('#most_comm_container');

for (const film of films.slice(0, 2)) {
  renderTemplate(sectionExtraTopRated, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
  renderTemplate(sectionExtraMostCommented, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
}
