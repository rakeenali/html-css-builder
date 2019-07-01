import React from "react";

const ItemContext = React.createContext();

const INITIAL_STATE = {
  type: "",
  xPos: "",
  yPos: "",
  showSettings: false
};

export function ItemProvider(props) {
  const [item, setItem] = React.useState(INITIAL_STATE);

  const value = React.useMemo(() => {
    return {
      item,
      setItem
    };
  }, [item]);

  return <ItemContext.Provider value={value} {...props} />;
}

export function useItem() {
  const Context = React.useContext(ItemContext);

  if (!Context) {
    throw new Error("useItem must be placed within a ItemProvider");
  }

  const { item, setItem } = Context;

  const changeItem = (type, xPos, yPos) =>
    setItem(n => ({
      ...n,
      type,
      xPos,
      yPos
    }));

  const changeSettings = () =>
    setItem(n => ({
      ...n,
      showSettings: true
    }));

  const resetItem = () => {
    setItem(INITIAL_STATE);
  };

  return { item, changeItem, changeSettings, resetItem };
}
