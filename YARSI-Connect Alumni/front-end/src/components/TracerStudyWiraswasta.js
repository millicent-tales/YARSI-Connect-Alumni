import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Checkbox,
  FormGroup,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";

import { postTracerStudy } from "../api/Api";

function TracerStudyWiraswasta({ getStatusPekerjaanData, profileData }) {
  // Mengelola state untuk setiap grup radio dan kontrol text field
  const [formData, setFormData] = useState({
    jenisPerusahaan: "",
    sumberDana: "",
    sumberDanaLainnya: "",
    aktifMencariPekerjaan: "",
    aktifMencariPekerjaanLainnya: "",
    statusPekerjaan: "",
    gajiPerBulan: "",
    jumlahBulanMendapatKerja: "",
    jumlahBulanMulaiWiraswasta: "",
    namaTempatKerja: "",
    waktuMencariPekerjaan: "",
    bulanMulaiMencariKerjaSebelumLulus: "",
    bulanMulaiMencariKerjaSetelahLulus: "",
    caraMencariKerja: {},
    caraMencariKerjaLainnya: "",
    kesesuaianKerja: {},
    kesesuaianKerjaLainnya: "",
    caraMencariKerjaLainnyaChecked: false,
    kesesuaianKerjaLainnyaChecked: false,
    hubunganStudiPekerjaan: "",
    kesesuaianPendidikan: "",
    // Kompetensi pada saat lulus
    "etika-saat-lulus-group": "",
    "keahlian-saat-lulus-group": "",
    "bahasa-inggris-saat-lulus-group": "",
    "teknologi-saat-lulus-group": "",
    "komunikasi-saat-lulus-group": "",
    "kerja-sama-saat-lulus-group": "",
    "pengembangan-saat-lulus-group": "",

    // Kompetensi yang diperlukan dalam pekerjaan
    "etika-saat-lulus-group-diperlukan": "",
    "keahlian-saat-lulus-group-diperlukan": "",
    "bahasa-inggris-saat-lulus-group-diperlukan": "",
    "teknologi-saat-lulus-group-diperlukan": "",
    "komunikasi-saat-lulus-group-diperlukan": "",
    "kerja-sama-saat-lulus-group-diperlukan": "",
    "pengembangan-saat-lulus-group-diperlukan": "",
  });
  const competencyLevels = [
    { value: "1", label: "Sangat Rendah" },
    { value: "2", label: "Rendah" },
    { value: "3", label: "Standar" },
    { value: "4", label: "Tinggi" },
    { value: "5", label: "Sangat Tinggi" },
  ];

  const [metodePembelajaran, setMetodePembelajaran] = useState({
    f21: "", // Perkuliahan
    f22: "", // Demonstrasi
    f23: "", // Partisipasi dalam proyek riset
    f24: "", // Magang
    f25: "", // Praktikum
    f26: "", // Kerja Lapangan
    f27: "", // Diskusi
  });

  const handleMetodePembelajaranChange = (key) => (event) => {
    const { value } = event.target;
    setMetodePembelajaran((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const competencyFields = [
    {
      label: "Etika",
      name: "etika-saat-lulus-group",
      id: "etika-saat-lulus-label",
    },
    {
      label: "Keahlian berdasarkan bidang ilmu",
      name: "keahlian-saat-lulus-group",
      id: "keahlian-saat-lulus-label",
    },
    {
      label: "Bahasa Inggris",
      name: "bahasa-inggris-saat-lulus-group",
      id: "bahasa-inggris-saat-lulus-label",
    },
    {
      label: "Penggunaan Teknologi Informasi",
      name: "teknologi-saat-lulus-group",
      id: "teknologi-saat-lulus-label",
    },
    {
      label: "Komunikasi",
      name: "komunikasi-saat-lulus-group",
      id: "komunikasi-saat-lulus-label",
    },
    {
      label: "Kerja Sama Tim",
      name: "kerja-sama-saat-lulus-group",
      id: "kerja-sama-saat-lulus-label",
    },
    {
      label: "Pengembangan",
      name: "pengembangan-saat-lulus-group",
      id: "pengembangan-saat-lulus-label",
    },
  ];

  const CompetencyRadioGroup = ({ label, name, id }) => (
    <Row className="ms-4 mt-4">
      {/* Kolom label dengan lebar tetap */}
      <Col
        xs={5}
        className="d-flex align-items-center"
        style={{ paddingRight: "10px" }}
      >
        {label}
      </Col>
      {/* Kolom radio group dengan lebar sisa */}
      <Col xs={7} className="d-flex align-items-center">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby={id}
            name={name}
            value={formData[name] || ""}
            onChange={handleRadioChange(name)} // Memanggil handleRadioChange saat ada perubahan
          >
            {competencyLevels.map((level) => (
              <FormControlLabel
                key={level.value}
                value={level.value}
                control={<Radio />}
                label={level.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Col>
    </Row>
  );

  const [openSnackbar, setOpenSnackbar] = useState(false); // State untuk kontrol Snackbar

  const handleRadioChange = (groupName) => (event) => {
    const { value } = event.target;

    setFormData((prevState) => {
      // Reset nilai berdasarkan pilihan radio
      const updatedState = {
        ...prevState,
        [groupName]: value,
      };

      if (groupName === "waktuMencariPekerjaan") {
        if (value === "1") {
          updatedState.bulanMulaiMencariKerjaSetelahLulus = "";
        } else if (value === "2") {
          updatedState.bulanMulaiMencariKerjaSebelumLulus = "";
        } else if (value === "3") {
          updatedState.bulanMulaiMencariKerjaSebelumLulus = "";
          updatedState.bulanMulaiMencariKerjaSetelahLulus = "";
        }
      }

      if (groupName === "sumberDana" && value !== "7") {
        updatedState.sumberDanaLainnya = "";
      }

      if (groupName === "aktifMencariPekerjaan" && value !== "5") {
        updatedState.aktifMencariPekerjaanLainnya = "";
      }

      return updatedState;
    });
  };

  const handleTextChange = (event, field) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Fungsi untuk menangani perubahan pada checkbox "Cara Mencari Kerja"
  const handleCheckboxChangeCaraMencariPekerjaan = (e, label) => {
    setFormData((prev) => ({
      ...prev,
      caraMencariKerja: {
        ...prev.caraMencariKerja,
        [label]: e.target.checked ? 1 : 0, // Set 1 jika dipilih, 0 jika tidak
      },
    }));
  };

  // Fungsi untuk menangani perubahan pada checkbox "Lainnya" untuk cara mencari kerja
  const handleCheckboxLainnyaChangeCaraMencari = (e) => {
    setFormData((prev) => ({
      ...prev,
      caraMencariKerjaLainnyaChecked: e.target.checked,
      caraMencariKerjaLainnya: e.target.checked
        ? prev.caraMencariKerjaLainnya
        : "",
      caraMencariKerja: {
        ...prev.caraMencariKerja,
        Lainnya: e.target.checked ? 1 : 0, // Tambahkan Lainnya ke caraMencariKerja
      },
    }));
  };

  // Fungsi untuk menangani perubahan pada text field "Lainnya"
  const handleCaraMencariKerjaLainnyaChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      caraMencariKerjaLainnya: e.target.value,
    }));
  };

  // Fungsi untuk menangani perubahan pada checkbox "Kesesuaian Kerja"
  const handleCheckboxChangeKesesuaianKerja = (e, label) => {
    setFormData((prev) => ({
      ...prev,
      kesesuaianKerja: {
        ...prev.kesesuaianKerja,
        [label]: e.target.checked ? 1 : 0, // Set 1 jika dipilih, 0 jika tidak
      },
    }));
  };

  // Fungsi untuk menangani perubahan pada checkbox "Lainnya" untuk kesesuaian kerja
  const handleCheckboxLainnyaChangeKesesuaian = (e) => {
    setFormData((prev) => ({
      ...prev,
      kesesuaianKerjaLainnyaChecked: e.target.checked,
      kesesuaianKerjaLainnya: e.target.checked
        ? prev.kesesuaianKerjaLainnya
        : "",
      kesesuaianKerja: {
        ...prev.kesesuaianKerja,
        Lainnya: e.target.checked ? 1 : 0, // Tambahkan Lainnya ke kesesuaianKerja
      },
    }));
  };

  // Fungsi untuk menangani perubahan pada text field "Lainnya"
  const handleKesesuaianKerjaLainnyaChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      kesesuaianKerjaLainnya: value,
    }));
  };

  const [selectedJabatan, setSelectedJabatan] = useState("");
  const isSumberDanaLainnya = formData.sumberDana === "7";
  const isAktifMencariPekerjaanLainnya = formData.aktifMencariPekerjaan === "5";

  const handleJabatanChange = (event) => {
    setSelectedJabatan(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };

  const [tingkatTempatKerja, setTingkatTempatKerja] = useState("");

  const handleTingkatTempatKerjaChange = (event) => {
    setTingkatTempatKerja(event.target.value);
  };

  const caraMencariKerjaMap = {
    "Melalui iklan di koran/majalah, brosur": "f401",
    "Melamar ke perusahaan tanpa mengetahui lowongan yang ada": "f402",
    "Pergi ke bursa/pameran kerja": "f403",
    "Mencari lewat internet/iklan online/milis": "f404",
    "Dihubungi oleh perusahaan": "f405",
    "Menghubungi Kemenakertrans": "f406",
    "Menghubungi agen tenaga kerja komersial/swasta": "f407",
    "Memeroleh informasi dari pusat/kantor pengembangan karier fakultas/universitas":
      "f408",
    "Menghubungi kantor kemahasiswaan/hubungan alumni": "f409",
    "Membangung jejaring (network) sejak masih kuliah": "f410",
    "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)": "f411",
    "Membangun bisnis sendiri": "f412",
    "Melalui penempatan kerja atau magang": "f413",
    "Bekerja di tempat yang sama dengan tempat kerja semasa kuliah": "f414",
    Lainnya: "f415", // Default untuk "Lainnya"
  };

  const kesesuaianKerjaMap = {
    "Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya.":
      "f1601",
    "Saya belum mendapatkan pekerjaan yang lebih sesuai.": "f1602",
    "Di pekerjaan ini saya memeroleh prospek karier yang baik.": "f1603",
    "Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya":
      "f1604",
    "Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya.":
      "f1605",
    "Saya dapat memeroleh pendapatan yang lebih tinggi di pekerjaan ini.":
      "f1606",
    "Pekerjaan saya saat ini lebih aman/terjamin/secure": "f1607",
    "Pekerjaan saya saat ini lebih menarik.": "f1608",
    "Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel, dll.":
      "f1609",
    "Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya.": "f1610",
    "Pekerjaan saya saat ini dapat lebih menjamin kebutuhan keluarga saya.":
      "f1611",
    "Pada awal meniti karier ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya.":
      "f1612",
    Lainnya: "f1613", // untuk Lainnya
  };

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const isKompetensiFilled = competencyFields.every(
        (field) =>
          formData[field.name] !== "" &&
          formData[`${field.name}-diperlukan`] !== ""
      );
  
      if (!isKompetensiFilled || !formData.sumberDana) {
        setSnackbarMessage("Soal nomor 5 dan 6 wajib dijawab!");
        setOpenSnackbar(true);
        return;
      }
  
      // Pemetaan kompetensi ke kode backend
      const competencyMapping = {
        "etika-saat-lulus-group": "f1761",
        "keahlian-saat-lulus-group": "f1763",
        "bahasa-inggris-saat-lulus-group": "f1765",
        "teknologi-saat-lulus-group": "f1767",
        "komunikasi-saat-lulus-group": "f1769",
        "kerja-sama-saat-lulus-group": "f1771",
        "pengembangan-saat-lulus-group": "f1773",
        "etika-saat-lulus-group-diperlukan": "f1762",
        "keahlian-saat-lulus-group-diperlukan": "f1764",
        "bahasa-inggris-saat-lulus-group-diperlukan": "f1766",
        "teknologi-saat-lulus-group-diperlukan": "f1768",
        "komunikasi-saat-lulus-group-diperlukan": "f1770",
        "kerja-sama-saat-lulus-group-diperlukan": "f1772",
        "pengembangan-saat-lulus-group-diperlukan": "f1774",
      };
  
      // Menyiapkan payload untuk API
      const dataToSend = {
        nimhsmsmh: profileData?.studentIdentificationNumber || "",
        tahun_lulus: profileData?.yearGraduated || "",
        nmmhsmsmh: profileData?.fullName || "",
        kdptimsmh: profileData?.universityCode || "",
        kdpstmsmh: profileData?.programCode || "",
        nik: profileData?.nationalIdentificationNumber || "",
        telpomsmh: formData.telephone || profileData?.telephone || "",
        emailmsmh: (formData.email || profileData?.email || "").trim(),
        npwp: formData.npwp || "",
        f8: parseInt(getStatusPekerjaanData(), 10),
        f502: parseInt(formData.jumlahBulanMulaiWiraswasta, 10),
        f5c: selectedJabatan || "",
        f5d: parseInt(tingkatTempatKerja, 10)||0,
        f1201: parseInt(formData.sumberDana, 10),
        f1202: formData.sumberDanaLainnya || null,
        f301: parseInt(formData.waktuMencariPekerjaan, 10),
        f302: parseInt(formData.bulanMulaiMencariKerjaSebelumLulus, 10) || null,
        f303: parseInt(formData.bulanMulaiMencariKerjaSetelahLulus, 10) || null,
        f21: parseInt(metodePembelajaran.f21, 10) || 0,
        f22: parseInt(metodePembelajaran.f22, 10) || 0,
        f23: parseInt(metodePembelajaran.f23, 10) || 0,
        f24: parseInt(metodePembelajaran.f24, 10) || 0,
        f25: parseInt(metodePembelajaran.f25, 10) || 0,
        f26: parseInt(metodePembelajaran.f26, 10) || 0,
        f27: parseInt(metodePembelajaran.f27, 10) || 0,
        ...Object.entries(competencyMapping).reduce((acc, [field, code]) => {
          acc[code] = parseInt(formData[field], 10) || 0;
          return acc;
        }, {}),
        ...Object.keys(caraMencariKerjaMap).reduce((acc, label) => {
          acc[caraMencariKerjaMap[label]] = formData.caraMencariKerja[label]
            ? 1
            : 0;
          return acc;
        }, {}),
        f415: formData.caraMencariKerjaLainnyaChecked ? 1 : 0,
        f416: formData.caraMencariKerjaLainnya || null,
        f6: parseInt(formData.jumlahPerusahaanDilamar, 10) || 0,
        f7: parseInt(formData.jumlahPerusahaanRespon, 10) || 0,
        f7a: parseInt(formData.jumlahPerusahaanUndangWawancara, 10) || 0,
        f1001: parseInt(formData.aktifMencariPekerjaan, 10) || 0,
        f1002: formData.aktifMencariPekerjaanLainnya || null,
        ...Object.keys(kesesuaianKerjaMap).reduce((acc, label) => {
          acc[kesesuaianKerjaMap[label]] = formData.kesesuaianKerja[label]
            ? 1
            : 0;
          return acc;
        }, {}),
        f1613: formData.kesesuaianKerjaLainnyaChecked ? 1 : 0,
        f1614: formData.kesesuaianKerjaLainnya || null,
      };
  
      // Mengirim data ke API
      await postTracerStudy(dataToSend);
  
      setSnackbarMessage("Data berhasil dikirim!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error sending data to backend:", error.response?.data || error);
      setSnackbarMessage(
        error.response?.data?.message || "Gagal mengirim data. Coba lagi."
      );
      setOpenSnackbar(true);
    }
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="mt-3">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage.includes("berhasil") ? "success" : "warning"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Row className="mb-4">
        <Form.Group>
          {/*f502*/}
          <p>2. Dalam berapa bulan setelah lulus Anda memulai wiraswasta?</p>

          <TextField
  className="ms-3"
  variant="outlined"
  id="jumlah-bulan-setelah-lulus-memulai-wiraswasta"
  label="Masukkan jumlah bulan!"
  type="number"
  value={formData.jumlahBulanMulaiWiraswasta}
  onChange={(e) => handleTextChange(e, "jumlahBulanMulaiWiraswasta")} 
  sx={{
    width: "500px",
  }}
