import dayjs from 'dayjs';

const getDate = (someDate, format) => dayjs(someDate).format(format);

const getCorrectWord = (array, word) => array.length === 1 ? word : `${word}s`;

const addClassBySubmit = (submit, className) => submit ? className : '';

export {getDate, getCorrectWord, addClassBySubmit};
