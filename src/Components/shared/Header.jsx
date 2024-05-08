import { Menu, Popover, Transition } from "@headlessui/react";
import axios from "axios";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
  HiOutlineMenu,
  HiLogout,
  HiOutlineUser,
  HiOutlineCog,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Auth/Helper";

export const Header = (props) => {
  const { SidbarSz, setSidbarSz } = props;
  const [User, setUser] = useState([]);
  const navigate = useNavigate();
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/getuser`, config).then((res) => {
      setUser(res.data);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  const toggle = () => {
    setSidbarSz(!SidbarSz);
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-5">
        <div>
          <HiOutlineMenu
            className="cursor-pointer"
            fontSize={25}
            onClick={toggle}
          />
        </div>
        <div className="relative">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 pl-11 pr-4 rounded-sm"
          />
        </div>
      </div>
      <div className="flex gap-2 mr-7">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 inline-flex items-center text-gray-700 rounded-sm hover:text-opacity-100 focus:oultine-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel>
                  <div className="absolute right-0 mt-2.5 w-80 z-10">
                    <div className="bg-white rounded-sm shadow-md px-2 py-2.5 ring-1 ring-black ring-opacity-5">
                      <strong>Messages</strong>
                      <div className="mt-2 py-1 text-sm">
                        No message right now!
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 inline-flex items-center text-gray-700 rounded-sm hover:text-opacity-100 focus:oultine-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel>
                  <div className="absolute right-0 mt-2.5 w-80 z-10">
                    <div className="bg-white rounded-sm shadow-md px-2 py-2.5 ring-1 ring-black ring-opacity-5">
                      <strong>Notifications</strong>
                      <div className="mt-2 py-1 text-sm">
                        No notification right now!
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div className="inline-flex">
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none ">
              <div
                className="h-10 w-10 rounded-full bg-slate-400 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1709496440~exp=1709497040~hmac=9d9f2c4a9d666ad6489d54bb8bea5d861095145c9ab4fa0466e7639e26453ed1")',
                }}
              ></div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 z-10 mt-2 w-48 rounded-sm bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outilne-none">
              <Menu.Item>
                {({ active }) => (
                  <>
                    <div
                      className={classNames(
                        active && "bg-gray-100",
                        "text-gray-700 rounded-sm px-4 py-2 focus:bg-gray-200 cursor-pointer flex gap-3 items-center"
                      )}
                    >
                      <div
                        className="h-8 w-8 rounded-full bg-slate-400 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage:
                            'url("https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1709496440~exp=1709497040~hmac=9d9f2c4a9d666ad6489d54bb8bea5d861095145c9ab4fa0466e7639e26453ed1")',
                        }}
                      ></div>
                      <span>{User.username}</span>
                    </div>
                    <hr />
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <Link
                      className={classNames(
                        active && "bg-gray-100",
                        "text-gray-700 rounded-sm px-4 pt-5 pb-2 focus:bg-gray-200 cursor-pointer flex gap-3 items-center"
                      )}
                      to={"/profile"}
                    >
                      <HiOutlineUser />
                      <span>Profile</span>
                    </Link>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 rounded-sm px-4 py-2 focus:bg-gray-200 cursor-pointer flex gap-3 items-center"
                    )}
                  >
                    <HiOutlineCog />
                    <span>Settings</span>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 rounded-sm px-4 pt-2 pb-5 focus:bg-gray-200 cursor-pointer flex gap-3 items-center"
                    )}
                    onClick={logout}
                  >
                    <HiLogout />
                    <span>Logout</span>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
