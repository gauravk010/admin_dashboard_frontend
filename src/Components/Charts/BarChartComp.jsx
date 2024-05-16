import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../Auth/Helper";

export const BarChartComp = () => {
  const [VisData, setVisData] = useState([]);

  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${BASE_URL}/admin/get-order-stats`, config).then((res) => {
      let data = res.data.map((item) => {
        let word = item.name;
        let ItemName = item.name.slice(0, 7);
        return {
          name: ItemName + `${word.length > 7 ? ".." : ""}`,
          orders: item.orders,
        };
      });
      if (window.innerWidth > 720) {
        setVisData(res.data);
      } else {
        setVisData(data);
      }
    });
  };

  return (
    <div className="min-h-80 bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <strong className="text-gray-700 font-semibold">Orders Report</strong>
      </div>
      <div className="mt-3 w-full flex-1 text-xs flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={800}
            height={300}
            data={VisData}
            margin={{
              top: 0,
              right: 0,
              left: -10,
              bottom: 0,
            }}
            barSize={100}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis interval={0} dataKey="name"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#06C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
