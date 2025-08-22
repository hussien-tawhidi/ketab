"use client";
import { useLoggedUser } from "@/hooks/useLoggedUser";

export default function Dashboard() {
  const { user, loading } = useLoggedUser();
  console.log("🚀 ~ Dashboard ~ user:", user)

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not logged in</p>;

  return (
    <div>
      <h2>Logged-in User</h2>
      <p>Name: {user.name}</p>
      <p>Phone: {user.phone}</p>
      <p>Phone: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
