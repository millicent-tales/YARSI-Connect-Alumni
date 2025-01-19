import FormProgramAlumni from "../components/FormProgramAlumni";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function TambahProgramAlumni() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  return (
    <>
      <Container>
        <h1 className="text-center">TAMBAH PROGRAM ALUMNI</h1>
        <hr className="custom-hr" />
      </Container>

      <div className="p-2">
        <FormProgramAlumni role={role} />{" "}
      </div>
    </>
  );
}

export default TambahProgramAlumni;
