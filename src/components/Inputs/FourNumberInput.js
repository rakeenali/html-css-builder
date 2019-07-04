import React, { useState } from "react";
import PropTypes from "prop-types";
import { nearer } from "q";

export default function FourNumberInput(props) {
  const { propertyName, label, defaultText, sendValue } = props;
  const [state, setState] = useState(["0", "0", "0", "0"]);

  const setValue = e => {
    const newState = state.reduce((collection, elem, i) => {
      let dims = elem.split("");
      let last = dims[dims.length - 1];
      let secondLast = dims[dims.length - 2];
      if (secondLast === "p" && last === "x") {
        return (collection[i] = elem);
      } else {
        let newcollection = [...collection];
        newcollection[i] = `${elem}px`;
        return (collection = [...newcollection]);
      }
    }, []);

    return sendValue(newState.join(" "), propertyName);
  };

  const onChange = (num, value) => {
    let newArr = [...state];
    newArr[num] = value;
    setState([...newArr]);
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto",
          justifyContent: "center",
          alignItems: "center",
          justifyItems: "center"
        }}
      >
        <input
          type="text"
          placeholder="Top"
          name="top"
          value={state.top}
          onChange={e => onChange(0, e.target.value)}
          onBlur={setValue}
          style={{
            width: "80%",
            padding: "5px 4px",
            outline: "none",
            backgroundColor: "rgba(0,0,0,.7)"
          }}
        />
        <input
          type="text"
          placeholder="Right"
          name="right"
          value={state.right}
          onChange={e => onChange(1, e.target.value)}
          onBlur={setValue}
          style={{
            width: "80%",
            padding: "5px 4px",
            outline: "none",
            backgroundColor: "rgba(0,0,0,.7)"
          }}
        />
        <input
          type="text"
          placeholder="Bottom"
          name="bottom"
          value={state.bottom}
          onChange={e => onChange(2, e.target.value)}
          onBlur={setValue}
          style={{
            width: "80%",
            padding: "5px 4px",
            outline: "none",
            backgroundColor: "rgba(0,0,0,.7)"
          }}
        />
        <input
          type="text"
          placeholder="Left"
          name="left"
          value={state.left}
          onChange={e => onChange(3, e.target.value)}
          onBlur={setValue}
          style={{
            width: "80%",
            padding: "5px 4px",
            outline: "none",
            backgroundColor: "rgba(0,0,0,.7)"
          }}
        />
      </div>
      <span style={{ fontWeight: "light", color: "black", fontSize: "14px" }}>
        {defaultText}
      </span>
    </div>
  );
}

FourNumberInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
