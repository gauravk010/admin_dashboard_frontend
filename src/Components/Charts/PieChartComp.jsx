import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { BASE_URL } from "../Auth/Helper";

const RADIAN = Math.PI / 180;
const COLORS = ["#004B95", "#06C", "#519DE9", "#8BC1F7"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export const PieChartComp = () => {
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [VisData, setVisData] = useState([]);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/admin/get-product-stats`, config)
      .then((res) => {
        setVisData(res.data);
      });
  };

  return (
    <div className="min-h-80  bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <strong className="text-gray-700 font-semibold">Product Report</strong>
      </div>
      <div className="mt-3 w-full flex-1 text-xs flex justify-center">
        {/* <ResponsiveContainer width="500" height="500"> */}
        <PieChart width={400} height={300}>
          <Pie
            data={VisData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={115}
            innerRadius={70}
            fill="#8884d8"
            dataKey={"products"}
            blendStroke
          >
            {VisData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};
