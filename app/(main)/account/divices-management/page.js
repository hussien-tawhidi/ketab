"use client";

import { useState } from "react";
import { FaDesktop, FaTrashAlt } from "react-icons/fa";

export default function DevicesManagementPage() {
  const [devices,setDevices]=useState([])

  return (
    <div className='max-w-6xl mx-auto p-6 h-full space-y-6'>
      {/* Header */}
      <h1 className='text-2xl font-bold mb-4 flex items-center gap-2 text-ketab-gray'>
        <FaDesktop className='w-6 h-6 text-ketab-green' />
        مدیریت دستگاه‌ها
      </h1>

      {/* Devices Table */}
      <div className=' border border-ketab-gray/20 rounded-2xl shadow-sm overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='bg-ketab-gray/30 text-ketab-gray text-right'>
            <tr>
              <th className='px-6 py-3 font-semibold'>نام دستگاه</th>
              <th className='px-6 py-3 font-semibold'>نوع</th>
              <th className='px-6 py-3 font-semibold'>آخرین فعالیت</th>
              <th className='px-6 py-3 font-semibold text-center'>وضعیت</th>
              <th className='px-6 py-3 font-semibold text-center'>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr
                key={d.id}
                className='border-t border-ketab-gray/50 hover:bg-ketab-gray/30 transition'>
                <td className='px-6 py-4 text-ketab-gray'>{d.name}</td>
                <td className='px-6 py-4 text-ketab-gray'>{d.type}</td>
                <td className='px-6 py-4 text-ketab-gray'>{d.lastActive}</td>
                <td className='px-6 py-4 text-center'>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      d.status === "active"
                        ? "text-ketab-green bg-ketab-green/20"
                        : "text-ketab-red bg-ketab-red/20"
                    }`}>
                    {d.status === "active" ? "فعال" : "غیرفعال"}
                  </span>
                </td>
                <td className='px-6 py-4 text-center'>
                  <button className='text-ketab-red hover:text-ketab-red/80 transition'>
                    <FaTrashAlt className='w-5 h-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {devices.length === 0 && (
        <p className='text-ketab-gray text-center py-10'>
          هیچ دستگاهی ثبت نشده است
        </p>
      )}
    </div>
  );
}
