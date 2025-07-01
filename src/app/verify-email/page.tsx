// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { api } from "@/src/lib/axios";
// import { toast } from "react-toastify";
// import { Container, Typography, CircularProgress, Box } from "@mui/material";

// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (token) {
//       api.get(`/auth/verify-email?token=${token}`)
//         .then(() => {
//           toast.success("Xác minh email thành công!");
//           router.push("/login");
//         })
//         .catch(() => {
//           toast.error("Token không hợp lệ");
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [token]);

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Box display="flex" flexDirection="column" alignItems="center">
//         {loading ? (
//           <>
//             <CircularProgress />
//             <Typography mt={2}>Đang xác minh email...</Typography>
//           </>
//         ) : null}
//       </Box>
//     </Container>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/src/lib/axios";
import { toast } from "react-toastify";
import { Container, Typography, CircularProgress, Box, Button } from "@mui/material";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? "";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token xác minh không tồn tại.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.post(`/auth/verify-email`, null, { params: { token } });
        setSuccess(true);
        toast.success("Xác minh email thành công!");
      } catch (err: any) {
        setError(err.response?.data?.detail || "Token không hợp lệ hoặc đã hết hạn.");
        toast.error("Xác minh thất bại!");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {loading && (
          <>
            <CircularProgress />
            <Typography>Đang xác minh email...</Typography>
          </>
        )}

        {!loading && success && (
          <>
            <Typography variant="h6" color="success.main">
              🎉 Email của bạn đã được xác minh thành công!
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/login")}>
              Đăng nhập ngay
            </Button>
          </>
        )}

        {!loading && error && (
          <>
            <Typography variant="h6" color="error.main">
              ⚠️ {error}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => router.push("/register")}>
              Đăng ký lại
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
