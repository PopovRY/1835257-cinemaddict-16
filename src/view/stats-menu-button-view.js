import AbstractView from './abstract-view';

const createStats = () => (
  '<a href="#stats" class="main-navigation__additional">Stats</a>'
);

export default class StatsMenuButtonView extends AbstractView{
  get template(){
    return createStats();
  }
}