/>

        </Form.Group>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          {/*f5c*/}
          <p>3. Bila berwiraswasta, apa posisi/jabatan Anda saat ini?</p>

          <FormControl sx={{ m: 1, width: 500 }} className="ms-3">
            <InputLabel id="posisi-label">
              Silakan pilih posisi/jabatan Anda saat ini!
            </InputLabel>
            {/*f5a1*/}
            <Select
              labelId="select-jabatan-label"
              id="select-jabatan"
              value={selectedJabatan}
              onChange={handleJabatanChange}
              input={
                <OutlinedInput label="Silakan pilih posisi/jabatan Anda saat ini!" />
              }
              MenuProps={MenuProps}
            >
              <MenuItem value="Founder">Founder</MenuItem>
              <MenuItem value="Co-Founder">Co-Founder</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Freelance/Kerja Lepas">
                Freelance/Kerja Lepas
              </MenuItem>
            </Select>
          </FormControl>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          {/*f5d*/}
          <p>4. Apa tingkat tempat kerja Anda?</p>
          <FormControl sx={{ m: 1, width: 500 }} className="ms-3">
            <InputLabel id="tingkat-tempat-kerja-label">
              Pilih tingkat tempat kerja Anda!
            </InputLabel>
            <Select
              labelId="tingkat-tempat-kerja-label"
              id="tingkat-tempat-kerja-select"
              value={tingkatTempatKerja}
              label="Tingkat Tempat Kerja"
              onChange={handleTingkatTempatKerjaChange}
              input={<OutlinedInput label="Pilih tingkat tempat kerja Anda!" />}
              MenuProps={MenuProps}
            >
              <MenuItem value={1}>
                Lokal/Wilayah/Wiraswasta tidak berbadan hukum
              </MenuItem>
              <MenuItem value={2}>Nasional/Wiraswasta berbadan hukum</MenuItem>
              <MenuItem value={3}>Multinasional/Internasional</MenuItem>
            </Select>
          </FormControl>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          {/*f1201*/}
          <p>
            5. Sebutkan sumber dana dalam pembiayaan kuliah!
            <span style={{ color: "red" }}>*</span> (bukan ketika Studi Lanjut)
          </p>
          <FormControl className="ms-4">
            <RadioGroup
              aria-labelledby="sumber-dana-kuliah-label"
              value={formData.sumberDana}
              onChange={handleRadioChange("sumberDana")}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Biaya Sendiri/Keluarga"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Beasiswa ADIK"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Beasiswa BIDIKMISI"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Beasiswa PPA"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="Beasiswa AFIRMASI"
              />
              <FormControlLabel
                value="6"
                control={<Radio />}
                label="Beasiswa Perusahaan/Swasta"
              />
              <FormControlLabel value="7" control={<Radio />} label="Lainnya" />
            </RadioGroup>

            {/*f1202*/}
            <TextField
              className="mt-3"
              id="beasiswa-lainnya"
              label="Masukkan beasiswa Anda!"
              variant="outlined"
              disabled={!isSumberDanaLainnya}
              value={formData.sumberDanaLainnya || ""}
              onChange={(e) => handleTextChange(e, "sumberDanaLainnya")}
              sx={{
                width: "500px",
              }}
            />
          </FormControl>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <p>
          6. Isilah Pertanyaan Kompetensi di Bawah Ini!{" "}
          <span style={{ color: "red" }}>*</span>
        </p>
        <p className="ms-4">
          A. Pada saat lulus, pada tingkat mana kompetensi di bawah ini Anda
          kuasai?
        </p>
        {competencyFields.map((field) => (
          <CompetencyRadioGroup
            key={field.name}
            label={field.label}
            name={field.name} // Menggunakan nama sesuai dengan state formData
            id={field.id}
          />
        ))}

        <p className="ms-4 mt-4">
          B. Pada saat ini, pada tingkat mana kompetensi di bawah ini diperlukan
          dalam pekerjaan?
        </p>
        {competencyFields.map((field) => (
          <CompetencyRadioGroup
            key={`${field.name}-diperlukan`}
            label={field.label}
            name={`${field.name}-diperlukan`} // Nama berubah untuk kompetensi yang diperlukan
            id={`${field.id}-diperlukan`}
          />
        ))}
      </Row>

      <Row className="mb-4 mt-4">
        <p>
          7. Menurut Anda seberapa besar penekanan pada metode pembelajaran di
          bawah ini dilaksanakan di program studi Anda?
        </p>

        <Row className="ms-3 mb-3 mt-3">
          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-perkuliahan-label">Perkuliahan</FormLabel>
              <RadioGroup
                aria-labelledby="metode-perkuliahan-label"
                name="metode-perkuliahan-group"
                onChange={handleMetodePembelajaranChange("f21")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-demonstrasi-label">Demonstrasi</FormLabel>
              <RadioGroup
                aria-labelledby="metode-demonstrasi-label"
                name="metode-demonstrasi-group"
                onChange={handleMetodePembelajaranChange("f22")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-partisipasi-riset-label">
                Partisipasi dalam proyek riset
              </FormLabel>
              <RadioGroup
                aria-labelledby="metode-partisipasi-riset-label"
                name="metode-partisipasi-riset-group"
                onChange={handleMetodePembelajaranChange("f23")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        <Row className="ms-3 mb-3 mt-3">
          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-magang-label">Magang</FormLabel>
              <RadioGroup
                aria-labelledby="metode-magang-label"
                name="metode-magang-group"
                onChange={handleMetodePembelajaranChange("f24")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-praktikum-label">Praktikum</FormLabel>
              <RadioGroup
                aria-labelledby="metode-praktikum-label"
                name="metode-praktikum-group"
                onChange={handleMetodePembelajaranChange("f25")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-kerja-lapangan-label">
                Kerja Lapangan
              </FormLabel>
              <RadioGroup
                aria-labelledby="metode-kerja-lapangan-label"
                name="metode-kerja-lapangan-group"
                onChange={handleMetodePembelajaranChange("f26")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        <Row className="ms-3 mb-3 mt-3">
          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-diskusi-label">Diskusi</FormLabel>
              <RadioGroup
                aria-labelledby="metode-diskusi-label"
                name="metode-diskusi-group"
                onChange={handleMetodePembelajaranChange("f27")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          <p>
            8. Kapan Anda mulai mencari pekerjaan? (Mohon pekerjaan sambilan
            tidak dimasukkan)
          </p>
          <FormControl className="ms-4">
            <RadioGroup
              aria-labelledby="waktu-mencari-pekerjaan-label"
              value={formData.waktuMencariPekerjaan}
              onChange={handleRadioChange("waktuMencariPekerjaan")}
              name="waktu-mencari-pekerjaan-group"
            >
              {/* Pilihan sebelum lulus */}
              <FormControlLabel
                className="mt-4"
                value="1"
                control={<Radio />}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Kira-kira</span>
                    <TextField
                      id="sebelum-lulus"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={formData.bulanMulaiMencariKerjaSebelumLulus}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          bulanMulaiMencariKerjaSebelumLulus:
                            event.target.value,
                        })
                      }
                      sx={{ margin: "0 8px", width: "80px" }}
                      disabled={formData.waktuMencariPekerjaan !== "1"}
                    />
                    <span>bulan sebelum lulus</span>
                  </div>
                }
              />

              {/* Pilihan setelah lulus */}
              <FormControlLabel
                className="mt-4"
                value="2"
                control={<Radio />}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Kira-kira</span>
                    <TextField
                      id="sesudah-lulus"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={formData.bulanMulaiMencariKerjaSetelahLulus}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          bulanMulaiMencariKerjaSetelahLulus:
                            event.target.value,
                        })
                      }
                      sx={{ margin: "0 8px", width: "80px" }}
                      disabled={formData.waktuMencariPekerjaan !== "2"}
                    />
                    <span>bulan sesudah lulus</span>
                  </div>
                }
              />

              {/* Pilihan tidak mencari kerja */}
              <FormControlLabel
                className="mt-4"
                value="3"
                control={<Radio />}
                label="Saya tidak mencari kerja"
              />
            </RadioGroup>
          </FormControl>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <p>
          9. Bagaimana Anda mencari pekerjaan tersebut? Jawaban bisa lebih dari
          satu
        </p>
        <FormGroup className="ms-4">
          {Object.keys(caraMencariKerjaMap).map((label, index) => (
            <FormControlLabel
            key={index}
            control={
              <Checkbox
                onChange={(e) =>
                  label === "Lainnya"
                    ? handleCheckboxLainnyaChangeCaraMencari(e) 
                    : handleCheckboxChangeCaraMencariPekerjaan(e, label) 
                }
                checked={
                  label === "Lainnya"
                    ? formData.caraMencariKerjaLainnyaChecked
                    : !!formData.caraMencariKerja[label]
                }
              />
            }
            label={label}
          />
          ))}
          <TextField
            className="mt-3"
            id="cara-mencari-kerja-lainnya"
            label="Masukkan jawaban Anda!"
            variant="outlined"
            disabled={!formData.caraMencariKerjaLainnyaChecked}
            value={formData.caraMencariKerjaLainnya}
            onChange={handleCaraMencariKerjaLainnyaChange}
            sx={{ width: "500px" }}
          />
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <FormGroup>
          {/*f6*/}
          <p>
            10. Berapa perusahaan/instansi/institusi yang sudah Anda lamar?
            (lewat surat atau email) sebelum Anda memeroleh pekerjaan pertama?
          </p>
          <Row className="ms-3 align-items-center">
            <Col className="col-auto">
              <TextField
                id="jumlah-perusahaan-yang-dilamar"
                label="Masukkan jawaban Anda!"
                variant="outlined"
                type="number"
                sx={{
                  width: "500px",
                }}
              />
            </Col>
            <Col className="text-start d-flex align-items-center">
              perusahaan/instansi/institusi
            </Col>
          </Row>
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <FormGroup>
          {/*f7*/}
          <p>
            11. Berapa perusahaan/instansi/institusi yang merespon lamaran Anda?
          </p>
          <Row className="ms-3 align-items-center">
            <Col className="col-auto">
              <TextField
                id="jumlah-perusahaan-yang-merespon-lamaran"
                label="Masukkan jawaban Anda!"
                variant="outlined"
                type="number"
                sx={{
                  width: "500px",
                }}
              />
            </Col>
            <Col className="text-start d-flex align-items-center">
              perusahaan/instansi/institusi
            </Col>
          </Row>
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <FormGroup>
          {/*f7a*/}
          <p>
            12. Berapa perusahaan/instansi/intitusi yang mengundang Anda untuk
            wawancara?
          </p>
          <Row className="ms-3 align-items-center">
            <Col className="col-auto">
              <TextField
                id="jumlah-perusahaan-yang-mengundang-wawancara"
                label="Masukkan jawaban Anda!"
                variant="outlined"
                type="number"
                sx={{
                  width: "500px",
                }}
              />
            </Col>
            <Col className="text-start d-flex align-items-center">
              perusahaan/instansi/institusi
            </Col>
          </Row>
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          {/*f1001*/}
          <p>
            13. Apakah Anda aktif mencari pekerjaan dalam 4 minggu terakhir?
          </p>
          <FormControl className="ms-4">
            <RadioGroup
              aria-labelledby="aktif-mencari-pekerjaan-label"
              defaultValue=""
              name="aktif-mencari-pekerjaan-group"
              onChange={handleRadioChange("aktifMencariPekerjaan")}
            >
              <FormControlLabel value="1" control={<Radio />} label="Tidak" />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Tidak, tapi saya sedang menunggu hasil lamaran kerja"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Ya, saya akan mulai bekerja dalam 2 minggu ke depan"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Ya, tapi saya belum pasti akan bekerja dalam 2 minggu ke depan"
              />
              <FormControlLabel value="5" control={<Radio />} label="Lainnya" />
            </RadioGroup>

            {/*f1001*/}
            <TextField
              className="mt-3"
              id="pencarian-kerja-lainnya"
              label="Masukkan jawaban Anda!"
              variant="outlined"
              disabled={!isAktifMencariPekerjaanLainnya}
              value={formData.aktifMencariPekerjaanLainnya || ""}
              onChange={(e) =>
                handleTextChange(e, "aktifMencariPekerjaanLainnya")
              }
              sx={{
                width: "500px",
              }}
            />
          </FormControl>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <p>
          14. Jika menurut Anda pekerjaan Anda saat ini tidak sesuai dengan
          pendidikan Anda, mengapa Anda mengambilnya? Jawaban bisa lebih dari
          satu
        </p>
        <FormGroup className="ms-4">
          {Object.keys(kesesuaianKerjaMap).map((label, index) => (
           <FormControlLabel
           key={index}
           control={
             <Checkbox
               onChange={(e) =>
                 label === "Lainnya"
                   ? handleCheckboxLainnyaChangeKesesuaian(e) 
                   : handleCheckboxChangeKesesuaianKerja(e, label) 
               }
               checked={
                 label === "Lainnya"
                   ? formData.kesesuaianKerjaLainnyaChecked
                   : !!formData.kesesuaianKerja[label]
               }
             />
           }
           label={label}
         />
         
          ))}
          <TextField
            className="mt-3"
            id="kesesuaian-kerja-lainnya"
            label="Masukkan jawaban Anda!"
            variant="outlined"
            disabled={!formData.kesesuaianKerjaLainnyaChecked}
            value={formData.kesesuaianKerjaLainnya}
            onChange={handleKesesuaianKerjaLainnyaChange}
            sx={{ width: "500px" }}
          />
        </FormGroup>
      </Row>

      <Button
        variant="success"
        className="ms-auto d-block mt-4 mb-4"
        onClick={handleSubmit} // Memanggil fungsi submit
      >
        Kirim
      </Button>
    </Container>
  );
}

export default TracerStudyWiraswasta;
