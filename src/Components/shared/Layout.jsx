import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";


export const Layout = () => {
  const [SidebarCollapse, setSidebarCollapse] = useState(false);
  const [MobSidebarCollapse, setMobSidebarCollapse] = useState(true);
  useEffect(() => {
    document.body.addEventListener("click", () => {
      // setMobSidebarCollapse(!MobSidebarCollapse)
    });
  }, []);

  return (
    <div className="relative flex ">
      <Sidebar
        SidebarCollapse={SidebarCollapse}
        MobSidebarCollapse={MobSidebarCollapse}
        setMobSidebarCollapse={setMobSidebarCollapse}
        setSidebarCollapse={setSidebarCollapse}
      />
      <div
        className={`bg-neutral-100 min-h-screen overflow-hidden flex-1 max-[990px]:w-full max-[990px]:ml-0 
        ${SidebarCollapse ? "ml-20" : "ml-64"}  ${
          SidebarCollapse ? "w-[calc(100% - 5rem)]" : "w-[calc(100% - 16rem)]"
        }
        `}
        style={
          {
            // width: SidbarSz ? "calc(100% - 5rem)" : "calc(100% - 16rem)",
            // marginLeft: SidbarSz ? "5rem" : "16rem",
          }
        }
      >
        <Header
          SidebarCollapse={SidebarCollapse}
          setSidebarCollapse={setSidebarCollapse}
          MobSidebarCollapse={MobSidebarCollapse}
          setMobSidebarCollapse={setMobSidebarCollapse}
        />
        <div className="p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
