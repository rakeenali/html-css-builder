import React from "react";
import renderHTML from "react-render-html";

import { useMenu } from "../../context/Menu/menu-context";

import "./FullScreen.scss";

export default function FullScreen() {
  const { changeFullScreen } = useMenu();
  const [htmlCode, setHtmlCode] = React.useState("");

  React.useEffect(() => {
    console.log("mounted");
    const code = document.querySelector(".drag-items");
    // console.log(code.innerHTML);
    setHtmlCode(code.outerHTML);
  }, []);

  return (
    <div className="fullscreen">
      <div className="backdrop">
        <div className="modal">
          <div className="modal-header">
            <h1>Full View of the template</h1>
            <button onClick={changeFullScreen}>&times;</button>
          </div>
          <div className="modal-body">{htmlCode && renderHTML(htmlCode)}</div>
        </div>
      </div>
    </div>
  );
}
