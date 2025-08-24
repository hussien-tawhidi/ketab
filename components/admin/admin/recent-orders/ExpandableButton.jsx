import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ExpandableButton = ({ expandedOrder, orderId, onClick }) => {
  return (
    <motion.button
      className='text-ketab-orange'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}>
      <motion.div
        key={expandedOrder === orderId ? "up" : "down"}
        initial={{
          rotate: expandedOrder === orderId ? -180 : 180,
          opacity: 0,
        }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{
          opacity: 0,
          rotate: expandedOrder === orderId ? 180 : -180,
        }}
        transition={{ type: "spring", stiffness: 300 }}>
        {expandedOrder === orderId ? <FiChevronUp /> : <FiChevronDown />}
      </motion.div>
    </motion.button>
  );
};

export default ExpandableButton;
