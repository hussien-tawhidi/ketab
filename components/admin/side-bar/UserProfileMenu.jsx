import { userProfile } from '@/constant/side-bar-data';
import Link from 'next/link';

export default function UserProfileMenu({ toggleMenu, openMenus }) {
  return (
    <div>
      <h3 className='text-xs font-semibold text-ketab-gray mb-3 px-2 uppercase tracking-wider border-b pb-2 border-ketab-green/20'>
        مدیریت کاربران
      </h3>
      <ul className='space-y-1'>
        {userProfile.map((menu) => {
          const Icon = menu.icon;
          const isOpen = openMenus[menu.name];

          return (
            <li key={menu.name}>
              <div
                className='flex items-center justify-between px-3 py-3 font-medium text-sm text-ketab-gray 
                  hover:bg-ketab-green/5 rounded-lg cursor-pointer transition-all duration-200'
                onClick={() => toggleMenu(menu.name)}>
                <div className='flex items-center gap-2'>
                  <Icon className='text-ketab-green text-lg' />
                  <span>{menu.name}</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>

              {isOpen && (
                <ul className='pl-9 mt-1 space-y-1 border-r-2 border-ketab-green/10 mr-2'>
                  {menu.subMenu.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <li key={sub.name}>
                        <Link
                          href={sub.link}
                          className='flex items-center gap-2 px-3 py-2 text-[12px] text-ketab-gray 
                            hover:text-ketab-green hover:bg-ketab-green/5 rounded-lg transition-all duration-200'>
                          <SubIcon className='text-ketab-gray text-base' />
                          <span>{sub.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
