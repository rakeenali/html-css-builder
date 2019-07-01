import React, { useState } from "react";
import PropTypes from "prop-types";

export default function DisplaySelect(props) {
  const { defaultValue, propertyName, label, defaultText, sendValue } = props;
  const [state, setState] = useState("");

  const setValue = e => {
    if (state.trim() === "") {
      sendValue(defaultValue, propertyName);
      return;
    } else {
      sendValue(state, propertyName);
      return;
    }
  };

  return (
    <div>
      <label>{label}</label>
      <br />
      <select onChange={e => setState(e.target.value)} onBlur={setValue}>
        <option value="" />
        {props.render()}
      </select>
      <br />
      <span>{defaultText}</span>
    </div>
  );
}

DisplaySelect.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
