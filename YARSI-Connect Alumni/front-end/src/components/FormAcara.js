import { useState, useRef } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { postEvents } from "../api/Api";
import { ToastContainer, toast, Slide } from "react-toastify";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Alerts from "../components/Alerts"; // Import Alerts

function FormAcara() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); 

  const fileInputRef = useRef(null);

  const tambahAcara = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    try {
      await postEvents(title, description, image, date);
      
      toast.success("Acara berhasil ditambahkan!", {
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
      setDate(null);
      setImage(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error(
        "Error dari server:",
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
      <form onSubmit={tambahAcara}>
        {errorMessage && <Alerts peringatan={errorMessage} />} 

        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="judul-acara"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Judul Acara:
            </label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="judul-acara"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Row>

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

        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="tanggal-acara"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Tanggal Acara:
            </label>
          </Col>
          <Col xs={12} md={9}>
            <FormControl sx={{ width: "100%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  format="MM/DD/YYYY" 
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      sx: { width: "100%" },
                      InputProps: {
                        style: { textAlign: "center" },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col xs={12} md={3}>
            <label
              htmlFor="deskripsi-acara"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Deskripsi Acara:
            </label>
          </Col>
          <Col xs={12} md={9}>
            <TextField
              id="deskripsi-acara"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default FormAcara;
