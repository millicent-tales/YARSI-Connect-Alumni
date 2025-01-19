import { Container } from "react-bootstrap";
import Profil from "../components/Profil";

function ProfilPage() {
  return (
    <>
      <Container>
        <h1 className="text-center">PROFIL</h1>
        <hr className="custom-hr" />
      </Container>
      <Profil />
    </>
  );
}

export default ProfilPage;
