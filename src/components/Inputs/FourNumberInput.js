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
    <div>
      <label>{label}</label>
      <br />
      <input
        type="text"
        placeholder="Top"
        name="top"
        value={state.top}
        onChange={e => onChange(0, e.target.value)}
        onBlur={setValue}
      />
      :{" "}
      <input
        type="text"
        placeholder="Right"
        name="right"
        value={state.right}
        onChange={e => onChange(1, e.target.value)}
        onBlur={setValue}
      />
      :{" "}
      <input
        type="text"
        placeholder="Bottom"
        name="bottom"
        value={state.bottom}
        onChange={e => onChange(2, e.target.value)}
        onBlur={setValue}
      />
      :{" "}
      <input
        type="text"
        placeholder="Left"
        name="left"
        value={state.left}
        onChange={e => onChange(3, e.target.value)}
        onBlur={setValue}
      />
      <br />
      <span>{defaultText}</span>
    </div>
  );
}

FourNumberInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
