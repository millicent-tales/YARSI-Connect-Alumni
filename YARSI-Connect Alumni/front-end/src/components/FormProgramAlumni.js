import { Container, Button, Row, Col } from "react-bootstrap";
import { postProgramAlumni } from "../api/Api";
import { useState, useRef } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alerts from "../components/Alerts";

function FormProgramAlumni() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const tambahProgramAlumni = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await postProgramAlumni(title, description, image, category);
      toast.success("Program Alumni berhasil ditambahkan!", {
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
      setCategory("");
      setImage(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error(
        "Error dari server: ",
        error.response?.data?.message || error.response?.data
      );
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
      <form onSubmit={tambahProgramAlumni}>
        {errorMessage && <Alerts peringatan={errorMessage} />}

        {/* Kategori Program Alumni */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="kategori-program"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Kategori Program Alumni:
            </label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="kategori-program"
              select
              variant="outlined"
              fullWidth
              value={category}
              onChange={handleCategoryChange}
              label="Pilih Kategori"
            >
              <MenuItem value="">
                <em>Pilih Kategori</em>
              </MenuItem>
              <MenuItem value="Lowongan_Kerja">Lowongan Kerja</MenuItem>
              <MenuItem value="Reuni">Reuni</MenuItem>
              <MenuItem value="Penggalangan_Dana">Penggalangan Dana</MenuItem>
              <MenuItem value="Sesi_Berbagi_Pengalaman">
                Sesi Berbagi Pengalaman
              </MenuItem>
            </TextField>
          </Col>
        </Row>

        {/* Judul Program Alumni */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="judul-program"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Judul Program Alumni:
            </label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="judul-program"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>

        {/* Unggah Foto */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="unggah-foto"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Unggah Foto:
            </label>
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

        {/* Preview Foto */}
        {imagePreview && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <label style={{ marginRight: "100px" }}>Preview Foto:</label>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "auto", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Deskripsi Program Alumni */}
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="deskripsi-program"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Deskripsi Program Alumni:
            </label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="deskripsi-program"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        {/* Tombol Kirim */}
        <div className="d-flex justify-content-end">
          <Button type="submit">Kirim</Button>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default FormProgramAlumni;
