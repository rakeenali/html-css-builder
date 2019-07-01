import React from "react";

const BaseContainerContext = React.createContext();

const INITIAL_STATE = {
  display: "",
  boxSizing: "",
  flexDirection: ""
};

export function BaseContainerProvider(props) {
  const [baseSettings, setBaseSettings] = React.useState(INITIAL_STATE);

  const values = React.useMemo(() => {
    return {
      baseSettings,
      setBaseSettings
    };
  }, [baseSettings]);

  return <BaseContainerContext.Provider value={values} {...props} />;
}

export function useBaseContainer() {
  const Context = React.useContext(BaseContainerContext);

  if (!Context) {
    throw new Error(
      "useBaseContainer must be placed within a BaseContainerProvider"
    );
  }

  const { baseSettings, setBaseSettings } = Context;

  const changeBaseSettings = settings => {
    return setBaseSettings({
      ...settings
    });
  };

  return { baseSettings, changeBaseSettings };
}
