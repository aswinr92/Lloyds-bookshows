import React from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "../../api-facade";
import Movie from "../../components/Card";
import "./Home.scss";
const Home = () => {
  const [movies, setMovies] = React.useState([]);
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    const movieResponse = await getMovies();
    setMovies(movieResponse.Search);
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const handleClick = id => {
    dispatch({
      type: "SELECT_MOVIE",
      payload: id
    });
  };

  return (
    <div className="movies">
      {movies.map(movie => (
        <Movie {...movie} key={movie.imdbID} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default Home;
