import React from "react";
import { FcDoughnutChart } from "react-icons/fc";
import {
  Dashboard_Sidebar_Bottom_Links,
  Dashboard_Sidebar_Links,
} from "../data/consts/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";

export const Sidebar = (props) => {
  const {
    SidebarCollapse,
    MobSidebarCollapse,
    setMobSidebarCollapse,
  } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  const toggle = () => {
    setMobSidebarCollapse(!MobSidebarCollapse);
  };
  const linkClass =
    "flex items-center px-3 py-3 gap-4 font-light  hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
  return (
    <div
      className={classNames(
        SidebarCollapse ? "w-20" : "w-64",
        `flex flex-col bg-neutral-900 p-3 min-h-screen text-white fixed z-20 max-[990px]:w-64 max-[990px]:-left-64 ${
          MobSidebarCollapse ? "max-[990px]:-ml-64" : "max-[990px]:ml-64"
        } max-[990px]:duration-150`
      )}
    >
      <div className="flex justify-between items-center">
        <Link
          to={"/"}
          className={classNames(
            // SidebarCollapse ? "justify-center" : "",
            "flex items-center px-1 py-3 gap-4"
          )}
          onClick={() => setMobSidebarCollapse(!MobSidebarCollapse)}
        >
          <FcDoughnutChart fontSize={36} />
          <span className="text-neutral-100 text-xl ">
            {MobSidebarCollapse
              ? !SidebarCollapse
                ? "Vizdash"
                : ""
              : "Vizdash"}
          </span>
        </Link>
        <div className={`max-[990px]:block hidden`}>
          <IoClose className="cursor-pointer" fontSize={25} onClick={toggle} />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-0.5 py-8">
        {Dashboard_Sidebar_Links.map((item) => {
          return (
            <Link
              to={item.path}
              className={classNames(
                pathname === item.path
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400",
                linkClass
                // SidebarCollapse ? "justify-center" : ""
              )}
              key={item.key}
              onClick={() => setMobSidebarCollapse(!MobSidebarCollapse)}
            >
              <span className={"text-2xl"}>{item.icon}</span>
              {/* {!SidebarCollapse ? item.label : ""} */}
              {MobSidebarCollapse
                ? !SidebarCollapse
                  ? item.label
                  : ""
                : item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {Dashboard_Sidebar_Bottom_Links.map((item) => {
          return (
            <Link
              to={item.path === "/logout" ? "/login" : item.path}
              className={classNames(
                pathname === item.path
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400",
                linkClass
                // SidebarCollapse ? "justify-center" : ""
              )}
              onClick={()=> item.label === "Logout" ? logout : setMobSidebarCollapse(!MobSidebarCollapse)}
              key={item.key}
            >
              <span className={"text-2xl"}>{item.icon}</span>
              {/* {!SidebarCollapse ? item.label : ""} */}
              {MobSidebarCollapse
                ? !SidebarCollapse
                  ? item.label
                  : ""
                : item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
