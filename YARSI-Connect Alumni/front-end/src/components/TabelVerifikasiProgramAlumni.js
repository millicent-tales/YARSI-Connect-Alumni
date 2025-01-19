import {
  Container,
  Button,
  Modal,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyProgramAlumni } from "../api/Api";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function TabelVerifikasiProgramAlumni({ program, onRefresh }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProgramAlumniId, setSelectedProgramAlumniId] = useState(null);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedProgramAlumni, setSelectedProgramAlumni] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseDetailModal = () => setDetailModalShow(false);

  const handleVerify = async (id) => {
    try {
      await verifyProgramAlumni(id, "verify");
      toast.success("Program Alumni berhasil disetujui!", {
        autoClose: 2000,
      });
      onRefresh(); // Refresh data setelah verifikasi
    } catch (error) {
      toast.error("Gagal menyetujui Program Alumni.", {
        autoClose: 2000,
      });
    }
  };

  const handleReject = async () => {
    try {
      if (selectedProgramAlumniId) {
        await verifyProgramAlumni(selectedProgramAlumniId, "reject");
        toast.success("Program Alumni berhasil ditolak!", {
          autoClose: 2000,
        });
        setShow(false);
        onRefresh(); // Refresh data setelah penolakan
      }
    } catch (error) {
      toast.error("Gagal menolak Program Alumni.", {
        autoClose: 2000,
      });
    }
  };

  const handleShowDetail = (program) => {
    setSelectedProgramAlumni(program);
    setDetailModalShow(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("Semua");
    }
  }, [location.search]);

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    navigate(`?category=${category}`);
  };

  const filteredProgram =
    selectedCategory === "Semua"
      ? program
      : program.filter((item) => item.category === selectedCategory);

  if (!Array.isArray(program)) {
    return <div>Loading...</div>; 
  }

  const columns = [
    {
      field: "title",
      headerName: "Judul Program Alumni",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Kategori",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "authorName",
      headerName: "Penulis",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Foto",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={params.value}
            alt={params.row.title}
            style={{ width: "90px", height: "70px", objectFit: "cover" }}
          />
        </div>
      ),
      headerAlign: "center",
    },
    {
      field: "content",
      headerName: "Deskripsi",
      width: 350,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 180,
      renderCell: (params) => (
        <div
          className="d-flex gap-2 justify-content-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Button
            variant="success"
            size="sm"
            onClick={() => handleVerify(params.row.id)}
          >
            Setujui
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setSelectedProgramAlumniId(params.row.id);
              setShow(true);
            }}
          >
            Tolak
          </Button>
        </div>
      ),
      headerAlign: "center",
    },
  ];

  const rows = filteredProgram.map((program, index) => ({
    id: program.id,
    title:
      program.title.length > 100
        ? `${program.title.substring(0, 100)}...`
        : program.title,
    category: program.category.replace(/_/g, " "),
    authorName: program.authorName,
    image: program.image,
    content:
      program.content.length > 100
        ? `${program.content.substring(0, 100)}...`
        : program.content,
    status: program.status,
  }));

  const handleCellClick = (params) => {
    if (params.field !== "actions") {
      handleShowDetail(params.row);
    }
  };

  return (
    <Container>
      <h1 className="text-center">VERIFIKASI PROGRAM ALUMNI</h1>
      <hr className="custom-hr" />

      <Box sx={{ minWidth: 120 }} className="mb-5 mt-5">
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Kategori Program Alumni</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Kategori Program Alumni"
            onChange={handleCategorySelect}
          >
            <MenuItem value="Semua">Semua</MenuItem>
            <MenuItem value="Lowongan_Kerja">Lowongan Kerja</MenuItem>
            <MenuItem value="Reuni">Reuni</MenuItem>
            <MenuItem value="Penggalangan_Dana">Penggalangan Dana</MenuItem>
            <MenuItem value="Sesi_Berbagi_Pengalaman">Sesi Berbagi Pengalaman</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleCellClick} 
        />
      </div>

     
      <Modal
        show={detailModalShow}
        onHide={handleCloseDetailModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Detail Program Alumni"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">{selectedProgramAlumni?.title}</h3>
          <p className="text-center">
            Dibuat oleh: {selectedProgramAlumni?.authorName}
          </p>
          {selectedProgramAlumni?.image && (
            <div className="d-flex justify-content-center mb-5">
              <img
                src={selectedProgramAlumni.image}
                alt={selectedProgramAlumni.title}
                style={{
                  width: "50%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
          <p style={{ textAlign: "justify" }}>
            {selectedProgramAlumni?.content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Konfirmasi Tolak */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tolak Pengajuan Program Alumni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin akan menolak pengajuan program alumni ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button variant="primary" onClick={handleReject}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TabelVerifikasiProgramAlumni;