import AbstractView from './abstract-view';

const createFilmsTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmsSectionView extends AbstractView{
  get template(){
    return createFilmsTemplate();
  }
}
