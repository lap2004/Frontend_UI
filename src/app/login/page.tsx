
"use client";

import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUserLogin } from "@/src/services/hooks/hookAuth";
import { setAuthCookies } from "@/src/lib/helper/token";
import { getUserRole } from "@/src/lib/helper";
import { ROLE_VALUE } from "@/src/config/const";

const LoginPage = () => {
  const { postUserLogin } = useUserLogin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await postUserLogin({
        email: form.email,
        password: form.password,
      });
      console.log(res.data)
      if (res?.data?.access_token) {
        setAuthCookies(res.data.access_token, res.data.refresh_token);
        Cookies.set(ROLE_VALUE, res.data.role);
        const savedRole = getUserRole();
        toast.success("Đăng nhập thành công!");
        if (savedRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.data?.detail || "Đăng nhập thất bại!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Đăng nhập thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h5" align="center" fontWeight={600}>
            Đăng nhập
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              placeholder="nguyenvana@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                placeholder="Nhập mật khẩu"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  minWidth: "40px",
                  color: "grey.600",
                }}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
            </Box>

            <FormControlLabel
              control={<Checkbox />}
              label="Ghi nhớ đăng nhập"
              sx={{ mt: 1 }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 2, py: 1.5 }}
                disabled={isloading}
              >
                {isloading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </Button>
            </motion.div>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
              onClick={() => router.push("/forgot-password")}
            >
              Quên mật khẩu?
            </Typography>

            <Divider sx={{ my: 3 }}>hoặc</Divider>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ mb: 2, textTransform: "none" }}
              onClick={() => toast.info("Chức năng đăng nhập Google đang phát triển")}
            >
              Đăng nhập với Google
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Bạn chưa có tài khoản?{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => router.push("/register")}
              >
                Đăng ký ngay
              </Box>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
