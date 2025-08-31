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
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import Modal from "./ResponsibilitiesModal";
import { TiArrowLeft } from "react-icons/ti";
import PermissionsTable from "./PermissionTable";
import ResponsibilitiesModal from "./ResponsibilitiesModal";
import PermissionsHeader from "./PermissionHeader";
export default function PermissionsPage() {
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ PermissionsPage ~ users:", users);
  const [loading, setLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const toggleActive = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const changeRole = (id, newRole) => {
    const selectedRole = roles.find((r) => r.value === newRole);

    setUsers(
      users.map((user) =>
        user._id === id
          ? {
              ...user,
              role: newRole,
              responsibilities: selectedRole?.responsibilities || [],
              jobs: selectedRole?.jobs || [],
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const userData = user.userId || {}; // populated user
    const matchesSearch =
      userData.name?.includes(search) || userData.email?.includes(search);
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

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
        roles={roles}
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
          roles={roles}
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
