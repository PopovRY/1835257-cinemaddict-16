//Кнопка «Show more»

import AbstractView from './abstract-view';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ShowMoreButtonView extends AbstractView{
  get template(){
    return createShowMoreButtonTemplate();
  }

  setClickHandlerMoreBtn = (callback) => {
    this._callback.moreBtnClick = callback;
    this.element.addEventListener('click', this.#clickHandlerMoreBtn);
  }

  #clickHandlerMoreBtn = (evt) => {
    evt.preventDefault();
    this._callback.moreBtnClick();
  }
}
