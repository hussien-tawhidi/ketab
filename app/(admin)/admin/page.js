import Dashboard from "@/components/admin/admin/Dashboard";
import OrdersTable from "@/components/admin/admin/recent-orders/RecentOrders";

export default function adminPanel() {
  return (
    <>
      <Dashboard />
      <OrdersTable />
    </>
  );
}
