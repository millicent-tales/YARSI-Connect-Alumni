import { useLocation } from "react-router-dom";
import FormBerita from "../components/FormBerita";
import {Container } from "react-bootstrap";

function TambahBerita() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role"); 

  return (
    <>
      <Container>
        <h1 className="text-center">TAMBAH BERITA</h1>
        <hr className="custom-hr" />
      </Container>

      <div className="p-2">
        <FormBerita role={role} />
      </div>
    </>
  );
}

export default TambahBerita;
