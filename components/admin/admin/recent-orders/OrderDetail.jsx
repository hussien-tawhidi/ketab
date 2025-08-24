// OrderDetails.tsx
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaInfoCircle,
} from "react-icons/fa";

const OrderDetails = ({ expandedOrder, order }) => {
  // لیست فیلدها با آیکون‌ها و متن
  const details = [
    {
      label: "محصول",
      value: order.product,
      icon: <FaBook className='text-ketab-green text-lg' />,
    },
    {
      label: "تماس",
      value: order.phone,
      icon: <FaPhone className='text-ketab-green text-lg' />,
    },
    {
      label: "آدرس",
      value: order.address,
      icon: <FaMapMarkerAlt className='text-ketab-green text-lg' />,
    },
    {
      label: "روش پرداخت",
      value: order.paymentType,
      icon: <FaMoneyBill className='text-ketab-green text-lg' />,
    },
    {
      label: "وضعیت",
      value: order.status,
      icon: <FaInfoCircle className='text-ketab-green text-lg' />,
      className:
        order.status === "تکمیل شده" ? "text-green-600" : "text-orange-500",
    },
  ];

  return (
    <AnimatePresence>
      {expandedOrder === order.id && (
        <motion.tr
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className='bg-ketab-light'>
          <td colSpan={6} className='p-0'>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='overflow-hidden'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {details.map((item, idx) => (
                    <div
                      key={idx}
                      className='p-4 shadow-xl border-b border-ketab-gray/20 flex items-center gap-3'>
                      {item.icon}
                      <div className="text-ketab-gray">
                        <h4 className='text-xs font-semibold '>
                          {item.label}
                        </h4>
                        <p
                          className={`text-sm font-medium ${
                            item.className || ""
                          }`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>
  );
};

export default OrderDetails;
