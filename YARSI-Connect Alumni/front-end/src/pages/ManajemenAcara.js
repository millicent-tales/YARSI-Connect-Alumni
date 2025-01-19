import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getMyEvents } from "../api/Api";
import DaftarAcara from "../components/DaftarAcara";
import { useGlobal } from "../context/GlobalContext";

function ManajemenAcara() {
  const { globalData } = useGlobal();
  const username = globalData?.username;

  const [acara, setAcara] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcara = async () => {
      setLoading(true);
      try {
        const response = await getMyEvents();
        const acaraArray = response?.data?.data || [];

        if (Array.isArray(acaraArray)) {
          const acaraData = acaraArray
            .filter((item) => item.authorName === username)
            .map((item) => ({
              id: item.id,
              image: item.image,
              title: item.title,
              content: item.description,
              createdAt: item.createdAt,
              authorName: item.authorName,
              date: item.date,
            }));
          setAcara(acaraData);
        } else {
          console.error("Data yang diterima bukan array:", acaraArray);
        }
      } catch (err) {
        setError("Gagal memuat acara, silakan coba lagi.");
        console.error("Error fetching acara:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcara();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Container>
        <h1 className="text-center">MANAJEMEN ACARA</h1>
        <hr className="custom-hr" />
      </Container>
      <DaftarAcara daftarAcara={acara} />
    </>
  );
}

export default ManajemenAcara;
