import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function DaftarProgramAlumni({ program }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedAcara, setSelectedAcara] = useState(null);

  const [dropdownTitle, setDropdownTitle] = useState("Kategori Program Alumni");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const handleCloseDetailModal = () => setDetailModalShow(false);

  // Initialize category from URL
  const initializeCategoryFromURL = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
      setDropdownTitle(formatCategoryLabel(category));
    } else {
      setSelectedCategory("Semua");
      setDropdownTitle("Kategori Program Alumni");
    }
  }, [location.search]);

  // Format category label
  const formatCategoryLabel = (category) => {
    switch (category) {
      case "Lowongan_Kerja":
        return "Lowongan Kerja";
      case "Reuni":
        return "Reuni";
      case "Penggalangan_Dana":
        return "Penggalangan Dana";
      case "Sesi_Berbagi_Pengalaman":
        return "Sesi Berbagi Pengalaman";
      default:
        return "Kategori Program Alumni";
    }
  };

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setDropdownTitle(formatCategoryLabel(category));
    navigate(`?category=${category}`); // Update URL with selected category
  };

  useEffect(() => {
    initializeCategoryFromURL();
  }, [initializeCategoryFromURL]);

  const filteredProgram =
    selectedCategory === "Semua"
      ? program
      : program.filter((item) => item.category === selectedCategory);

      const columns = [
        {
          field: "title",
          headerName: "Judul Program Alumni",
          width: 350,
          headerAlign: "center", // Tambahkan ini
          renderCell: (params) => (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleShowDetail(params.row)}
            >
              {params.value.length > 100
                ? `${params.value.substring(0, 100)}...`
                : params.value}
            </span>
          ),
        },
        {
          field: "category",
          headerName: "Kategori",
          width: 150,
          headerAlign: "center", // Tambahkan ini
          renderCell: (params) => (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleShowDetail(params.row)}
            >
              {params.value}
            </span>
          ),
        },
        {
          field: "authorName",
          headerName: "Penulis",
          width: 160,
          headerAlign: "center", // Tambahkan ini
          renderCell: (params) => (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleShowDetail(params.row)}
            >
              {params.value}
            </span>
          ),
        },
        {
          field: "image",
          headerName: "Foto",
          width: 150,
          headerAlign: "center", // Tambahkan ini
          renderCell: (params) =>
            params.value && (
              <img
                src={params.value}
                alt={params.row.title}
                style={{ width: "100px", height: "80px", objectFit: "cover" }}
                onClick={() => handleShowDetail(params.row)}
              />
            ),
        },
        {
          field: "content",
          headerName: "Deskripsi",
          width: 500,
          headerAlign: "center", // Tambahkan ini
          renderCell: (params) => (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleShowDetail(params.row)}
            >
              {params.value.length > 100
                ? `${params.value.substring(0, 100)}...`
                : params.value}
            </span>
          ),
        },
      ];
      
  const handleShowDetail = (program) => {
    setSelectedAcara(program);
    setDetailModalShow(true); // Show modal with selected program details
  };

  if (!Array.isArray(program)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <FormControl sx={{ minWidth: 200 }} size="small" className="mt-4 mb-4">
        <InputLabel id="category-select-label">{dropdownTitle}</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label={dropdownTitle}
          onChange={handleCategorySelect}
        >
          <MenuItem value="Semua">Semua</MenuItem>
          <MenuItem value="Lowongan_Kerja">Lowongan Kerja</MenuItem>
          <MenuItem value="Reuni">Reuni</MenuItem>
          <MenuItem value="Penggalangan_Dana">Penggalangan Dana</MenuItem>
          <MenuItem value="Sesi_Berbagi_Pengalaman">
            Sesi Berbagi Pengalaman
          </MenuItem>
        </Select>
      </FormControl>

      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          rows={filteredProgram}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
        />
      </div>

      <Modal
        show={detailModalShow}
        onHide={handleCloseDetailModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Program Alumni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">{selectedAcara?.title}</h3>
          <p className="text-center">
            Dibuat oleh: {selectedAcara?.authorName}
          </p>
          {selectedAcara?.image && (
            <div className="d-flex justify-content-center mb-5">
              <img
                src={selectedAcara.image}
                alt={selectedAcara.title}
                style={{
                  width: "50%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
          <p style={{ textAlign: "justify" }}>{selectedAcara?.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DaftarProgramAlumni;
