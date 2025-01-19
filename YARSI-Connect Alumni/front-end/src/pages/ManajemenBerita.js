import { useState, useEffect } from "react";
import { getMyNews } from "../api/Api";
import DaftarBerita from "../components/DaftarBerita";
import { useGlobal } from "../context/GlobalContext";
import { Container } from "react-bootstrap";

function ManajemenBerita() {
  const { globalData } = useGlobal();
  const username = globalData?.username;

  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
        const response = await getMyNews();
        const beritaArray = response?.data?.data || [];
        if (Array.isArray(beritaArray)) {
          const beritaData = beritaArray
            .filter((item) => item.authorName === username)
            .map((item) => ({
              id: item.id,
              image: item.image,
              title: item.title,
              content: item.content,
              createdAt: item.createdAt,
              authorName: item.authorName,
            }));
          setBerita(beritaData);
        } else {
          console.error("Data yang diterima bukan array:", beritaArray);
        }
      } catch (err) {
        setError("Gagal memuat berita, silakan coba lagi.");
        console.error("Error fetching berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Container>
        <h1 className="text-center">MANAJEMEN BERITA</h1>
        <hr className="custom-hr" />
      </Container>
      <DaftarBerita daftarBerita={berita} />
    </>
  );
}

export default ManajemenBerita;