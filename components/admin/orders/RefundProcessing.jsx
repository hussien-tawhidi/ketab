import { orders } from "@/constant/admin";
import OrdersTable from "../admin/recent-orders/RecentOrders";

export default function RefundProcessing() {
  const filterOrder = orders.filter((item) => item.status === "در حال پردازش");
  return (
    <div className='py-10'>
      <OrdersTable orders={filterOrder} title={"در حال پردازش"} />
    </div>
  );
}
