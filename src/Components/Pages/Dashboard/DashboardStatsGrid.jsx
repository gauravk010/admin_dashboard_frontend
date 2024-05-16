import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClipboard } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBox } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { BASE_URL } from "../../Auth/Helper";

export const DashboardStatsGrid = () => {
  const [data, setData] = useState([]);
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios.get(`${BASE_URL}/admin/get-stats`, config).then((res) => {
      setData(res.data);
    });
  };

  return (
    <div className="flex flex-row max-sm:flex max-sm:flex-col max-[990px]:grid max-[990px]:grid-cols-2 gap-4 w-full">
      <BoxWrap>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <FaBox className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-gray-500 font-light text-sm">
            Total Products
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {data.products}
            </strong>
          </div>
        </div>
      </BoxWrap>
      <BoxWrap>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
          <IoClipboard className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-gray-500 font-light text-sm">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {data.orders}
            </strong>
          </div>
        </div>
      </BoxWrap>
      <BoxWrap>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <HiMiniUsers className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-gray-500 font-light text-sm">Total Users</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {data.users}
            </strong>
          </div>
        </div>
      </BoxWrap>
      <BoxWrap>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <BiSolidCategory className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-gray-500 font-light text-sm">
            Total Product Categories
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">4</strong>
          </div>
        </div>
      </BoxWrap>
    </div>
  );
};

const BoxWrap = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 border border-gray-200 w-full flex items-center ">
      {children}
    </div>
  );
};
