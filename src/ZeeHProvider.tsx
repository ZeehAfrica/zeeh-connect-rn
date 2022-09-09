import React from "react";
import type { ZeeHConnectProps } from "./type";
import { createContext, useState } from "react";
import ZeeHConnect from "./ZeeHConnect";

export type ZeeHContextType = {
  init: () => void;
};

export const ZeeHContext = createContext<ZeeHContextType>({
  init: () => null,
});

const ZeeHProvider = (
  props: Omit<ZeeHConnectProps, "openWidget" | "setOpenWidget">
) => {
  const [openWidget, setOpenWidget] = useState<boolean>(false);

  function init() {
    setOpenWidget(true);
  }

  return (
    <ZeeHContext.Provider value={{ init }}>
      <ZeeHConnect
        {...{
          openWidget,
          setOpenWidget,
          ...props,
        }}
      />
      {props.children}
    </ZeeHContext.Provider>
  );
};

export default ZeeHProvider;
