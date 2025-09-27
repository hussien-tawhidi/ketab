"use client";
import React from "react";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const methods = [
    { id: "card", label: "پرداخت اینترنتی", icon: "💳" },
    { id: "cod", label: "پرداخت در محل", icon: "📦" },
    { id: "wallet", label: "کیف پول", icon: "👛" },
  ];

  return (
    <div className='bg-ketab-light p-6 rounded-2xl shadow'>
      <h2 className='text-lg font-semibold mb-4'>روش پرداخت</h2>
      <div className='flex flex-col gap-4'>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`relative p-4 rounded-xl cursor-pointer flex items-center justify-between border transition-all duration-300 ${
              paymentMethod === method.id
                ? "border-ketab-green/50 bg-ketab-green/50 scale-[1.02]"
                : "border-ketab-gray/30 hover:border-ketab-green/50"
            }`}>
            {/* Hidden Radio */}
            <input
              type='radio'
              name='payment'
              checked={paymentMethod === method.id}
              onChange={() => setPaymentMethod(method.id)}
              className='hidden'
            />

            {/* Left: Icon + Label */}
            <div className='flex items-center gap-3'>
              <span className='text-xl'>{method.icon}</span>
              <span className='font-medium'>{method.label}</span>
            </div>

            {/* Right: Checkmark */}
            {paymentMethod === method.id && (
              <span className='text-green-600 font-bold text-lg'>✓</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
