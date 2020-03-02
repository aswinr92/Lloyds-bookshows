import { moviesEndpoint, detailsEndpoint } from "./endpoints";

export const getMovies = async () => {
  const response = await fetch(moviesEndpoint);
  return await response.json();
};

export const getMovieDetails = async id => {
  const response = await fetch(`${detailsEndpoint}${id}`);
  return await response.json();
};
