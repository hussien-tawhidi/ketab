// ProductTable.tsx
import { useState } from "react";
import OrderRow from "./OrderRow";

const ProductTable = ({ filteredOrders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className='overflow-hidden rounded-lg border-none'>
      <table className='min-w-full divide-y-2 divide-ketab-gray/10 border-none'>
        <thead className='dark:bg-ketab-light'>
          <tr>
            {["ایدی", "اتاریخ", "مشتری", "پرداخت", "وضعیت", "جزییات"].map(
              (item, index) => (
                <th
                  key={index}
                  scope='col'
                  className='px-6 py-3 text-xs font-bold uppercase tracking-wider text-ketab-gray'>
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className='divide-y divide-ketab-gray/10'>
          {filteredOrders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              expandedOrder={expandedOrder}
              toggleExpand={toggleExpand}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
