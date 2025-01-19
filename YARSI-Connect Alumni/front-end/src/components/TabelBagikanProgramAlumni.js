import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import { activationProgramAlumni, broadcastMessageProgramAlumni } from "../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/tabel.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function TabelBagikanProgramAlumni({
  program,
  enabledStatus,
  setEnabledStatus,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedProgramAlumni, setSelectedProgramAlumni] = useState(null);
  const handleCloseDetailModal = () => setDetailModalShow(false);

  const handleShowDetail = (item) => {
    setSelectedProgramAlumni(item);
    setDetailModalShow(true);
  };

  const handleWhatsAppBroadcast = async (id) => {
    try {
      await broadcastMessageProgramAlumni(id);
      toast.success("Pesan Broadcast berhasil dikirim!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error broadcasting message:", error);
      toast.error("Gagal mengirim pesan broadcast.");
    }
  };

  const toggleEnable = async (id, currentStatus) => {
    try {
      const action = !currentStatus;
      await activationProgramAlumni(id, action);
      setEnabledStatus((prevState) => ({
        ...prevState,
        [id]: action,
      }));
    } catch (error) {
      console.error("Error updating program status:", error);
    }
  };

  const [dropdownTitle, setDropdownTitle] = useState("Kategori Program Alumni");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

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

  const handleCategorySelect = (category, label) => {
    setSelectedCategory(category);
    setDropdownTitle(label);
    navigate(`?category=${category}`);
  };

  useEffect(() => {
    initializeCategoryFromURL();
  }, [initializeCategoryFromURL]);

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
      width: 350,
      headerAlign: "center",
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
      headerAlign: "center",
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleShowDetail(params.row)}
        >
          {params.value.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      field: "authorName",
      headerName: "Penulis",
      width: 140,
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Foto",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          onClick={() => handleShowDetail(params.row)}
        >
          {params.value && (
            <img
              src={params.value}
              alt={params.row.title}
              style={{ width: "90px", height: "70px", objectFit: "cover" }}
            />
          )}
        </div>
      ),
    },
    {
      field: "content",
      headerName: "Deskripsi",
      width: 350,
      headerAlign: "center",
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
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 150,
    //   headerAlign: "center",
    //   renderCell: (params) => (
    //     <span
    //       style={{ cursor: "pointer" }}
    //       onClick={() => handleShowDetail(params.row)}
    //     >
    //       {params.value}
    //     </span>
    //   ),
    // },
    {
      field: "whatsapp",
      headerName: "Bagikan WhatsApp",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <i
            className="fa-brands fa-whatsapp"
            onClick={() =>
              handleWhatsAppBroadcast(params.row.id)
            }
            style={{ cursor: "pointer", color: "green" }}
          ></i>
        </div>
      ),
    },
    {
      field: "display",
      headerName: "Status Tampilan",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Menjaga ikon di tengah horizontal
            alignItems: "center", // Menjaga ikon di tengah vertikal
            height: "100%", // Pastikan tinggi elemen cukup untuk align vertikal
          }}
        >
          <i
            className={`fa-regular ${
              enabledStatus[params.row.id] ? "fa-eye" : "fa-eye-slash"
            }`}
            onClick={() =>
              toggleEnable(params.row.id, enabledStatus[params.row.id])
            }
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <div className="kategori-program mb-5 mt-0">
        <Box sx={{ minWidth: 120, marginTop: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">{dropdownTitle}</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label={dropdownTitle}
              onChange={(e) =>
                handleCategorySelect(
                  e.target.value,
                  formatCategoryLabel(e.target.value)
                )
              }
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
        </Box>
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rows={filteredProgram}
          columns={columns}
          pageSize={5}
          components={{
            Toolbar: GridToolbar,
          }}
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
          <Modal.Title>{"Detail Program Alumni"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProgramAlumni && (
            <>
              <h3 className="text-center">{selectedProgramAlumni.title}</h3>
              <p className="text-center">
                Dibuat oleh: {selectedProgramAlumni.authorName}
              </p>
              {selectedProgramAlumni.image && (
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
                {selectedProgramAlumni.content}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Container>
  );
}

export default TabelBagikanProgramAlumni;
