"use client";

import { useState } from "react";
import { FaInbox, FaCheckCircle, FaClock } from "react-icons/fa";

export default function TicketsPage() {
  const [tickets] = useState([
    {
      id: 1,
      subject: "مشکل ورود به حساب کاربری",
      status: "open",
      date: "2025-10-01",
    },
    {
      id: 2,
      subject: "سوال درباره سفارش شماره 1234",
      status: "pending",
      date: "2025-09-28",
    },
    {
      id: 3,
      subject: "بازگشت وجه سفارش",
      status: "closed",
      date: "2025-09-15",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return (
          <span className='flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-md text-xs'>
            <FaInbox /> باز
          </span>
        );
      case "pending":
        return (
          <span className='flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md text-xs'>
            <FaClock /> در حال بررسی
          </span>
        );
      case "closed":
        return (
          <span className='flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-md text-xs'>
            <FaCheckCircle /> بسته
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4 text-ketab-green'>
        تیکت‌های پشتیبانی
      </h1>

      <div className='shadow rounded-lg divide-y'>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className='flex justify-between items-center p-4 transition'>
            <div>
              <p className='font-medium'>{ticket.subject}</p>
              <p className='text-sm text-gray-500'>{ticket.date}</p>
            </div>
            <div>{getStatusBadge(ticket.status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
