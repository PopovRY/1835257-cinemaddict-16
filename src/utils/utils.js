import dayjs from 'dayjs';
import {remove} from './render';
import AbstractView from '../view/abstract-view';

const getDate = (someDate, format) => dayjs(someDate).format(format);

const getCorrectWord = (array, word) => array.length === 1 ? word : `${word}s`;

const onEscKeyDown = (evt, component, element) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    remove(component);
    element.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getDate, getCorrectWord, onEscKeyDown, replace};
