import React from "react";
import "./Accordion.scss";

const Accordion = props => {
  const [expanded, setExpanded] = React.useState(props.open || false);
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setExpanded(props.open);
    setSelected(false);
  }, [props.open]);

  const handleSelect = time => {
    if (selected === time) {
      setSelected(false);
    } else {
      setSelected(time);
    }
  };
  return (
    <div className="accordion">
      <div className="icon">{expanded ? "-" : "+"}</div>
      <div>
        <div
          className={`title ${expanded ? "selected" : ""}`}
          onClick={() => {
            setExpanded(!expanded);
            props.handleOpen(props.name);
          }}
        >
          {props.name}
        </div>
        <div className="timings">
          {expanded &&
            props.timings &&
            props.timings.map(time => (
              <div
                className={`time__button ${
                  selected === time ? "selected" : ""
                }`}
                onClick={() => {
                  handleSelect(time);
                  props.handleSelect(time);
                }}
              >
                {time}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
