import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ Title, Poster, imdbID, handleClick }) => {
  return (
    <Link
      to={`/movie/${imdbID}`}
      className="movie"
      onClick={() => handleClick(imdbID)}
    >
      <img
        src={Poster}
        alt={Title}
        className="movie__poster"
        height="250"
        width="250"
      />
      <div className="movie__title">{Title}</div>
    </Link>
  );
};

export default Card;
