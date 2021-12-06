const filterMap = {
  Watchlist: (films) => films
    .filter((film) => film.userDetails.watchlist).length,
  History: (films) => films
    .filter((film) => film.userDetails.alreadyWatched).length,
  Favorites: (films) => films
    .filter((film) => film.userDetails.favorite).length,
};

export const createFilter = (films) => Object.entries(filterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
