"use client";

import AnimatedCheckbox from "../shared/AnimateCheckbox";
import Input from "../shared/Input";

export default function CustomerInfo({
  user,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  mySelf,
  setMySelf,
}) {
  return (
    <div className='bg-ketab-light p-6 rounded-2xl shadow'>
      <h2 className='text-lg font-semibold mb-4'>اطلاعات سفارش گیرنده</h2>

      {/* Name & Phone */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <Input
          value={mySelf ? user?.name || "" : name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='نام و نام خانوادگی'
        />
        <Input
          value={mySelf ? user?.phone || "" : phone}
          onChange={(e) => setPhone(e.target.value)}
          type='tel'
          placeholder='شماره تماس'
        />
      </div>

      {/* Email */}
      <Input
        value={mySelf ? user?.email || "" : email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        placeholder='ایمیل'
      />

      {/* Myself checkbox */}
      <div className='my-4 flex items-center gap-3'>
        <p>خودم هستم</p>
        <AnimatedCheckbox
          checked={mySelf}
          onChange={() => setMySelf(!mySelf)}
        />
      </div>
    </div>
  );
}
