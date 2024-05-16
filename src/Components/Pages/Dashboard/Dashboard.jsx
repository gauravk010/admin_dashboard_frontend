import React from "react";
import { DashboardStatsGrid } from "./DashboardStatsGrid";
import { BarChartComp } from "../../Charts/BarChartComp";
import { PieChartComp } from "../../Charts/PieChartComp";
import TableComp from "./TableComp";

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full max-[990px]:flex-col">
        <BarChartComp />
        <PieChartComp />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <TableComp />
      </div>
    </div>
  );
};
