"use client";

import Input from "@/components/shared/Input";
import CustomSelect from "@/components/shared/CustomeSelect";
import AddBtn from "@/components/shared/AddBtn";

export default function PermissionsHeader({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  roles,
}) {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 text-ketab-gray'>
      {/* Title */}
      <h1 className='text-2xl font-bold'>👥 مدیریت مجوز کاربران</h1>

      {/* Search + Filter + Add */}
      <div className='flex items-center justify-between gap-3 w-full md:w-auto'>
        {/* Search */}
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='جستجو...'
        />

        {/* Role Filter */}
        <CustomSelect
          value={roleFilter}
          options={roles}
          onChange={(option) => setRoleFilter(option.value)}
        />

        {/* Add User */}
        <AddBtn route='/admin/permissions/assign' title='افزودن مجوز' />
      </div>
    </div>
  );
}
