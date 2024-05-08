import React from "react";
import {FcDoughnutChart} from "react-icons/fc";
import {
  Dashboard_Sidebar_Bottom_Links,
  Dashboard_Sidebar_Links,
} from "../data/consts/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

export const Sidebar = (props) => {
  const { SidbarSz } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  const linkClass =
    "flex items-center px-1 py-3 gap-2 font-light  hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
  return (
    <div
      className={classNames(
        SidbarSz ? "w-20" : "w-64",
        "flex flex-col bg-neutral-900 p-3 h-screen text-white fixed z-10 "
      )}
    >
      <div
        className={classNames(
          SidbarSz ? "justify-center" : "gap-2",
          "flex items-end px-1 py-3 "
        )}
      >
        <FcDoughnutChart  fontSize={!SidbarSz ? 30 : 36} />
        <span className="text-neutral-100 text-xl">
          {" "}
          {!SidbarSz ? "Vizdash" : ""}
        </span>
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
                linkClass,
                SidbarSz ? "justify-center" : ""
              )}
              key={item.key}
            >
              <span className={SidbarSz ? "text-2xl" : "text-xl"}>
                {item.icon}
              </span>
              {!SidbarSz ? item.label : ""}
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
                linkClass,
                SidbarSz ? "justify-center" : ""
              )}
              onClick={item.label === "Logout" ? logout : ""}
              key={item.key}
            >
              <span className={SidbarSz ? "text-2xl" : "text-xl"}>
                {item.icon}
              </span>
              {!SidbarSz ? item.label : ""}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
