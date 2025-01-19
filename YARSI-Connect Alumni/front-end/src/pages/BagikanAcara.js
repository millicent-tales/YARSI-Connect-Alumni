import { useState, useEffect } from "react";
import { getVerifiedEvents } from "../api/Api";
import { useGlobal } from "../context/GlobalContext";
import TabelBagikanAcara from "../components/TabelBagikanAcara";
import { Container } from "react-bootstrap";

function BagikanAcara() {
  const { globalData } = useGlobal();
  const username = globalData.username;

  const [acara, setAcara] = useState([]);
  const [enabledStatus, setEnabledStatus] = useState({});

  useEffect(() => {
    const fetchAcara = async () => {
      try {
        const response = await getVerifiedEvents();
        const acaraArray = response.data.data;

        if (Array.isArray(acaraArray)) {
          const acaraData = acaraArray.map((item) => ({
            id: item.id,
            title: item.title,
            image: item.image,
            content: item.description,
            date: item.date,
            isActive: item.isActive,
            authorName: item.author.username,
          }));

          const storedStatus =
            JSON.parse(localStorage.getItem("enabledStatus")) || {};

          const updatedStatus = {};
          acaraData.forEach((item) => {
            updatedStatus[item.id] = storedStatus[item.id] ?? item.isActive;
          });

          setEnabledStatus(updatedStatus);
          setAcara(acaraData);
        }
      } catch (error) {
        console.error("Error fetching acara: ", error);
      }
    };

    fetchAcara();
  }, [username]);

  useEffect(() => {
    localStorage.setItem("enabledStatus", JSON.stringify(enabledStatus));
  }, [enabledStatus]);

  return (
    <>
      <Container>
        <h1 className="text-center">BAGIKAN ACARA</h1>
        <hr className="custom-hr" />
      </Container>
      <TabelBagikanAcara
        acara={acara}
        enabledStatus={enabledStatus}
        setEnabledStatus={setEnabledStatus}
      />
    </>
  );
}

export default BagikanAcara;
