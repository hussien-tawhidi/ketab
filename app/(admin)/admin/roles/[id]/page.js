import UpdateRole from "@/components/admin/roles/UpdateRole";
import React from "react";

export default function roleUpdatePage({ params }) {
  const id = params.id;
  return <UpdateRole id={id} />;
}
