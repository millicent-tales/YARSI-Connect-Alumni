import React from "react";
import logo_koneksi from "../assets/images/logo/logo-koneksi.png";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableIcon from "@mui/icons-material/BackupTable";
import SurverIcon from "@mui/icons-material/Poll";
import NewsIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/EventNote";
import VerificationIcon from "@mui/icons-material/LibraryAddCheck";
import ShareIcon from "@mui/icons-material/Share";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { logout } from "../api/Api";
import { ToastContainer, toast, Slide } from "react-toastify";


const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MenuDrawer = ({ children }) => {
  const theme = useTheme();
  const { globalData, clearGlobalData } = useGlobal();
  const { role } = globalData;

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path); 
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
  
      
      clearGlobalData(); 
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('token'); 

      toast.success("Berhasil Keluar!", {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
  
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      if (error.response) {
        console.error("Logout gagal:", error.response.data);
      } else {
        console.error("Logout gagal: Network Error", error);
      }
    }
  };
  

  const renderMenuDrawer = () => {
    if (role === "admin_universitas") {
      return (
        <List>
          
          <ListItem key="Dashboard" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/dashboard-admin-universitas")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dasbor" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/profil")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profil" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Data Alumni" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/data-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TableIcon />
              </ListItemIcon>
              <ListItemText
                primary="Data Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="Tracer Study" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/tracer-study-admin-universitas")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SurverIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tracer Study"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem
            key="Buat Akun Alumni"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/buat-akun-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText
                primary="Buat Akun Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Daftar Akun Alumni"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/daftar-akun-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RecentActorsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Daftar Akun Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem
            key="Buat Akun Admin"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/buat-akun-admin")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText
                primary="Buat Akun Admin"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem
            key="Tambah Berita"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/tambah-berita")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tambah Berita"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Manajemen Berita"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/manajemen-berita")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NewsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Manajemen Berita"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ borderColor: "black" }} />

          <ListItem key="Tambah Acara" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigate("/tambah-acara")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tambah Acara"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Manajemen Acara"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/manajemen-acara")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Manajemen Acara"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ borderColor: "black" }} />

          <ListItem
            key="Verifikasi Berita"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/verifikasi-berita-prodi")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <VerificationIcon />
              </ListItemIcon>
              <ListItemText
                primary="Verifikasi Berita"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Verifikasi Acara"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/verifikasi-acara-prodi")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <VerificationIcon />
              </ListItemIcon>
              <ListItemText
                primary="Verifikasi Acara"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Verifikasi Program Alumni"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/verifikasi-program-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <VerificationIcon />
              </ListItemIcon>
              <ListItemText
                primary="Verifikasi Program Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ borderColor: "black" }} />

          <ListItem
            key="Bagikan Berita"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/bagikan-berita")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShareIcon />
              </ListItemIcon>
              <ListItemText
                primary="Bagikan Berita"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Bagikan Acara"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/bagikan-acara")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShareIcon />
              </ListItemIcon>
              <ListItemText
                primary="Bagikan Acara"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="Bagikan Program Alumni"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={() => navigate("/bagikan-program-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShareIcon />
              </ListItemIcon>
              <ListItemText
                primary="Bagikan Program Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ borderColor: "black" }} />
          <ListItem key="Logout" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Keluar" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      );
    } else if (role === "admin_prodi") {
      return (
        <List>
          {/* Menampilkan setiap icon sesuai urutan */}
          <ListItem key="Dashboard" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/dashboard-admin-prodi")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dasbor" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/profil")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profil" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem key="Data Alumni" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/data-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TableIcon />
              </ListItemIcon>
              <ListItemText
                primary="Data Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ borderColor: "black" }} />

          <ListItem key="News" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/tambah-berita")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tambah Berita"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="ManageNews" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/manajemen-berita")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NewsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Manajemen Berita"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem key="AddEvent" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/tambah-acara")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tambah Acara"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="ManageEvent" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/manajemen-acara")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Manajemen Acara"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem
            key="VerifyProgram"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/verifikasi-program-alumni")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <VerificationIcon />
              </ListItemIcon>
              <ListItemText
                primary="Verifikasi Program Alumni"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem key="Logout" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Keluar" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      );
    } else if (role === "alumni") {
      return (
        <List>
          {/* Menampilkan setiap icon sesuai urutan */}
          <ListItem key="Dashboard" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/dashboard-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dasbor" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/profil")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profil" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Tracer Study" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleNavigate("/tracer-study-alumni")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SurverIcon />
              </ListItemIcon>
              <ListItemText
                primary="Tracer Study"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ borderColor: "black" }} />
          <List>
            <ListItem
              key="TambahProgramAlumni"
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate("/tambah-program-alumni")}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Tambah Program Alumni"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              key="ManajemenProgramAlumni"
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate("/manajemen-program-alumni")}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Manajemen Program Alumni"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{ borderColor: "black" }} />
          <ListItem key="Logout" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Keluar" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#38524C", // Warna AppBar
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
        component="img"
        src={logo_koneksi}
        alt="Logo Koneksi"
        sx={{
          height: 40, // Tinggi logo
          width: "auto", // Menjaga proporsi logo
        }}
      />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#FFFFFF", // Warna drawer
            color: "#000000", // Warna teks dan ikon dalam drawer
          },
        }}
      >
        <DrawerHeader
          sx={{
            backgroundColor: "#38524C", // Warna header drawer sama dengan AppBar
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: (theme) => theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        >
          <IconButton onClick={handleDrawerClose} sx={{ color: "#FFFFFF" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#FFFFFF" }} />{" "}
        {/* Divider berwarna putih */}
        <List>{renderMenuDrawer()}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: (theme) => theme.palette.background.default,
          p: 3,
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default MenuDrawer;
