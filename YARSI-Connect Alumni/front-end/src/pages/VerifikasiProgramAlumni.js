import TabelVerifikasiProgramAlumni from "../components/TabelVerifikasiProgramAlumni";
import { useState, useEffect } from 'react';
import { getProgramAlumniToBeVerified } from '../api/Api';

function VerifikasiProgramAlumni() {
    const [program, setProgram] = useState([]);
    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await getProgramAlumniToBeVerified();
                const programArray = response.data.data;

                if (Array.isArray(programArray)) {
                    const programData = programArray.map(item => ({
                        id: item.id,
                        image: item.image,
                        authorId: item.authorId,
                        title: item.title,
                        content: item.description,
                        createdAt: item.createdAt,
                        category: item.category,
                        authorName: item.author.username,
                        status: item.AlumniProgramStatus
                    }));
                    setProgram(programData); 
                } else {
                    console.error("Data yang diterima bukan array:", programArray);
                }
            } catch (error) {
                console.error("Error fetching program: ", error);
            }

        };

        fetchProgram();
    }, []);

    const refreshProgram = async () => {
        try {
            const response = await getProgramAlumniToBeVerified();
            const programArray = response.data.data;

            if (Array.isArray(programArray)) {
                const programData = programArray.map(item => ({
                    id: item.id,
                    image: item.image,
                    authorId: item.authorId,
                    title: item.title,
                    content: item.description,
                    createdAt: item.createdAt,
                    category: item.category,
                    authorName: item.author.username,
                    submissionStatus: item.submissionStatus
                }));
                setProgram(programData);
            }
        } catch (error) {
            console.error("Error refreshing program: ", error);
        }
    };

    return (
        <>
            <TabelVerifikasiProgramAlumni program={program} onRefresh={refreshProgram} />
        </>
    )
}

export default VerifikasiProgramAlumni;