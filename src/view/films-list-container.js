import AbstractView from './abstract-view';

const createFilmListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmsListContainer extends AbstractView{
  get template(){
    return createFilmListContainerTemplate();
  }
}
