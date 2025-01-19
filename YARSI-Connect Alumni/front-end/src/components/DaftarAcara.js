import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import "../styles/tabel.css";

function DaftarAcara({ daftarAcara }) {
  const navigate = useNavigate();
  const { globalData } = useGlobal();
  const userRole = globalData.role;

  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedAcara, setSelectedAcara] = useState(null);

  const handleShowDetail = (acara) => {
    setSelectedAcara(acara);
    setDetailModalShow(true);
  };

  const handleCloseDetailModal = () => setDetailModalShow(false);

  if (!Array.isArray(daftarAcara)) {
    return <div>Loading...</div>;
  }

  // Define columns for DataGrid
  const columns = [
    {
      field: "title",
      headerName: "Judul Acara",
      width: 300,
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
            <img
              src={params.value}
              alt={params.row.title}
              style={{ width: "90px", height: "70px", objectFit: "cover" }}
            />
          </div>
        ),
    },
    {
      field: "content",
      headerName: "Deskripsi",
      width: 400,
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
      field: "date",
      headerName: "Tanggal Acara",
      width: 160,
      headerAlign: "center",
      cellClassName: "data-grid-date", // Menambahkan class CSS untuk kolom tanggal
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleShowDetail(params.row)}
        >
          {params.value}
        </span>
      ),
    },
    ...(userRole === "admin_universitas"
      ? [
          {
            field: "action",
            headerName: "Perbarui",
            width: 120,
            headerAlign: "center",
            renderCell: (params) => (
              <div className="data-grid-action">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => navigate(`/perbarui-acara/${params.row.id}`)}
                ></i>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <Container className="mt-4 mb-4">
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rows={daftarAcara}
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
        />
      </div>

      <Modal
        show={detailModalShow}
        onHide={handleCloseDetailModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Detail Acara"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">{selectedAcara?.title}</h3>
          <p className="text-center">
            Dibuat oleh: {selectedAcara?.authorName}
          </p>
          <p className="text-center">
            <strong>Tanggal Acara:</strong> {selectedAcara?.date}
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

export default DaftarAcara;
