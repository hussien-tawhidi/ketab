import Search from "@/components/header/search/Search";

export default function AdminHeader() {
  return (
    <div className='bg-ketab-light w-full py-4'>
      <div className='w-[70%] mx-auto'>
        <Search />
      </div>
    </div>
  );
}
