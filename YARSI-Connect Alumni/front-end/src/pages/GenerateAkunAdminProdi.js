import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import {
  Box,
  MenuItem,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { postAkunAdminProdi } from "../api/Api";

function GenerateAkunAdminProdi() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jenjang, setJenjang] = React.useState("");
  const [prodi, setProdi] = React.useState("");

  const handleChangeJenjang = (event) => {
    setJenjang(event.target.value);
  };

  const handleChangeProdi = (event) => {
    setProdi(event.target.value);
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        username,
        password,
        level: jenjang,
        studyProgram: prodi,
      };

      const response = await postAkunAdminProdi(payload);
      setSuccess(response.data.message || "Akun berhasil dibuat!");
      setUsername("");
      setPassword("");
      setJenjang("");
      setProdi("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat membuat akun"
      );
    } finally {
      setLoading(false);
      setOpenDialog(false);
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
            BUAT AKUN ADMIN
          </h2>

          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label htmlFor="username" style={{ width: "30%" }}>
                Username:
              </label>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label htmlFor="password" style={{ width: "30%" }}>
                Kata Sandi:
              </label>
              <TextField
                id="password"
                label="Kata Sandi"
                type="text"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label htmlFor="level" style={{ width: "30%" }}>
                Jenjang:
              </label>
              <FormControl fullWidth>
                <InputLabel id="jenjang-select-label">Jenjang</InputLabel>
                <Select
                  labelId="jenjang-select-label"
                  id="jenjang-select"
                  value={jenjang}
                  label="Jenjang"
                  onChange={handleChangeJenjang}
                >
                  <MenuItem value={"S1"}>S1</MenuItem>
                  <MenuItem value={"S2"}>S2</MenuItem>
                  <MenuItem value={"S3"}>S3</MenuItem>
                  <MenuItem value={"Sp-1"}>Sp-1</MenuItem>
                  <MenuItem value={"Profesi"}>Profesi</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={{ display: "flex", marginBottom: "15px" }}>
              <label htmlFor="prodi" style={{ width: "30%" }}>
                Program Studi:
              </label>
              <FormControl fullWidth>
                <InputLabel id="prodi-select-label">Program Studi</InputLabel>
                <Select
                  labelId="prodi-select-label"
                  id="prodi-select"
                  value={prodi}
                  label="Program Studi"
                  onChange={handleChangeProdi}
                >
                  <MenuItem value={"Psikologi"}>Psikologi</MenuItem>
                  <MenuItem value={"Manajemen"}>Manajemen</MenuItem>
                  <MenuItem value={"Akuntansi"}>Akuntansi</MenuItem>
                  <MenuItem value={"Ilmu Hukum"}>Ilmu Hukum</MenuItem>
                  <MenuItem value={"Teknik Informatika"}>Teknik Informatika</MenuItem>
                  <MenuItem value={"Perpustakaan dan Sains Informasi"}>Perpustakaan dan Sains Informasi</MenuItem>
                  <MenuItem value={"Kedokteran"}>Kedokteran</MenuItem>
                  <MenuItem value={"Profesi Dokter"}>Profesi Dokter</MenuItem>
                  <MenuItem value={"Kedokteran Gigi"}>Kedokteran Gigi</MenuItem>
                  <MenuItem value={"Profesi Dokter Gigi"}>Profesi Dokter Gigi</MenuItem>
                  <MenuItem value={"Kenotariatan"}>Kenotariatan</MenuItem>
                  <MenuItem value={"Sains Biomedis"}>Sains Biomedis</MenuItem>
                  <MenuItem value={"Administrasi Rumah Sakit"}>Administrasi Rumah Sakit</MenuItem>
                  <MenuItem value={"Kedokteran Keluarga Layanan Primer"}>Kedokteran Keluarga Layanan Primer</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <Button
            variant="primary"
            style={{ marginTop: "20px", width: "100%" }}
            onClick={handleClickOpenDialog}
            disabled={loading}
          >
            {loading ? "Loading..." : "Buat Akun"}
          </Button>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
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
          {"Konfirmasi Pembuatan Akun Admin"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin untuk melanjutkan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="secondary">
            Batal
          </Button>
          <Button onClick={handleSubmit} variant="primary" autoFocus>
            Ya, Buat Akun
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default GenerateAkunAdminProdi;
