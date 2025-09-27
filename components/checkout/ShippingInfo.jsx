"use client";

import Input from "../shared/Input";

export default function ShippingInfo({
  province,
  setProvince,
  city,
  setCity,
  postCode,
  setPostCode,
  plack,
  setPlack,
  address,
  setAddress,
}) {
  return (
    <div className='bg-ketab-light p-6 rounded-2xl shadow'>
      <h2 className='text-lg font-semibold mb-4'>آدرس ارسال</h2>

      {/* Province, City, PostCode, Plack */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
        <Input
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          type='text'
          placeholder='استان'
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type='text'
          placeholder='شهر'
        />
        <Input
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          type='text'
          placeholder='کد پستی'
        />
        <Input
          value={plack}
          onChange={(e) => setPlack(e.target.value)}
          type='text'
          placeholder='پلاک'
        />
      </div>

      {/* Address full line */}
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        type='text'
        placeholder='کوچه، خیابان ...'
      />
    </div>
  );
}
