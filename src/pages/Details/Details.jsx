import React from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../../api-facade";
import theatres from "../../data/theatres.json";
import "./Details.scss";
import Accordion from "../../components/Accordion";

const Details = () => {
  let { id } = useParams();

  const [details, setDetails] = React.useState();
  const [selected, setSelected] = React.useState({ theatre: "", timing: "" });

  const getDetails = async () => {
    const response = await getMovieDetails(id);
    setDetails(response);
  };

  const handleOpen = t => {
    setSelected({ theatre: t });
  };

  const handleSelect = t => {
    const s = selected.timing === t ? false : t;
    setSelected({ ...selected, timing: s });
  };

  React.useEffect(() => {
    getDetails();
  });

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
                open={t.name === selected.theatre}
                handleSelect={handleSelect}
              />
            ))}
            <div className="actions">
              <Link
                className={`select__button cta__button ${
                  selected.theatre && selected.timing ? "active" : ""
                }`}
                to={`/theatre/${selected.theatre}/${id}/${selected.timing}`}
              >
                Select Seats
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
