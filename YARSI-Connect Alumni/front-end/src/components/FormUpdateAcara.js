import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { getMyEvents, updateEvents } from "../api/Api";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"; 

function FormUpdateAcara() {
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const [date, setDate] = useState("");
  const [imagePreview, setImagePreview] = useState(null); 

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyEvents(id);
        if (response.data && Array.isArray(response.data.data)) {
        
          const acara = response.data.data.find((a) => a.id === id);
          if (acara) {
            setTitle(acara.title);
            setDescription(acara.description);
           
            const formattedDate = new Date(acara.date).toISOString().split("T")[0];
            setDate(formattedDate);
            setImage(acara.image);
            setImagePreview(acara.image);
          } else {
            console.log("Acara tidak ditemukan dengan id:", id);
          }
        } else {
          console.error("Data yang diterima bukan array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [id]); // Efek dijalankan setiap kali id berubah

  const updateAcara = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("date", date);

      await updateEvents(id, formData);
      toast.success("Acara berhasil diperbarui!", {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        autoClose: 2000,
      });

      setTitle("");
      setDescription("");
      setDate("");
      setImage(null);
      setImagePreview(null);

      setTimeout(() => navigate("/manajemen-acara"), 2000);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error(
        "Error dari server:",
        error.response?.data?.message || error.response?.data || error
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        PERBARUI ACARA
      </Typography>
      <Box
        component="form"
        onSubmit={updateAcara}
        noValidate
        sx={{ mt: 3 }}
      >
        <TextField
          fullWidth
          label="Judul Acara"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <Button
          variant="primary"
          as="label"
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Perbarui Foto
          <input
            type="file"
            hidden
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </Button>

        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Preview Foto</Typography>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "300px", maxHeight: "500px" }}
            />
          </Box>
        )}

        <TextField
          fullWidth
          label="Tanggal Acara"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Deskripsi Acara"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button type="submit" variant="primary">
            Simpan Perubahan
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default FormUpdateAcara;