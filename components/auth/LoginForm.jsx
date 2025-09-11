"use client";
import { useEffect, useState } from "react";
import Input from "../shared/Input";
import SubmitButton from "../shared/SubmitButton";
import OTPForm from "./OTPForm";
import SuccessMsg from "../shared/SuccessMsg";
import ErrorMsg from "../shared/ErrorMsg";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoggedUser } from "@/hooks/useLoggedUser";

export default function LoginForm() {
  const { user } = useLoggedUser();
  const [identifier, setIdentifier] = useState(""); // phone or email
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate phone or email
    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !identifier ||
      (!phoneRegex.test(identifier) && !emailRegex.test(identifier))
    ) {
      setError("شماره تلفن یا ایمیل وارد شده صحیح نیست.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/otp/send-otp", {
        phone: phoneRegex.test(identifier) ? identifier : undefined,
        email: emailRegex.test(identifier) ? identifier : undefined,
        type: "login",
      });

      setSuccess("کد تایید برای شما ارسال شد.");
      setStep(2);
    } catch (error) {
      const message =
        error?.response?.data?.message || "خطایی سمت سرور رخ داده است.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);
  return (
    <div className='min-h-screen flex items-center justify-center bg-ketab-bg text-ketab-white'>
      <div className='w-full max-w-sm pt-2 rounded-lg text-center'>
        {/* Logo */}
        <div
          className={`mb-8 flex ${
            step === 2 ? "justify-around" : "justify-center"
          } items-center`}>
          {step === 2 && (
            <BsArrowRight
              className='ml-5 text-2xl'
              onClick={() => setStep(1)}
            />
          )}
          <Image
            onClick={() => router.push("/")}
            width={100}
            height={100}
            src='/logo.png'
            alt='کتابراه'
            className='h-12 w-auto cursor-pointer object-cover'
          />
        </div>

        {step === 1 ? (
          <>
            <h2 className='text-lg text-right font-bold mb-2'>
              ورود | ثبت نام
            </h2>
            <p className='text-right mb-2 text-[12px] text-ketab-gray'>
              شماره موبایل یا ایمیل خود را وارد کنید
            </p>

            <form onSubmit={handleSendOtp} className='space-y-2.5'>
              <Input
                onChange={(e) => setIdentifier(e.target.value)}
                value={identifier}
                type='text'
                placeholder='شماره موبایل یا ایمیل'
                success={success}
                error={error}
                setStep={step}
              />
              <div className={identifier ? "flex" : "hidden"}>
                <SubmitButton
                  label={loading ? "در حال ارسال..." : "ورود به کتابراه"}
                  loading={loading}
                />
              </div>
            </form>

            <p className='mt-6 text-[12px] text-ketab-gray'>
              با ورود به کتابراه،{" "}
              <a href='#' className='text-ketab-green hover:underline'>
                شرایط
              </a>{" "}
              و{" "}
              <a href='#' className='text-ketab-green hover:underline'>
                قوانین
              </a>{" "}
              استفاده از خدمات را می‌پذیرید.
            </p>
          </>
        ) : (
          <OTPForm
            setStep={setStep}
            onSuccess={(data) => {
              setSuccess("ورود موفقیت‌آمیز بود 🎉");
              console.log("Token or user data:", data);
            }}
            onError={(msg) => {
              setError(msg);
              console.log("Error:", msg);
            }}
            identifier={identifier} // still pass it, backend can handle phone/email
          />
        )}
      </div>
    </div>
  );
}
