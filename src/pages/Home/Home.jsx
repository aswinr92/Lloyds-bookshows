import React from "react";
import { getMovies } from "../../api-facade";
import Movie from "../../components/Card";
import "./Home.scss";
const Home = () => {
  const [movies, setMovies] = React.useState([]);

  const fetchMovies = async () => {
    const movieResponse = await getMovies();
    console.log(movieResponse.Search);
    setMovies(movieResponse.Search);
  };
  React.useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies">
      {movies.map(movie => (
        <Movie {...movie} key={movie.imdbID} />
      ))}
    </div>
  );
};

export default Home;
