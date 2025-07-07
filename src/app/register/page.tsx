"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useUserSignup } from "@/src/services/hooks/hookAuth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    role:"student",
    password: "",
  });
  const router = useRouter();
  const { postUserSignup } = useUserSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postUserSignup({
          email: form.email,
          full_name: form.full_name,
          role: form.role,
          password: form.password
      });
      toast.success("Đăng ký tài khoản thành công.");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.detail || "Lỗi đăng ký. Vui lòng thử lại."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={8}>
        <Typography variant="h5" gutterBottom>
          Đăng ký tài khoản
        </Typography>

        <TextField
          fullWidth
          label="Họ và tên"
          name="full_name"
          margin="normal"
          required
          value={form.full_name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          required
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Mật khẩu"
          name="password"
          type="password"
          margin="normal"
          required
          value={form.password}
          onChange={handleChange}
        />

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Đăng ký
        </Button>
      </Box>
    </Container>
  );
}
