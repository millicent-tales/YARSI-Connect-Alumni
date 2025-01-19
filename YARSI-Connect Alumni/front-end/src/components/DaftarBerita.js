import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

function DaftarBerita({ daftarBerita }) {
  const navigate = useNavigate();
  const { globalData } = useGlobal();
  const userRole = globalData.role;

  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);

  const handleShowDetail = (berita) => {
    setSelectedBerita(berita);
    setDetailModalShow(true);
  };

  const handleCloseDetailModal = () => setDetailModalShow(false);

  if (!Array.isArray(daftarBerita)) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      field: "title",
      headerName: "Judul Berita",
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
      field: "authorName",
      headerName: "Penulis",
      width: 160,
      headerAlign: "center",
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
      headerAlign: "center",
      renderCell: (params) =>
        params.value && (
          <div
            className="data-grid-img"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowDetail(params.row)}
          >
            <img src={params.value} alt={params.row.title} />
          </div>
        ),
    },
    {
      field: "content",
      headerName: "Deskripsi",
      width: 500,
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
    userRole === "admin_universitas" && {
      field: "action",
      headerName: "Perbarui",
      width: 120,
      headerAlign: "center",
      renderCell: (params) => (
        <div className="data-grid-action">
          <i
            className="fa-regular fa-pen-to-square"
            onClick={() => navigate(`/perbarui-berita/${params.row.id}`)}
          ></i>
        </div>
      ),
    },
  ].filter(Boolean);

  return (
    <Container className="mt-4 mb-4">
      <div
        style={{
          height: "500px", 
          width: "100%",
          overflow: "auto", 
        }}
      >
        <DataGrid
          rows={daftarBerita}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          style={{
            width: "100%", 
            overflow: "hidden", 
          }}
        />

        <Modal
          show={detailModalShow}
          onHide={handleCloseDetailModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{"Detail Berita"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="text-center">{selectedBerita?.title}</h3>
            <p className="text-center">
              Dibuat oleh: {selectedBerita?.authorName}
            </p>
            {selectedBerita?.image && (
              <div className="d-flex justify-content-center mb-5">
                <img
                  src={selectedBerita.image}
                  alt={selectedBerita.title}
                  style={{
                    width: "50%",
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
            <p style={{ textAlign: "justify" }}>{selectedBerita?.content}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}

export default DaftarBerita;