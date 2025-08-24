import AdminHeader from "@/components/admin/admin-header/AdminHeader";
import SideBar from "@/components/admin/side-bar/SideBar";

export const metadata = {
  title: "پنل مدیریت| BookStore",
  description: "خرید و فروش آنلاین کتاب، رمان و کتاب صوتی با بهترین قیمت",
};

export default function AdminLayout({ children }) {
  return (
    <div className='flex'>
      <div className='bg-ketab-light fixed right-0 top-0 bottom-0'>
        <SideBar />
      </div>
      <div className='w-full min-h-[100vh] pr-72'>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
