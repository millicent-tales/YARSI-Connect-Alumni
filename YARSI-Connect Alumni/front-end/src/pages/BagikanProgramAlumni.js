import { useState, useEffect } from "react";
import { getVerifiedProgramAlumni } from "../api/Api";
import TabelBagikanProgramAlumni from "../components/TabelBagikanProgramAlumni";
import { Container } from "react-bootstrap";
import { useGlobal } from "../context/GlobalContext";

function BagikanProgramAlumni() {
  const [program, setProgram] = useState([]);
  const [enabledStatus, setEnabledStatus] = useState({});

  const { globalData } = useGlobal(); 
  const username = globalData.username; 

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await getVerifiedProgramAlumni(); 
  
        const programArray = response.data.data;
  
        if (Array.isArray(programArray)) {
          const programData = programArray.map((item) => ({
            id: item.id,
            image: item.image,
            authorId: item.authorId,
            title: item.title,
            content: item.description,
            createdAt: item.createdAt,
            category: item.category,
            authorName: item.author.username,
            status: item.AlumniProgramStatus,
            isActive: item.isActive, 
          }));
  
          const storedStatus = JSON.parse(localStorage.getItem("enabledStatus")) || {};
          
          const updatedStatus = {};
          programData.forEach((item) => {
            updatedStatus[item.id] = storedStatus[item.id] ?? item.isActive;
          });
  
          setEnabledStatus(updatedStatus);
          setProgram(programData); 
        } else {
          console.error("Data yang diterima bukan array:", programArray);
        }
      } catch (error) {
        console.error("Error fetching program: ", error);
      }
    };
  
    fetchProgram();
  }, [username]);
  
  useEffect(() => {
    localStorage.setItem("enabledStatus", JSON.stringify(enabledStatus));
  }, [enabledStatus]);
  

  return (
    <>
      <Container>
        <h1 className="text-center">BAGIKAN PROGRAM ALUMNI</h1>
        <hr className="custom-hr" />
      </Container>
      <TabelBagikanProgramAlumni
        program={program}
        enabledStatus={enabledStatus}
        setEnabledStatus={setEnabledStatus}
      />
    </>
  );
}

export default BagikanProgramAlumni;
