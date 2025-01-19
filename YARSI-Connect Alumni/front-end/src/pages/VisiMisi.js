import { Container, Row } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import "../styles/visiMisi.css";

function VisiMisi() {
  return (
    <>
      <Container className="custom-container">
        <NavigationBar />
        <Row>
          <div className="content-section">
            <div className="title-info">Visi</div>
            <div className="content-info">
              Menjadi pusat pengembangan mahasiswa, karir, dan alumni yang
              unggul, inovatif, dan berdaya saing global, dengan berlandaskan
              nilai-nilai Islam, dalam rangka mendukung terwujudnya Universitas
              YARSI sebagai perguruan tinggi yang terpandang dan bermutu tinggi.
            </div>
            <div className="title-info">Misi</div>
            <div className="content-info">
              1. Mengembangkan potensi mahasiswa melalui program pembinaan yang
              berfokus pada peningkatan kompetensi akademik, keterampilan
              kepemimpinan, dan karakter Islami.
            </div>
            <div className="content-info">
              2. Menyelenggarakan program pelatihan, pendampingan, dan kemitraan
              strategis dengan dunia usaha, industri, dan profesi untuk
              mempersiapkan mahasiswa dan alumni menghadapi tantangan dunia
              kerja.
            </div>
            <div className="content-info">
              3. Memperkuat jaringan alumni untuk mendukung kontribusi mereka
              dalam pengembangan masyarakat dan menjawab tantangan global sesuai
              nilai-nilai Islam.
            </div>
            <div className="content-info">
              4. Membangun kolaborasi dengan organisasi mahasiswa, lembaga
              eksternal, dan komunitas profesional untuk menciptakan ekosistem
              kemahasiswaan dan alumni yang dinamis, kreatif, dan inovatif.
            </div>
            <div className="content-info">
              5. Meningkatkan tata kelola yang transparan, efektif, dan berbasis
              teknologi dalam mendukung pengembangan kemahasiswaan, karir, dan
              alumni.
            </div>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default VisiMisi;