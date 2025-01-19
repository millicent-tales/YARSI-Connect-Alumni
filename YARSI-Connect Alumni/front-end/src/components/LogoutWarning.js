import React from "react";
import logoutPlease from "../assets/ilustrasi/logoutPlease.png";

const LogoutWarning = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Anda Sedang Login!</h1>
      <img
        src={logoutPlease}
        alt="Akses Ditolak"
        style={{ marginTop: "30px", marginBottom: "30px", width: "1000px", height: "auto" }}
      />
      <p>Logout terlebih dahulu untuk mengakses halaman ini.</p>
    </div>
  );
};

export default LogoutWarning;