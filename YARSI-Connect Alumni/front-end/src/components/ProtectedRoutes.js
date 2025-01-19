import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { globalData } = useGlobal();
  const { role } = globalData;

  // Jika role tidak ditemukan di globalData atau localStorage, arahkan ke halaman login
  if (!role) {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      return <Navigate to="/masuk" replace />; // Redirect ke halaman login jika role tidak ada
    }
    // Jika role ditemukan di localStorage, set role ke globalData
    globalData.role = storedRole;
  }

  // Periksa apakah role pengguna termasuk dalam allowedRoles
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/akses-ditolak" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;