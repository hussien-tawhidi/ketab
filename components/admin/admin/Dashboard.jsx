"use client";

import dynamic from "next/dynamic";
import StatCard from "./StateCard";
import { FiBriefcase, FiShoppingCart, FiUserPlus } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";
const PerformanceMap = dynamic(
  () => import("./by-country/CountryByPerformance"),
  { ssr: false } // disables server-side rendering
);

export default function Dashboard() {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 p-6 gap-6'>
      {/* Left side: Stat cards */}
      <div className='xl:col-span-1 sm:block flex justify-center'>
        <div className='grid gap-6 w-full sm:grid-cols-2 xl:grid-cols-2 grid-cols-1  md:grid-cols-4'>
          <StatCard
            title='همه سفارشات'
            value='15,432'
            icon={<FiShoppingCart />}
            chartData={[5, 10, 7, 8, 6, 9, 5]}
            color='#d14900'
          />
          <StatCard
            title='سرنخ های جدید'
            value='12,983'
            icon={<FiUserPlus />}
            chartData={[3, 6, 4, 7, 5, 8, 6]}
            color='#d14900'
          />
          <StatCard
            title='معاملات'
            value='1,283'
            icon={<FaHandshake />}
            chartData={[2, 5, 3, 6, 4, 5, 6]}
            color='#d14900'
          />
          <StatCard
            title='درآمد رزرو شده'
            value='$234.8k'
            icon={<FiBriefcase />}
            chartData={[10, 12, 11, 9, 10, 11, 13]}
            color='#d14900'
          />
        </div>
      </div>

      {/* Right side: Map */}
      <div className='xl:col-span-2 h-full'>
        <PerformanceMap />
      </div>
    </div>
  );
}
