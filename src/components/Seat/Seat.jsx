import React from "react";
import "./Seat.scss";

const Seat = ({ num, booked, ...props }) => {
  const [status, setStatus] = React.useState("free"); // Possible status - free,selected,booked
  const handleClick = () => {
    if (status === "free") {
      setStatus("selected");
    } else if (status === "selected") {
      setStatus("free");
    }
    props.handleSelect(num);
  };

  return (
    <div
      className={`seat ${status} ${booked ? "booked" : ""}`}
      onClick={!booked ? handleClick : ""}
    >
      {num}
    </div>
  );
};

export default Seat;
