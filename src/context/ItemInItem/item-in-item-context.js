import React from "react";

const ItemInItemContext = React.createContext();

const INITIAL_STATE = {
  showSettings: false,
  type: "",
  parentDataId: ""
};

export function ItemInItemProvider(props) {
  const [itemInItem, setItemInItem] = React.useState(INITIAL_STATE);

  const values = React.useMemo(() => {
    return {
      itemInItem,
      setItemInItem
    };
  }, [itemInItem]);

  return <ItemInItemContext.Provider value={values} {...props} />;
}

export function useItemInItem() {
  const Context = React.useContext(ItemInItemContext);

  if (!Context) {
    throw new Error(
      "useItemInItem  must be placed within a ItemInItemProvider"
    );
  }

  const { itemInItem, setItemInItem } = Context;

  const setItemInItemType = (type, parentDataId) => {
    return setItemInItem(n => ({
      ...n,
      type,
      showSettings: true,
      parentDataId
    }));
  };

  const resetItemInItem = () => {
    return setItemInItem(INITIAL_STATE);
  };

  return { itemInItem, setItemInItemType, resetItemInItem };
}
