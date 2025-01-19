import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Modal, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { activationEvents, broadcastMessageEvent } from "../api/Api";

import "react-toastify/dist/ReactToastify.css";

function TabelBagikanAcara({ acara, enabledStatus, setEnabledStatus }) {
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedAcara, setSelectedAcara] = useState(null);

  const handleCloseDetailModal = () => setDetailModalShow(false);

  if (!Array.isArray(acara)) {
    return <div>Loading...</div>;
  }

  const handleShowDetail = (item) => {
    setSelectedAcara(item);
    setDetailModalShow(true);
  };

  const handleWhatsAppBroadcast = async (id) => {
    try {
      await broadcastMessageEvent(id);
      toast.success("Pesan Broadcast berhasil dikirim!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error broadcasting message:", error);
      toast.error("Gagal mengirim pesan broadcast.");
    }
  };

  const toggleEnable = async (id, currentStatus) => {
    try {
      const action = !currentStatus; // Toggle status
      await activationEvents(id, action);
      setEnabledStatus((prevState) => ({
        ...prevState,
        [id]: action,
      }));
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Judul Acara",
      width: 350,
      headerAlign: "center", // Judul kolom di tengah
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
      headerAlign: "center", // Judul kolom di tengah
    },
    {
      field: "image",
      headerName: "Foto",
      width: 150,
      headerAlign: "center", // Judul kolom di tengah
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
      width: 350,
      headerAlign: "center", // Judul kolom di tengah
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
    // Kolom untuk Bagikan WhatsApp
    {
      field: "whatsapp",
      headerName: "Bagikan WhatsApp",
      width: 150,
      headerAlign: "center", // Judul kolom di tengah
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
            className="fa-brands fa-whatsapp"
            onClick={() =>
              handleWhatsAppBroadcast(params.row.id)
            }
            style={{ cursor: "pointer", color: "green" }}
          ></i>
        </div>
      ),
    },
    // Kolom untuk Status Tampilan
    {
      field: "status",
      headerName: "Status Tampilan",
      width: 150,
      headerAlign: "center", // Judul kolom di tengah
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
      <div style={{ height: "500px", width: "100%" }}>
        <DataGrid
          rows={acara}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </div>

      {/* Modal untuk detail acara */}
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
          {selectedAcara && (
            <>
              <h3 className="text-center">{selectedAcara.title}</h3>
              <p className="text-center">
                Dibuat oleh: {selectedAcara.authorName}
              </p>
              {selectedAcara.image && (
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
              <p style={{ textAlign: "justify" }}>{selectedAcara.content}</p>
            </>
          )}
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

export default TabelBagikanAcara;