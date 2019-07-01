import React, { useState } from "react";
import uuid from "uuid/v4";

import { useItem } from "../../context/Item/item-context";
import { useItemInItem } from "../../context/ItemInItem/item-in-item-context";
import { useCurrentItem } from "../../context/CurrentItem/current-item-context";

import FourNumberInput from "../Inputs/FourNumberInput";
import TextInput from "../Inputs/TextInput";
import NumberInput from "../Inputs/NumberInput";
import SelectInput from "../Inputs/SelectRenderProps";

import ParagraphInput from "../Inputs/ParagraphInput";
import LinkInput from "../Inputs/LinkInput";

import { ITEM_TYPES } from "./Item_Types";

import "./Options.css";

const OPTIONS_STATE = {
  height: "",
  width: "",
  marginTop: "",
  backgroundColor: "",
  flexDirection: "",
  display: "",
  margin: "",
  padding: "",
  color: ""
};

const INNER_STATE = {
  text: "",
  href: "",
  hasInner: false
};

export default function Options() {
  const { item, resetItem } = useItem();
  const { itemInItem, resetItemInItem } = useItemInItem();
  const { setCurrentItemType } = useCurrentItem();

  const [itemDescription, setItemDescription] = useState({ hasItem: false });
  const [itemInItemDescription, setItemInItemDescription] = useState({
    hasITtem: false
  });

  const [currentElement, setCurrentElement] = useState("");
  const [options, setOptions] = useState(OPTIONS_STATE);
  const [innerOptions, setInnerOptions] = useState(INNER_STATE);

  // LIFECYCLES
  React.useEffect(() => {
    if (item.showSettings) {
      setItemDescription(n => ({
        ...item,
        hasItem: true
      }));
    }
    if (itemInItem.showSettings) {
      setItemInItemDescription({
        ...itemInItem,
        hasITtem: true
      });
    }
  }, [item, itemInItem]);

  React.useMemo(() => {
    if (itemDescription.hasItem) {
      const type = ITEM_TYPES[itemDescription.type];
      if (type) {
        const id = uuid().split("-")[0];
        const container = document.querySelector(".drag-items");
        const element = document.createElement(type.name);
        element.setAttribute("data-id", id);
        element.addEventListener("click", itemClicked);

        container.appendChild(element);
        setCurrentElement(id);
      }
      resetItem();
      setItemDescription({ hasItem: false });
    }
  }, [itemDescription]);

  React.useMemo(() => {
    if (itemInItemDescription.hasITtem) {
      const type = ITEM_TYPES[itemInItemDescription.type];
      if (type) {
        const id = uuid().split("-")[0];
        const containers = document.querySelectorAll("[data-id]");
        for (let container of containers) {
          let dataId = container.getAttribute("data-id");
          if (dataId === itemInItemDescription.parentDataId) {
            const element = document.createElement(type.name);
            element.setAttribute("data-id", id);
            element.addEventListener("click", itemClicked);
            container.appendChild(element);
          }
        }
        setCurrentElement(id);
      }
      setItemInItemDescription({ hasItem: false });
      resetItemInItem();
    }
  }, [itemInItemDescription]);

  // FUNCTIONS
  const onChange = (value, name) => {
    setOptions({
      ...options,
      [name]: value
    });
  };

  const changeInner = (value, name) => {
    setInnerOptions({
      ...innerOptions,
      hasInner: true,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (currentElement) {
      const styles = {};
      for (let option in options) {
        if (options[option]) {
          styles[option] = options[option];
        }
      }

      const elements = document.querySelectorAll("[data-id]");
      for (let element of elements) {
        const id = element.getAttribute("data-id");
        if (id === currentElement) {
          for (let value in styles) {
            element.style[value] = styles[value];
          }
          if (innerOptions.hasInner) {
            element.innerText = innerOptions.text;
            element.href = innerOptions.href;
          }
          element.style.boxShadow = "none";
        }
      }
      setCurrentElement("");
      setOptions(OPTIONS_STATE);
      setInnerOptions(INNER_STATE);
    }
  };

  function itemClicked(e) {
    console.log(e);
    const targetId = e.target.getAttribute("data-id");
    if (targetId) {
      setCurrentItemType(e.target.nodeName);
      setCurrentElement(targetId);
      e.target.style.boxShadow = "3px 3px 3px white";
      return;
    }
    return;
  }

  // RETURN STATMENT
  return (
    <div className="container-options">
      <h2>Options</h2>
      <hr />

      {currentElement ? (
        <form onSubmit={onSubmit}>
          <NumberInput
            sendValue={onChange}
            propertyName="height"
            placeholder="Height"
            label="Height"
            defaultText="Height will be in PX format if format no provided it will be default to PX"
          />
          <br />
          <NumberInput
            sendValue={onChange}
            propertyName="width"
            placeholder="Width"
            label="Width"
            defaultText="Width will be in PX format if format no provided it will be default to PX"
          />
          <br />
          <NumberInput
            sendValue={onChange}
            propertyName="fontSize"
            placeholder="Font Size"
            label="Font Size"
            defaultText="Font Size will be in PX format if format no provided it will be default to PX"
          />
          <br />
          <TextInput
            sendValue={onChange}
            propertyName="backgroundColor"
            placeholder="Background Color"
            label="Background Color"
            defaultText="Background Color of the element"
          />
          <br />
          <TextInput
            sendValue={onChange}
            propertyName="color"
            placeholder="Color"
            label="Color"
            defaultText="Color of the element"
          />
          <br />
          <FourNumberInput
            sendValue={onChange}
            propertyName="margin"
            label="Margin"
            defaultText="Enter margin in the format of TOP,RIGHT,BOTTOM,LEFT"
          />
          <br />
          <FourNumberInput
            sendValue={onChange}
            propertyName="padding"
            label="Padding"
            defaultText="Enter padding in the format of TOP,RIGHT,BOTTOM,LEFT"
          />
          <br />
          <div>
            <hr />
            Flex Properties
            <SelectInput
              sendValue={onChange}
              defaultValue="block"
              propertyName="display"
              label="Display"
              defaultText="Display property of the container element"
              render={() => (
                <>
                  <option value="block">Block</option>
                  <option value="inline-block">Inline Block</option>
                  <option value="flex">Flex</option>
                </>
              )}
            />
            <br />
            <SelectInput
              defaultValue=""
              propertyName="flexDirection"
              label="Flex Direction"
              defaultText="Sets the direction of the flex container"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="column">Column</option>
                  <option value="row">Row</option>
                </>
              )}
            />
            <br />
            <SelectInput
              defaultValue=""
              propertyName="justifyContent"
              label="Justify Content"
              defaultText="Sets the contnent direction of the flex container"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="flex-start">Flex Start</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-evenly">Space Evenly</option>
                  <option value="baseline">Baseline</option>
                </>
              )}
            />
            <br />
            <SelectInput
              defaultValue=""
              propertyName="alignItem"
              label="Align Item"
              defaultText="Sets the item for the container"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="flex-start">Flex Start</option>
                </>
              )}
            />
            <br />
            <SelectInput
              defaultValue=""
              propertyName="alignContent"
              label="Align Content"
              defaultText="Sets the alignment of the flex container"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="flex-start">Flex Start</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-between">Space Between</option>
                </>
              )}
            />
          </div>
          <hr />
          <br />
          <ParagraphInput
            propertyName="text"
            label="Text"
            placeholder="Inner text for the tag"
            defaultText="Text to appear on inside of the element"
            sendValue={changeInner}
          />
          <LinkInput
            propertyName="href"
            label="Href"
            placeholder="www.somesite.com"
            defaultText="Link for the href"
            sendValue={changeInner}
          />
          <br />
          <div>
            <button type="submit">Set Properties</button>
          </div>
        </form>
      ) : (
        <div>
          <h2>No Element is selected yet</h2>
        </div>
      )}
    </div>
  );
}
