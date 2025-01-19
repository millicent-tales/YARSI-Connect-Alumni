import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { getMyNews, updateNews } from "../api/Api";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"; // Import button dari Bootstrap

function FormUpdateBerita() {
  const { id } = useParams(); // Mengambil id dari URL parameter
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch berita berdasarkan id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyNews();
        if (response.data && Array.isArray(response.data.data)) {
          const berita = response.data.data.find((b) => b.id.toString() === id); // Pastikan id adalah string
          if (berita) {
            setTitle(berita.title);
            setContent(berita.content);
            setImage(null); 
            setImagePreview(berita.image); 
          } else {
            console.error("Berita tidak ditemukan dengan id:", id);
          }
        } else {
          console.error("Data yang diterima bukan array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [id]);

  const updateBerita = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("content", content);
      if (image) {
        payload.append("image", image); 
      }

      await updateNews(id, payload); 

      toast.success("Berita berhasil diperbarui!", {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        autoClose: 2000,
        theme: "light",
      });
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);

      setTimeout(() => navigate("/manajemen-berita"), 2000);
    } catch (error) {
      console.error(
        "Error saat memperbarui berita:",
        error.response?.data?.message || error.response?.data || error
      );
      toast.error("Gagal memperbarui berita.");
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
        PERBARUI BERITA
      </Typography>
      <Box
        component="form"
        onSubmit={updateBerita}
        noValidate
        sx={{ mt: 3 }}
      >
        <TextField
          fullWidth
          label="Judul Berita"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <Button
          variant="primary"
          as="label"
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Unggah Foto
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
          label="Deskripsi Berita"
          multiline
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
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

export default FormUpdateBerita;