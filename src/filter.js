const filterMap = {
  Watchlist: (films) => films
    .filter((film) => film.user_details.watchlist).length,
  History: (films) => films
    .filter((film) => film.user_details.already_watched).length,
  Favorites: (films) => films
    .filter((film) => film.user_details.favorite).length,
};

export const createFilter = (films) => Object.entries(filterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
