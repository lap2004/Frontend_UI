"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUser } from "@/src/components/store/useUser";
import { ROLE_VALUE } from "@/src/config/const";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    const role = Cookies.get(ROLE_VALUE);
    console.log("nè", role)
    if (role !== "admin") {
      toast.error("Bạn cần quyền admin để truy cập");
      router.push("/login");
    }
  }, [router]);

  if (loading) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Vai trò: {user?.role || "Không xác định"}</p>
    </div>
  );
}

