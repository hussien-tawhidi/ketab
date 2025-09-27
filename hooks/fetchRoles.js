"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export async function fetchRoles() {
  try {
    const { data } = await axios.get("/api/admin/role");
    return { roles: data.roles, error: null };
  } catch (error) {
    console.error("🚀 ~ fetchRoles error:", error);
    return { roles: [], error };
  }
}

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/role");
      setRoles(data.roles);
      setError(null);
    } catch (err) {
      console.error("🚀 ~ useRoles error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, setRoles, loading, error, refetch: fetchRoles };
}

export function formatPersianDate(dateString) {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "-";
  }
}
