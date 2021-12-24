import UserProfileView from './view/user-profile-view.js';
import FilmCardView from './view/film-card-view.js';
import ShowMoreButtonView from './view/more-button-view.js';
import FilmsListExtraView from './view/films-list-extra-view.js';
import FilmPopupView from './view/film-popup-view.js';
import {COMMENTS_ARRAY, generateFilm} from './mock/structures.js';
import {createFilter} from './filter.js';
import {RenderPosition, render, remove} from './utils/render.js';
import SortView from './view/sort-view.js';
import FilmsCountView from './view/films-count-view.js';
import FilmListView from './view/film-list-view.js';
import MainNavigationMenuView from './view/main-navigation-menu-view';
import MainNavigationItemView from './view/main-navigation-item-view.js';
import StatsMenuButtonView from './view/stats-menu-button-view';
import FilmsSectionView from './view/films-section-view';
import FilmsListContainer from './view/films-list-container';
import FilmTopView from './view/film-top-view';
import MovieListPresenter from './presenter/movie-list-presenter';

export const FILM_CARD_COUNT = 5;
const FILM_COUNT = 20;

const films = Array.from({length: FILM_COUNT}, generateFilm);
const filter = createFilter(films);


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteBodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('footer');


//Вставил профиль
render(siteHeaderElement,new UserProfileView(),RenderPosition.BEFOREEND);

//Вставил меню
const menuComponent = new MainNavigationMenuView();
render(siteMainElement, menuComponent,RenderPosition.BEFOREEND);
render(menuComponent, new MainNavigationItemView(filter), RenderPosition.BEFOREEND);
render(menuComponent, new StatsMenuButtonView(), RenderPosition.BEFOREEND);


//Количество фильмов
render(siteFooterElement, new FilmsCountView(films.length), RenderPosition.BEFOREEND);



const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(films);
