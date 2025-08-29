import { orders } from "@/constant/admin";
import OrdersTable from "../admin/recent-orders/RecentOrders";

export default function Orders() {
  return (
    <div className='py-10'>
      <OrdersTable orders={orders} title={"همه سفارشات"} />
    </div>
  );
}
