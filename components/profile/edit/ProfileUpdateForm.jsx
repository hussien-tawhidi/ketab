// components/shared/ProfileForm.jsx
"use client";

import { FaUser, FaEnvelope, FaPhone, FaSave } from "react-icons/fa";
import AvatarUpload from "./AvatarUpload";
import Input from "@/components/shared/Input";
import AnimatedCheckbox from "@/components/shared/AnimateCheckbox";
import CustomSelect from "@/components/shared/CustomeSelect";
import BirthdayDate from "./BirthdayDate";
export default function ProfileUpdateForm({
  avatar,
  onAvatarChange,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  bio,
  setBio,
  birthday,
  setBirthday,
  gender,
  setGender,
  isActive,
  setIsActive,
  handleSave,
  loading,
}) {
  return (
    <div className='shadow-sm p-6 space-y-6'>
      <h1 className='text-2xl font-bold text-ketab-gray mb-6 flex items-center gap-2'>
        <FaUser className='text-ketab-green' /> ویرایش پروفایل
      </h1>

      {/* Avatar */}
      <AvatarUpload
        avatar={avatar}
        onChange={onAvatarChange}
        label='آپلود تصویر پروفایل'
      />

      {/* Name & Contact */}
      <Input
        type='text'
        placeholder='نام و نام خانوادگی'
        icon={<FaUser />}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder='ایمیل'
        icon={<FaEnvelope />}
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='شماره موبایل'
        icon={<FaPhone />}
        type='text'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        placeholder='متن که در ذهن دارید بنویسید'
        type='text'
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      {/* Birthday & Gender */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <CustomSelect
          value={gender}
          onChange={(val) => setGender(val.value)}
          options={[
            { value: "male", label: "مرد" },
            { value: "female", label: "زن" },
          ]}
        />
        <BirthdayDate birthday={birthday} setBirthday={setBirthday} />
      </div>

      {/* Active status */}
      <div className='flex items-center gap-2'>
        <AnimatedCheckbox
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <p className='text-sm text-ketab-gray'>حساب کاربری فعال باشد</p>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 py-3 rounded-xl transition font-medium ${
          loading
            ? "bg-ketab-gray cursor-not-allowed"
            : "bg-ketab-green text-ketab-white hover:bg-ketab-green/90"
        }`}>
        {loading ? (
          <span className='animate-spin border-2 border-ketab-white border-t-transparent rounded-full w-5 h-5' />
        ) : (
          <FaSave />
        )}
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}
