import React from "react";

import Items from "./components/Items/Items";
import Dragarea from "./components/Dragarea/Dragarea";
import Options from "./components/Options/Options";
import ContainerModal from "./components/modal/ContainerModal";
import Navbar from "./components/Navbar/Navbar";
import FullScreen from "./components/FullScreen/FullScreen";

import { ItemProvider } from "./context/Item/item-context";
import { BaseContainerProvider } from "./context/BaseContainer/base-container-context";
import { ItemInItemProvider } from "./context/ItemInItem/item-in-item-context";
import { CurrentItemProvider } from "./context/CurrentItem/current-item-context";
import { useMenu } from "./context/Menu/menu-context";

import "./App.css";

function App() {
  const [showModal, setShowModal] = React.useState(false);

  const { menu } = useMenu();

  return (
    <BaseContainerProvider>
      <ItemProvider>
        <ItemInItemProvider>
          <CurrentItemProvider>
            <Navbar />

            <div className="container">
              {showModal && (
                <ContainerModal onClose={e => setShowModal(false)} />
              )}
              <Items />
              <Dragarea showModal={e => setShowModal(true)} />
              <Options />
              {menu.fullScreen && <FullScreen />}
            </div>
          </CurrentItemProvider>
        </ItemInItemProvider>
      </ItemProvider>
    </BaseContainerProvider>
  );
}

export default App;
