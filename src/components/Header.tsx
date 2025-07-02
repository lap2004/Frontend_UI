"use client";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useProtectedProtected } from '../services/hooks/hookAuth';
import { isLogin } from '../lib/helper';
import { removeAuthCookies } from '../lib/helper/token';

const Header = () => {
  const box: React.CSSProperties = {
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: "10px",
    position: "absolute",
    top: "90%",
    right: "15%",
    boxShadow: "0px 0px 20px grey",
    overflow: "hidden",
  };

  const [isVisible, setIsVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const { postProtectedProtected } = useProtectedProtected();
  const handleLogout = async () => {
    try {
      removeAuthCookies()
      setUser(null);
      router.push("/login");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  const fetchUser = async () => {
    try {
      const res = await postProtectedProtected({});
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);

  const menuItems = [
    { label: "Trang Chủ", href: user?.role === "admin" ? "/admin/dashboard" : "/user/home" },
    { label: "Liên Hệ", href: "#" },
    { label: "Tuyển Sinh", href: "#" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "white", boxShadow: 4, zIndex: 1 }}>
        <Toolbar sx={{ justifyContent: isMobile ? "space-between" : "space-around", color: "black" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Image width={1000} height={1000} src="/logoVl.png" className="w-36" alt="logo" />
          </Link>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {menuItems.map((item, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    color="inherit"
                    sx={{ padding: "10px 20px", fontWeight: "light", ":hover": { bgcolor: "#d62134", color: "white" } }}
                  >
                    <Link href={item.href} style={{ textDecoration: "none", color: "inherit" }}>{item.label}</Link>
                  </Button>
                </motion.div>
              ))}

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {user ? null : (
                  <Button
                    sx={{
                      bgcolor: isLogin() ? "#d32f2f" : "#1565c0",
                      color: "white",
                      fontWeight: "light",
                      ":hover": {
                        bgcolor: isLogin() ? "#b71c1c" : "#0d47a1",
                      },
                    }}
                    onClick={() => {
                      if (isLogin()) {
                        handleLogout();
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    {isLogin() ? "Đăng Xuất" : "Đăng Nhập"}
                  </Button>
                )}
              </motion.div>


              {!isMobile && user && (
                <div>
                  <motion.button onClick={() => setIsVisible(!isVisible)} whileTap={{ y: 1 }}>
                    <AccountCircleIcon className="text-[#1F2251]" sx={{ fontSize: 40 }} />
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isVisible && (
                      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} style={box} key="box">
                        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            <Box>
                              <span className="text-sm">👋 Xin chào, {user.full_name || user.userName}</span><br />
                              <span className="text-sm">{user.email}</span>
                            </Box>
                          </Box>

                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item, idx) => (
            <ListItem key={idx} disablePadding onClick={() => setDrawerOpen(false)}>
              <ListItemButton component={Link} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            {user ? (
              <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                <ListItemText primary="Đăng Xuất" />
              </ListItemButton>
            ) : (
              <ListItemButton component={Link} href="/login">
                <ListItemText primary="Đăng Nhập" />
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
