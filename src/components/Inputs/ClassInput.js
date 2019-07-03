import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ClassInput(props) {
  const { placeholder, label, defaultText, sendValue } = props;
  const [state, setState] = useState("");

  const setValue = e => {
    const classes = state
      .split(",")
      .reduce((coll, val) => {
        if (val.trim() !== "") {
          coll = [...coll, val];
          return coll;
        }
        return coll;
      }, [])
      .join(" ");
    sendValue(classes);
  };

  return (
    <div>
      <label>{label}</label>
      <br />
      <input
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={e => setState(e.target.value)}
        onBlur={setValue}
      />
      <br />
      <span>{defaultText}</span>
    </div>
  );
}

ClassInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
