import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import IdentitasTracerStudy from "./IdentitasTracerStudy";
import TracerStudyBekerja from "./TracerStudyBekerja";
import TracerStudyBelumMemungkinkanBekerja from "./TracerStudyBelumMemungkinkanBekerja";
import TracerStudyWiraswasta from "./TracerStudyWiraswasta";
import TracerStudyStudiLanjut from "./TracerStudyStudiLanjut";
import TracerStudyTidakKerja from "./TracerStudyTidakKerja";
import { getTracerStudy } from "../api/Api";

function KuesionerTracerStudyAlumni() {
  const [formData, setFormData] = useState({
    statusPekerjaan: "",
  });

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
          npwp: data.npwp || "",
        };
        setProfileData(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tracer study data:", error);
        setLoading(false);
      });
  }, []);

  const handleRadioChange = (groupName) => (event) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [groupName]: value,
    }));
  };

  const updateProfileData = (field, value) => {
    setProfileData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const getStatusPekerjaanData = () => formData.statusPekerjaan;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5 mb-5">
      <IdentitasTracerStudy
        profileData={profileData}
        updateProfileData={updateProfileData}
      />
      <Box component="form" noValidate sx={{ flexGrow: 1, mt: 4 }}>
        <h3
          style={{ marginBottom: "40px", textAlign: "left", marginTop: "50px" }}
          className="ms-4"
        >
          Kuesioner
        </h3>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          {/* f8 */}
          <FormControl className="ms-4">
            <p>
              1. Jelaskan status Anda saat ini!{" "}
              <span style={{ color: "red" }}>*</span>
            </p>
            <RadioGroup
              aria-labelledby="status-pekerjaan-label"
              name="status-pekerjaan-group"
              value={formData.statusPekerjaan}
              onChange={handleRadioChange("statusPekerjaan")}
              className="ms-4"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Bekerja (full time/part time)"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Belum memungkinkan bekerja"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Wiraswasta"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Melanjutkan Pendidikan"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="Tidak kerja tetapi sedang mencari kerja"
              />
            </RadioGroup>
          </FormControl>

          <Box className="ms-3">
            {formData.statusPekerjaan === "1" && (
              <TracerStudyBekerja
                getStatusPekerjaanData={getStatusPekerjaanData}
                profileData={profileData}
              />
            )}
            {formData.statusPekerjaan === "2" && (
              <TracerStudyBelumMemungkinkanBekerja
                getStatusPekerjaanData={getStatusPekerjaanData}
                profileData={profileData}
              />
            )}
            {formData.statusPekerjaan === "3" && (
              <TracerStudyWiraswasta
                getStatusPekerjaanData={getStatusPekerjaanData}
                profileData={profileData}
              />
            )}
            {formData.statusPekerjaan === "4" && (
              <TracerStudyStudiLanjut
                getStatusPekerjaanData={getStatusPekerjaanData}
                profileData={profileData}
              />
            )}
            {formData.statusPekerjaan === "5" && (
              <TracerStudyTidakKerja
                getStatusPekerjaanData={getStatusPekerjaanData}
                profileData={profileData}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default KuesionerTracerStudyAlumni;
