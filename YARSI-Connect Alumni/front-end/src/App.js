import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MenuDrawer from "./components/MenuDrawer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useGlobal } from "./context/GlobalContext";
import LogoutWarning from "./components/LogoutWarning";

// Import halaman-halaman
import DashboardAlumni from "./pages/DashboardAlumni";
import DashboardAdminUniv from "./pages/DashboardAdminUniv";
import DashboardAdminProdi from "./pages/DashboardAdminProdi";
import TambahBerita from "./pages/TambahBerita";
import TambahAcara from "./pages/TambahAcara";
import TambahProgramAlumni from "./pages/TambahProgramAlumni";
import VerifikasiProgramAlumni from "./pages/VerifikasiProgramAlumni";
import VerifikasiBeritaProdi from "./pages/VerifikasiBeritaProdi";
import VerifikasiAcaraProdi from "./pages/VerifikasiAcaraProdi";
import ManajemenBerita from "./pages/ManajemenBerita";
import ManajemenAcara from "./pages/ManajemenAcara";
import ManajemenProgramAlumni from "./pages/ManajemenProgramAlumni";
import BagikanBerita from "./pages/BagikanBerita";
import BagikanAcara from "./pages/BagikanAcara";
import BagikanProgramAlumni from "./pages/BagikanProgramAlumni";
import ProfilPage from "./pages/ProfilPage";
import UpdateBerita from "./pages/UpdateBerita";
import UpdateAcara from "./pages/UpdateAcara";
import DataAlumni from "./pages/DataAlumni";
import TracerStudyAlumni from "./pages/TracerStudyAlumni";
import TracerStudyAdminUniv from "./pages/TracerStudyAdminUniv";
import Beranda from "./pages/Beranda";
import VisiMisi from "./pages/VisiMisi";
import Berita from "./pages/Berita";
import Acara from "./pages/Acara";
import ProgramAlumni from "./pages/ProgramAlumni";
import Login from "./pages/Login";
import UbahPassword from "./pages/UbahPassword";
import DetailBerita from "./pages/DetailBerita";
import DetailAcara from "./pages/DetailAcara";
import DetailProgramAlumni from "./pages/DetailProgramAlumni";
import GenerateAkunAlumni from "./pages/GenerateAkunAlumni";
import GenerateAkunAdminProdi from "./pages/GenerateAkunAdminProdi";
import DaftarAkunAlumni from "./pages/DaftarAkunAlumni";
import AccessDenied from "./pages/AccessDenied";
import PageNotFound from "./pages/PageNotFound";

