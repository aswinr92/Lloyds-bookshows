import React from "react";
import "./Modal.scss";

const Modal = ({ theatre, movie, time, seats }) => {
  return (
    <div className="modal">
      <div className="backdrop"></div>
      <div className="content">
        <div className="title">Successfully Booked</div>
        <div className="details">
          <div className="content__item">Theatre: {theatre}</div>
          <div className="content__item">Movie: {movie}</div>
          <div className="content__item">Time: {time}</div>
          <div className="content__item">Seats: {seats.join(",")}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
