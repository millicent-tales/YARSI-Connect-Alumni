import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getListFile } from "../api/Api";

const BASE_URL = "http://milicent-tales.space";

const columns = [
  {
    field: "filename",
    headerName: "Nama File",
    flex: 2,
    minWidth: 200,
    sortable: true,
    headerAlign: "center",
  },
  {
    field: "createdAt",
    headerName: "Tanggal Dibuat",
    flex: 1,
    minWidth: 150,
    sortable: true,
    headerAlign: "center",
  },
  {
    field: "size",
    headerName: "Ukuran File",
    flex: 1,
    minWidth: 100,
    sortable: true,
    headerAlign: "center",
  },
  {
    field: "downloadUrl",
    headerName: "Unduh",
    flex: 1,
    minWidth: 150,
    sortable: false,
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
      >
        <Button
          variant="primary"
          size="sm"
          href={`${BASE_URL}${params.value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Unduh
        </Button>
      </div>
    ),
  },
];

function DaftarAkunAlumni() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListFile();
        const files = response.data.data.files;

        const formattedRows = files.map((file, index) => ({
          id: index + 1,
          filename: file.filename,
          createdAt: new Date(file.createdAt).toLocaleString(),
          size: file.size,
          downloadUrl: file.downloadUrl,
        }));

        setRows(formattedRows);
      } catch (err) {
        console.error("Gagal memuat data file:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="text-center">DAFTAR AKUN ALUMNI</h1>
      <hr className="custom-hr" />
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading} // Menampilkan loading jika data belum tersedia
          components={{
            Toolbar: GridToolbar,
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          sx={{
            ".header-column": {
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default DaftarAkunAlumni;