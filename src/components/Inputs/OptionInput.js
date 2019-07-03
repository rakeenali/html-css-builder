import React, { useState } from "react";
import PropTypes from "prop-types";

import { ITEM_TYPES } from "../Options/Item_Types";
import { useItem } from "../../context/Item/item-context";
import { useItemInItem } from "../../context/ItemInItem/item-in-item-context";
import { useCurrentItem } from "../../context/CurrentItem/current-item-context";

export default function ParagraphInput(props) {
  const { placeholder, label, defaultText, sendValue } = props;

  const [state, setState] = useState("");
  const [canAddText, setCanAddText] = useState(false);

  const { currentItem } = useCurrentItem();
  const { item } = useItem();
  const { itemInItem } = useItemInItem();

  React.useEffect(() => {
    return () => {
      setCanAddText(false);
    };
  }, []);

  React.useMemo(() => {
    if (!canAddText) {
      if (item.type.trim() !== "") {
        const currItem = ITEM_TYPES[item.type];
        if (currItem) {
          if (currItem.scope.includes("option")) {
            setCanAddText(true);
          }
        }
      }
    }
  }, [item]);

  React.useMemo(() => {
    if (!canAddText) {
      if (itemInItem.type.trim() !== "") {
        const currItem = ITEM_TYPES[itemInItem.type];
        if (currItem) {
          if (currItem.scope.includes("option")) {
            setCanAddText(true);
          }
        }
      }
    }
  }, [itemInItem]);

  React.useMemo(() => {
    if (!canAddText) {
      if (currentItem.hasItem) {
        const currItem = ITEM_TYPES[currentItem.type];
        if (currItem) {
          if (currItem.scope.includes("option")) {
            setCanAddText(true);
          }
        }
      }
    }
  }, [currentItem]);

  const setValue = e => {
    // console.log(state);
    // sendValue(state.trim(), propertyName);
    const options = state.split(",").reduce((coll, val) => {
      if (val.trim() !== "") {
        coll = [...coll, val];
        return coll;
      }
      return coll;
    }, []);
    // console.log(options);
    sendValue(options);
  };

  if (canAddText) {
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

  return <></>;
}

ParagraphInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
