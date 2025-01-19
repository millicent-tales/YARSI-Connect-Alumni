import { useState, useEffect, useCallback } from "react";
import { getEventsToBeVerified } from "../api/Api";
import TabelVerifikasiAcara from "../components/TabelVerifikasiAcara";
import { useGlobal } from "../context/GlobalContext";

function VerifikasiAcaraProdi() {
  const { globalData } = useGlobal();
  const username = globalData.username;

  const [acara, setAcara] = useState([]);

  const fetchAcara = useCallback(async () => {
    try {
      const response = await getEventsToBeVerified();
      const acaraArray = response.data.data;

      if (Array.isArray(acaraArray)) {
        const acaraData = acaraArray
          .filter((item) => item.authorName !== username) 
          .map((item) => ({
            id: item.id,
            title: item.title,
            image: item.image,
            content: item.description,
            createdAt: item.createdAt,
            authorName: item.author.username,
            date: item.date,
          }));
        setAcara(acaraData); 
      } else {
        console.error("Data yang diterima bukan array:", acaraArray);
      }
    } catch (error) {
      console.error("Error fetching acara: ", error);
    }
  }, [username]);

  useEffect(() => {
    fetchAcara();
  }, [fetchAcara]);

  return (
    <>
      <TabelVerifikasiAcara acaraProdi={acara} refreshAcara={fetchAcara} />
    </>
  );
}

export default VerifikasiAcaraProdi;