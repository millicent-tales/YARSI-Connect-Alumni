// Pastikan untuk menginstal pustaka xlsx terlebih dahulu
// npm install xlsx

import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Container } from "react-bootstrap";
import { getAnswerTracerStudy } from "../api/Api";
import * as XLSX from "xlsx";

function TracerStudyAdminUniv() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fieldNames = [
    "Kode PT",
    "Kode Prodi",
    "NIM/Nomor Mahasiswa",
    "Nama",
    "HP",
    "Email",
    "Tahun Lulus",
    "NIK",
    "NPWP",
    "F8",
    "F502",
    "F505",
    "F5a1",
    "F5a2",
    "F1101",
    "F1102",
    "F5b",
    "F5c",
    "F5d",
    "F18a",
    "F18b",
    "F18c",
    "F18d",
    "F1201",
    "F1202",
    "F14",
    "F15",
    "F1761",
    "F1762",
    "F1763",
    "F1764",
    "F1765",
    "F1766",
    "F1767",
    "F1768",
    "F1769",
    "F1770",
    "F1771",
    "F1772",
    "F1773",
    "F1774",
    "F21",
    "F22",
    "F23",
    "F24",
    "F25",
    "F26",
    "F27",
    "F301",
    "F302",
    "F303",
    "F401",
    "F402",
    "F403",
    "F404",
    "F405",
    "F406",
    "F407",
    "F408",
    "F409",
    "F410",
    "F411",
    "F412",
    "F413",
    "F414",
    "F415",
    "F416",
    "F6",
    "F7",
    "F7a",
    "F1001",
    "F1002",
    "F1601",
    "F1602",
    "F1603",
    "F1604",
    "F1605",
    "F1606",
    "F1607",
    "F1608",
    "F1609",
    "F1610",
    "F1611",
    "F1612",
    "F1613",
    "F1614",
  ];

  const columns = fieldNames.map((fieldName) => {
    let column = {
      field: fieldName,
      headerName: fieldName,
      flex: 1,
      sortable: true,
      headerAlign: "center",
    };

    if (fieldName === "Kode PT" || fieldName === "Kode Prodi" || fieldName === "Tahun Lulus") {
      column = {
        ...column,
        minWidth: 100,
      };
    } else if (fieldName === "Nama" || fieldName === "Email") {
      column = {
        ...column,
        minWidth: 300,
      };
    } else if (fieldName === "HP" || fieldName === "NIK" || fieldName === "NIM/Nomor Mahasiswa") {
      column = {
        ...column,
        minWidth: 200,
      };
    } else if (fieldName === "NPWP") {
      column = {
        ...column,
        minWidth: 150,
      };
    } else {
      column = {
        ...column,
        minWidth: 60,
      };
    }

    return column;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnswerTracerStudy();
        const formattedData = response.data.data.map((item, index) => ({
          id: index + 1,
          "Kode PT": item.kdptimsmh,
          "Kode Prodi": item.kdpstmsmh,
          "NIM/Nomor Mahasiswa": item.nimhsmsmh,
          Nama: item.nmmhsmsmh,
          HP: item.telpomsmh,
          Email: item.emailmsmh,
          "Tahun Lulus": item.tahun_lulus,
          NIK: item.nik,
          NPWP: item.npwp,
          F8: item.f8,
          F502: item.f502,
          F505: item.f505,
          F5a1: item.f5a1,
          F5a2: item.f5a2,
          F1101: item.f1101,
          F1102: item.f1102,
          F5b: item.f5b,
          F5c: item.f5c,
          F5d: item.f5d,
          F18a: item.f18a,
          F18b: item.f18b,
          F18c: item.f18c,
          F18d: item.f18d,
          F1201: item.f1201,
          F1202: item.f1202,
          F14: item.f14,
          F15: item.f15,
          F1761: item.f1761,
          F1762: item.f1762,
          F1763: item.f1763,
          F1764: item.f1764,
          F1765: item.f1765,
          F1766: item.f1766,
          F1767: item.f1767,
          F1768: item.f1768,
          F1769: item.f1769,
          F1770: item.f1770,
          F1771: item.f1771,
          F1772: item.f1772,
          F1773: item.f1773,
          F1774: item.f1774,
          F21: item.f21,
          F22: item.f22,
          F23: item.f23,
          F24: item.f24,
          F25: item.f25,
          F26: item.f26,
          F27: item.f27,
          F301: item.f301,
          F302: item.f302,
          F303: item.f303,
          F401: item.f401,
          F402: item.f402,
          F403: item.f403,
          F404: item.f404,
          F405: item.f405,
          F406: item.f406,
          F407: item.f407,
          F408: item.f408,
          F409: item.f409,
          F410: item.f410,
          F411: item.f411,
          F412: item.f412,
          F413: item.f413,
          F414: item.f414,
          F415: item.f415,
          F416: item.f416,
          F6: item.f6,
          F7: item.f7,
          F7a: item.f7a,
          F1001: item.f1001,
          F1002: item.f1002,
          F1601: item.f1601,
          F1602: item.f1602,
          F1603: item.f1603,
          F1604: item.f1604,
          F1605: item.f1605,
          F1606: item.f1606,
          F1607: item.f1607,
          F1608: item.f1608,
          F1609: item.f1609,
          F1610: item.f1610,
          F1611: item.f1611,
          F1612: item.f1612,
          F1613: item.f1613,
          F1614: item.f1614,
        }));
        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      rows.map(({ id, ...rest }) => rest) // Exclude the `id` field
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tracer Study");
    XLSX.writeFile(workbook, "Tracer_Study.xlsx");
  };

  return (
    <>
      <Container>
        <h1 className="text-center">TRACER STUDY</h1>
        <hr className="custom-hr" />
        <Box className="mb-3 text-end">
          <Button variant="contained" color="primary" onClick={downloadExcel}>
            Unduh Excel
          </Button>
        </Box>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            loading={loading}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            sx={{
              ".header-column": {
                whiteSpace: "normal",
                wordBreak: "break-word",
              },
            }}
          />
        </Box>
      </Container>
    </>
  );
}

export default TracerStudyAdminUniv;