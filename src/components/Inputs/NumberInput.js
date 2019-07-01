import React, { useState } from "react";
import PropTypes from "prop-types";

export default function NumberInput(props) {
  const { propertyName, placeholder, label, defaultText, sendValue } = props;
  const [state, setState] = useState("");

  const setValue = e => {
    const stateDims = state.split("");
    const last = stateDims[stateDims.length - 1];
    const secondLast = stateDims[stateDims.length - 2];
    let newState;

    if (secondLast === "p" && last === "x") {
      newState = state;
    } else {
      newState = `${state}px`;
    }
    sendValue(newState, propertyName);
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

NumberInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
