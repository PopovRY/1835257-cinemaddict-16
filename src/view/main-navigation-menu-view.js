import AbstractView from './abstract-view';

const createMainNavigation = () => (
  '<nav class="main-navigation"></nav>'
);

export default class MainNavigationMenuView extends AbstractView{
  get template(){
    return createMainNavigation();
  }
}
