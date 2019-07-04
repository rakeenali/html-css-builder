import React from "react";
import { save } from "save-file";

import { useMenu } from "../../context/Menu/menu-context";

import "./Navbar.scss";

function Navbar() {
  const { changePreview, changeFullScreen } = useMenu();

  const saveFile = async () => {
    const innerCode = document.querySelector(".drag-items").outerHTML;
    if (innerCode.trim() === "") {
      alert("Nothing to save");
      return;
    }

    const text = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
      </head>
      <body>
          ${innerCode}
      </body>
      </html>`;

    const fileName = window.prompt(
      "Provide filename for the html with the .html extension",
      "example.html"
    );
    await save(fileName, text);
  };

  return (
    <nav className="nav">
      <div>
        <button className="preview-btn" onClick={changePreview}>
          Preview Code
        </button>
        <button className="preview-btn" onClick={changeFullScreen}>
          Toggle Fullscreen
        </button>
        <button className="preview-btn" onClick={saveFile}>
          Save File
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
