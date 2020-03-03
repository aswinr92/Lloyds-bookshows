import React from "react";
import Seat from "../../components/Seat";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../api-facade";
import "./Booking.scss";

const Booking = () => {
  const numSeats = Array(20).fill(1);
  let { id, name, slot } = useParams();

  const [details, setDetails] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [booked, setBooked] = React.useState([]);

  const getDetails = async () => {
    const response = await getMovieDetails(id);
    setDetails(response);
  };

  React.useEffect(() => {
    getDetails();
  });

  const handleSelect = n => {
    const index = selected.indexOf(n);
    if (index > -1) {
      const selectedSeats = [...selected];
      selectedSeats.splice(index, 1);
      setSelected(selectedSeats);
    } else {
      setSelected([...selected, n]);
    }
  };

  const handleSubmit = () => {
    setShowConfirm(true);
  };

  const closeModal = () => {
    setShowConfirm(false);
    setBooked([...booked, ...selected]);
    setSelected([]);
  };

  return (
    <div className="booking">
      {details && (
        <div>
          <div className="details">
            <div className="title">{details.Title}</div>
            <div className="name">{name}</div>
            <div className="slot">{slot}</div>
            <div className="label">Select Seats...</div>
            <div className="seats">
              {numSeats.map((seat, i) => (
                <Seat
                  num={i + 1}
                  booked={booked.includes(i + 1)}
                  key={i + 1}
                  handleSelect={handleSelect}
                />
              ))}
            </div>

            {selected && !!selected.length && (
              <div className="selected">
                <div className="label">Selected Seats:</div>
                {selected
                  .sort((a, b) => a - b)
                  .map((s, i) => (
                    <span key={s}>
                      {s}
                      {selected.length - 1 === i ? "" : ","}
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="actions">
            <div
              className={`select__button cta__button ${
                selected && selected.length ? "active" : ""
              }`}
              onClick={handleSubmit}
            >
              Book Now
            </div>
          </div>

          {showConfirm && (
            <Modal
              theatre={name}
              movie={details.Title}
              time={slot}
              seats={selected}
              handleClose={closeModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
