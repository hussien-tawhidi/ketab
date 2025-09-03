"use client"

import MapChart from "./MapChart";
import CountryPerformance from "./CountryPerformance";

const tabs = ["همه", "1 ماه", "6 ماه", "یک سال"];

export default function PerformanceByCountry() {
  return (
    <div className='bg-ketab-gray dark:bg-ketab-light p-6 rounded-xl w-full h-full'>
      <div className='flex sm:flex-row flex-col items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold sm:mb-0 mb-3 text-ketab-gray'>
          کار کرد بر اساسی مناطق
        </h2>
        <div className='flex gap-2'>
          {tabs.map((tab) => (
            <button
              key={tab}
              className='px-3 py-1 text-sm text-ketab-gray bg-ketab-bg whitespace-nowrap rounded'>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <MapChart />
        <CountryPerformance />
      </div>
    </div>
  );
}
