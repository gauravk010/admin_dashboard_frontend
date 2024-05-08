import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout = () => {
  const [SidbarSz, setSidbarSz] = useState(false);
  return (
    <div className="relative bg-neutral-100 min-h-screen">
      <Sidebar SidbarSz={SidbarSz} />
      <div
        className="flex-1"
        style={{
          width: SidbarSz ? "calc(100% - 5rem)" : "calc(100% - 16rem)",
          marginLeft: SidbarSz ? "5rem" : "16rem",
        }}
      >
        <Header SidbarSz={SidbarSz} setSidbarSz={setSidbarSz} />
        <div className="p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
