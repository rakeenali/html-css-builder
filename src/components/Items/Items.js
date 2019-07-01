import React from "react";

import { useItem } from "../../context/Item/item-context";
import { useItemInItem } from "../../context/ItemInItem/item-in-item-context";

import "./Items.css";

export default function Items() {
  const { changeItem } = useItem();
  const { setItemInItemType } = useItemInItem();

  const dragEnd = e => {
    const type = e.target.getAttribute("data-type");
    const element = document.elementFromPoint(e.pageX, e.pageY);
    const dataAttr = element.getAttribute("data-id");
    if (!dataAttr || dataAttr.trim() === "container") {
      changeItem(type, e.pageX, e.pageY);
      return;
    }
    setItemInItemType(type, dataAttr);
  };

  return (
    <div className="container-item">
      <h2>items</h2>
      <hr />
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="DIV">
          div
        </h3>
      </span>
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="SECTION">
          section
        </h3>
      </span>
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="ARTICLE">
          article
        </h3>
      </span>
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="HEADER">
          header
        </h3>
      </span>
      <br />
      <hr />
      <br />
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="H1">
          h1
        </h3>
      </span>
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="BUTTON">
          button
        </h3>
      </span>
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="PARAGRAPH">
          paragraph
        </h3>
      </span>
      <span className="pointer">
        <h3 draggable onDragEnd={dragEnd} data-type="A">
          a
        </h3>
      </span>
    </div>
  );
}
