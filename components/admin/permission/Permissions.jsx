"use client";
import ErrorMsg from "@/components/shared/ErrorMsg";
import SuccessMsg from "@/components/shared/SuccessMsg";
import axios from "axios";
import { useEffect, useState } from "react";
import PermissionsTable from "./PermissionTable";
import ResponsibilitiesModal from "./ResponsibilitiesModal";
import PermissionsHeader from "./PermissionHeader";
import { useRoles } from "@/hooks/fetchRoles";

export default function PermissionsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { roles: databaseRoles } = useRoles();

  // ✅ گرفتن لیست کاربران
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { data } = await axios.get("/api/admin/permission");
        setUsers(data?.permissions);
      } catch (error) {
        console.log("🚀 ~ fetchPermissions ~ error:", error);
      }
    };
    fetchPermissions();
  }, []);

  // ✅ تغییر وضعیت فعال بودن
  const toggleActive = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  // ✅ تغییر نقش کاربر
  const changeRole = (id, newRole) => {
    const selectedRole = databaseRoles.find((r) => r.name === newRole);

    setUsers(
      users.map((user) =>
        user._id === id
          ? {
              ...user,
              role: newRole,
              permissions: selectedRole?.permissions || [],
            }
          : user
      )
    );
  };

  // ✅ فیلتر بر اساس سرچ و نقش
  const filteredUsers = users.filter((user) => {
    const userData = user.userId || {};
    const matchesSearch =
      userData.name?.includes(search) || userData.email?.includes(search);
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ✅ ذخیره تغییرات
  const handleSaveChanged = async (id) => {
    setLoading(id);
    const user = users.find((u) => u._id === id);
    try {
      const res = await axios.put(`/api/admin/permission/${id}`, {
        role: user.role,
        active: user.active,
        responsibilities: user.responsibilities,
        jobs: user.jobs,
      });
      if (res.status === 200) setSuccessMsg("تغییرات موفقانه ذخیره شد");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.log("🚀 ~ handleSaveChanged ~ error:", error);
      setErrorMsg("خطا سرور" + error);
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className='p-6 min-h-screen'>
      {/* Header */}
      <PermissionsHeader
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        roles={[
          { label: "همه", value: "All" },
          ...databaseRoles.map((r) => ({ label: r.name, value: r.name })),
        ]}
      />

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

      {/* Table */}
      <div className='shadow-lg rounded-xl'>
        <PermissionsTable
          users={filteredUsers}
          roles={databaseRoles}
          loadingUserId={loading}
          changeRole={changeRole}
          toggleActive={toggleActive}
          handleSaveChanged={handleSaveChanged}
          setSelectedUser={setSelectedUser}
          setOpenModal={setOpenModal}
        />

        <ResponsibilitiesModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          user={selectedUser}
        />
      </div>
    </div>
  );
}
