import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const Datepicker = ({ value, min, max, onChange, id }) => {
  const _onChange = ({ target }) => {
    const newDate = target.value;
    if (!dayjs(newDate).isValid()) return;
    onChange(newDate);
  };

  return (
    <input
      type="date"
      name="datepicker"
      min={min}
      id={id}
      value={value}
      onChange={_onChange}
      max={max}
      required // Removes "clear field" X icon on Firefox
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