function PublicRoute({ element }) {
  const { globalData } = useGlobal();
  const navigate = useNavigate(); // Untuk redirect

  // Cek apakah pengguna sudah login dengan role 'alumni', 'admin_prodi', atau 'admin_universitas'
  if (
    globalData.role === "alumni" ||
    globalData.role === "admin_prodi" ||
    globalData.role === "admin_universitas"
  ) {
    setTimeout(() => {
      // Redirect ke dashboard sesuai role setelah menampilkan LogoutWarning
      if (globalData.role === "alumni") {
        navigate("/dashboard-alumni");
      } else if (globalData.role === "admin_prodi") {
        navigate("/dashboard-admin-prodi");
      } else if (globalData.role === "admin_universitas") {
        navigate("/dashboard-admin-universitas");
      }
    }, 2000); // Tunggu 3 detik sebelum redirect

    return <LogoutWarning />; // Tampilkan peringatan logout jika pengguna sudah login
  }

  return element; // Jika belum login, tampilkan komponen yang diminta
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute element={<Beranda />} />} />
        <Route
          path="/visi-misi"
          element={<PublicRoute element={<VisiMisi />} />}
        />
        <Route path="/berita" element={<PublicRoute element={<Berita />} />} />
        <Route path="/acara" element={<PublicRoute element={<Acara />} />} />
        <Route
          path="/program-alumni"
          element={<PublicRoute element={<ProgramAlumni />} />}
        />
        <Route path="/masuk" element={<PublicRoute element={<Login />} />} />
        <Route
          path="/ubah-kata-sandi"
          element={<PublicRoute element={<UbahPassword />} />}
        />
        <Route
          path="/detail-berita/:id"
          element={<PublicRoute element={<DetailBerita />} />}
        />
        <Route
          path="/detail-acara/:id"
          element={<PublicRoute element={<DetailAcara />} />}
        />
        <Route
          path="/detail-program-alumni/:id"
          element={<PublicRoute element={<DetailProgramAlumni />} />}
        />

        {/* Shared Access for Profil Page */}
        <Route
          element={
            <MenuDrawer>
              <ProtectedRoutes
                allowedRoles={["admin_universitas", "admin_prodi", "alumni"]}
              />
            </MenuDrawer>
          }
        >
          <Route path="/profil" element={<ProfilPage />} />
        </Route>

        {/* Shared Access for admin_universitas and admin_prodi */}
        <Route
          element={
            <MenuDrawer>
              <ProtectedRoutes
                allowedRoles={["admin_universitas", "admin_prodi"]}
              />
            </MenuDrawer>
          }
        >
          <Route path="/tambah-berita" element={<TambahBerita />} />
          <Route path="/tambah-acara" element={<TambahAcara />} />
          <Route
            path="/verifikasi-program-alumni"
            element={<VerifikasiProgramAlumni />}
          />
          <Route path="/manajemen-berita" element={<ManajemenBerita />} />
          <Route path="/manajemen-acara" element={<ManajemenAcara />} />
          <Route path="/data-alumni" element={<DataAlumni />} />
        </Route>

        {/* Admin Universitas Only */}
        <Route
          element={
            <MenuDrawer>
              <ProtectedRoutes allowedRoles={["admin_universitas"]} />
            </MenuDrawer>
          }
        >
          <Route
            path="/dashboard-admin-universitas"
            element={<DashboardAdminUniv />}
          />
          <Route
            path="/verifikasi-berita-prodi"
            element={<VerifikasiBeritaProdi />}
          />
          <Route
            path="/verifikasi-acara-prodi"
            element={<VerifikasiAcaraProdi />}
          />
          <Route path="/bagikan-berita" element={<BagikanBerita />} />
          <Route path="/bagikan-acara" element={<BagikanAcara />} />
          <Route
            path="/bagikan-program-alumni"
            element={<BagikanProgramAlumni />}
          />
          <Route path="/perbarui-berita/:id" element={<UpdateBerita />} />
          <Route path="/perbarui-acara/:id" element={<UpdateAcara />} />
          <Route
            path="/tracer-study-admin-universitas"
            element={<TracerStudyAdminUniv />}
          />
          <Route path="/buat-akun-alumni" element={<GenerateAkunAlumni />} />
          <Route path="/buat-akun-admin" element={<GenerateAkunAdminProdi />} />
          <Route path="/daftar-akun-alumni" element={<DaftarAkunAlumni />} />
        </Route>

        {/* Admin Prodi Only */}
        <Route
          element={
            <MenuDrawer>
              <ProtectedRoutes allowedRoles={["admin_prodi"]} />
            </MenuDrawer>
          }
        >
          <Route
            path="/dashboard-admin-prodi"
            element={<DashboardAdminProdi />}
          />
        </Route>

        {/* Alumni Only */}
        <Route
          element={
            <MenuDrawer>
              <ProtectedRoutes allowedRoles={["alumni"]} />
            </MenuDrawer>
          }
        >
          <Route path="/dashboard-alumni" element={<DashboardAlumni />} />
          <Route
            path="/tambah-program-alumni"
            element={<TambahProgramAlumni />}
          />
          <Route
            path="/manajemen-program-alumni"
            element={<ManajemenProgramAlumni />}
          />
          <Route path="/tracer-study-alumni" element={<TracerStudyAlumni />} />
        </Route>

        {/* Access Denied */}
        <Route path="/akses-ditolak" element={<AccessDenied />} />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
