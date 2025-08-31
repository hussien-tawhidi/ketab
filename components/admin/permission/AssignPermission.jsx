"use client";
import AddBtn from "@/components/shared/AddBtn";
import AnimatedCheckbox from "@/components/shared/AnimateCheckbox";
import CustomSelect from "@/components/shared/CustomeSelect";
import ErrorMsg from "@/components/shared/ErrorMsg";
import Input from "@/components/shared/Input";
import SubmitButton from "@/components/shared/SubmitButton";
import SuccessMsg from "@/components/shared/SuccessMsg";
import { roles } from "@/constant/admin";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { TiArrowLeft } from "react-icons/ti";

export default function AssignPermission() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(true);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableResponsibilities, setAvailableResponsibilities] = useState(
    []
  );

  const router = useRouter();

  // Update jobs & responsibilities when role changes
  useEffect(() => {
    const selectedRole = roles.find((r) => r.value === role);
    if (selectedRole) {
      setAvailableJobs(selectedRole.jobs || []);
      setAvailableResponsibilities(selectedRole.responsibilities || []);
    } else {
      setAvailableJobs([]);
      setAvailableResponsibilities([]);
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setErrorMsg("");
    setSuccessMsg("");

    // Validation
    if (!userId || !role) {
      setErrorMsg("باید تمام فلد های لازمه را پر کنید!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId,
        role,
        active,
        jobs: availableJobs,
        responsibilities: availableResponsibilities,
      };

      await axios.post("/api/admin/permission", payload);
      setSuccessMsg("مجوز جدید با موفقیت ایجاد شد ");
      // Reset form
      setUserId("");
      setRole("");
      setActive(true);
      setAvailableJobs([]);
      setAvailableResponsibilities([]);
    } catch (error) {
      console.error("🚀 handleSubmit error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
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
        <form className='space-y-5 mt-5'>
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
            <label className='block text-sm font-medium mb-1'>
              انتخاب مجوز
            </label>
            <CustomSelect
              options={roles.filter((item) => item.jobs.length !== 0)}
              value={role}
              defaultLabel='انتخاب نقش'
              onChange={(option) => setRole(option.value)}
            />
          </div>

          {/* Jobs (Read-only) */}
          {availableJobs.length > 0 && (
            <div className='mt-3'>
              <label className='block text-sm font-medium mb-1'>وظایف</label>
              <ul className='text-sm'>
                {availableJobs.map((job, idx) => (
                  <li key={idx} className='flex items-center gap-1'>
                    <TiArrowLeft />
                    {job}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities (Read-only) */}
          {availableResponsibilities.length > 0 && (
            <div className='mt-3'>
              <label className='block text-sm font-medium mb-1'>
                مسئولیت‌ها
              </label>
              <ul className='text-sm'>
                {availableResponsibilities.map((resp, idx) => (
                  <li key={idx} className='flex items-center gap-1'>
                    <TiArrowLeft />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='flex'>
            <div
              className={`flex items-center gap-2 ${
                active ? "text-ketab-green" : ""
              } p-2 rounded-xl`}>
              <p>{active ? "فعال" : "غیر فعال"}</p>
              <AnimatedCheckbox
                checked={active}
                onChange={() => setActive(!active)}
                size={24}
                color='green-500'
              />
            </div>
          </div>
          <SubmitButton
            label={"ذخیره"}
            loading={loading}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
