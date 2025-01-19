import FormAcara from "../components/FormAcara";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function TambahAcara() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  return (
    <>
      <Container>
        <h1 className="text-center">TAMBAH ACARA</h1>
        <hr className="custom-hr" />
      </Container>

      <div className="p-2">
        <FormAcara role={role} />
      </div>
    </>
  );
}

export default TambahAcara;
