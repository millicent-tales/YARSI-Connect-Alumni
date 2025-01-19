import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import DaftarAlumni from "../components/DaftarAlumni";
import { useGlobal } from "../context/GlobalContext";

function DataAlumni() {
  const { globalData } = useGlobal();
  const [kategoriData, setKategoriData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(globalData.role === "admin_prodi" ? "tahun lulus" : "");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRadioChange = (event) => {
    const newCategory = event.target.value;
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory);
      setKategoriData("");
    }
  };

  const handleSelectChange = (event) => {
    setKategoriData(event.target.value);
  };

  const handleTextFieldChange = (event) => {
    setKategoriData(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getOptions = () => {
    if (selectedCategory === "prodi") {
      return [
        "Psikologi",
        "Manajemen",
        "Akuntansi",
        "Ilmu Hukum",
        "Teknik Informatika",
        "Perpustakaan dan Sains Informasi",
        "Kedokteran",
        "Profesi Dokter",
        "Kedokteran Gigi",
        "Profesi Dokter Gigi",
        "Kenotariatan",
        "Sains Biomedis",
        "Administrasi Rumah Sakit",
        "Kedokteran Keluarga Layanan Primer",
      ];
    } else if (selectedCategory === "fakultas") {
      return [
        "Psikologi",
        "Ekonomi dan Bisnis",
        "Hukum",
        "Teknologi Informasi",
        "Kedokteran",
        "Kedokteran Gigi",
        "Sekolah Pascasarjana",
      ];
    }
    return [];
  };

  return (
    <Container>
      <h1 className="text-center">DATA ALUMNI</h1>
      <hr className="custom-hr" />

      {globalData.role !== "admin_prodi" && (
        <Row className="mt-5">
          <Col>
            <FormControl className="mb-4">
              <FormLabel id="kategori-data-alumni-label">Kategori Data</FormLabel>
              <RadioGroup
                row
                aria-labelledby="kategori-data-alumni-label"
                name="kategori-data-alumni-group"
                value={selectedCategory}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="prodi"
                  control={<Radio />}
                  label="Prodi"
                />
                <FormControlLabel
                  value="tahun lulus"
                  control={<Radio />}
                  label="Tahun Lulus"
                />
                <FormControlLabel
                  value="fakultas"
                  control={<Radio />}
                  label="Fakultas"
                />
              </RadioGroup>
            </FormControl>
          </Col>
          <Col>
            {selectedCategory === "tahun lulus" ? (
              <TextField
                id="outlined-basic"
                type="number"
                label="Tahun Lulus"
                variant="outlined"
                value={kategoriData}
                onChange={handleTextFieldChange}
                fullWidth
                className="ms-1 mb-5"
              />
            ) : (
              <FormControl fullWidth>
                <InputLabel id="kategori-select-label">Kategori Data</InputLabel>
                <Select
                  labelId="kategori-select-label"
                  id="kategori-select"
                  value={kategoriData}
                  onChange={handleSelectChange}
                  disabled={!selectedCategory}
                  label="Kategori Data"
                >
                  {getOptions().map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Col>
        </Row>
      )}

      {globalData.role === "admin_prodi" && (
        <Row className="mt-5 mb-5">
          
          <Col md={6}>
            <TextField
              id="outlined-basic"
              label="Cari Nama Alumni"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id="outlined-basic"
              type="number"
              label="Tahun Lulus"
              variant="outlined"
              value={kategoriData}
              onChange={handleTextFieldChange}
              fullWidth
            />
          </Col>
        </Row>
      )}

      {globalData.role !== "admin_prodi" && (
        <Row className="mb-5 ms-1" style={{ width: "100%" }}>
          <TextField
            id="outlined-basic"
            label="Cari Nama Alumni"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
        </Row>
      )}

      <DaftarAlumni
        filterProdi={selectedCategory === "prodi" ? kategoriData : ""}
        filterFakultas={selectedCategory === "fakultas" ? kategoriData : ""}
        filterTahunLulus={
          selectedCategory === "tahun lulus" || globalData.role === "admin_prodi"
            ? kategoriData
            : ""
        }
        searchQuery={searchQuery}
      />
    </Container>
  );
}

export default DataAlumni;