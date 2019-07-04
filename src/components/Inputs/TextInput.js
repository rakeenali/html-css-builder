import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextInput(props) {
  const { propertyName, placeholder, label, defaultText, sendValue } = props;
  const [state, setState] = useState("");

  const setValue = e => {
    sendValue(state, propertyName);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px",
        marginTop: "5px",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      <label style={{ fontWeight: "bolder" }}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={e => setState(e.target.value)}
        onBlur={setValue}
        style={{
          width: "80%",
          alignSelf: "center",
          padding: "5px 4px",
          outline: "none",
          backgroundColor: "rgba(0,0,0,.7)"
        }}
      />
      <span style={{ fontWeight: "light", color: "black", fontSize: "14px" }}>
        {defaultText}
      </span>
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
