"use client";
import AddBtn from "@/components/shared/AddBtn";
import AnimatedCheckbox from "@/components/shared/AnimateCheckbox";
import CustomSelect from "@/components/shared/CustomeSelect";
import ErrorMsg from "@/components/shared/ErrorMsg";
import Input from "@/components/shared/Input";
import SubmitButton from "@/components/shared/SubmitButton";
import SuccessMsg from "@/components/shared/SuccessMsg";
import { useRoles } from "@/hooks/fetchRoles";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { TiArrowLeft } from "react-icons/ti";

export default function AssignPermission() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { roles: databaseRoles } = useRoles();

  // Update permissions when role changes
  useEffect(() => {
    const selectedRole = databaseRoles.find((r) => r.name === role);
    if (selectedRole) {
      setPermissions(selectedRole.permissions || []);
    } else {
      setPermissions([]);
    }
  }, [role, databaseRoles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!userId || !role) {
      setErrorMsg("باید تمام فیلدهای لازم را پر کنید!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId,
        role,
        active,
        permissions, // ✅ now we send permissions instead of jobs/responsibilities
      };

      await axios.post("/api/admin/permission", payload);
      setSuccessMsg("مجوز جدید با موفقیت ایجاد شد");
      router.push("/admin/permissions");
      // Reset form
      setUserId("");
      setRole("");
      setActive(true);
      setPermissions([]);
    } catch (error) {
      console.error("🚀 handleSubmit error:", error);
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("خطا در ایجاد مجوز! لطفا دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 flex items-center justify-center'>
      <div className='w-full max-w-lg rounded-xl shadow-lg p-6 text-ketab-gray'>
        <div className='flex justify-between items-center'>
          <p className='h-1 text-3xl pb-10'>تخصیص مجوز</p>
          <button
            onClick={() => router.push("/admin/permissions")}
            className='py-1 px-3 rounded-md border border-ketab-green text-ketab-green cursor-pointer'>
            <MdKeyboardBackspace />
          </button>
        </div>

        <form className='space-y-5 mt-5' onSubmit={handleSubmit}>
          {errorMsg && (
            <div className='my-4'>
              <ErrorMsg text={errorMsg} />
            </div>
          )}
          {successMsg && (
            <div className='my-4'>
              <SuccessMsg text={successMsg} />
            </div>
          )}

          {/* User ID */}
          <Input
            label='شناسه کاربر (ID)'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type='text'
          />

          {/* Role */}
          <div>
            <label className='block text-sm font-medium mb-1'>انتخاب نقش</label>
            <CustomSelect
              options={databaseRoles.map((r) => ({
                label: r.name,
                value: r.name,
              }))}
              value={role}
              defaultLabel='انتخاب نقش'
              onChange={(option) => setRole(option.value)}
            />
          </div>

          {/* Permissions (read-only preview) */}
          {permissions.length > 0 && (
            <div className='mt-3'>
              <label className='block text-sm font-medium mb-1'>مجوزها</label>
              <ul className='text-sm'>
                {permissions.map((perm, idx) => (
                  <li key={idx} className='flex items-center gap-1'>
                    <TiArrowLeft />
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Active Toggle */}
          <div className='flex'>
            <div
              className={`flex items-center gap-2 ${
                active ? "text-ketab-green" : ""
              } p-2 rounded-xl`}>
              <p>{active ? "فعال" : "غیرفعال"}</p>
              <AnimatedCheckbox
                checked={active}
                onChange={() => setActive(!active)}
                size={24}
                color='green-500'
              />
            </div>
          </div>

          <SubmitButton label='ذخیره' loading={loading} />
        </form>
      </div>
    </div>
  );
}
