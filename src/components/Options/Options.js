import React, { useState } from "react";
import uuid from "uuid/v4";

import { useItem } from "../../context/Item/item-context";
import { useItemInItem } from "../../context/ItemInItem/item-in-item-context";
import { useCurrentItem } from "../../context/CurrentItem/current-item-context";

import FourNumberInput from "../Inputs/FourNumberInput";
import TextInput from "../Inputs/TextInput";
import NumberInput from "../Inputs/NumberInput";
import SelectInput from "../Inputs/SelectRenderProps";

import ClassInput from "../Inputs/ClassInput";
import IdInput from "../Inputs/IdInput";

import ParagraphInput from "../Inputs/ParagraphInput";
import LinkInput from "../Inputs/LinkInput";
import PlaceholderInput from "../Inputs/PlaceholderInput";
import OptionInput from "../Inputs/OptionInput";

import { ITEM_TYPES } from "./Item_Types";

import "./Options.scss";

const OPTIONS_STATE = {
  height: "",
  width: "",
  marginTop: "",
  backgroundColor: "",
  flexDirection: "",
  display: "",
  margin: "",
  padding: "",
  color: "",
  listStyle: "",
  listStyleType: "",
  boxShadow: ""
};

const INNER_STATE = {
  text: "",
  href: "",
  placeholder: "",
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
  const [elementClass, setElementClass] = useState("");
  const [elementId, setElementId] = useState("");
  const [selectOption, setSelectOption] = useState([]);

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

  const resetAll = () => {
    setCurrentElement("");
    setOptions(OPTIONS_STATE);
    setInnerOptions(INNER_STATE);
    setElementClass("");
    setElementId("");
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
            element.placeholder = innerOptions.placeholder;
          }

          if (elementClass.trim() !== "") {
            element.classList = elementClass;
          }

          if (elementId.trim() !== "") {
            element.id = elementId;
          }
          if (selectOption.length > 0) {
            let text = selectOption
              .map(option => {
                return `<option>${option}</option>`;
              })
              .join("");
            element.innerHTML = text;
          }

          element.style.border = "none";
        }
      }
      resetAll();
    }
  };

  const deleteElement = e => {
    e.preventDefault();
    if (currentElement) {
      const elements = document.querySelectorAll("[data-id]");
      for (let element of elements) {
        const id = element.getAttribute("data-id");
        if (id === currentElement) {
          element.remove();
        }
      }
      resetAll();
    }
  };

  function itemClicked(e) {
    const targetId = e.target.getAttribute("data-id");
    if (targetId) {
      setCurrentItemType(e.target.nodeName);
      setCurrentElement(targetId);
      e.target.style.border = "3px solid yellow";
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
        <form onSubmit={onSubmit} className="form">
          <div className="attributes">
            <h4>HTML Attributes</h4>
            <IdInput
              sendValue={n => {
                setElementId(n);
              }}
              placeholder="e.g: identifier"
              label="ID for the element"
              defaultText="Id for the current element"
            />
            <ClassInput
              sendValue={n => {
                setElementClass(n);
              }}
              placeholder="e.g: class1, class2"
              label="Class"
              defaultText="Classes for the current element should be sperated by commas if mulitple"
            />
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
            <PlaceholderInput
              propertyName="placeholder"
              label="Placeholder"
              placeholder="Placeholder"
              defaultText="Placeholder for the input"
              sendValue={changeInner}
            />
            <OptionInput
              label="Options for select"
              placeholder="e.g: Option1, Option 2"
              defaultText="Options should be seprated by commas, if have more than one option for a select"
              sendValue={options => setSelectOption(options)}
            />
          </div>
          <div className="css-properties">
            <h4>CSS Properties</h4>
            <NumberInput
              sendValue={onChange}
              propertyName="height"
              placeholder="Height"
              label="Height"
              defaultText="Height will be in PX format if format no provided it will be default to PX"
            />
            <NumberInput
              sendValue={onChange}
              propertyName="width"
              placeholder="Width"
              label="Width"
              defaultText="Width will be in PX format if format no provided it will be default to PX"
            />
            <NumberInput
              sendValue={onChange}
              propertyName="fontSize"
              placeholder="Font Size"
              label="Font Size"
              defaultText="Font Size will be in PX format if format no provided it will be default to PX"
            />
            <TextInput
              sendValue={onChange}
              propertyName="backgroundColor"
              placeholder="Background Color"
              label="Background Color"
              defaultText="Background Color of the element"
            />
            <TextInput
              sendValue={onChange}
              propertyName="color"
              placeholder="Color"
              label="Color"
              defaultText="Color of the element"
            />
            <TextInput
              sendValue={onChange}
              propertyName="boxShadow"
              placeholder="e.g: 1px 1px 1px red"
              label="Box Shadow"
              defaultText="Box shadow for the element"
            />
            <FourNumberInput
              sendValue={onChange}
              propertyName="margin"
              label="Margin"
              defaultText="Enter margin in the format of TOP,RIGHT,BOTTOM,LEFT"
            />
            <FourNumberInput
              sendValue={onChange}
              propertyName="padding"
              label="Padding"
              defaultText="Enter padding in the format of TOP,RIGHT,BOTTOM,LEFT"
            />
            <div>
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
              <SelectInput
                defaultValue=""
                propertyName="alignItems"
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
            <div>
              Positioning
              <SelectInput
                defaultValue=""
                propertyName="position"
                label="Position"
                defaultText="Sets the position of the element"
                sendValue={onChange}
                render={() => (
                  <>
                    <option value="relative">Relative</option>
                    <option value="fixed">Fixed</option>
                    <option value="absolute">Absolute</option>
                  </>
                )}
              />
              <TextInput
                sendValue={onChange}
                propertyName="top"
                placeholder="Top Position"
                label="Top"
                defaultText="Top Position for the element"
              />
              <TextInput
                sendValue={onChange}
                propertyName="left"
                placeholder="Left Position"
                label="Left"
                defaultText="Left Position for the element"
              />
              <TextInput
                sendValue={onChange}
                propertyName="bottom"
                placeholder="Bottom Position"
                label="Bottom"
                defaultText="Bottom Position for the element"
              />
              <TextInput
                sendValue={onChange}
                propertyName="right"
                placeholder="Right Position"
                label="Right"
                defaultText="Right Position for the element"
              />
            </div>
            <div>
              List Properties
              <SelectInput
                defaultValue="circle"
                propertyName="listStyle"
                label="List Style"
                defaultText="Sets the style of the list"
                sendValue={onChange}
                render={() => (
                  <>
                    <option value="none">none</option>
                    <option value="armenian">Armenian</option>
                    <option value="circle">Circle</option>
                    <option value="disc">Disc</option>
                  </>
                )}
              />
              <SelectInput
                defaultValue="circle"
                propertyName="listStyleType"
                label="List Style Type"
                defaultText="Sets the style type of the list"
                sendValue={onChange}
                render={() => (
                  <>
                    <option value="none">none</option>
                    <option value="armenian">Armenian</option>
                    <option value="circle">Circle</option>
                    <option value="disc">Disc</option>
                  </>
                )}
              />
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="submit">
              Set Properties
            </button>
            <button type="button" onClick={deleteElement} className="delete">
              Delete
            </button>
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
