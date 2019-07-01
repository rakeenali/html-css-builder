import React, { useState } from "react";
import PropTypes from "prop-types";

import { ITEM_TYPES } from "../Options/Item_Types";
import { useItem } from "../../context/Item/item-context";
import { useItemInItem } from "../../context/ItemInItem/item-in-item-context";
import { useCurrentItem } from "../../context/CurrentItem/current-item-context";

export default function LinkInput(props) {
  const { propertyName, placeholder, label, defaultText, sendValue } = props;

  const [state, setState] = useState("");
  const [canAddLink, setCanAddLink] = useState(false);

  const { currentItem } = useCurrentItem();
  const { item } = useItem();
  const { itemInItem } = useItemInItem();

  React.useEffect(() => {
    return () => {
      setCanAddLink(false);
    };
  }, []);

  React.useMemo(() => {
    if (!canAddLink) {
      if (item.type.trim() !== "") {
        const currItem = ITEM_TYPES[item.type];
        if (currItem) {
          if (currItem.scope.includes("href")) {
            setCanAddLink(true);
          }
        }
      }
    }
  }, [item]);

  React.useMemo(() => {
    if (!canAddLink) {
      if (itemInItem.type.trim() !== "") {
        const currItem = ITEM_TYPES[itemInItem.type];
        if (currItem) {
          if (currItem.scope.includes("href")) {
            setCanAddLink(true);
          }
        }
      }
    }
  }, [itemInItem]);

  React.useMemo(() => {
    if (!canAddLink) {
      if (currentItem.hasItem) {
        const currItem = ITEM_TYPES[currentItem.type];
        if (currItem) {
          if (currItem.scope.includes("href")) {
            setCanAddLink(true);
          }
        }
      }
    }
  }, [currentItem]);

  const setValue = e => {
    sendValue(state.trim(), propertyName);
  };

  if (canAddLink) {
    return (
      <div>
        <label>{label}</label>
        <br />
        <textarea
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

LinkInput.propTypes = {
  defaultText: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sendValue: PropTypes.func.isRequired
};
