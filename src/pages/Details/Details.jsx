import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMovieDetails } from "../../api-facade";
import theatres from "../../data/theatres.json";
import "./Details.scss";
import Accordion from "../../components/Accordion";

const Details = () => {
  const [details, setDetails] = React.useState();

  const dispatch = useDispatch();
  const id = useSelector(state => state.movie);
  const theatre = useSelector(state => state.theatre);
  const time = useSelector(state => state.time);

  const getDetails = async () => {
    const response = await getMovieDetails(id);
    setDetails(response);
  };

  const handleOpen = t => {
    dispatch({ type: "SELECT_THEATRE", payload: t });
  };

  const handleSelect = t => {
    const s = time === t ? false : t;
    dispatch({ type: "SELECT_TIME", payload: s });
  };

  React.useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <div className="details">
      {details && (
        <div>
          <div className="meta">
            <div className="meta__title">{details.Title}</div>
            <div className="meta__content">
              <img
                src={details.Poster}
                alt={details.Title}
                height="250"
                width="250"
              />
              <div className="meta__right">
                <div className="meta__desc">{details.Plot}</div>
                <div className="meta__details">
                  <div className="meta__ratings">
                    Rating: {details.Ratings[0].Value}
                  </div>
                  <div className="meta__released">
                    Released On: {details.Released}
                  </div>
                  <div className="meta__rated">Rated: {details.Rated}</div>
                  <div className="meta__runtime">Runtime:{details.Runtime}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="theatres">
            <div className="theatres__label">Now Playing in...</div>

            {theatres.map(t => (
              <Accordion
                {...t}
                handleOpen={handleOpen}
                open={t.name === theatre}
                handleSelect={handleSelect}
              />
            ))}
            <div className="actions">
              {theatre && time ? (
                <Link
                  className="select__button cta__button active"
                  to={`/book`}
                >
                  Select Seats
                </Link>
              ) : (
                <div className="select__button cta__button">Select Seats</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
