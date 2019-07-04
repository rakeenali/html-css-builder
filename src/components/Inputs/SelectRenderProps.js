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
      <select
        onChange={e => setState(e.target.value)}
        onBlur={setValue}
        style={{
          width: "80%",
          alignSelf: "center",
          padding: "5px 4px",
          outline: "none",
          backgroundColor: "rgba(0,0,0,.7)"
        }}
      >
        <option value="" />
        {props.render()}
      </select>
      <span style={{ fontWeight: "light", color: "black", fontSize: "14px" }}>
        {defaultText}
      </span>
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
