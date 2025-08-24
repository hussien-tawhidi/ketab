// OrderRow.tsx
import { motion } from "framer-motion";
import OrderDetails from "./OrderDetail";
import ExpandableButton from "./ExpandableButton";
import {
  FiCreditCard,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const OrderRow = ({ order, expandedOrder, toggleExpand }) => {
  return (
    <>
      <motion.tr
        initial={{ opacity: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
        className=' hover:bg-ketab-white/10 transition-all text-ketab-gray duration-200 group cursor-pointer'
        onClick={() => toggleExpand(order.id)}>
        <motion.td
          className='px-6 py-4 text-center whitespace-nowrap text-sm font-light text-pink'
          whileHover={{ scale: 1.03 }}>
          {order.id}
        </motion.td>
        <td className='px-6 py-4 text-center whitespace-nowrap text-sm'>
          {order.date}
        </td>
        <td className='px-6 text-center py-4 whitespace-nowrap text-sm'>
          {order.customerName}
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm'>
          <motion.div
            className='flex items-center justify-center gap-2 w-full'
            whileHover={{ scale: 1.05 }}>
            {order.paymentType === "Credit Card" ? (
              <FiCreditCard />
            ) : (
              <FiDollarSign />
            )}
            {order.paymentType}
          </motion.div>
        </td>
        <td className='px-6 py-4 flex justify-center items-center whitespace-nowrap'>
          <motion.span
            className={`px-2 inline-flex text-xs leading-5 items-center gap-1 rounded-full ${
              order.status === "تکمیل شده"
                ? "text-ketab-green"
                : "text-ketab-orange"
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}>
            {order.status === "تکمیل شده" ? (
              <FiCheckCircle className='mr-1 inline' />
            ) : (
              <FiClock className='mr-1 inline' />
            )}
            {order.status}
          </motion.span>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
          <ExpandableButton
            expandedOrder={expandedOrder}
            orderId={order.id}
            onClick={() => toggleExpand(order.id)}
          />
        </td>
      </motion.tr>

      <OrderDetails expandedOrder={expandedOrder} order={order} />
    </>
  );
};

export default OrderRow;
