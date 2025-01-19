import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { postAkunAlumni, getFileAkunAlumni } from "../api/Api";

function GenerateAkunAlumni() {
  const [file, setFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedFilePath, setGeneratedFilePath] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
    setSuccess("");
    setGeneratedFilePath("");
  };

  // Handle open confirmation dialog
  const handleClickOpenDialog = () => {
    if (!file) {
      setError("Harap unggah file Excel terlebih dahulu.");
      return;
    }
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setGeneratedFilePath("");
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await postAkunAlumni(formData); // Call API
      setSuccess(response.data.message || "Akun alumni berhasil dibuat!");
      setGeneratedFilePath(response.data.downloadUrl || ""); // Gunakan URL unduhan
      setFile(null); // Clear file input
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Terjadi kesalahan saat membuat akun alumni."
      );
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };
  

  const handleDownloadFile = async () => {
    try {
      if (!generatedFilePath) {
        setError("Tidak ada file untuk diunduh.");
        return;
      }
  
      // Ekstrak nama file dari generatedFilePath
      const fileName = generatedFilePath.split("/").pop();
  
      const response = await getFileAkunAlumni(fileName); // Call API with fileName
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError("Gagal mengunduh file. Silakan coba lagi.");
    }
  };  

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          paddingTop: "20px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "600px",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            GENERATE AKUN ALUMNI
          </h2>

          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="file-upload" style={{ marginBottom: "10px" }}>
                Unggah File Excel:
              </label>
              <TextField
                id="file-upload"
                type="file"
                slotProps={{ input: { accept: ".xlsx, .xls" } }}
                fullWidth
                onChange={handleFileChange}
              />
            </div>
          </div>

          <Button
            variant="primary"
            style={{ marginTop: "20px", width: "100%" }}
            onClick={handleClickOpenDialog}
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Akun"}
          </Button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
          )}

          {generatedFilePath && (
            <Button
              variant="link"
              style={{
                color: "blue",
                marginTop: "10px",
                textDecoration: "underline",
              }}
              onClick={handleDownloadFile}
            >
              Unduh File Akun Alumni
            </Button>
          )}
        </Paper>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Konfirmasi Generate Akun Alumni"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin melanjutkan proses generate akun alumni?
            Pastikan file Excel yang diunggah sudah benar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="secondary">
            Batal
          </Button>
          <Button onClick={handleSubmit} variant="primary" autoFocus>
            Ya, Generate
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default GenerateAkunAlumni;
