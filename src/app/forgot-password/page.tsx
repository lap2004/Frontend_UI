"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast.warning("Vui lòng nhập email hợp lệ");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_DOMAIN}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Lỗi gửi email");
      }

      toast.success("📩 Đã gửi liên kết đặt lại mật khẩu. Vui lòng kiểm tra email.");
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h5" mb={3}>
        🔐 Quên mật khẩu
      </Typography>

      {submitted ? (
        <Stack spacing={3} alignItems="center">
          <Typography color="primary">
            Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.
          </Typography>
          <Button variant="outlined" onClick={() => router.push("/login")}>
            Quay lại đăng nhập
          </Button>
        </Stack>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="email"
            label="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            disabled={loading}
          />

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi mã đặt lại mật khẩu"}
          </Button>
        </Box>
      )}
    </Container>
  );
}
