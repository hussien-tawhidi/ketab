import SideBarMenu from "@/components/profile/SideBarMenu";

export default function accountLayout({ children }) {
  return (
    <div className='md:flex'>
      <div className='md:flex hidden w-1/4'>
        <SideBarMenu />
      </div>
      <div className='md:w-3/4 w-full'>{children}</div>
    </div>
  );
}
