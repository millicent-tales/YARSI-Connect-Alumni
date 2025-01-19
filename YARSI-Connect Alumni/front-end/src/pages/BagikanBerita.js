import { useState, useEffect } from "react";
import { getVerifiedNews } from "../api/Api";
import { useGlobal } from "../context/GlobalContext";
import { Container } from "react-bootstrap";
import TabelBagikanBerita from "../components/TabelBagikanBerita";

function BagikanBerita() {
  const { globalData } = useGlobal(); 
  const username = globalData.username; 

  const [berita, setBerita] = useState([]);
  const [enabledStatus, setEnabledStatus] = useState({});

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await getVerifiedNews();
        const beritaArray = response.data.data;

        if (Array.isArray(beritaArray)) {
          const beritaData = beritaArray.map((item) => ({
            id: item.id,
            image: item.image,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            authorName: item.author.username,
            isActive: item.isActive,
          }));
          const storedStatus =
            JSON.parse(localStorage.getItem("enabledStatus")) || {};
          const updatedStatus = {};
          beritaData.forEach((item) => {
            updatedStatus[item.id] = storedStatus[item.id] ?? item.isActive;
          });

          setEnabledStatus(updatedStatus);
          setBerita(beritaData);
        } else {
          console.error("Data yang diterima bukan array:", beritaArray);
        }
      } catch (error) {
        console.error("Error fetching program: ", error);
      }
    };

    fetchBerita();
  }, [username]);

  useEffect(() => {
    localStorage.setItem("enabledStatus", JSON.stringify(enabledStatus));
  }, [enabledStatus]);

  return (
    <>
      <Container>
        <h1 className="text-center">BAGIKAN BERITA</h1>
        <hr className="custom-hr" />
      </Container>
      <TabelBagikanBerita
        berita={berita}
        enabledStatus={enabledStatus}
        setEnabledStatus={setEnabledStatus}
      />
    </>
  );
}

export default BagikanBerita;
