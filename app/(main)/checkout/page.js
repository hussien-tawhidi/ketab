"use client";

import CustomerInfo from "@/components/checkout/CustomerInfo";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingInfo from "@/components/checkout/ShippingInfo";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // address
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [plack, setPlack] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");

  const [mySelf, setMySelf] = useState(false);
  const { user } = useLoggedUser();

  const cartItems = useSelector((item) => item.cart.items);
  const router = useRouter();

 const handleSubmitOrder = async () => {
   setLoading(true);

   try {
     // ✅ Validate fields
     if (
       !name ||
       !phone ||
       !province ||
       !city ||
       !plack ||
       !postCode ||
       !address
     ) {
       toast.error("لطفا همه موارد را کامل وارد کنید!");
       return; // stop execution if validation fails
     }



     const total = cartItems.reduce(
       (sum, item) => sum + item.price * (item.quantity || 1),
       0
     );

     const orderData = {
       customer: { name, phone, email },
       address: { province, city, plack, postCode, fullAddress: address },
       items: cartItems.map((item) => ({
         book: item._id,
         quantity: item.quantity || 1,
       })),
       total,
       paymentMethod,
     };


     // ✅ API Call
     const res = await fetch("/api/orders", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(orderData),
     });

     if (!res.ok) {
       const err = await res.json();
       throw new Error(err.message || "خطا در ثبت سفارش");
     }

     // ✅ Success
     toast.success("سفارش شما با موفقیت ثبت شد!");
     router.push("/orders");
   } catch (error) {
     console.log("🚀 ~ handleSubmitOrder ~ error:", error);
     toast.error(error.message || "مشکلی پیش آمد!");
   } finally {
     setLoading(false);
   }
 };


  return (
    <div className='max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {/* Left: Customer & Shipping Info */}
      <div className='lg:col-span-2 space-y-6'>
        {/* Customer Info */}
        <CustomerInfo
          user={user}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          mySelf={mySelf}
          setMySelf={setMySelf}
        />

        {/* Shipping Info */}
        <ShippingInfo
          province={province}
          setProvince={setProvince}
          city={city}
          setCity={setCity}
          postCode={postCode}
          setPostCode={setPostCode}
          plack={plack}
          setPlack={setPlack}
          address={address}
          setAddress={setAddress}
        />

        {/* Payment Method */}
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      {/* Right: Order Summary */}
      <OrderSummary
        loading={loading}
        items={cartItems}
        total={cartItems.reduce((sum, item) => sum + item.price, 0)}
        onSubmit={handleSubmitOrder}
      />
    </div>
  );
}
