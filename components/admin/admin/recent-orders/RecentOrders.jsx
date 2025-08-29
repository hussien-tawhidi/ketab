"use client";

import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { adminOrdersOptionFilter } from "../../../../constant/admin";
import { TfiShoppingCart } from "react-icons/tfi";
import { BiSearch } from "react-icons/bi";
import ProductTable from "./ProductTable";
import Input from "@/components/shared/Input";
import CustomSelect from "@/components/shared/CustomeSelect";

export default function OrdersTable({ orders = [],title }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // تعداد سفارشات در هر صفحه

  // 🔍 فیلتر براساس جستجو و وضعیت
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // 📄 محاسبه Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ➡️ تغییر صفحه
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className='bg-ketab-light backdrop-blur-md rounded-2xl shadow-lg p-4 md:w-[96%] mx-auto transition-all duration-300'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start text-ketab-gray md:items-center justify-between gap-4 mb-6'>
        <h2 className='text-2xl font-bold text-dark flex items-center gap-3'>
          <TfiShoppingCart /> {title}
        </h2>

        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
          {/* Search Input */}
          <div className='relative w-full sm:w-64'>
            <Input
              placeholder='جستجوی کتاب، نویسنده، ناشر'
              icon={<BiSearch />}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // وقتی سرچ تغییر کرد برگرد به صفحه اول
              }}
            />
          </div>

          {/* Filter Dropdown */}
          <CustomSelect
            options={adminOrdersOptionFilter}
            defaultLabel='همه'
            onChange={(option) => {
              setFilterStatus(option.value);
              setCurrentPage(1); // وقتی فیلتر تغییر کرد برگرد به صفحه اول
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto rounded-xl'>
        <ProductTable filteredOrders={paginatedOrders} />
      </div>

      {/* Footer */}
      <div className='flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 border-light/30 dark:border-light/20 gap-4'>
        {/* نمایش تعداد */}
        <p className='text-sm text-ketab-gray'>
          نمایش{" "}
          <span className='font-semibold text-ketab-white'>
            {paginatedOrders.length}
          </span>{" "}
          از{" "}
          <span className='font-semibold text-ketab-white'>
            {filteredOrders.length}
          </span>{" "}
          سفارش
        </p>

        {/* Pagination */}
        <div className='flex items-center gap-3'>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className='flex items-center justify-center w-9 h-9 rounded-full 
                 bg-light/20 dark:bg-ketab-gray 
                 text-dark dark:text-white 
                 hover:bg-ketab-green hover:text-white 
                 transition disabled:opacity-40 disabled:cursor-not-allowed'>
            <MdKeyboardArrowRight className='text-xl' />
          </button>

          <span className='text-sm text-ketab-gray'>
            صفحه {currentPage} از {totalPages}
          </span>

          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className='flex items-center justify-center w-9 h-9 rounded-full 
                 bg-light/20 dark:bg-ketab-gray 
                 text-dark dark:text-white 
                 hover:bg-ketab-green hover:text-white 
                 transition disabled:opacity-40 disabled:cursor-not-allowed'>
            <MdKeyboardArrowLeft className='text-xl' />
          </button>
        </div>
      </div>
    </div>
  );
}
