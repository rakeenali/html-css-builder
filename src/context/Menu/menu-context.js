import React from "react";

const MenuContext = React.createContext();

const INITIAL_STATE = {
  previewCode: false,
  fullScreen: false
};

export function MenuProvider(props) {
  const [menu, setMenu] = React.useState(INITIAL_STATE);

  const values = React.useMemo(() => {
    return { menu, setMenu };
  }, [menu]);

  return <MenuContext.Provider value={values} {...props} />;
}

export function useMenu() {
  const Context = React.useContext(MenuContext);

  if (!Context) {
    throw new Error("useMenu must be used within a MenuContext Provider");
  }

  const { menu, setMenu } = Context;

  const changePreview = () => {
    return setMenu({
      ...menu,
      fullScreen: false,
      previewCode: !menu.previewCode
    });
  };

  const changeFullScreen = () => {
    return setMenu({
      ...menu,
      previewCode: false,
      fullScreen: !menu.fullScreen
    });
  };

  return {
    menu,
    changePreview,
    changeFullScreen
  };
}
