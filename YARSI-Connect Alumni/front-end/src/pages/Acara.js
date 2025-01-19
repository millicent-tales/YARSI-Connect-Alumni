import NavigationBar from '../components/NavigationBar';
import "../styles/acara.css"
import AcaraCards from '../components/AcaraCards';
import { useState, useEffect } from 'react';
import {  getEvents } from '../api/Api';
import Footer from '../components/Footer';

function Acara() {
    const [acara, setAcara] = useState([]);
    useEffect(() => {
        const fetchAcara = async () => {
            try {
                const response = await getEvents(); 
                const acaraArray = response.data.data;
    
                if (Array.isArray(acaraArray)) {
                    const acaraData = acaraArray.map(item => ({
                        id:item.id,
                        image: item.image,
                        author: item.author,
                        authorId: item.authorId,
                        title: item.title,
                        description: item.description,
                        createdAt: item.createdAt,
                    }));
                    setAcara(acaraData); // Update state dengan data berita
                } else {
                    console.error("Data yang diterima bukan array:", acaraArray);
                }
            } catch (error) {
                console.error("Error fetching news: ", error);
            }
    
        };
    
        fetchAcara();
    }, []);

    return (
        <>
            <NavigationBar />
            <AcaraCards acara={acara} columnCount={3} />
            <Footer/>
        </>
    );
}

export default Acara;