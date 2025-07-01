// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/src/lib/axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   CircularProgress,
//   Paper,
//   TableContainer,
//   IconButton,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// type User = {
//   id: string;
//   email: string;
//   full_name?: string;
//   role: string;
// };

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editUser, setEditUser] = useState<Partial<User> | null>(null);

//   const fetchUsers = () => {
//     setLoading(true);
//     api
//       .get("/users/all-users")
//       .then((res) => setUsers(res.data))
//       .catch(() => {
//         toast.error("Lỗi API");
//         router.push("/user/home");
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleOpenDialog = (user?: User) => {
//     setEditUser(user || { full_name: "", email: "", role: "student" });
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditUser(null);
//   };

//   const handleSaveUser = () => {
//     if (!editUser?.email || !editUser?.full_name || !editUser?.role) {
//       toast.error("Vui lòng điền đầy đủ thông tin.");
//       return;
//     }

//     const isEdit = !!editUser.id;
//     const method = isEdit ? api.put : api.post;
//     const url = isEdit ? `/users/${editUser.id}` : `/users/create`;

//     method(url, editUser)
//       .then(() => {
//         toast.success(isEdit ? "Cập nhật thành công!" : "Tạo mới thành công!");
//         fetchUsers();
//         handleCloseDialog();
//       })
//       .catch(() => toast.error("Lỗi khi lưu người dùng"));
//   };

//   const handleDeleteUser = (id: string) => {
//     if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
//       api.delete(`/users/${id}`)
//         .then(() => {
//           toast.success("Xóa thành công!");
//           fetchUsers();
//         })
//         .catch(() => toast.error("Lỗi khi xóa người dùng"));
//     }
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Danh sách người dùng
//       </Typography>

//       <Button
//         variant="contained"
//         onClick={() => handleOpenDialog()}
//         sx={{ mb: 2 }}
//       >
//         Thêm người dùng
//       </Button>

//       {loading ? (
//         <CircularProgress />
//       ) : users.length === 0 ? (
//         <Typography>Không có người dùng nào.</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#1976d2" }}>
//               <TableRow>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Họ tên
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Email
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Vai trò
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Thao tác
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.full_name || "Không tên"}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleOpenDialog(user)}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteUser(user.id)}>
//                       <Delete color="error" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Dialog thêm/sửa người dùng */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>
//           {editUser?.id ? "Sửa người dùng" : "Thêm người dùng"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Họ tên"
//             fullWidth
//             margin="normal"
//             value={editUser?.full_name || ""}
//             onChange={(e) =>
//               setEditUser({ ...editUser, full_name: e.target.value })
//             }
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={editUser?.email || ""}
//             onChange={(e) =>
//               setEditUser({ ...editUser, email: e.target.value })
//             }
//           />
//           <TextField
//             label="Vai trò (admin/student)"
//             fullWidth
//             margin="normal"
//             value={editUser?.role || ""}
//             onChange={(e) =>
//               setEditUser({ ...editUser, role: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Hủy</Button>
//           <Button onClick={handleSaveUser} variant="contained">
//             Lưu
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { api } from "@/src/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Paper,
  TableContainer,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type User = {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  password?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);
  const router = useRouter();
  console.log("hehehe", users)
  const fetchUsers = () => {
    setLoading(true);
    api
      .get("/users/all-users")
      .then((res) => setUsers(res.data))
      .catch(() => {
        toast.error("Lỗi API");
        router.push("/user/home");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDialog = (user?: User) => {
    setEditUser(user || { full_name: "", email: "", role: "student" });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditUser(null);
  };

  const handleSaveUser = () => {
    if (!editUser?.email || !editUser?.full_name || !editUser?.role) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const isEdit = !!editUser.id;
    const method = isEdit ? api.put : api.post;
    const url = isEdit ? `/users/${editUser.id}` : `/users/create`;

    method(url, editUser)
      .then(() => {
        toast.success(isEdit ? "Cập nhật thành công!" : "Tạo mới thành công!");
        fetchUsers();
        handleCloseDialog();
      })
      .catch(() => toast.error("Lỗi khi lưu người dùng"));
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      api
        .delete(`/users/${id}`)
        .then(() => {
          toast.success("Xóa thành công!");
          fetchUsers();
        })
        .catch(() => toast.error("Lỗi khi xóa người dùng"));
    }
  };

  const admins = users.filter((u) => u.role === "admin");
  const students = users.filter((u) => u.role === "student");

  const renderTable = (title: string, data: User[]) => (
    <>
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
        {title}
      </Typography>
      {data.length === 0 ? (
        <Typography>Không có người dùng nào.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Họ tên</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Vai trò</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.full_name || "Không tên"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Thống kê tài khoản
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Thêm người dùng
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {renderTable("Quản trị viên (admin)", admins)}
          {renderTable("Sinh viên (student)", students)}
        </>
      )}

      {/* Dialog thêm/sửa người dùng */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {editUser?.id ? "Sửa người dùng" : "Thêm người dùng"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Họ tên"
            fullWidth
            margin="normal"
            value={editUser?.full_name || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, full_name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            value={editUser?.password || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, password: e.target.value })
            }
          />
          <TextField
            select
            label="Vai trò"
            fullWidth
            margin="normal"
            value={editUser?.role || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, role: e.target.value })
            }
            SelectProps={{ native: true }}
          >
            <option value="">Chọn vai trò</option>
            <option value="admin">admin</option>
            <option value="student">student</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
