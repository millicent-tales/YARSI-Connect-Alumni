import React, { useEffect, useState } from "react";
import { Container, Image, Row, Spinner, Button, Badge } from "react-bootstrap";
import { useGlobal } from "../context/GlobalContext";
import { getProfile, updateProfile } from "../api/Api";
import { TextField } from "@mui/material";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profil() {
  const { globalData } = useGlobal();
  const { role, id } = globalData;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getProfile(id)
      .then((response) => {
        const data = response.data.data;
        const parsedProfile = {
          ...data,
          skills: data.skills || [],
          competencies: data.competencies || [],
          yearGraduated: data.yearGraduated || "Tidak diketahui",
        };

        setProfileData(parsedProfile);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => {
      const keys = field.split(".");
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else {
        const [nestedKey, subKey] = keys;
        return {
          ...prev,
          [nestedKey]: {
            ...prev[nestedKey],
            [subKey]: value,
          },
        };
      }
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSaveChanges = () => {
    if (!id || !profileData) return;

    setSaving(true);

    const updatedData = {
      image: imageFile,
      mobile_number: profileData.sensitiveData?.mobileNumber || "",
      work: profileData.work || "",
      company: profileData.company || "",
      linkedin: profileData.linkedin || "",
      skills: profileData.skills.join(","),
      entrepreneur: profileData.entrepreneur || "",
      competencies: profileData.competencies.join(","),
      career: profileData.career || "",
      idProfilAlumni: profileData.id || "",
    };

    updateProfile(id, updatedData)
      .then(() => {
        toast.success("Profil berhasil diperbarui!", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "Terjadi kesalahan saat memperbarui profil.",
          {
            position: "top-right",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          }
        );
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container className="mt-5 text-center">
        <p>Data profil tidak tersedia.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="profile-container text-center">
        {profileData.image ? (
          <Image
            className="custom-image"
            src={profileData.image}
            roundedCircle
          />
        ) : (
          <p>Foto profil belum tersedia</p>
        )}
        <h2 className="profile-name">
          {role === "admin_universitas" && "Admin Universitas"}
          {role === "admin_prodi" && "Admin Program Studi"}
          {role === "alumni" && (
            <>
              <span>{profileData.fullName}</span>
              {profileData.is_alumni_leader !== undefined &&
                profileData.is_alumni_leader && (
                  <Badge bg="secondary" className="ms-4">
                    Ketua Alumni
                  </Badge>
                )}
            </>
          )}
        </h2>
      </div>

      <form className="mb-5">
        {role === "alumni" && (
          <>
            <div className="mb-3 mt-5">
              <label>Edit Foto Profil</label>
              <TextField
                type="file"
                variant="outlined"
                inputProps={{ accept: "image/*" }}
                fullWidth
                onChange={handleFileChange}
              />
            </div>

            <div className="col mt-5">
                <TextField
                  id="formIDProfilAlumni"
                  label="ID Profil Alumni"
                  value={profileData.id || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>

            <Row className="mb-3 mt-5">
              <div className="col">
                <TextField
                  id="formNamaLengkap"
                  label="Nama Lengkap"
                  value={profileData.fullName || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>

              <div className="col">
                <TextField
                  id="formNPM"
                  label="NPM"
                  value={profileData.studentIdentificationNumber || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>
            </Row>

            <Row className="mb-3 mt-5">
              

            <div className="col">
                <TextField
                  id="formProgramStudi"
                  label="Program Studi"
                  value={profileData.studyProgram?.name || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>

              <div className="col">
                <TextField
                  id="formTahunLulus"
                  label="Tahun Lulus"
                  value={profileData.yearGraduated || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>
            </Row>
          </>   
        )}

        {role === "admin_prodi" && (
          <>
            <Row className="mb-3 mt-5">
              <div className="col">
                <TextField
                  id="formNamaLengkap"
                  label="Nama Lengkap"
                  value={profileData.fullName || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>

              <div className="col">
                <TextField
                  id="formProgramStudi"
                  label="Program Studi"
                  value={profileData.studyProgram?.name || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>
            </Row>
          </>
        )}

        {role === "alumni" && (
          <>
            <Row className="mb-3 mt-5">
              <div className="col">
                <TextField
                  id="formNomorTelepon"
                  label="Nomor Telepon"
                  placeholder="Masukkan Nomor Telepon Anda"
                  value={profileData.sensitiveData?.mobileNumber || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    handleInputChange(
                      "sensitiveData.mobileNumber",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col">
                <TextField
                  id="formPekerjaan"
                  label="Bidang Pekerjaan"
                  placeholder="Masukkan Pekerjaan Anda"
                  value={profileData.work || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleInputChange("work", e.target.value)}
                />
              </div>
            </Row>

            <Row className="mb-3 mt-5">
              <div className="col">
                <TextField
                  id="formPerusahaan"
                  label="Perusahaan"
                  placeholder="Masukkan Perusahaan Tempat Anda Bekerja"
                  value={profileData.company || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
              <div className="col">
                <TextField
                  id="formLinkedIn"
                  label="LinkedIn"
                  placeholder="Masukkan Akun LinkedIn Anda"
                  value={profileData.linkedin || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                />
              </div>
            </Row>

            <Row className="mb-3 mt-5">
              <div className="col">
                <TextField
                  id="formSkills"
                  label="Skills"
                  placeholder="Masukkan Skills yang Anda Miliki"
                  value={profileData.skills.join(", ") || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    handleInputChange(
                      "skills",
                      e.target.value.split(",").map((skill) => skill.trim())
                    )
                  }
                />
              </div>
              <div className="col">
                <TextField
                  id="formWirausaha"
                  label="Wirausaha"
                  placeholder="Masukkan Wirausaha yang Anda Jalani"
                  value={profileData.entrepreneur || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    handleInputChange("entrepreneur", e.target.value)
                  }
                />
              </div>
            </Row>

            <Row className="mb-3 mt-5">
              <div className="col">
                <TextField
                  id="formKompetensi"
                  label="Kompetensi"
                  placeholder="Masukkan Kompetensi Anda"
                  value={profileData.competencies.join(", ") || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    handleInputChange(
                      "competencies",
                      e.target.value.split(",").map((comp) => comp.trim())
                    )
                  }
                />
              </div>
              <div className="col">
                <TextField
                  id="formPerkembanganKarier"
                  label="Perkembangan Karier"
                  placeholder="Masukkan Perkembangan Karier Anda"
                  value={profileData.career || ""}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleInputChange("career", e.target.value)}
                />
              </div>

              <div className="text-end mt-5 mb-5">
                <Button
                  variant="success"
                  onClick={handleSaveChanges}
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </Row>
          </>
        )}
      </form>

      <ToastContainer />
    </Container>
  );
}

export default Profil;
