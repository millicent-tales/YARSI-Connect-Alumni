import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Modal, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { verifyEvents } from "../api/Api";

function TabelVerifikasiAcara({ acaraProdi, refreshAcara }) {
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedAcara, setSelectedAcara] = useState(null);
  const [confirmRejectModalShow, setConfirmRejectModalShow] = useState(false);
  const [selectedAcaraId, setSelectedAcaraId] = useState(null);

  const handleShowDetail = (acara) => {
    setSelectedAcara(acara);
    setDetailModalShow(true);
  };

  const handleCloseDetailModal = () => setDetailModalShow(false);
  const handleCloseRejectModal = () => setConfirmRejectModalShow(false);

  const handleVerify = async (id) => {
    try {
      await verifyEvents(id, "verify");
      toast.success("Acara berhasil disetujui!", { autoClose: 2000 });
      refreshAcara();
    } catch (error) {
      toast.error("Gagal menyetujui acara.", { autoClose: 2000 });
    }
  };

  const handleReject = async () => {
    try {
      if (selectedAcaraId) {
        await verifyEvents(selectedAcaraId, "reject");
        toast.success("Acara berhasil ditolak!", { autoClose: 2000 });
        setConfirmRejectModalShow(false);
        refreshAcara();
      }
    } catch (error) {
      toast.error("Gagal menolak acara.", { autoClose: 2000 });
    }
  };

  if (!Array.isArray(acaraProdi)) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      field: "title",
      headerName: "Judul Acara",
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
      width: 140,
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Foto",
      width: 150,
      headerAlign: "center",
      renderCell: (params) =>
        params.value && (
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
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      field: "action",
      headerName: "Aksi",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          className="d-flex gap-2"
          style={{
            justifyContent: "center",
            alignItems: "center",
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
              setSelectedAcaraId(params.row.id);
              setConfirmRejectModalShow(true);
            }}
          >
            Tolak
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <h1 className="text-center">VERIFIKASI ACARA</h1>
      <hr className="custom-hr" />

      <div style={{ height: "500px",width: "100%" }}>
        <DataGrid
          rows={acaraProdi}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
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

      <Modal
        show={confirmRejectModalShow}
        onHide={handleCloseRejectModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tolak Pengajuan Acara</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin akan menolak pengajuan acara ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectModal}>
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

export default TabelVerifikasiAcara;