import React from "react";
import { Navbar, USER_DASHBOARD } from "@/app/api/routes/route";
const HOMEPAGE = ({children}) => {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default HOMEPAGE;
