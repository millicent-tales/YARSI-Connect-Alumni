import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

// Membuat Context
const GlobalContext = createContext();

// Provider untuk menyediakan data global
export const GlobalProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({
        role: "",
        username: "",
        id: "", 
        showLogoutModal: false,
    });

    // Memuat data dari localStorage jika ada
    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        const storedUsername = localStorage.getItem('username');
        const storedId = localStorage.getItem('id');

        if (storedRole) {
            setGlobalData((prevData) => ({
                ...prevData,
                role: storedRole,
                username: storedUsername || "",
                id: storedId || "",
            }));
        }
    }, []);

    // Fungsi untuk update global data dan localStorage
    const updateGlobalData = (key, value) => {
        setGlobalData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
        localStorage.setItem(key, value);
    };

    // Fungsi untuk clear global data
    const clearGlobalData = () => {
        setGlobalData({
            role: "",
            username: "",
            id: "",
            showLogoutModal: false,
        });

        // Hapus data dari localStorage
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('token'); // Hapus token jika ada
    };

    return (
        <GlobalContext.Provider value={{ globalData, updateGlobalData, clearGlobalData }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Hook untuk menggunakan data Global
export const useGlobal = () => useContext(GlobalContext);

// Fungsi untuk login dan menyimpan data ke GlobalContext
export const loginUser = async (credentials, updateGlobalData) => {
    try {
        const response = await axios.post('/api/login', credentials);
        const { data } = response;

        // Simpan data ke GlobalContext
        updateGlobalData('role', data.user.role.name);
        updateGlobalData('username', data.user.username);
        updateGlobalData('id', data.user.id);

        // Simpan token di localStorage juga jika diperlukan
        localStorage.setItem('token', data.token);
    } catch (error) {
        console.error("Login failed:", error);
    }
};