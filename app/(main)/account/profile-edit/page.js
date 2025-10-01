"use client";

import ProfileUpdateForm from "@/components/profile/edit/ProfileUpdateForm";
import { useToast } from "@/components/ToastContext";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProfileEditingPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null); // preview URL
  const [avatarFile, setAvatarFile] = useState(null); // real file
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, logout } = useLoggedUser();
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setAvatar(user.avatar || null);
      setBio(user.bio || "");
      setBirthday(user.birthday || "");
      setGender(user.gender || "");
      setIsActive(user.isActive ?? false);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // preview
      setAvatarFile(file); // real file
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("birthday", birthday);
      formData.append("gender", gender);
      formData.append("isActive", isActive ? "true" : "false");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      await axios.put(`/api/profile/${user.userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      addToast("پروفایل با موفقیت ذخیره شد", "success");
      logout();
      router.push("/users/signin");
    } catch (error) {
      console.error("🚀 ~ handleSave ~ error:", error);
      addToast("خطا در ذخیره پروفایل", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto p-6'>
      <ProfileUpdateForm
        avatar={avatar}
        onAvatarChange={handleAvatarChange}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        bio={bio}
        setBio={setBio}
        birthday={birthday}
        setBirthday={setBirthday}
        gender={gender}
        setGender={setGender}
        isActive={isActive}
        setIsActive={setIsActive}
        handleSave={handleSave}
        loading={loading}
      />
    </div>
  );
}
