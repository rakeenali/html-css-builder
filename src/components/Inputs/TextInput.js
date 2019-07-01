import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextInput(props) {
  const { propertyName, placeholder, label, defaultText, sendValue } = props;
  const [state, setState] = useState("");

  const setValue = e => {
    sendValue(state, propertyName);
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

TextInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
