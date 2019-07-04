import React from "react";

import { useItem } from "../../context/Item/item-context";
import { useBaseContainer } from "../../context/BaseContainer/base-container-context";
import { useMenu } from "../../context/Menu/menu-context";

import "./Dragarea.scss";

export default function Dragarea(props) {
  const { item, changeSettings } = useItem();
  const { baseSettings } = useBaseContainer();
  const { menu, changePreview } = useMenu();

  const [htmlCode, setHtmlCode] = React.useState("");
  const [showSetting, setShowSetting] = React.useState(false);

  React.useEffect(() => {
    const container = document
      .querySelector(".container-drag")
      .getClientRects()[0];
    const { left, right, top, bottom } = container;
    if (
      item.xPos > left &&
      item.xPos < right &&
      (item.yPos > top && item.yPos < bottom)
    ) {
      setShowSetting(true);
    } else {
      setShowSetting(false);
    }
  }, [item]);

  React.useMemo(() => {
    if (baseSettings) {
      for (let base in baseSettings) {
        if (baseSettings[base]) {
          document.querySelector(".drag-items").style[base] =
            baseSettings[base];
        }
      }
    }
  }, [baseSettings]);

  React.useMemo(() => {
    if (showSetting) {
      changeSettings();
    }
  }, [showSetting]);

  React.useMemo(() => {
    if (menu.previewCode) {
      const code = document.querySelector(".drag-items");
      setHtmlCode(code.outerHTML);
    }
  }, [menu]);

  // CUSTOM FUNCTIONS
  const dragEnter = e => {
    document.querySelector(".container-drag").style.backgroundColor =
      "rgba(14, 14, 236, 0.178)";
  };

  const dragLeave = e => {
    document.querySelector(".container-drag").style.backgroundColor =
      "rgba(204, 204, 204, 0.295)";
  };

  const showModal = e => {
    const isContainer = e.target.getAttribute("data-id");
    if (isContainer === "container") {
      props.showModal();
      return;
    }
    return;
  };

  return (
    <div
      className="container-drag"
      data-id="container"
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onClick={showModal}
    >
      <h2>Dragarea</h2>
      <hr />
      {menu.previewCode && (
        <>
          <div className="backdrop">
            <div className="menu-modal">
              <div className="code">
                {htmlCode.trim() !== "" ? (
                  <>{htmlCode}</>
                ) : (
                  <p>Preview not available</p>
                )}
              </div>
              <div className="button">
                <button onClick={changePreview}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="drag-items" data-id="container" onClick={showModal} />
    </div>
  );
}
