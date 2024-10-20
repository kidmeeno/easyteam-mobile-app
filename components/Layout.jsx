import React, { useEffect } from "react";
import { EasyTeamProvider } from "@easyteam/ui";
import { BASE_PATH } from "../config/api";
import { useAppState } from "@/context/AppStateContext";

const customFont = {
  regular: "AvenirNext-Regular",
  bold: "AvenirNext-Bold",
  semiBold: "AvenirNext-DemiBold",
};

const Layout = ({ children }) => {
  const { state } = useAppState();

  return (
    <EasyTeamProvider
      token={state.token}
      customFont={customFont}
      employees={state.employees}
      basePath={BASE_PATH}
    >
      {children}
    </EasyTeamProvider>
  );
};

export default Layout;
