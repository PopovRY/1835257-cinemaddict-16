import dayjs from 'dayjs';
import {remove} from './render';

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

export {getDate, getCorrectWord, onEscKeyDown};
