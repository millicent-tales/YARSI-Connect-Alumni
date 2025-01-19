import React from "react";
import accessDeniedImage from "../assets/ilustrasi/accessDenied.png";

const AccessDenied = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Akses Ditolak</h1>
      <img
        src={accessDeniedImage}
        alt="Akses Ditolak"
        style={{ marginTop: "30x",  marginBottom: "30x", width: "1000px", height: "auto" }}
      />
      <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
    </div>
  );
};

export default AccessDenied;