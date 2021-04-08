import React from "react";
import Header from "./Header";

import '../style/Layout.css';

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <Header />

      {children}
    </div>
  );
};

export default Layout;
