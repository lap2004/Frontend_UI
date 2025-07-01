// 'use client'
// import GoogleIcon from "@mui/icons-material/Google";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Divider,
//   FormControlLabel,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";

// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { api } from "@/src/lib/axios";


// const LoginPage = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [seePassword, setSeePassword] = useState(false);

//   const router = useRouter();

//   // Hàm xử lý đăng nhập
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', form);
//       console.log(res)
//       toast.success(res.data.message)
//       router.push('/user/home')
//       // router.push("/profile");

//     } catch (err) {
//       console.log(err)
//       toast.error("Đăng nhập thất bại");
//     }
//   };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
//           <Typography variant="h5" align="center" fontWeight={600}>
//             Sign in
//           </Typography>

//           <Box component="form" sx={{ mt: 3 }}>
//             <TextField
      
//               fullWidth
//               label="Email"
//               type="email"
//               variant="outlined"
//               margin="normal"
//               placeholder="nguyenvana@email.com"
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//             <Box
//               sx={{
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={seePassword ? "text" : "password"}
//                 variant="outlined"
//                 margin="normal"
//                 placeholder=" "
//                 onChange={(e) => setForm({...form,password: e.target.value})}
//               />
//               <Button
//                 sx={{ position: "absolute", top: 25, right: 0, color: "grey" }}
//                 type="button"
//                 onClick={() => setSeePassword(!seePassword)}
//               >
//                 {seePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//               </Button>
//             </Box>

//             <FormControlLabel
//               control={
//                 <Checkbox
//                 // checked={remember}
//                 // onChange={(e) => setRemember(e.target.checked)}
//                 />
//               }
//               label="Remember me"
//               sx={{ mt: 1 }}
//             />

//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 onClick={handleLogin}
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 2,
//                   py: 1.2,
//                   background: "#c62828",
//                   ":hover": { background: "#b71c1c" },
//                 }}
//               >
//                 Đăng Nhập
//               </Button>
//             </motion.div>

//             <Typography
//               variant="body2"
//               align="center"
//               sx={{ mt: 2, color: "primary.main", cursor: "pointer" }}
//             >
//               Forgot your password?
//             </Typography>

//             <Divider sx={{ my: 3 }}>or</Divider>

//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<GoogleIcon />}
//               sx={{ mb: 2, textTransform: "none" }}
//             >
//               Sign in with Google
//             </Button>

//             <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//               Do not have an account?{" "}
//               <Box
//                 component="span"
//                 sx={{ color: "primary.main", cursor: "pointer" }}
//                 onClick={() => router.push("/register")}
//               >
//                 Sign up
//               </Box>
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Container>
//   );
// }


// export default LoginPage
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
import React, { useState } from "react";

import useStore from "@/src/components/store";
import { setAuthCookies } from "@/src/lib/helper/token";
import { useUserLogin } from "@/src/services/hooks/hookAuth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
   const { postUserLogin } = useUserLogin();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);

  const setIsLogin = useStore((state: any) => state.setIsLogin);

  // Handle input changes for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
// const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const res = await api.post("/auth/login", form);

//     // ✅ Lưu token và role vào localStorage
//     localStorage.setItem("access_token", res.data.access_token);
//     localStorage.setItem("user_role", res.data.role); // admin hoặc student

//     // ✅ Điều hướng theo role (DÙNG user.role, KHÔNG phải res.data.role)
//     if (res.data.role === "admin") {
//       router.push("/admin/dashboard"); // hoặc "/admin/home"
//     } else {
//       router.push("/user/home");
//     }
//     toast.success("Đăng nhập thành công!");
//     setIsLogin(true);
//   } catch (error: any) {
//     console.error(error);
//     toast.error(
//       error.response?.data?.detail || "Đăng nhập thất bại. Vui lòng thử lại."
//     );
//   } finally {
//     setLoading(false);
//   }
// };
   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const res = await postUserLogin({
      email: form.email,
      password: form.password,
    });

    console.log("RES DATA:", res.data);

    // Kiểm tra xem response có token không
    if (res?.data?.access_token || res?.data?.accessToken) {
      setAuthCookies(res.data.accessToken, res.data.refreshToken);
      
      toast.success("Đăng nhập thành công!");
      router.push("/user/home");

    } else {
      toast.error(res.data?.detail || "Đăng nhập thất bại!");
    }
  } catch (err: any) {
    toast.error(
      err.response?.data?.detail || "Đăng nhập thất bại!"
    );
  } finally {
    setIsLoading(false);
  }
};


// const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     // Gửi form: { email, password }
//     const res = await api.post("/auth/login", form);
//     const { access_token } = res.data;

//     // Lưu token
//     localStorage.setItem("access_token", access_token);

//     // // Gọi /auth/me để lấy role chính xác từ token
//     // const me = await api.get("/auth/me", {
//     //   headers: {
//     //     Authorization: `Bearer ${access_token}`,
//     //   },
//     // });

//     // const { role } = me.data;

//     // // Lưu role
//     // localStorage.setItem("user_role", role);

//     // // Chuyển hướng theo role
//     // if (role === "admin") {
//     //   router.push("/admin/dashboard");
//     // } else {
//     //   router.push("/user/home");
//     // }

//     // Cập nhật trạng thái login toàn app (nếu có context hoặc global store)
//     setIsLogin?.();
//     toast.success("Đăng nhập thành công!");
//   } catch (error: any) {
//     console.error(error);
//     toast.error(
//       error?.response?.data?.detail || "Đăng nhập thất bại. Vui lòng thử lại."
//     );
//   } finally {
//     setLoading(false);
//   }
// };




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
