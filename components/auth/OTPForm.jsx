"use client";
import { useState, useRef } from "react";
import axios from "axios";
import SubmitButton from "../shared/SubmitButton";
import SuccessMsg from "../shared/SuccessMsg";
import ErrorMsg from "../shared/ErrorMsg";

export default function OTPForm({ identifier, setStep, onSuccess, onError }) {
  console.log("🚀 ~ OTPForm ~ identifier:", identifier);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputsRef = useRef([]);

  // Convert Persian/Arabic digits to English
  const toEnglishDigits = (str) =>
    str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const handleChange = (value, index) => {
    value = toEnglishDigits(value.slice(-1)); // keep only 1 digit
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      // Auto-submit when all 6 digits are filled
      if (newOtp.every((d) => d !== "")) {
        handleSubmitAuto(newOtp.join(""));
      }
    }
  };

  const handleSubmitAuto = async (code) => {
    try {
      setLoading(true);
      const phoneRegex = /^(\+98|0)?9\d{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const payload = { otp: code };
      if (phoneRegex.test(identifier)) payload.phone = identifier;
      else if (emailRegex.test(identifier)) payload.email = identifier;

      const res = await axios.post("/api/otp/verify-otp", payload);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setSuccessMsg("ورود موفقیت‌آمیز بود");
        setErrorMsg("")
        if (onSuccess) onSuccess(res.data);
      }
    } catch (err) {
      const message = err?.response?.data?.message || "خطا در تایید کد.";
      setSuccessMsg("")
      setErrorMsg(message);
      if (onError) onError(message);
    } finally {
      setLoading(false);
      
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let paste = toEnglishDigits(e.clipboardData.getData("text").trim());
    if (/^\d+$/.test(paste)) {
      const pasteArr = paste.split("").slice(0, otp.length);
      const newOtp = [...otp];
      pasteArr.forEach((d, idx) => {
        newOtp[idx] = d;
      });
      setOtp(newOtp);
      inputsRef.current[pasteArr.length - 1]?.focus();

      if (newOtp.every((d) => d !== "")) {
        handleSubmitAuto(newOtp.join(""));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      if (onError) onError("کد تایید باید ۶ رقمی باشد.");
      return;
    }
    await handleSubmitAuto(code);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex flex-col gap-3 bg-transparent border border-ketab-green rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md p-4 overflow-hidden'>
      <div className='flex flex-col gap-3 m-auto z-10'>
        <p className='text-right mb-2 text-[12px]'>
          کد تایید به {identifier} پیامک شد.
        </p>

        <div
          className='flex justify-center gap-2'
          dir='ltr'
          onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className='w-10 h-10 text-center text-lg font-bold text-ketab-white bg-transparent border border-ketab-green rounded-lg focus:outline-none focus:border-ketab-white transition-all duration-300'
            />
          ))}
        </div>
        {successMsg && <SuccessMsg text={successMsg} />}
        {errorMsg && <ErrorMsg text={errorMsg} />}
        <button
          type='button'
          className='text-ketab-green font-semibold hover:underline text-sm'
          onClick={() => setStep(1)}>
          {/^(\+98|0)?9\d{9}$/.test(identifier)
            ? "ویرایش شماره"
            : "ویرایش ایمیل"}
        </button>
        <SubmitButton
          label={loading ? "در حال تایید..." : "تایید کد"}
          indentifier={identifier}
        />
      </div>

      {/* Floating Blob Animation */}
      <svg
        className='absolute opacity-50 blur-2xl animate-[float_3s_infinite] z-0'
        viewBox='0 0 200 200'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='#5e942b'
          d='M56.8,-23.9C61.7,-3.2,45.7,18.8,26.5,31.7C7.2,44.6,-15.2,48.2,-35.5,36.5C-55.8,24.7,-73.9,-2.6,-67.6,-25.2C-61.3,-47.7,-30.6,-65.6,-2.4,-64.8C25.9,-64.1,51.8,-44.7,56.8,-23.9Z'
          transform='translate(100 100)'
        />
      </svg>
    </form>
  );
}
