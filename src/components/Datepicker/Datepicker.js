import React from "react";
import PropTypes from "prop-types";

const Datepicker = ({ value, min, max, onChange, id }) => {
  return (
    <input
      type="date"
      name="datepicker"
      min={min}
      id={id}
      value={value}
      onChange={onChange}
      max={max}
    ></input>
  );
};

Datepicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
};

export default Datepicker;
