// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { useUser } from "@/src/components/store/useUser";
// import { ROLE_VALUE } from "@/src/config/const";

// export default function AdminDashboard() {
//   const router = useRouter();
//   const { user, loading } = useUser();

//   useEffect(() => {
//     const role = Cookies.get(ROLE_VALUE);
//     if (role !== "admin") {
//       toast.error("Bạn cần quyền admin để truy cập");
//       router.push("/login");
//     }
//   }, [router]);

//   if (loading) {
//     return <p>Đang tải thông tin người dùng...</p>;
//   }

//   return (
//     <div>
//       <h1>Welcome to the Admin Dashboard</h1>
//       <p>Vai trò: {user?.role || "Không xác định"}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ROLE_VALUE } from "@/src/config/const";
import { useUser } from "@/src/components/store/useUser";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Stats = {
  total_users: number;
  total_students: number;
  total_admins: number;
  latest_signup: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [stats, setStats] = useState<Stats | null>(null);
  const [signupData, setSignupData] = useState([]);
  const [chatUsageData, setChatUsageData] = useState([]);

  useEffect(() => {
    const role = Cookies.get(ROLE_VALUE);
    if (!loading && (user?.role !== "admin" || role !== "admin")) {
      toast.error("Bạn cần quyền admin để truy cập");
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard");
        setStats(res.data.summary);
        setSignupData(res.data.signup_by_day);
        setChatUsageData(res.data.chat_usage);
      } catch (err) {
        toast.error("Lỗi khi tải dữ liệu dashboard");
      }
    };

    if (user?.role === "admin") {
      fetchData();
    }
  }, [user]);

  if (loading || !user || !stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">🔄 Đang tải dữ liệu dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="👤 Tổng số người dùng" value={stats.total_users} />
        <Card title="👨‍🎓 Số lượng sinh viên" value={stats.total_students} />
        <Card title="🧑‍💼 Quản trị viên" value={stats.total_admins} />
        <Card title="📅 Đăng ký gần nhất" value={stats.latest_signup} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">📈 Đăng ký người dùng theo ngày</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Số lượt đăng ký" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">💬 Lượt hỏi chatbot theo ngày</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chatUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="questions" fill="#82ca9d" name="Lượt hỏi" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <p className="text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-blue-700 mt-1">{value}</p>
    </div>
  );
}
