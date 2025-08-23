import React from 'react'

export default function AdminProfile() {
  return (
    <div className='mt-10 pt-6 border-t border-ketab-green/20'>
      <div className='flex items-center gap-3 px-2'>
        <div className='w-10 h-10 rounded-full bg-ketab-green/10 flex items-center justify-center'>
          <span className='text-ketab-green font-semibold'>ا</span>
        </div>
        <div>
          <p className='text-sm font-medium text-ketab-gray'>امیر حسین</p>
          <p className='text-xs text-ketab-gray/70'>مدیر سیستم</p>
        </div>
      </div>
    </div>
  );
}
