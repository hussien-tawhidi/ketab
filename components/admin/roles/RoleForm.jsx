"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import SubmitButton from "@/components/shared/SubmitButton";
import MultiSelect from "./create/MultiSelect";
import { permissionsOptions } from "@/constant/admin";

export default function RoleForm({
  initialData = {
    name: "",
    description: "",
    permissions: [],
  },
  onSubmit,
  loading,
  submitLabel,
}) {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [permissions, setPermissions] = useState(initialData.permissions);
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      description,
      permissions,
  
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-ketab-light rounded-xl shadow-lg p-6 space-y-8'>
      {/* Role Info */}
      <div className='space-y-4'>
        <Input
          label='عنوان'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='مثال: مدیر محتوا'
        />
        <TextArea
          label='توضیحات'
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='توضیح کوتاه برای این نقش'
        />
      </div>

      {/* permissions */}
      <MultiSelect
        title='دسترسی ها'
        options={permissionsOptions}
        values={permissions}
        setValues={setPermissions}
      />

      {/* Submit */}
      <SubmitButton label={loading ? "..." : submitLabel} loading={loading} />
    </form>
  );
}
