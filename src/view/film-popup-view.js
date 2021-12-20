//Подробная информация о фильме (попап)

import {getDate, getCorrectWord} from '../utils.js';
import AbstractView from './abstract-view';

const renderFilmDetails = (name, value) => (
  `<tr class="film-details__row">
  <td class="film-details__term">${name}</td>
  <td class="film-details__cell">${value}</td>
</tr>`
);

const renderGenreItem = (ar) => {
  if (ar.length > 0) {
    const box = [];
    for (const item of ar)
    {box.push(`<span class="film-details__genre">${item}</span>`);}
    return box;
  }
};

const createCommentTemplate = (commentId, comments) => {
  const commentBox = [];

  for (const element of comments) {
    if (commentId.includes(element.id)) {

      const {author, comment, date, emotion} = element;
      const formatedDate = getDate(date, 'YYYY/MM/DD HH:mm');

      commentBox.push(`<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formatedDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
      </li>`);
    }
  }
  return commentBox;
};

const createPopupTemplate = (film, comments) => {
  const {title, runtime, genres, description, poster, director, writers, actors} = film['filmInfo'];
  const rating = film['filmInfo']['totalRating'];
  const date = film['filmInfo']['release']['date'];
  const {watchlist} = film['userDetails'];
  const watchFilm = film['userDetails']['alreadyWatched'];
  const favorite = film['userDetails']['favorite'];
  const ageRating = film['filmInfo']['ageRating'];
  const alternativeTitle = film['filmInfo']['alternativeTitle'];
  const country = film['filmInfo']['release']['releaseCountry'];

  const dateFormat = getDate(date, 'D MMMM YYYY');

  const getTime = () => {
    const hours = Math.trunc(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}м`;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            ${renderFilmDetails('Director', director)}
            ${renderFilmDetails('Writers', writers.join(', '))}
            ${renderFilmDetails('Actors', actors.join(', '))}
            ${renderFilmDetails('Release Date', dateFormat)}
            ${renderFilmDetails('Runtime', getTime())}
            ${renderFilmDetails('Country', country)}
            ${renderFilmDetails(getCorrectWord(genres, 'Genre'), renderGenreItem(genres).join(' '))}
          </table>

          <p class="film-details__film-description">
             ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${watchFilm ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentTemplate(film.comments, comments).join(' ')}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopupView extends AbstractView{
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template(){
    return createPopupTemplate(this.#film, this.#comments);
  }
}
