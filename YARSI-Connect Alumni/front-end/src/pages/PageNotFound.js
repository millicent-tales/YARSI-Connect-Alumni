import React from "react";
import pageNotFoundImage from "../assets/ilustrasi/pageNotFound.png";

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px"}}>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <img
        src={pageNotFoundImage}
        alt="Halaman Tidak Ditemukan"
        style={{ marginTop: "20px", marginBottom: "20px", width: "1000px", height: "auto" }}
      />
      <p>
        Halaman yang Anda cari tidak tersedia. Pastikan URL yang dimasukkan
        sudah benar.
      </p>
    </div>
  );
};

export default PageNotFound;