import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Modal, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { verifyNews } from "../api/Api";

function TabelVerifikasiBerita({ beritaProdi, refreshBerita }) {
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [confirmRejectModalShow, setConfirmRejectModalShow] = useState(false);
  const [selectedBeritaId, setSelectedBeritaId] = useState(null);

  const handleShowDetail = (berita) => {
    setSelectedBerita(berita);
    setDetailModalShow(true);
  };

  const handleCloseDetailModal = () => setDetailModalShow(false);
  const handleCloseRejectModal = () => setConfirmRejectModalShow(false);

  const handleVerify = async (id) => {
    try {
      await verifyNews(id, "verify");
      toast.success("Berita berhasil disetujui!", { autoClose: 2000 });
      refreshBerita();
    } catch (error) {
      toast.error("Gagal menyetujui berita.", { autoClose: 2000 });
    }
  };

  const handleReject = async () => {
    try {
      if (selectedBeritaId) {
        await verifyNews(selectedBeritaId, "reject");
        toast.success("Berita berhasil ditolak!", { autoClose: 2000 });
        setConfirmRejectModalShow(false);
        refreshBerita();
      }
    } catch (error) {
      toast.error("Gagal menolak berita.", { autoClose: 2000 });
    }
  };

  if (!Array.isArray(beritaProdi)) {
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
    },
    {
      field: "image",
      headerName: "Foto",
      width: 180,
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
              setSelectedBeritaId(params.row.id);
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
    <Container className="mt-4 mb-4" style={{ overflow: "hidden", paddingBottom: "40px" }}>
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rows={beritaProdi}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      <Modal show={detailModalShow} onHide={handleCloseDetailModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Berita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">{selectedBerita?.title}</h3>
          <p className="text-center">Penulis: {selectedBerita?.authorName}</p>
          {selectedBerita?.image && (
            <div className="text-center mb-4">
              <img
                src={selectedBerita.image}
                alt={selectedBerita.title}
                style={{ width: "50%", maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          )}
          <p>{selectedBerita?.content}</p>
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
          <Modal.Title>Konfirmasi Penolakan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menolak berita ini?
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

export default TabelVerifikasiBerita;
