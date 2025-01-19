import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Pagination from "react-bootstrap/Pagination";
import { useGlobal } from "../context/GlobalContext";
import {
  getDataAlumniForAlumni,
  getDataAlumniForAdminUniversitas,
  getDataAlumniForAdminProdi,
} from "../api/Api";
import * as XLSX from "xlsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function DaftarAlumni({
  filterProdi,
  filterFakultas,
  filterTahunLulus,
  searchQuery,
}) {
  const { globalData } = useGlobal();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response;

      const params = {
        page,
        limit: pageSize === "all" ? totalData : pageSize,
        ...(filterProdi && { studyProgram: filterProdi }),
        ...(filterFakultas && { faculty: filterFakultas }),
        ...(filterTahunLulus && { graduationYear: filterTahunLulus }),
        ...(searchQuery && { search: searchQuery }),
      };

      if (globalData.role === "alumni") {
        response = await getDataAlumniForAlumni(params);
      } else if (globalData.role === "admin_universitas") {
        response = await getDataAlumniForAdminUniversitas(params);
      } else if (globalData.role === "admin_prodi") {
        response = await getDataAlumniForAdminProdi(params);
      }

      if (response?.data?.data?.length) {
        const formattedData = response.data.data.map((profile) => ({
          id: profile.id,
          NPM: profile.studentIdentificationNumber,
          Nama: profile.fullName,
          Fakultas: profile.studyProgram.faculty,
          Prodi: profile.studyProgram.name,
          Jenjang: profile.studyProgram.level,
          TahunLulus: profile.yearGraduated,
          Pekerjaan: profile.work || profile.career,
          fullData: profile,
        }));

        setRows(formattedData);
        setTotalPages(response.data.meta.totalPages);
        setTotalData(response.data.meta.totalItems);
      } else {
        setRows([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [
    globalData.role,
    page,
    pageSize,
    filterProdi,
    filterFakultas,
    filterTahunLulus,
    searchQuery,
    totalData,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRowClick = (profile) => {
    setSelectedProfile(profile.fullData);
    setDetailModalShow(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalShow(false);
    setSelectedProfile(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      rows.map((row) => ({
        NPM: row.NPM,
        Nama: row.Nama,
        Fakultas: row.Fakultas,
        Prodi: row.Prodi,
        Jenjang: row.Jenjang,
        TahunLulus: row.TahunLulus,
        Pekerjaan: row.Pekerjaan,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni Data");
    XLSX.writeFile(workbook, "Data_Alumni.xlsx");
  };

  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between mb-3">
        <h3>Daftar Alumni</h3>
        {(globalData.role === "admin_universitas" ||
          globalData.role === "admin_prodi") && (
          <Button variant="contained" color="primary" onClick={downloadExcel}>
            Unduh Excel
          </Button>
        )}
      </div>

      <FormControl
        variant="outlined"
        size="small"
        className="mb-3 mt-3"
        style={{ width: "300px" }} 
      >
        <InputLabel id="page-size-label">Tampilkan</InputLabel>
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={handlePageSizeChange}
          label="Tampilkan"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={1000}>1000</MenuItem>
          <MenuItem value={5000}>5000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={50000}>50000</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="text-center">NPM</StyledTableCell>
              <StyledTableCell className="text-center">Nama</StyledTableCell>
              <StyledTableCell className="text-center">
                Fakultas
              </StyledTableCell>
              <StyledTableCell className="text-center">Prodi</StyledTableCell>
              <StyledTableCell className="text-center">Jenjang</StyledTableCell>
              <StyledTableCell className="text-center">
                Tahun Lulus
              </StyledTableCell>
              <StyledTableCell className="text-center">
                Pekerjaan
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  Loading...
                </StyledTableCell>
              </StyledTableRow>
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <StyledTableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer" }}
                >
                  <StyledTableCell align="center">{row.NPM}</StyledTableCell>
                  <StyledTableCell>{row.Nama}</StyledTableCell>
                  <StyledTableCell>{row.Fakultas}</StyledTableCell>
                  <StyledTableCell>{row.Prodi}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Jenjang}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TahunLulus}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Pekerjaan}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  Data tidak tersedia.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pageSize !== "all" && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            {[...Array(totalPages).keys()].map((pageIndex) => (
              <Pagination.Item
                key={pageIndex + 1}
                active={pageIndex + 1 === page}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </div>
      )}

      {selectedProfile && (
        <Modal
          open={detailModalShow}
          onClose={handleCloseDetailModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-modal-title" className="text-center">
              Detail Alumni
            </h2>

            <p id="modal-modal-description">
              <strong>Nama:</strong> {selectedProfile.fullName}
            </p>

            <p>
              <strong>NPM:</strong>{" "}
              {selectedProfile.studentIdentificationNumber}
            </p>
            <p>
              <strong>Fakultas:</strong> {selectedProfile.studyProgram.faculty}
            </p>
            <p>
              <strong>Prodi:</strong> {selectedProfile.studyProgram.name}
            </p>
            <p>
              <strong>Jenjang:</strong> {selectedProfile.studyProgram.level}
            </p>
            <p>
              <strong>Tahun Lulus:</strong> {selectedProfile.yearGraduated}
            </p>
            <p>
              <strong>Pekerjaan:</strong>{" "}
              {selectedProfile.work || selectedProfile.career}
            </p>
            <p>
              <strong>LinkedIn:</strong> {selectedProfile.linkedin}
            </p>
            {(globalData.role === "admin_universitas" ||
              globalData.role === "admin_prodi") && (
              <>
                <p>
                  <strong>NIK:</strong>{" "}
                  {selectedProfile.sensitiveData.nationalIdentityNumber}
                </p>
                <p>
                  <strong>Tempat Lahir:</strong>{" "}
                  {selectedProfile.sensitiveData.placeOfBirth}
                </p>
                <p>
                  <strong>Tanggal Lahir:</strong>{" "}
                  {selectedProfile.sensitiveData.dateOfBirth}
                </p>
                <p>
                  <strong>Alamat:</strong>{" "}
                  {selectedProfile.sensitiveData.fullAddress}
                </p>
                <p>
                  <strong>Email:</strong> {selectedProfile.sensitiveData.email}
                </p>
                <p>
                  <strong>Nomor Telepon:</strong>{" "}
                  {selectedProfile.sensitiveData.phoneNumber}
                </p>
                <p>
                  <strong>GPA:</strong> {selectedProfile.sensitiveData.gpa}
                </p>
              </>
            )}
            <Button
              variant="contained"
              onClick={handleCloseDetailModal}
              fullWidth
            >
              Tutup
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default DaftarAlumni;
