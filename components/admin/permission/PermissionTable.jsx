"use client";
import CustomSelect from "@/components/shared/CustomeSelect";
import AnimatedCheckbox from "@/components/shared/AnimateCheckbox";
import SubmitButton from "@/components/shared/SubmitButton";
import { FiEye } from "react-icons/fi";

export default function PermissionsTable({
  users,
  roles,
  loadingUserId,
  changeRole,
  toggleActive,
  handleSaveChanged,
  setSelectedUser,
  setOpenModal,
}) {
  return (
    <div className='shadow-lg rounded-xl'>
      <table className='w-full text-sm text-right'>
        <thead className='text-xs uppercase font-semibold text-ketab-white'>
          <tr className='whitespace-nowrap'>
            <th className='px-6 py-3 text-right'>کاربر</th>
            <th className='px-6 py-3'>نقش</th>
            <th className='px-6 py-3'>وضعیت</th>
            <th className='px-6 py-3 text-center'>اقدامات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className='border-b border-ketab-gray/20 transition'>
              {/* User Info */}
              <td className='px-6 py-4 flex items-center gap-3'>
                <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-ketab-gray to-ketab-light text-ketab-white font-bold'>
                  {user?.userId?.name?.charAt(0)}
                </div>
                <div>
                  <div className='font-medium text-ketab-gray'>
                    {user?.userId?.name}
                  </div>
                  <div className='text-xs text-ketab-gray/60 pt-1'>
                    {user?.userId?.email || "example@gmail.com"}
                  </div>
                </div>
              </td>

              {/* Role Selector */}
              <td className='px-6 py-4'>
                <CustomSelect
                  value={user.role}
                  options={roles}
                  onChange={(option) => changeRole(user._id, option.value)}
                />
              </td>

              {/* Status Checkbox */}
              <td className='px-6 py-4 w-[10vw]'>
                <div className='flex items-center gap-2'>
                  <AnimatedCheckbox
                    checked={user.active}
                    onChange={() => toggleActive(user._id)} // ✅ only here
                    size={22}
                    color='green-500'
                  />
                  {user.active ? (
                    <span className='text-ketab-green'>فعال</span>
                  ) : (
                    <span>غیرفعال</span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className='px-6 py-4 flex justify-center gap-2'>
                <SubmitButton
                  label={
                    loadingUserId === user._id ? "ارسال..." : "ذخیره تغییرات"
                  }
                  onClick={() => handleSaveChanged(user._id)}
                  loading={loadingUserId === user._id} // ✅ only this row shows spinner
                />
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenModal(true);
                  }}
                  className='px-3 py-1 bg-ketab-green/80 whitespace-nowrap rounded-lg flex items-center gap-2 text-sm text-white'>
                  مشاهده وظایف
                  <FiEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
