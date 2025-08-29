import Dashboard from "@/components/admin/admin/Dashboard";
import OrdersTable from "@/components/admin/admin/recent-orders/RecentOrders";
import { orders } from "@/constant/admin";

export default function adminPanel() {
  return (
    <>
      <Dashboard />
      <OrdersTable orders={orders} title={"سفارشات اخیر"} />
    </>
  );
}
