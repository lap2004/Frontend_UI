"use client";

import { useUser } from "@/src/components/store/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    // Nếu cần xử lý logic gì đó khi user thay đổi, thì xử lý ở đây
    // Ví dụ: chỉ fetch thêm dữ liệu, hoặc log ra user info
    console.log("Current user:", user);
  }, [user]);

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

