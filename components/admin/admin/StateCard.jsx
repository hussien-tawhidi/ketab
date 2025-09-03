"use client"

import MiniLineChart from "./MiniLineChart";

const StatCard = ({ title, value, icon, chartData, color }) => {
  return (
    <div className='bg-ketab-gray dark:bg-ketab-light p-4 rounded-xl shadow-md w-full'>
      <div className='flex items-center gap-3 mb-2'>
        <div className='bg-ketab-bg text-ketab-gray p-2 rounded-full'>
          {icon}
        </div>
        <div className='text-sm text-ketab-gray'>{title}</div>
      </div>
      <div className='text-2xl font-bold mb-2 text-ketab-gray'>{value}</div>
      <div className='h-16'>
        <MiniLineChart data={chartData} color={color} />
      </div>
    </div>
  );
};

export default StatCard;
