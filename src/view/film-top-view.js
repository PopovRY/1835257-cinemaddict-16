import AbstractView from './abstract-view';

export const createFilmTop = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmTopView extends AbstractView{
  get template(){
    return createFilmTop();
  }
}
