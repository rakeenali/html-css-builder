import React from "react";

const CurrenItemContext = React.createContext();

const INITIAL_STATE = {
  haItem: false,
  type: ""
};

export function CurrentItemProvider(props) {
  const [currentItem, setCurrentItem] = React.useState(INITIAL_STATE);

  const values = React.useMemo(() => {
    return {
      currentItem,
      setCurrentItem
    };
  }, [currentItem]);

  return <CurrenItemContext.Provider value={values} {...props} />;
}

export function useCurrentItem() {
  const Context = React.useContext(CurrenItemContext);

  if (!Context) {
    throw new Error(
      "useCurrentItem must be used inside the CurrentItemContext provider"
    );
  }

  const { currentItem, setCurrentItem } = Context;

  const setCurrentItemType = type => {
    setCurrentItem({
      hasItem: true,
      type
    });
  };

  return {
    currentItem,
    setCurrentItemType
  };
}
