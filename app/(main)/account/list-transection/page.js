"use client";

import { useState } from "react";
import { FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function ListTransactionPage() {
  const [transactions, setTransactions] = useState([]);


  return (
    <div className='max-w-5xl mx-auto p-6 h-full'>
      {/* Header */}
      <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <FaMoneyBillWave className='w-6 h-6 text-ketab-green' />
        لیست تراکنش‌ها
      </h1>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <p className='text-ketab-gray text-center py-20'>
          هنوز هیچ تراکنشی ثبت نشده است
        </p>
      ) : (
        <div className='shadow-sm rounded-2xl overflow-hidden'>
          <div className='w-full'>
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-ketab-gray/30 text-ketab-gray text-right'>
                  <tr>
                    <th className='px-6 py-3 font-semibold'>عنوان</th>
                    <th className='px-6 py-3 font-semibold'>مبلغ</th>
                    <th className='px-6 py-3 font-semibold'>تاریخ</th>
                    <th className='px-6 py-3 font-semibold text-center'>نوع</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr
                      key={t.id}
                      className='border-t border-ketab-gray/50 hover:bg-ketab-gray/30 transition'>
                      <td className='px-6 py-4'>{t.title}</td>
                      <td
                        className={`px-6 py-4 font-semibold ${
                          t.amount < 0 ? "text-ketab-red" : "text-ketab-green"
                        }`}>
                        {t.amount.toLocaleString()} تومان
                      </td>
                      <td className='px-6 py-4 text-ketab-gray'>{t.date}</td>
                      <td className='px-6 py-4 text-center'>
                        {t.type === "income" ? (
                          <span className='inline-flex items-center gap-1 text-ketab-green bg-ketab-green/20 px-3 py-1 rounded-full text-xs font-medium'>
                            <FaArrowDown className='w-3 h-3' /> واریز
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1 text-ketab-red bg-ketab-red/20 px-3 py-1 rounded-full text-xs font-medium'>
                            <FaArrowUp className='w-3 h-3' /> برداشت
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className='md:hidden flex flex-col gap-4'>
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className='p-4 rounded-2xl bg-ketab-light border border-ketab-gray/20 shadow-sm hover:shadow-md transition space-y-2'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-sm font-semibold text-right text-ketab-gray'>
                      {t.title}
                    </h3>
                    <span
                      className={`font-bold ${
                        t.amount < 0 ? "text-ketab-red" : "text-ketab-green"
                      }`}>
                      {t.amount.toLocaleString()} تومان
                    </span>
                  </div>
                  <div className='flex justify-between items-center text-xs text-ketab-gray'>
                    <span>{t.date}</span>
                    {t.type === "income" ? (
                      <span className='inline-flex items-center gap-1 text-ketab-green bg-ketab-green/20 px-2 py-1 rounded-full font-medium'>
                        <FaArrowDown className='w-3 h-3' /> واریز
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1 text-ketab-red bg-ketab-red/20 px-2 py-1 rounded-full font-medium'>
                        <FaArrowUp className='w-3 h-3' /> برداشت
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
