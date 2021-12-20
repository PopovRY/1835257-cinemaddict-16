//Меню

import AbstractView from './abstract-view';


const createMenuItemTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${name.charAt(0).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`
  );
};
const createMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createMenuItemTemplate(filter, index === 0))
    .join('');

  return `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </div>`;
};

export default class MainNavigationItemView extends AbstractView{
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createMenuTemplate(this.#filters);
  }
}
