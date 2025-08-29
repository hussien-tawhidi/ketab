import { orders } from "@/constant/admin";
import OrdersTable from "../admin/recent-orders/RecentOrders";

export default function RefundRequest() {
  const filterOrder = orders.filter((item) => item.status === "درخواست بازگشت");
  return (
    <div className='py-10'>
      <OrdersTable orders={filterOrder} title={"درخواست بازگشت"} />
    </div>
  );
}
