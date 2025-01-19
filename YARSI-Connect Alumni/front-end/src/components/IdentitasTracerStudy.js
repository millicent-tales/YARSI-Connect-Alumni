import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { getTracerStudy } from "../api/Api";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

function IdentitasTracerStudy() {
  const [profileData, setProfileData] = useState({
    studentIdentificationNumber: "",
    yearGraduated: "",
    fullName: "",
    universityCode: "",
    programCode: "",
    telephone: "",
    email: "",
    nationalIdentificationNumber: "",
    npwp: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracerStudy()
      .then((response) => {
        const data = response.data.data;
        const mappedData = {
          studentIdentificationNumber: data.nimhsmsmh,
          yearGraduated: data.tahun_lulus,
          fullName: data.nmmhsmsmh,
          universityCode: data.kdptimsmh,
          programCode: data.kdpstmsmh,
          telephone: data.telpomsmh,
          email: data.emailmsmh,
          nationalIdentificationNumber: data.nik,
          npwp: data.npwp || "", // Tambahkan NPWP jika tersedia
        };
        setProfileData(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tracer study data:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="text-center">TRACER STUDY</h1>
      <hr className="custom-hr" />

      <Box component="form" noValidate sx={{ flexGrow: 1 }}>
        <h3 style={{ marginBottom: "16px" }}>Identitas</h3>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="Nama"
              variant="outlined"
              placeholder="Nama Lengkap"
              disabled
              value={profileData?.fullName || ""}
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="NIK"
              variant="outlined"
              placeholder="NIK"
              disabled
              value={profileData?.nationalIdentificationNumber || ""}
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="NPM"
              variant="outlined"
              placeholder="NPM"
              disabled
              value={profileData?.studentIdentificationNumber || ""}
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="Tahun Lulus"
              variant="outlined"
              placeholder="Tahun Lulus"
              disabled
              value={profileData?.yearGraduated || ""}
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="Kode PT"
              variant="outlined"
              placeholder="Kode PT"
              disabled
              value={profileData?.universityCode || ""}
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="Kode Prodi"
              variant="outlined"
              placeholder="Kode Prodi"
              disabled
              value={profileData?.programCode || ""}
            />
          </Box>

          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="Alamat Email"
              variant="outlined"
              placeholder="Alamat Email"
              value={profileData.email || ""}
              onChange={handleInputChange("email")}
            />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="Nomor Telepon/HP"
              variant="outlined"
              placeholder="Nomor Telepon/HP"
              value={profileData?.telephone || ""}
              onChange={handleInputChange("telephone")}
            />
          </Box>
          <Box sx={{ flex: "1 1 calc(50% - 24px)", minWidth: "300px" }}>
            <CssTextField
              fullWidth
              label="NPWP"
              variant="outlined"
              placeholder="NPWP"
              value={profileData?.npwp || ""}
              onChange={handleInputChange("npwp")}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default IdentitasTracerStudy;