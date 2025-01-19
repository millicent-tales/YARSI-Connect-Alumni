import { Container, Button, Row, Col } from "react-bootstrap";
import { postNews } from "../api/Api";
import { useState, useRef } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import TextField from "@mui/material/TextField";
import Alerts from "../components/Alerts";

function FormBerita() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); 

  const fileInputRef = useRef(null);

  const tambahBerita = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    try {
      await postNews(title, content, image);
      toast.success("Berita berhasil ditambahkan!", {
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
      setContent("");
      setImage(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error dari server:", error.response?.data?.message || error.response?.data);
      setErrorMessage(error.response?.data?.error || "Semua data wajib diisi!"); 
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
    <Container style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={tambahBerita}>
        {errorMessage && <Alerts peringatan={errorMessage} />} 

        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label htmlFor="judul-berita">Judul Berita:</label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="judul-berita"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label htmlFor="unggah-foto">Unggah Foto:</label>
          </Col>
          <Col xs={12} md={9}>
            <input
              type="file"
              id="unggah-foto"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "block" }}
            />
          </Col>
        </Row>

        {imagePreview && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
            <label style={{ marginRight: "100px" }}>Preview Foto:</label>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "auto", objectFit: "cover" }}
            />
          </div>
        )}

        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label htmlFor="deskripsi-berita">Deskripsi Berita:</label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="deskripsi-berita"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit">Kirim</Button>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default FormBerita;